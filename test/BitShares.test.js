const 
  assert = require("assert"),
  fs = require("fs"),
  Meta1 = require("../index.js");

require("dotenv").config();

describe("Meta1 class", () => {
  describe("#connect()", () => {
    it("connect", async () => {
      let { connect, disconnect } = Meta1
      assert.equal(await connect(process.env.Meta1_NODE), true, "Return not 'true'")

      await disconnect()

      try {
        await Meta1.db.get_objects(["1.3.0"])
      } catch(error) {
        return true
      }
      throw Error("Disconnect don't work")
    })

    it.skip("subscribe", async () => {
      Meta1.subscribe("connected", console.log)
    })
  })

  describe("#login()", () => {
    before(async () => {
      await Meta1.connect(process.env.Meta1_NODE)
    })

    after(Meta1.disconnect)

    it("login", async () => {
      let { login } = Meta1;
      let acc = await login(process.env.Meta1_ACCOUNT, process.env.Meta1_PASSWORD)
      assert.equal(acc.constructor.name, "Meta1", "Don't return account")
    })

    it("loginFromFile", async () => {
      let { loginFromFile } = Meta1
      let buffer = fs.readFileSync(process.env.Meta1_WALLET_FILE);
      
      let acc = await loginFromFile(
        buffer, 
        process.env.Meta1_WALLET_PASS, 
        process.env.Meta1_ACCOUNT
      )

      assert.equal(acc.constructor.name, "Meta1", "Don't return account")
    })
  })

  describe.skip("#subscribe", () => {
    it("connected", async () => {
      await Meta1.subscribe("connected", console.log)
    })

    it("block", async () => {
      await Meta1.subscribe("block", console.log)
    })

    it("account", async () => {
      Meta1.node = process.env.Meta1_NODE
      await Meta1.subscribe("account", console.log, "trade-bot")
    })
  })

  describe.skip("#assetIssue()", () => {

    before(async () => {
      await Meta1.connect(process.env.Meta1_NODE)
    });

    after(Meta1.disconnect)

    it("issue asset", async () => {
      let bot = await Meta1.login(process.env.Meta1_ACCOUNT, process.env.Meta1_PASSWORD);
      let asset = (await bot.balances(process.env.ISSUE_ASSET))[0];
      let balanceBefore = asset.amount / 10 ** asset.asset.precision;
      
      await bot.assetIssue(process.env.Meta1_ACCOUNT, process.env.Meta1_ISSUE_ASSET, 10, "Hello");

      let balanceAfter = (await bot.balances(process.env.Meta1_ISSUE_ASSET))[0].amount / 10 ** asset.asset.precision;
      assert.equal(balanceBefore + 10, balanceAfter, "Asset don't issued")
    });

    it("generateKeys", async () => {
      console.log(Meta1.generateKeys(process.env.Meta1_ACCOUNT, process.env.Meta1_PASSWORD))
    })
  });
});