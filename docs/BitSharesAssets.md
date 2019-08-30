__Meta1.assets__ use for get asset object.

If you know name asset, `Meta1.assets` behave like map:
```js
let usd = await Meta1.assets.usd;
let btc = await Meta1.assets["OPEN.BTS"];
let bts = await Meta1.assets["bts"];
```
See current assets in map:
```js
console.log(Meta1.assets.map); // {}
let bts = await Meta1.assets.bts;
console.log(Meta1.assets.map); // { BTS: Asset {...} }
```
If you want get by id:
```js
let bts = await Meta1.assets.id("1.3.0");
```
Each Asset have `update()` method to update asset data:
```js
await bts.update();
```
For update all asset in current map:
```js
await Meta1.assets.update();
```
If you want get asset have reserve name ('id' or 'update'):
```js
let asset = Meta1.assets.getAsset('update');
```
If you want to know market fee this asset:
```js
let usd = await Meta1.assets.usd;
console.log(usd.fee()); // 0.001
```