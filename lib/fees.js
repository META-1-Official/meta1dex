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

var _bignumber = _interopRequireDefault(require("bignumber.js"));

//https://github.com/Meta1/Meta1-core/blob/master/libraries/chain/include/graphene/chain/protocol/operations.hpp#L44-L97
var _operations = ["transfer", "limit_order_create", "limit_order_cancel", "call_order_update", "fill_order", // VIRTUAL
"account_create", "account_update", "account_whitelist", "account_upgrade", "account_transfer", "asset_create", "asset_update", "asset_update_bitasset", "asset_update_feed_producers", "asset_issue", "asset_reserve", "asset_fund_fee_pool", "asset_settle", "asset_global_settle", "asset_publish_feed", "witness_create", "witness_update", "proposal_create", "proposal_update", "proposal_delete", "withdraw_permission_create", "withdraw_permission_update", "withdraw_permission_claim", "withdraw_permission_delete", "committee_member_create", "committee_member_update", "committee_member_update_global_parameters", "vesting_balance_create", "vesting_balance_withdraw", "worker_create", "custom", "assert", "balance_claim", "override_transfer", "transfer_to_blind", "blind_transfer", "transfer_from_blind", "asset_settle_cancel", // VIRTUAL
"asset_claim_fees", "fba_distribute", // VIRTUAL
"bid_collateral", "execute_bid"];

var Fees = /*#__PURE__*/function () {
  function Fees() {
    (0, _classCallCheck2.default)(this, Fees);
  }

  (0, _createClass2.default)(Fees, [{
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _this = this;

        var obj;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Fees.db.get_global_properties();

              case 2:
                obj = _context.sent.parameters.current_fees;
                obj.parameters.forEach(function (param, index) {
                  _this[_operations[index]] = param[1].fee ? Number((0, _bignumber.default)(param[1].fee).div(Math.pow(10, 5)).toString()) : param[1];
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function update() {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "operations",
    value: function operations(index) {
      if (index) return _operations[index];else return _operations;
    }
  }], [{
    key: "init",
    value: function init(db) {
      this.db = db;
      if (this.instance) return this.instance;
      this.instance = new this();
      return this.instance;
    }
  }]);
  return Fees;
}();

exports.default = Fees;