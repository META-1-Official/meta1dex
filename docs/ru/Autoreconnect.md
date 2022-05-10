```js
const Meta1 = require("meta-vision-dev"),
      {Apis} = require("meta1-vision-ws");

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