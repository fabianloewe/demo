"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncIterator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncIterator"));

var _lib = require("lib");

var _itPipe = _interopRequireDefault(require("it-pipe"));

var _itLengthPrefixed = _interopRequireDefault(require("it-length-prefixed"));

var _streamingIterables = require("streaming-iterables");

var _itBuffer = _interopRequireDefault(require("it-buffer"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * The decoder function for GraphData.
 *
 * @param answer
 * @returns {null|GraphData}
 */
function decodeGraphData(answer) {
  var isGraphData = function isGraphData() {
    return answer.data.type_url.includes("demo.protocol.GraphData");
  };

  if (answer.type !== "graph" && !isGraphData()) return null;else return _lib.demo.protocol.GraphData.decode(answer.data.value);
}

var QueryProtocol = /*#__PURE__*/function () {
  /**
   * Protocol identifier for sending for libp2p.
   *
   * @type {string}
   */

  /**
   * Protocol identifier for sending for libp2p.
   *
   * @type {string}
   */

  /**
   * Default decoders for data field of Answer messages.
   *
   * A decoder must return null if it cannot decode the data field.
   * Otherwise it must return the decoded data.
   *
   * @type {[function(Answer): (null|*)]}
   */

  /**
   * Creates a new QueryProtocol instance which send Query messages and receive Answer messages.
   *
   * In this demo only GraphData is supported so no custom decoders will be added.
   *
   * @param stream The stream to send messages to and receive messages from.
   * @param customDataDecoders {[function(Answer): (null|*)]} Custom data decoders which get appended to the default data decoders.
   */
  function QueryProtocol(stream) {
    var _this = this;

    var customDataDecoders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    (0, _classCallCheck2["default"])(this, QueryProtocol);
    (0, _defineProperty2["default"])(this, "query", /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryObject) {
        var query;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("Sending query...");
                query = _lib.demo.protocol.Query.encode(queryObject).finish();
                return _context.abrupt("return", (0, _itPipe["default"])( // Pipe the query message
                [query], // Prefix it with its length
                _itLengthPrefixed["default"].encode(), // The stream sends it
                _this.stream.sink));

              case 3:
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
    (0, _defineProperty2["default"])(this, "awaitAnswer", function () {
      return new Promise(function (resolve, reject) {
        var decodeAnswer = /*#__PURE__*/function () {
          var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(source) {
            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, message, answer, data;

            return _regenerator["default"].wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _context2.prev = 2;
                    _iterator = (0, _asyncIterator2["default"])(source);

                  case 4:
                    _context2.next = 6;
                    return _iterator.next();

                  case 6:
                    _step = _context2.sent;
                    _iteratorNormalCompletion = _step.done;
                    _context2.next = 10;
                    return _step.value;

                  case 10:
                    _value = _context2.sent;

                    if (_iteratorNormalCompletion) {
                      _context2.next = 21;
                      break;
                    }

                    message = _value;
                    // Decode answer
                    answer = _lib.demo.protocol.Answer.decode(message); // Decode data field in answer because this isn't handled by protobuf.js

                    data = _this.decodeData(answer); // Create a copy of the answer because the decoded data gets assigned

                    answer = Object.assign({}, {
                      type: answer.type,
                      data: data.toJSON()
                    });
                    console.log("Got answer:", answer);
                    resolve(answer);

                  case 18:
                    _iteratorNormalCompletion = true;
                    _context2.next = 4;
                    break;

                  case 21:
                    _context2.next = 27;
                    break;

                  case 23:
                    _context2.prev = 23;
                    _context2.t0 = _context2["catch"](2);
                    _didIteratorError = true;
                    _iteratorError = _context2.t0;

                  case 27:
                    _context2.prev = 27;
                    _context2.prev = 28;

                    if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
                      _context2.next = 32;
                      break;
                    }

                    _context2.next = 32;
                    return _iterator["return"]();

                  case 32:
                    _context2.prev = 32;

                    if (!_didIteratorError) {
                      _context2.next = 35;
                      break;
                    }

                    throw _iteratorError;

                  case 35:
                    return _context2.finish(32);

                  case 36:
                    return _context2.finish(27);

                  case 37:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, null, [[2, 23, 27, 37], [28,, 32, 36]]);
          }));

          return function decodeAnswer(_x2) {
            return _ref2.apply(this, arguments);
          };
        }();

        console.log("Awaiting answer...");

        try {
          (0, _itPipe["default"])( // Read from stream
          _this.stream.source, // Read the prefixed message length
          _itLengthPrefixed["default"].decode(), (0, _streamingIterables.take)(1), // Convert the bytes to a Buffer
          _itBuffer["default"], // Decode the message expecting an Answer message
          decodeAnswer);
        } catch (e) {
          reject(e);
        }
      });
    });
    this.stream = stream;
    this.dataDecoders = [].concat((0, _toConsumableArray2["default"])(QueryProtocol.defaultDataDecoders), (0, _toConsumableArray2["default"])(customDataDecoders));
  }
  /**
   * Transforms the query object into its Protocol Buffers equivalent (Query.proto) and
   * sends it to the connected peer.
   *
   * @param queryObject
   */


  (0, _createClass2["default"])(QueryProtocol, [{
    key: "decodeData",

    /**
     * Decodes the data field of an Answer message.
     *
     * @param answer The answer message
     * @returns The decoded data
     */
    value: function decodeData(answer) {
      var _iterator2 = _createForOfIteratorHelper(this.dataDecoders),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var decoder = _step2.value;
          var data = decoder(answer); // Return once one decoder has been able to decode the data

          if (data !== null) return data;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
    /**
     * Awaits an Answer message.
     *
     * Before calling this method the query method should be called.
     * Otherwise no Answer message will be received because nothing has been queried.
     *
     * @returns {Promise<object>} A promise resolving to the JSON representation of an Answer message once it arrived.
     */

  }]);
  return QueryProtocol;
}();

exports["default"] = QueryProtocol;
(0, _defineProperty2["default"])(QueryProtocol, "SEND_ID", "/demo/query/send/1.0.0");
(0, _defineProperty2["default"])(QueryProtocol, "RESPOND_ID", "/demo/query/respond/1.0.0");
(0, _defineProperty2["default"])(QueryProtocol, "defaultDataDecoders", [decodeGraphData]);
//# sourceMappingURL=QueryProtocol.js.map