"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _url = require("url");

var _fs = require("fs");

var _util = require("util");

var _next = _interopRequireDefault(require("next"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _commander = require("commander");

var _PeerService = _interopRequireDefault(require("../PeerService"));

var _QueryProtocol = _interopRequireDefault(require("../protocol/QueryProtocol"));

var _QueryHandler = _interopRequireDefault(require("./QueryHandler"));

var readFileAsync = (0, _util.promisify)(_fs.readFile);
var dev = process.env.NODE_ENV !== 'production';
var app = (0, _next["default"])({
  dev: dev
});
var handle = app.getRequestHandler();
var peer;

_commander.program.requiredOption("-i --info-json <path>", "Path to a peer-describing JSON info file", String);

_commander.program.parse(process.argv);

function readDbInfoFile() {
  return _readDbInfoFile.apply(this, arguments);
}

function _readDbInfoFile() {
  _readDbInfoFile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return readFileAsync(_commander.program.infoJson);

          case 2:
            data = _context.sent;
            return _context.abrupt("return", JSON.parse(data.toString()));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _readDbInfoFile.apply(this, arguments);
}

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var dbInfo, config, host, peerId, addresses, queryHandler, webServer;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return readDbInfoFile();

          case 2:
            dbInfo = _context2.sent;
            config = {
              bootstrapPeers: dbInfo.listenAddresses
            }; // Start peer service

            peer = new _PeerService["default"](config);
            _context2.next = 7;
            return peer.start();

          case 7:
            _context2.next = 9;
            return peer.host;

          case 9:
            host = _context2.sent;
            peerId = host.peerId.toB58String();
            addresses = host.transportManager.getAddrs().map(function (addr) {
              return "".concat(addr, "/p2p/").concat(peerId);
            });
            console.log("Started peer service");
            console.log("Listening on addresses:", addresses);
            queryHandler = new _QueryHandler["default"](host, dbInfo); // Handle incoming Answer messages

            host.handle(_QueryProtocol["default"].RESPOND_ID, queryHandler.handleIncomingProtocol); // Set up web server

            _context2.next = 18;
            return app.prepare();

          case 18:
            webServer = (0, _express["default"])(); // Automatically parse POST data as JSON when Content-Type header is set to application/json

            webServer.use(_bodyParser["default"].json()); // Handle chunks manually as Next.js seems to be buggy at this point.

            webServer.use("/_next/static/chunks", _express["default"]["static"](".next/static/chunks")); // Register REST API route receiving queries from browser

            webServer.post("/api/query", queryHandler.handleQueryRequest); // Let Next.js handle other requests

            webServer.get("*", handle); // Begin listening on port 3000 for HTTP connections

            webServer.listen(3000, function (err) {
              if (err) throw err;
              console.log('> Web server ready on http://localhost:3000');
            });

          case 24:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _main.apply(this, arguments);
}

main();
//# sourceMappingURL=index.js.map