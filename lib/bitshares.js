"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _event = _interopRequireDefault(require("./event.js"));

var _asset = _interopRequireDefault(require("./asset.js"));

var _account = _interopRequireDefault(require("./account.js"));

var _api = _interopRequireDefault(require("./api.js"));

var _fees = _interopRequireDefault(require("./fees.js"));

var _transaction = _interopRequireDefault(require("./transaction.js"));

var _lzmaDMin = require("lzma/src/lzma-d-min");

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _meta1js = require("meta1-vision-js");
var _meta1jsWs = require("meta1-vision-ws");

var Meta1 = /*#__PURE__*/function () {
  (0, _createClass2.default)(Meta1, null, [{
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(node) {
        var autoreconnect,
            _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                autoreconnect = _args.length > 1 && _args[1] !== undefined ? _args[1] : Meta1.autoreconnect;

                if (!(Meta1.connectPromise || Meta1.connectedPromise)) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", Promise.all([Meta1.connectPromise, Meta1.connectedPromise]));

              case 3:
                if (autoreconnect) _api.default.getApis().setRpcConnectionStatusCallback(Meta1.statusCallBack);
                _context.next = 6;
                return Meta1.connectPromise = Meta1.reconnect(node);

              case 6:
                _context.next = 8;
                return Meta1.connectedPromise = Meta1.connectedInit();

              case 8:
                _event.default.connectedNotify();

                return _context.abrupt("return", true);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function connect(_x) {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: "disconnect",
    value: function disconnect() {
      Meta1.connectPromise = Meta1.connectedPromise = undefined;
      Meta1.autoreconnect = false;

      _api.default.getApis().close();
    }
  }, {
    key: "reconnect",
    value: function () {
      var _reconnect = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var node,
            res,
            _args2 = arguments;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                node = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : Meta1.node;
                _context2.next = 3;
                return _api.default.getApis().instance(node, true).init_promise;

              case 3:
                res = _context2.sent;
                Meta1.chain = res[0].network;
                Meta1.node = node;
                return _context2.abrupt("return", res);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function reconnect() {
        return _reconnect.apply(this, arguments);
      }

      return reconnect;
    }()
  }, {
    key: "statusCallBack",
    value: function statusCallBack(status) {
      Meta1.logger.log("WebSocket status:", status);

      if (Meta1.autoreconnect && status === 'closed') {
        Meta1.logger.log("WebSocket status, try to connect...");
        setTimeout(function () {
          Meta1.reconnect().then(_event.default.resubscribe.bind(_event.default)).catch(Meta1.logger.error);
        }, 2000);
      }
    }
  }, {
    key: "connectedInit",
    value: function () {
      var _connectedInit = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(!this.connectPromise || this.blockReCall)) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                this.blockReCall = true;
                this.db = _api.default.new('db_api');
                this.history = _api.default.new('history_api');
                this.network = _api.default.new('network_api'); //this.crypto = Api.new('crypto_api');

                _transaction.default.setDB(this.db);

                this.newTx = _transaction.default.newTx;
                this.assets = _asset.default.init(this.db);
                this.accounts = _account.default.init(this.db);
                this.fees = _fees.default.init(this.db);
                _context3.next = 13;
                return this.fees.update();

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function connectedInit() {
        return _connectedInit.apply(this, arguments);
      }

      return connectedInit;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(accountName, password) {
        var feeSymbol,
            acc,
            activeKey,
            genPubKey,
            account,
            _args4 = arguments;
            return _regenerator.default.wrap(async function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    feeSymbol = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : Meta1.chain.core_asset;
                    _context4.next = 3;
                    return Meta1.accounts[accountName];
    
                  case 3:                
                    acc = _context4.sent;
                    acc = await _meta1jsWs.Apis.db.get_account_by_name(accountName);
    
                    activeKey = _meta1js.PrivateKey.fromSeed("".concat(accountName, "active").concat(password)); // in case of password login
                    genPubKey = activeKey.toPublicKey().toString();
    
                    var pass_val = acc.active.key_auths.filter( key => {
                      return genPubKey == key[0];
                    });
    
                    if (pass_val.length > 0) {
                      _context4.next = 8;
                      break;
                    }
    
                    activeKey = _meta1js.PrivateKey.fromWif(password); // in case of wif private key login
                    genPubKey = activeKey.toPublicKey().toString();
    
                    var active_val = acc.active.key_auths.filter( key => { // active private key check
                      return genPubKey == key[0];
                    });
    
                    if (active_val.length > 0) {
                      _context4.next = 8;
                      break;
                    }
    
                    var owner_val = acc.owner.key_auths.filter( key => { // owner private key check
                      return genPubKey == key[0];
                    });
    
                    if (owner_val.length > 0) {
                      _context4.next = 8;
                      break;
                    }
    
                    throw new Error("The pair of login and password do not match!");
    
                  case 8:
                    account = new Meta1(accountName, activeKey.toWif(), feeSymbol);
                    account.setMemoKey((acc.options.memo_key === genPubKey ? activeKey : _meta1js.PrivateKey.fromSeed("".concat(accountName, "memo").concat(password))).toWif());
                    _context4.next = 12;
                    return account.initPromise;
    
                  case 12:
                    return _context4.abrupt("return", account);
    
                  case 13:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
      }));

      function login(_x2, _x3) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "loginFromFile",
    value: function () {
      var _loginFromFile = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(buffer, password, accountName) {
        var feeSymbol,
            backup_buffer,
            buffer_data,
            wallet,
            password_aes,
            encryption_plainbuffer,
            aes_private,
            acc,
            accKey,
            private_key_hex,
            activeKey,
            account,
            memoKey,
            _args5 = arguments;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                feeSymbol = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : Meta1.chain.core_asset;
                backup_buffer = _meta1js.Aes.decrypt_with_checksum(_meta1js.PrivateKey.fromSeed(password), _meta1js.PublicKey.fromBuffer(buffer.slice(0, 33)), null
                /*nonce*/
                , buffer.slice(33));
                buffer_data = JSON.parse(_lzmaDMin.LZMA.decompress(backup_buffer)), wallet = buffer_data.wallet[0], password_aes = _meta1js.Aes.fromSeed(password), encryption_plainbuffer = password_aes.decryptHexToBuffer(wallet.encryption_key), aes_private = _meta1js.Aes.fromSeed(encryption_plainbuffer);
                _context5.next = 5;
                return Meta1.accounts[accountName];

              case 5:
                acc = _context5.sent;
                accKey = buffer_data.private_keys.find(function (key) {
                  return key.pubkey === acc.active.key_auths[0][0];
                });

                if (accKey) {
                  _context5.next = 9;
                  break;
                }

                throw new Error("Not found active key for account ".concat(accountName));

              case 9:
                private_key_hex = aes_private.decryptHex(accKey.encrypted_key);
                activeKey = _meta1js.PrivateKey.fromBuffer(new Buffer(private_key_hex, "hex"));
                account = new Meta1(accountName, activeKey.toWif(), feeSymbol);
                if (acc.options.memo_key === acc.active.key_auths[0][0]) memoKey = activeKey;else {
                  accKey = buffer_data.private_keys.find(function (key) {
                    return key.pubkey === acc.options.memo_key;
                  });

                  if (!accKey) {
                    private_key_hex = aes_private.decryptHex(accKey.encrypted_key);
                    memoKey = _meta1js.PrivateKey.fromBuffer(new Buffer(private_key_hex, "hex"));
                  }
                }
                memoKey && account.setMemoKey(memoKey.toWif());
                _context5.next = 16;
                return account.initPromise;

              case 16:
                return _context5.abrupt("return", account);

              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function loginFromFile(_x4, _x5, _x6) {
        return _loginFromFile.apply(this, arguments);
      }

      return loginFromFile;
    }()
  }, {
    key: "ticker",
    value: function ticker(baseSymbol, quoteSymbol) {
      return Meta1.db.get_ticker(baseSymbol.toUpperCase(), quoteSymbol.toUpperCase());
    }
  }, {
    key: "tradeHistory",
    value: function () {
      var _tradeHistory = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(quoteSymbol, baseSymbol, startDate, stopDate, bucketSeconds) {
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.t0 = Meta1.history;
                _context6.next = 3;
                return Meta1.assets[quoteSymbol];

              case 3:
                _context6.t1 = _context6.sent.id;
                _context6.next = 6;
                return Meta1.assets[baseSymbol];

              case 6:
                _context6.t2 = _context6.sent.id;
                _context6.t3 = bucketSeconds;
                _context6.t4 = startDate.toISOString().slice(0, -5);
                _context6.t5 = stopDate.toISOString().slice(0, -5);
                return _context6.abrupt("return", _context6.t0.get_market_history.call(_context6.t0, _context6.t1, _context6.t2, _context6.t3, _context6.t4, _context6.t5));

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function tradeHistory(_x7, _x8, _x9, _x10, _x11) {
        return _tradeHistory.apply(this, arguments);
      }

      return tradeHistory;
    }()
  }, {
    key: "getLimitOrders",
    value: function () {
      var _getLimitOrders = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(quoteSymbol, baseSymbol) {
        var limit,
            _args7 = arguments;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                limit = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : 50;
                _context7.t0 = Meta1.db;
                _context7.next = 4;
                return Meta1.assets[quoteSymbol];

              case 4:
                _context7.t1 = _context7.sent.id;
                _context7.next = 7;
                return Meta1.assets[baseSymbol];

              case 7:
                _context7.t2 = _context7.sent.id;
                _context7.t3 = limit > 100 ? 100 : limit;
                return _context7.abrupt("return", _context7.t0.get_limit_orders.call(_context7.t0, _context7.t1, _context7.t2, _context7.t3));

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function getLimitOrders(_x12, _x13) {
        return _getLimitOrders.apply(this, arguments);
      }

      return getLimitOrders;
    }()
  }, {
    key: "getOrderBook",
    value: function () {
      var _getOrderBook = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(quoteSymbol, baseSymbol) {
        var limit,
            _args8 = arguments;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                limit = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : 50;
                _context8.t0 = Meta1.db;
                _context8.next = 4;
                return Meta1.assets[quoteSymbol];

              case 4:
                _context8.t1 = _context8.sent.id;
                _context8.next = 7;
                return Meta1.assets[baseSymbol];

              case 7:
                _context8.t2 = _context8.sent.id;
                _context8.t3 = limit > 50 ? 50 : limit;
                return _context8.abrupt("return", _context8.t0.get_order_book.call(_context8.t0, _context8.t1, _context8.t2, _context8.t3));

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function getOrderBook(_x14, _x15) {
        return _getOrderBook.apply(this, arguments);
      }

      return getOrderBook;
    }()
  }]);

  function Meta1(accountName, activeKey) {
    var _this = this;

    var _feeSymbol = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Meta1.chain.core_asset;

    (0, _classCallCheck2.default)(this, Meta1);
    (0, _defineProperty2.default)(this, "setFeeAsset", /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(feeSymbol) {
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return _this.initPromise;

              case 2:
                _context9.next = 4;
                return Meta1.assets[feeSymbol];

              case 4:
                _this.feeAsset = _context9.sent;

              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      return function (_x16) {
        return _ref.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)(this, "setMemoKey", function (memoKey) {
      _this.memoKey = _meta1js.PrivateKey.fromWif(memoKey);
    });
    (0, _defineProperty2.default)(this, "broadcast", function (tx) {
      var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [_this.activeKey];
      return tx.broadcast(keys);
    });
    (0, _defineProperty2.default)(this, "sendOperation", function (operation) {
      var tx = _this.newTx();

      tx.add(operation);
      return tx.broadcast();
    });
    (0, _defineProperty2.default)(this, "balances", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11() {
      var _len,
          args,
          _key,
          assets,
          balances,
          _args11 = arguments;

      return _regenerator.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return _this.initPromise;

            case 2:
              for (_len = _args11.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = _args11[_key];
              }

              _context11.next = 5;
              return Promise.all(args.map( /*#__PURE__*/function () {
                var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(asset) {
                  return _regenerator.default.wrap(function _callee10$(_context10) {
                    while (1) {
                      switch (_context10.prev = _context10.next) {
                        case 0:
                          _context10.next = 2;
                          return Meta1.assets[asset];

                        case 2:
                          return _context10.abrupt("return", _context10.sent.id);

                        case 3:
                        case "end":
                          return _context10.stop();
                      }
                    }
                  }, _callee10);
                }));

                return function (_x17) {
                  return _ref3.apply(this, arguments);
                };
              }()));

            case 5:
              assets = _context11.sent;
              _context11.next = 8;
              return Meta1.db.get_account_balances(_this.account.id, assets);

            case 8:
              balances = _context11.sent;
              return _context11.abrupt("return", Promise.all(balances.map(function (balance) {
                return Meta1.assets.fromParam(balance);
              })));

            case 10:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
    (0, _defineProperty2.default)(this, "buyOperation", /*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12(buySymbol, baseSymbol, amount, price) {
        var fill_or_kill,
            expire,
            buyAsset,
            baseAsset,
            buyAmount,
            sellAmount,
            params,
            _args12 = arguments;
        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                fill_or_kill = _args12.length > 4 && _args12[4] !== undefined ? _args12[4] : false;
                expire = _args12.length > 5 && _args12[5] !== undefined ? _args12[5] : "2020-02-02T02:02:02";
                _context12.next = 4;
                return _this.initPromise;

              case 4:
                _context12.next = 6;
                return Meta1.assets[buySymbol];

              case 6:
                buyAsset = _context12.sent;
                _context12.next = 9;
                return Meta1.assets[baseSymbol];

              case 9:
                baseAsset = _context12.sent;
                buyAmount = Math.floor(amount * Math.pow(10, buyAsset.precision));
                sellAmount = Math.floor((0, _bignumber.default)(amount).times(price * Math.pow(10, baseAsset.precision)).toString());

                if (!(buyAmount == 0 || sellAmount == 0)) {
                  _context12.next = 14;
                  break;
                }

                throw new Error("Amount equal 0!");

              case 14:
                params = {
                  fee: _this.feeAsset.toParam(),
                  seller: _this.account.id,
                  amount_to_sell: baseAsset.toParam(sellAmount),
                  min_to_receive: buyAsset.toParam(buyAmount),
                  expiration: expire,
                  fill_or_kill: fill_or_kill,
                  extensions: []
                };
                return _context12.abrupt("return", {
                  limit_order_create: params
                });

              case 16:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      return function (_x18, _x19, _x20, _x21) {
        return _ref4.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)(this, "buy", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13() {
      var tx,
          _args13 = arguments;
      return _regenerator.default.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.t0 = _this;
              _context13.next = 3;
              return _this.buyOperation.apply(_this, _args13);

            case 3:
              _context13.t1 = _context13.sent;
              _context13.next = 6;
              return _context13.t0.sendOperation.call(_context13.t0, _context13.t1);

            case 6:
              tx = _context13.sent;
              _context13.next = 9;
              return Meta1.db.get_objects([tx[0].trx.operation_results[0][1]]);

            case 9:
              return _context13.abrupt("return", _context13.sent[0]);

            case 10:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    })));
    (0, _defineProperty2.default)(this, "sellOperation", /*#__PURE__*/function () {
      var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee14(sellSymbol, baseSymbol, amount, price) {
        var fill_or_kill,
            expire,
            sellAsset,
            baseAsset,
            sellAmount,
            buyAmount,
            params,
            _args14 = arguments;
        return _regenerator.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                fill_or_kill = _args14.length > 4 && _args14[4] !== undefined ? _args14[4] : false;
                expire = _args14.length > 5 && _args14[5] !== undefined ? _args14[5] : "2020-02-02T02:02:02";
                _context14.next = 4;
                return _this.initPromise;

              case 4:
                _context14.next = 6;
                return Meta1.assets[sellSymbol];

              case 6:
                sellAsset = _context14.sent;
                _context14.next = 9;
                return Meta1.assets[baseSymbol];

              case 9:
                baseAsset = _context14.sent;
                sellAmount = Math.floor(amount * Math.pow(10, sellAsset.precision));
                buyAmount = Math.floor((0, _bignumber.default)(amount).times(price * Math.pow(10, baseAsset.precision)).toString());

                if (!(buyAmount == 0 || sellAmount == 0)) {
                  _context14.next = 14;
                  break;
                }

                throw new Error("Amount equal 0!");

              case 14:
                params = {
                  fee: _this.feeAsset.toParam(),
                  seller: _this.account.id,
                  amount_to_sell: sellAsset.toParam(sellAmount),
                  min_to_receive: baseAsset.toParam(buyAmount),
                  expiration: expire,
                  fill_or_kill: fill_or_kill,
                  extensions: []
                };
                return _context14.abrupt("return", {
                  limit_order_create: params
                });

              case 16:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      return function (_x22, _x23, _x24, _x25) {
        return _ref6.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)(this, "sell", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee15() {
      var tx,
          _args15 = arguments;
      return _regenerator.default.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.t0 = _this;
              _context15.next = 3;
              return _this.sellOperation.apply(_this, _args15);

            case 3:
              _context15.t1 = _context15.sent;
              _context15.next = 6;
              return _context15.t0.sendOperation.call(_context15.t0, _context15.t1);

            case 6:
              tx = _context15.sent;
              _context15.next = 9;
              return Meta1.db.get_objects([tx[0].trx.operation_results[0][1]]);

            case 9:
              return _context15.abrupt("return", _context15.sent[0]);

            case 10:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    })));
    (0, _defineProperty2.default)(this, "orders", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee16() {
      return _regenerator.default.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return _this.initPromise;

            case 2:
              _context16.next = 4;
              return Meta1.db.get_full_accounts([_this.account.id], false);

            case 4:
              return _context16.abrupt("return", _context16.sent[0][1].limit_orders);

            case 5:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    })));
    (0, _defineProperty2.default)(this, "getOrder", /*#__PURE__*/function () {
      var _ref9 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee17(id) {
        return _regenerator.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return _this.initPromise;

              case 2:
                _context17.next = 4;
                return Meta1.db.get_objects([id]);

              case 4:
                return _context17.abrupt("return", _context17.sent[0]);

              case 5:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17);
      }));

      return function (_x26) {
        return _ref9.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)(this, "cancelOrderOperation", /*#__PURE__*/function () {
      var _ref10 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee18(id) {
        var params;
        return _regenerator.default.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return _this.initPromise;

              case 2:
                params = {
                  fee: _this.feeAsset.toParam(),
                  fee_paying_account: _this.account.id,
                  order: id,
                  extensions: []
                };
                return _context18.abrupt("return", {
                  limit_order_cancel: params
                });

              case 4:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18);
      }));

      return function (_x27) {
        return _ref10.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)(this, "cancelOrder", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee19() {
      var _args19 = arguments;
      return _regenerator.default.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.t0 = _this;
              _context19.next = 3;
              return _this.cancelOrderOperation.apply(_this, _args19);

            case 3:
              _context19.t1 = _context19.sent;
              return _context19.abrupt("return", _context19.t0.sendOperation.call(_context19.t0, _context19.t1));

            case 5:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    })));
    (0, _defineProperty2.default)(this, "memo", /*#__PURE__*/function () {
      var _ref12 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee20(toName, message) {
        var nonce, to;
        return _regenerator.default.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                if (_this.memoKey) {
                  _context20.next = 2;
                  break;
                }

                throw new Error("Not set memoKey!");

              case 2:
                nonce = Date.now().toString();
                _context20.next = 5;
                return Meta1.accounts[toName];

              case 5:
                to = _context20.sent.options.memo_key;
                return _context20.abrupt("return", {
                  from: _this.memoKey.toPublicKey().toPublicKeyString(),
                  to: to,
                  nonce: nonce,
                  message: _meta1js.Aes.encrypt_with_checksum(_this.memoKey, to, nonce, new Buffer(message, "utf-8"))
                });

              case 7:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20);
      }));

      return function (_x28, _x29) {
        return _ref12.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)(this, "memoDecode", function (memos) {
      if (!_this.memoKey) throw new Error("Not set memoKey!");
      return _meta1js.Aes.decrypt_with_checksum(_this.memoKey, memos.from, memos.nonce, memos.message).toString("utf-8");
    });
    (0, _defineProperty2.default)(this, "transferOperation", /*#__PURE__*/function () {
      var _ref13 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee21(toName, assetSymbol, amount, memo) {
        var asset, intAmount, params;
        return _regenerator.default.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return _this.initPromise;

              case 2:
                _context21.next = 4;
                return Meta1.assets[assetSymbol];

              case 4:
                asset = _context21.sent;
                intAmount = Math.floor(amount * Math.pow(10, asset.precision));

                if (!(intAmount == 0)) {
                  _context21.next = 8;
                  break;
                }

                throw new Error("Amount equal 0!");

              case 8:
                _context21.t0 = _this.feeAsset.toParam();
                _context21.t1 = _this.account.id;
                _context21.next = 12;
                return Meta1.accounts[toName];

              case 12:
                _context21.t2 = _context21.sent.id;
                _context21.t3 = asset.toParam(intAmount);
                _context21.t4 = [];
                params = {
                  fee: _context21.t0,
                  from: _context21.t1,
                  to: _context21.t2,
                  amount: _context21.t3,
                  extensions: _context21.t4
                };

                if (!memo) {
                  _context21.next = 25;
                  break;
                }

                if (!(typeof memo == "string")) {
                  _context21.next = 23;
                  break;
                }

                _context21.next = 20;
                return _this.memo(toName, memo);

              case 20:
                _context21.t5 = _context21.sent;
                _context21.next = 24;
                break;

              case 23:
                _context21.t5 = memo;

              case 24:
                params.memo = _context21.t5;

              case 25:
                return _context21.abrupt("return", {
                  transfer: params
                });

              case 26:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21);
      }));

      return function (_x30, _x31, _x32, _x33) {
        return _ref13.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)(this, "transfer", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee22() {
      var _args22 = arguments;
      return _regenerator.default.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.t0 = _this;
              _context22.next = 3;
              return _this.transferOperation.apply(_this, _args22);

            case 3:
              _context22.t1 = _context22.sent;
              return _context22.abrupt("return", _context22.t0.sendOperation.call(_context22.t0, _context22.t1));

            case 5:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22);
    })));
    (0, _defineProperty2.default)(this, "assetIssueOperation", /*#__PURE__*/function () {
      var _ref15 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee23(toName, assetSymbol, amount, memo) {
        var asset, intAmount, params;
        return _regenerator.default.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.next = 2;
                return _this.initPromise;

              case 2:
                _context23.next = 4;
                return Meta1.assets[assetSymbol];

              case 4:
                asset = _context23.sent;
                intAmount = Math.floor(amount * Math.pow(10, asset.precision));

                if (!(intAmount === 0)) {
                  _context23.next = 8;
                  break;
                }

                throw new Error("Amount equal 0!");

              case 8:
                _context23.t0 = _this.feeAsset.toParam();
                _context23.t1 = _this.account.id;
                _context23.t2 = asset.toParam(intAmount);
                _context23.next = 13;
                return Meta1.accounts[toName];

              case 13:
                _context23.t3 = _context23.sent.id;
                params = {
                  fee: _context23.t0,
                  issuer: _context23.t1,
                  asset_to_issue: _context23.t2,
                  issue_to_account: _context23.t3
                };

                if (!memo) {
                  _context23.next = 24;
                  break;
                }

                if (!(typeof memo === "string")) {
                  _context23.next = 22;
                  break;
                }

                _context23.next = 19;
                return _this.memo(toName, memo);

              case 19:
                _context23.t4 = _context23.sent;
                _context23.next = 23;
                break;

              case 22:
                _context23.t4 = memo;

              case 23:
                params.memo = _context23.t4;

              case 24:
                return _context23.abrupt("return", {
                  asset_issue: params
                });

              case 25:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23);
      }));

      return function (_x34, _x35, _x36, _x37) {
        return _ref15.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)(this, "assetIssue", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee24() {
      var _args24 = arguments;
      return _regenerator.default.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              _context24.t0 = _this;
              _context24.next = 3;
              return _this.assetIssueOperation.apply(_this, _args24);

            case 3:
              _context24.t1 = _context24.sent;
              return _context24.abrupt("return", _context24.t0.sendOperation.call(_context24.t0, _context24.t1));

            case 5:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24);
    })));
    (0, _defineProperty2.default)(this, "assetReserveOperation", /*#__PURE__*/function () {
      var _ref17 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee25(assetSymbol, amount) {
        var payer, asset, intAmount, params;
        return _regenerator.default.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _context25.next = 2;
                return _this.initPromise;

              case 2:
                payer = _this.account.id;
                _context25.next = 5;
                return Meta1.assets[assetSymbol];

              case 5:
                asset = _context25.sent;
                intAmount = Math.floor(amount * Math.pow(10, asset.precision));

                if (!(intAmount === 0)) {
                  _context25.next = 9;
                  break;
                }

                throw new Error("Amount equal 0!");

              case 9:
                params = {
                  fee: _this.feeAsset.toParam(),
                  amount_to_reserve: asset.toParam(intAmount),
                  payer: payer,
                  extensions: []
                };
                return _context25.abrupt("return", {
                  asset_reserve: params
                });

              case 11:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25);
      }));

      return function (_x38, _x39) {
        return _ref17.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)(this, "assetReserve", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee26() {
      var _args26 = arguments;
      return _regenerator.default.wrap(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              _context26.t0 = _this;
              _context26.next = 3;
              return _this.assetReserveOperation.apply(_this, _args26);

            case 3:
              _context26.t1 = _context26.sent;
              return _context26.abrupt("return", _context26.t0.sendOperation.call(_context26.t0, _context26.t1));

            case 5:
            case "end":
              return _context26.stop();
          }
        }
      }, _callee26);
    })));
    if (activeKey) this.activeKey = _meta1js.PrivateKey.fromWif(activeKey);

    this.newTx = function () {
      return _transaction.default.newTx([_this.activeKey]);
    };

    this.initPromise = Promise.all([Meta1.accounts[accountName], Meta1.assets[_feeSymbol]]).then(function (params) {
      var _params = (0, _slicedToArray2.default)(params, 2);

      _this.account = _params[0];
      _this.feeAsset = _params[1];
    });
  }

  return Meta1;
}();

(0, _defineProperty2.default)(Meta1, "node", process.env.WEBSOCKET_URL ? process.env.WEBSOCKET_URL : "wss://api.meta-exchange.vision/ws");
(0, _defineProperty2.default)(Meta1, "autoreconnect", true);
(0, _defineProperty2.default)(Meta1, "logger", console);
(0, _defineProperty2.default)(Meta1, "subscribe", _event.default.subscribe);
(0, _defineProperty2.default)(Meta1, "generateKeys", _meta1js.Login.generateKeys.bind(_meta1js.Login));

_event.default.init(Meta1);

var _default = Meta1;
exports.default = _default;
