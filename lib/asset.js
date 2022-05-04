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

var Asset = /*#__PURE__*/function () {
  (0, _createClass2.default)(Asset, null, [{
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
      return /^1\.3\.\d+$/.test(name) || !isNaN(name) ? this.id(name) : this.getAsset(name);
    }
  }, {
    key: "getAsset",
    value: function () {
      var _getAsset = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_symbol) {
        var symbol, obj;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                symbol = _symbol.toUpperCase();

                if (!this.map[symbol]) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", this.map[symbol]);

              case 3:
                _context.next = 5;
                return this.db.list_assets(symbol, 1);

              case 5:
                obj = _context.sent[0];

                if (!(!obj || obj.symbol !== symbol)) {
                  _context.next = 8;
                  break;
                }

                throw new Error("Not found asset ".concat(symbol, "! Blockchain return ").concat(obj ? obj.symbol : obj));

              case 8:
                this.map[symbol] = new this(obj);
                return _context.abrupt("return", this.map[symbol]);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAsset(_x) {
        return _getAsset.apply(this, arguments);
      }

      return getAsset;
    }()
  }, {
    key: "id",
    value: function () {
      var _id2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_id) {
        var _this = this;

        var asset;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!isNaN(_id)) _id = "1.3.".concat(_id);
                asset = Object.keys(this.map).find(function (symbol) {
                  return _this.map[symbol].id == _id;
                });

                if (!asset) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", this.map[asset]);

              case 4:
                _context2.next = 6;
                return this.db.get_assets([_id]);

              case 6:
                asset = _context2.sent[0];

                if (asset) {
                  _context2.next = 9;
                  break;
                }

                throw new Error("Not found asset by id ".concat(_id, "!"));

              case 9:
                this.map[asset.symbol] = new this(asset);
                return _context2.abrupt("return", this.map[asset.symbol]);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function id(_x2) {
        return _id2.apply(this, arguments);
      }

      return id;
    }()
  }, {
    key: "fromParam",
    value: function () {
      var _fromParam = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(param) {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = param.amount;
                _context3.next = 3;
                return this.id(param.asset_id);

              case 3:
                _context3.t1 = _context3.sent;
                return _context3.abrupt("return", {
                  amount: _context3.t0,
                  asset: _context3.t1
                });

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function fromParam(_x3) {
        return _fromParam.apply(this, arguments);
      }

      return fromParam;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var _this2 = this;

        var assets;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.db.get_assets(Object.keys(this.map).map(function (symbol) {
                  return _this2.map[symbol].id;
                }));

              case 2:
                assets = _context4.sent;
                assets.forEach(function (asset) {
                  return Object.assign(_this2.map[asset.symbol], asset);
                });

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function update() {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }]);

  function Asset(rpcObj) {
    (0, _classCallCheck2.default)(this, Asset);
    Object.assign(this, rpcObj);
  }

  (0, _createClass2.default)(Asset, [{
    key: "toParam",
    value: function toParam() {
      var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return {
        amount: number,
        asset_id: this.id
      };
    }
  }, {
    key: "fee",
    value: function fee() {
      return this.options.market_fee_percent / 100 / 100;
    }
  }, {
    key: "update",
    value: function () {
      var _update2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.t0 = Object;
                _context5.t1 = this;
                _context5.next = 4;
                return Asset.db.get_assets([this.id]);

              case 4:
                _context5.t2 = _context5.sent[0];

                _context5.t0.assign.call(_context5.t0, _context5.t1, _context5.t2);

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function update() {
        return _update2.apply(this, arguments);
      }

      return update;
    }()
  }]);
  return Asset;
}();

exports.default = Asset;