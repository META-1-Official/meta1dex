const 
  assert = require("assert"),
  //fs = require("fs"),
  Meta1 = require("../index.js");

require("dotenv").config();

describe("Transaction class", () => {
  before(async () => {
    await Meta1.connect(process.env.Meta1_NODE)
  })

  describe("#cost()", () => {
    it.only("get cost", async () => {
      let acc = await Meta1.login(process.env.Meta1_ACCOUNT, process.env.Meta1_PASSWORD)
      let tx = acc.newTx()

      let operation = await acc.transferOperation("trade-bot", "TEST", 1)
      tx.add(operation)

      operation = await acc.transferOperation("trade-bot", "TEST", 1)
      tx.add(operation)

      let cost = await tx.cost().catch(console.log)
      console.log(JSON.stringify(cost,null,2))
    })
  })
})