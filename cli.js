#!/usr/bin/env node

const 
  repl = require('repl'),
  Meta1 = require('./index.js'),
  readline = require('readline'),
  Writable = require('stream').Writable;

var mutableStdout = new Writable({
  write: function(chunk, encoding, callback) {
    if (!this.muted)
      process.stdout.write(chunk, encoding);
    else
      process.stdout.write(Buffer.from('*', 'utf-8'), encoding);
    callback();
  }
});

function initializeContext(context) {
  connect().then(() => {
    context.accounts = Meta1.accounts;
    context.assets = Meta1.assets;
    context.db = Meta1.db;
    context.history = Meta1.history;
    context.network = Meta1.network;
    context.fees = Meta1.fees;
  })

  context.Meta1 = Meta1;
  context.meta1dex = Meta1;
  context.login = Meta1.login.bind(Meta1)
  context.generateKeys = Meta1.generateKeys
}


function connect(autoreconnect = true) {  
  let 
    node = process.argv.includes("--node") 
              ? process.argv[process.argv.indexOf("--node") + 1] 
              : (process.argv.includes("--testnet") ? "wss://node.testnet.meta1.eu" : Meta1.node)

  return Meta1.connect(node, autoreconnect).then(() => console.log(`Connected to API node: ${node}`))
}

function showError(error) {
  console.log(`Error: ${error.message}`)
  Meta1.disconnect()
}

if (process.argv.includes("--account")) {
  let index = process.argv.indexOf("--account")

  connect(false).then(() => {
    Meta1.accounts[process.argv[index + 1]].then(result => {
      console.log(JSON.stringify(result, null, 2))
      Meta1.disconnect()
    }, showError)
  })
} else if (process.argv.includes("--asset")) {
  let index = process.argv.indexOf("--asset")

  connect(false).then(() => {
    Meta1.assets[process.argv[index + 1]].then(result => {
      console.log(JSON.stringify(result, null, 2))
      Meta1.disconnect()
    }, showError)
  })
} else if (process.argv.includes("--block")) {
  let index = process.argv.indexOf("--block")

  connect(false).then(async () => {
    let block_num = process.argv[index + 1] || (await Meta1.db.get_dynamic_global_properties()).head_block_number
    Meta1.db.get_block(block_num).then(result => {
      console.log(`block_num: ${block_num}`)
      console.log(JSON.stringify(result, null, 2))
      Meta1.disconnect()
    }, showError)
  })
} else if (process.argv.includes("--object")) {
  let index = process.argv.indexOf("--object")

  connect(false).then(() => {
    Meta1.db.get_objects([process.argv[index + 1]]).then(result => {
      console.log(JSON.stringify(result[0], null, 2))
      Meta1.disconnect()
    }, showError)
  })
} else if (process.argv.includes("--history")) {
  let index = process.argv.indexOf("--history"),
      account_name = process.argv[index + 1],
      limit = process.argv[index + 2],
      start = process.argv[index + 3],
      stop = process.argv[index + 4];

  connect(false).then(async () => {
    try {
      let account = await Meta1.accounts[account_name]
      let history = await Meta1.history.get_account_history(
        account.id, 
        /^1.11.\d+$/.test(start) ? start : "1.11.0", 
        isNaN(limit) ? 100 : limit, 
        /^1.11.\d+$/.test(stop) ? stop : "1.11.0"
      )
      console.log(JSON.stringify(history, null, 2))
    } catch(error) {
      console.log(`Error: ${error.message}`)
    }
    
    Meta1.disconnect()
  }, showError)
} else if (process.argv.includes("--transfer")) {
  let index = process.argv.indexOf("--transfer"),
      from = process.argv[index + 1],
      to = process.argv[index + 2],
      amount = process.argv[index + 3],
      asset = process.argv[index + 4].toUpperCase(),
      isKey = process.argv.includes("--key");

  connect(false).then(() => {
    rl = readline.createInterface({
      input: process.stdin,
      output: mutableStdout,
      terminal: true
    });

    mutableStdout.muted = false;
    rl.question(`Enter the ${isKey ? 'private key' : 'password'}: `, async (answer) => {
      mutableStdout.muted = false;

      try {
        let account = isKey ? new Meta1(from, answer) : await Meta1.login(from, answer)

        rl.question('Write memo: ', async memo => {
          try {
            await account.transfer(to, asset, amount, memo)
            console.log(`Transfered ${amount} ${asset} from '${from}' to '${to}' with memo '${memo}'`)
          } catch(error) {
            console.log(`Error: ${error.message}`)
          }
          
          rl.close();
          Meta1.disconnect()
        })
      } catch(error) {
        console.log(`Error: ${error.message}`)
        rl.close();
        Meta1.disconnect()
      }
    });
    mutableStdout.muted = true;
  }, showError)
} else {
  const r = repl.start({ prompt: '> ' });
  initializeContext(r.context);

  r.on('reset', initializeContext);
}
