__Meta1.accounts__ use for get account object.

If you know account name, `Meta1.assets` behave like map:
```js
let iam = await Meta1.accounts.scientistnik;
let tradebot = await Meta1.accounts["trade-bot"];
```

See current accounts in map:
```js
console.log(Meta1.accounts.map); // {}
let bts = await Meta1.accounts.scientistnik;
console.log(Meta1.accounts.map); // { scientistnik: Account {...} }
```
If you want get by id:
```js
let scientistnik = await Meta1.accounts.id("1.2.440272");
```
Each Account have `update()` method to update account data:
```js
await scientistnik.update();
```
For update all account in current map:
```js
await Meta1.accounts.update();
```
If you want get account have reserve name ('id' or 'update'):
```js
let acc = Meta1.accounts.getAccount('update');
```