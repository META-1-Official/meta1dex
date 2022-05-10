To access the [Database API](http://docs.Meta1.org/api/database.html), you can use the __Meta1.db__ object.
## get_objects()
Signature:
```js
get_objects(const vector<object_id_type> &ids)
```
### Example:
```js
const Meta1 = require("meta1-vision-dex");
Meta1.init(config.node);
Meta1.subscribe('connected', start);

async function start() {
  let [bts, account, order] = await Meta1.db.get_objects(['1.3.0','1.2.849826','1.7.65283036']);

  console.log(bts, account, order);
}
```
