"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _QueryProtocol = _interopRequireDefault(require("../protocol/QueryProtocol"));

var Deferred = function Deferred() {
  var _this = this;

  (0, _classCallCheck2["default"])(this, Deferred);
  this.promise = new Promise(function (resolve, reject) {
    _this.reject = reject;
    _this.resolve = resolve;
  });
};

var QueryHandler = function QueryHandler(host, dbInfo) {
  var _this2 = this;

  (0, _classCallCheck2["default"])(this, QueryHandler);
  (0, _defineProperty2["default"])(this, "handleIncomingProtocol", function (_ref) {
    var stream = _ref.stream;
    console.log("Established new Query protocol connection...");
    var queryProtocol = new _QueryProtocol["default"](stream); // Await answer and store it in this.answer

    queryProtocol.awaitAnswer().then(function (answer) {
      return _this2.answer.resolve(answer);
    })["catch"](function (error) {
      return _this2.answer.reject(error);
    });
    console.log("Got answer");
  });
  (0, _defineProperty2["default"])(this, "handleQueryRequest", /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var protocolIds, _yield$_this2$host$di, stream, queryProtocol, answer;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // Establish query protocol
              protocolIds = [_QueryProtocol["default"].SEND_ID, _QueryProtocol["default"].RESPOND_ID];
              _context.next = 3;
              return _this2.host.dialProtocol(_this2.dbInfo.listenAddresses[0], protocolIds);

            case 3:
              _yield$_this2$host$di = _context.sent;
              stream = _yield$_this2$host$di.stream;
              queryProtocol = new _QueryProtocol["default"](stream); // Send query

              _context.next = 8;
              return queryProtocol.query(req.body);

            case 8:
              _context.next = 10;
              return _this2.answer.promise;

            case 10:
              answer = _context.sent;
              // Reset answer
              _this2.answer = new Deferred(); // Send answer as JSON to browser

              return _context.abrupt("return", res.status(200).json(answer).end());

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
  this.host = host;
  this.dbInfo = dbInfo;
  this.answer = new Deferred();
}
/**
 * Handle incoming stream with QueryProtocol.
 *
 * @param stream Incoming stream
 */
;

exports["default"] = QueryHandler;
//# sourceMappingURL=QueryHandler.js.map