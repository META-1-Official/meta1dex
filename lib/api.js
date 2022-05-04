"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _meta1jsWs = require("meta1js-ws");

var Api = /*#__PURE__*/function () {
  (0, _createClass2.default)(Api, null, [{
    key: "new",
    value: function _new(api) {
      return new Proxy(_meta1jsWs.Apis, new Api(api));
    }
  }, {
    key: "getApis",
    value: function getApis() {
      return _meta1jsWs.Apis;
    }
  }]);

  function Api(api) {
    (0, _classCallCheck2.default)(this, Api);
    this.api = api;
  }

  (0, _createClass2.default)(Api, [{
    key: "get",
    value: function get(apis, name) {
      var api = this.api;
      return function () {
        //console.log(`api call: ${name}(${[...arguments]})`)
        return apis.instance()[api]().exec(name, Array.prototype.slice.call(arguments));
      };
    }
  }]);
  return Api;
}();

exports.default = Api;