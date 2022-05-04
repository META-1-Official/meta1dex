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

var Account = /*#__PURE__*/function () {
  (0, _createClass2.default)(Account, null, [{
    key: "init",
    value: function init(db) {
      if (this.instance) return this.instance;
      this.db = db;
      this.map = {};
      this.instance = new Proxy(this, this);
      return this.instance;
    }
  }, {
    key: "get",
    value: function get(obj, name) {
      if (obj[name]) return obj[name];
      return /^1\.2\.\d+$/.test(name) || !isNaN(name) ? this.id(name) : this.getAccout(name);
    }
  }, {
    key: "getAccout",
    value: function () {
      var _getAccout = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_name) {
        var name, acc;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                name = _name.toLowerCase();

                if (!this.map[name]) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", this.map[name]);

              case 3:
                _context.next = 5;
                return this.db.get_account_by_name(name);

              case 5:
                acc = _context.sent;

                if (!(!acc || acc.name !== name)) {
                  _context.next = 8;
                  break;
                }

                throw new Error("Not found account ".concat(name, "! Blockchain return ").concat(acc ? acc.name : acc));

              case 8:
                this.map[name] = new this(acc);
                return _context.abrupt("return", this.map[name]);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAccout(_x2) {
        return _getAccout.apply(this, arguments);
      }

      return getAccout;
    }()
  }, {
    key: "id",
    value: function (_id) {
      function id(_x) {
        return _id.apply(this, arguments);
      }

      id.toString = function () {
        return _id.toString();
      };

      return id;
    }( /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(id) {
        var _this = this;

        var name, acc;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!isNaN(id)) id = "1.2.".concat(id);
                name = Object.keys(this.map).find(function (name) {
                  return _this.map[name].id == id;
                });

                if (!name) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", this.map[name]);

              case 4:
                _context2.next = 6;
                return this.db.get_accounts([id]);

              case 6:
                acc = _context2.sent[0];

                if (acc) {
                  _context2.next = 9;
                  break;
                }

                throw new Error("Not found account by id ".concat(id, "!"));

              case 9:
                this.map[acc.name] = new this(acc);
                return _context2.abrupt("return", this.map[acc.name]);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x3) {
        return _ref.apply(this, arguments);
      };
    }())
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var _this2 = this;

        var allData;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.db.get_accounts(Object.keys(this.map).map(function (name) {
                  return _this2.map[name].id;
                }));

              case 2:
                allData = _context3.sent;
                allData.forEach(function (rpcData) {
                  return Object.assign(_this2.map[rpcData.name], rpcData);
                });

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function update() {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }]);

  function Account(rpcObj) {
    (0, _classCallCheck2.default)(this, Account);
    Object.assign(this, rpcObj);
  }

  (0, _createClass2.default)(Account, [{
    key: "update",
    value: function () {
      var _update2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.t0 = Object;
                _context4.t1 = this;
                _context4.next = 4;
                return Account.db.get_accounts([id]);

              case 4:
                _context4.t2 = _context4.sent[0];

                _context4.t0.assign.call(_context4.t0, _context4.t1, _context4.t2);

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function update() {
        return _update2.apply(this, arguments);
      }

      return update;
    }()
  }]);
  return Account;
}();

exports.default = Account;