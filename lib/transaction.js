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

var _meta1js = require("meta1-vision-js");

var Transaction = /*#__PURE__*/function () {
  (0, _createClass2.default)(Transaction, null, [{
    key: "newTx",
    value: function newTx(keys) {
      var tx = new Transaction(keys);
      return new Proxy(tx, tx);
    }
  }, {
    key: "setDB",
    value: function setDB(db) {
      Transaction.db = db;
    }
  }]);

  function Transaction(_keys) {
    var _this = this;

    (0, _classCallCheck2.default)(this, Transaction);
    (0, _defineProperty2.default)(this, "get", function (obj, name) {
      if (obj[name]) return obj[name];
      return function (params) {
        _this.add((0, _defineProperty2.default)({}, name, params));
      };
    });
    (0, _defineProperty2.default)(this, "add", function (operations) {
      Object.keys(operations).forEach(function (key) {
        return _this.tx.add_type_operation(key, operations[key]);
      });
    });
    (0, _defineProperty2.default)(this, "broadcast", /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(keys) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.tx.set_required_fees();

              case 2:
                (keys ? keys : _this.keys).forEach(function (key) {
                  return _this.tx.add_signer(key, key.toPublicKey().toPublicKeyString());
                });
                return _context.abrupt("return", _this.tx.broadcast());

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)(this, "cost", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
      var fees, assets;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this.tx.set_required_fees();

            case 2:
              fees = {};

              _this.tx.operations.forEach(function (op) {
                fees[op[1].fee.asset_id] = fees[op[1].fee.asset_id] || 0;
                fees[op[1].fee.asset_id] += +op[1].fee.amount;
              });

              _context2.next = 6;
              return Transaction.db.get_assets(Object.keys(fees));

            case 6:
              assets = _context2.sent;
              return _context2.abrupt("return", assets.reduce(function (obj, asset) {
                obj[asset.symbol] = fees[asset.id] / Math.pow(10, asset.precision);
                return obj;
              }, {}));

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    this.tx = new _meta1js.TransactionBuilder();
    this.keys = _keys;
  }

  return Transaction;
}();

var _default = Transaction;
exports.default = _default;