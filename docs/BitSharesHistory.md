To access the [Account History API](http://docs.Meta1.org/api/history.html#account-history), you can use the __Meta1.history__ object.

## get_account_history()
Signature:
```js
get_account_history(account_id_type account, operation_history_id_type stop = operation_history_id_type (), unsigned limit = 100, operation_history_id_type start = operation_history_id_type ())
```
### Example
```js
let ops = await Meta1.history.get_account_history("1.2.849826", "1.11.0", 10, "1.11.0")
```