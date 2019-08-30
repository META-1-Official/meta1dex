```js
const Meta1 = require("meta1dex"),
      {Apis} = require("Meta1js-ws");

Apis.setRpcConnectionStatusCallback(statusCallBack)

function statusCallBack(status) {
  if (status === 'closed') {
    console.log("Status connection: closed")
    let reconnectTimer = setInterval(async () => {
      try {
        await Meta1.reconnect()
        clearInterval(reconnectTimer)
      } catch(error) {
        console.log(error)
      }
    }, 1000)
  }
}
```