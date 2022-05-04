"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var Event = /*#__PURE__*/function () {
  (0, _createClass2.default)(Event, null, [{
    key: "init",
    value: function init(bts) {
      this.bts = bts;
      this.connected = new this(bts.connect);
      this.block = new this(this.connected.subscribe, this.subscribeBlock.bind(this));
      this.bindAccount = this.subscribeAccount.bind(this);
      this.account = new this(this.block.subscribe, this.bindAccount); //this.market = new this(this.connected.subscribe.bind(this.connected))
    }
  }, {
    key: "connectedNotify",
    value: function connectedNotify() {
      this.connected.init = true;
      if (!this.connected.map.all) this.connected.map.all = {
        subs: new Set([undefined]),
        events: [undefined]
      };else this.connected.map.all.events.push(undefined);
      this.connected.notify();
    }
  }, {
    key: "resubscribe",
    value: function () {
      var _resubscribe = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.subscribeBlock();

              case 2:
                this.account.newSubs = Object.keys(this.account.map);
                _context.next = 5;
                return this.subscribeAccount();

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function resubscribe() {
        return _resubscribe.apply(this, arguments);
      }

      return resubscribe;
    }()
  }, {
    key: "subscribeBlock",
    value: function () {
      var _subscribeBlock = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.bts.db.set_subscribe_callback(this.getUpdate.bind(this), false);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function subscribeBlock() {
        return _subscribeBlock.apply(this, arguments);
      }

      return subscribeBlock;
    }()
  }, {
    key: "subscribeAccount",
    value: function () {
      var _subscribeAccount = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var _this = this;

        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(this.account.newSubs.length == 0)) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return");

              case 2:
                _context4.next = 4;
                return this.bts.db.get_full_accounts(this.account.newSubs, true);

              case 4:
                this.account.newSubs = [];
                this.block.unsubscribe(this.bindAccount);
                Object.keys(this.account.map).forEach( /*#__PURE__*/function () {
                  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(accName) {
                    var obj;
                    return _regenerator.default.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            obj = _this.account.map[accName];

                            if (obj.id) {
                              _context3.next = 5;
                              break;
                            }

                            _context3.next = 4;
                            return _this.bts.accounts[accName];

                          case 4:
                            obj.id = _context3.sent.id;

                          case 5:
                            if (obj.history) {
                              _context3.next = 9;
                              break;
                            }

                            _context3.next = 8;
                            return _this.bts.history.get_account_history(obj.id, "1.11.0", 1, "1.11.0");

                          case 8:
                            obj.history = _context3.sent[0].id;

                          case 9:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }());

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function subscribeAccount() {
        return _subscribeAccount.apply(this, arguments);
      }

      return subscribeAccount;
    }()
  }, {
    key: "subscribe",
    value: function subscribe(event, callback, accName) {
      if (!Event[event]) throw new Error("Event ".concat(event, " not found"));

      if (event == 'account') {
        Event[event].subscribe(callback, accName);
      } else Event[event].subscribe(callback);
    }
  }, {
    key: "getUpdate",
    value: function getUpdate(updates) {
      var _this2 = this;

      this.block.map.all.events = [];
      var ids = Object.keys(this.account.map).map(function (accName) {
        return _this2.account.map[accName].id;
      }).filter(function (el) {
        return el;
      });
      var updateAcc = new Set();
      updates.forEach(function (array) {
        return array.forEach(function (obj) {
          if (obj.id) {
            if (obj.id == '2.1.0') _this2.block.map.all.events.push(obj);else if (/^2\.5\./.test(obj.id) && ids.includes(obj.owner)) updateAcc.add(obj.owner);
          }
        });
      });
      this.block.notify();
      if (updateAcc.size > 0) this.updateAccounts(updateAcc);
    }
  }, {
    key: "updateAccounts",
    value: function () {
      var _updateAccounts = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(ids) {
        var updateAcc, _iterator, _step, id, name, acc;

        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                updateAcc = new Set();
                _iterator = _createForOfIteratorHelper(ids);
                _context5.prev = 2;

                _iterator.s();

              case 4:
                if ((_step = _iterator.n()).done) {
                  _context5.next = 18;
                  break;
                }

                id = _step.value;
                _context5.next = 8;
                return this.bts.accounts.id(id);

              case 8:
                name = _context5.sent.name;
                acc = this.account.map[name];
                if (!acc.history) acc.history = "1.11.0";
                _context5.next = 13;
                return this.bts.history.get_account_history(id, acc.history, 100, "1.11.0");

              case 13:
                acc.events = _context5.sent;
                acc.history = acc.events[0].id;
                updateAcc.add(name);

              case 16:
                _context5.next = 4;
                break;

              case 18:
                _context5.next = 23;
                break;

              case 20:
                _context5.prev = 20;
                _context5.t0 = _context5["catch"](2);

                _iterator.e(_context5.t0);

              case 23:
                _context5.prev = 23;

                _iterator.f();

                return _context5.finish(23);

              case 26:
                this.account.notify(updateAcc);

              case 27:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 20, 23, 26]]);
      }));

      function updateAccounts(_x2) {
        return _updateAccounts.apply(this, arguments);
      }

      return updateAccounts;
    }()
  }]);

  function Event(subFunc, notifyFunc) {
    var _this3 = this;

    (0, _classCallCheck2.default)(this, Event);
    (0, _defineProperty2.default)(this, "subscribe", /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(callback, accName) {
        var handler;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                accName = accName || 'all';
                handler = _this3.map[accName];

                if (!handler) {
                  _this3.newSubs.push(accName);

                  _this3.map[accName] = handler = {
                    subs: new Set(),
                    events: []
                  };
                  if (_this3.subFunc) _this3.subFunc(_this3.notifyFunc);
                }

                handler.subs.add(callback);
                if (_this3.init && callback) callback();

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)(this, "unsubscribe", function (callback, accName) {
      accName = accName || 'all';
      var handler = _this3.map[accName];
      if (!handler) throw new Error("Error when unsubscribe: handler ".concat(accName, " not found"));
      handler.subs.delete(callback);
    });
    (0, _defineProperty2.default)(this, "notify", function (keys) {
      (keys ? keys : Object.keys(_this3.map)).forEach(function (accName) {
        var handler = _this3.map[accName];
        handler.subs.forEach( /*#__PURE__*/function () {
          var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(sub) {
            return _regenerator.default.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    if (sub && handler.events.length != 0) sub(handler.events);

                  case 1:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7);
          }));

          return function (_x5) {
            return _ref3.apply(this, arguments);
          };
        }());
      });
    });
    this.init = false;
    this.subFunc = subFunc;
    this.notifyFunc = notifyFunc;
    this.map = {};
    this.newSubs = [];
  }

  return Event;
}();

exports.default = Event;