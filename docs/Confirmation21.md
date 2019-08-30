```js
Meta1.init("wss://Meta1.openledger.info/ws");
Meta1.subscribe("connected", start);

var tx;

async function start() {
  Meta1.subscribe("block",update)

  let bot = new Meta1.login("trade-bot", "<password>");
  [tx] = await bot.transfer("scientistnik", "usd", 10)
}

async function update([newBlock]) {
  if (tx && (tx.block_num + 21) < newBlock.head_block_number) {
    let blockTx = await Meta1.db.get_transaction(tx.block_num, tx.trx_num)
    if (blockTx.signatures[0] === tx.trx.signatures[0])
      console.log("tx irreversible")
  }
}
```