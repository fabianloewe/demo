"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _libp2p = _interopRequireDefault(require("libp2p"));

var _libp2pTcp = _interopRequireDefault(require("libp2p-tcp"));

var _libp2pSecio = _interopRequireDefault(require("libp2p-secio"));

var _libp2pMplex = _interopRequireDefault(require("libp2p-mplex"));

var _libp2pBootstrap = _interopRequireDefault(require("libp2p-bootstrap"));

var _QueryProtocol = _interopRequireDefault(require("./protocol/QueryProtocol"));

/**
 * The JavaScript implementation of the PeerService
 */
var PeerService = /*#__PURE__*/function () {
  /**
   * Initializes this service with the provided config.
   *
   * @param config A configuration object similar to the PeerConfig class
   */
  function PeerService(config) {
    (0, _classCallCheck2["default"])(this, PeerService);
    this.config = config;
    this.host = this.createHost();
  }
  /**
   * Creates a new libp2p instance based on the config.
   *
   * @returns {Promise<Libp2p>} A promise resolving to libp2p instance.
   */


  (0, _createClass2["default"])(PeerService, [{
    key: "createHost",
    value: function () {
      var _createHost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _libp2p["default"].create({
                  addresses: {
                    listen: this.config.listenAddresses
                  },
                  modules: {
                    transport: [_libp2pTcp["default"]],
                    connEncryption: [_libp2pSecio["default"]],
                    streamMuxer: [_libp2pMplex["default"]],
                    peerDiscovery: [_libp2pBootstrap["default"]]
                  },
                  config: {
                    relay: {
                      // Circuit Relay options (this config is part of libp2p core configurations)
                      enabled: true,
                      // Allows you to dial and accept relayed connections. Does not make you a relay.
                      hop: {
                        enabled: true,
                        // Allows you to be a relay for other peers
                        active: true // You will attempt to dial destination peers if you are not connected to them

                      }
                    },
                    peerDiscovery: {
                      autoDial: false,
                      // Auto connect to discovered peers (limited by ConnectionManager minConnections)
                      // The `tag` property will be searched when creating the instance of your Peer Discovery service.
                      // The associated object, will be passed to the service when it is instantiated.
                      bootstrap: {
                        enabled: true,
                        interval: 60e3,
                        list: this.config.bootstrapPeers // provide array of multiaddrs

                      }
                    }
                  }
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createHost() {
        return _createHost.apply(this, arguments);
      }

      return createHost;
    }()
    /**
     * Starts this service.
     *
     * @returns {Promise<*>} A promise signaling when the service is started.
     */

  }, {
    key: "start",
    value: function () {
      var _start = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var _this = this;

        var connectToPeers,
            host,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                connectToPeers = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : true;
                console.log("Starting service with config:", this.config);
                _context2.next = 4;
                return this.host;

              case 4:
                host = _context2.sent;
                host.on('peer:discovery', function (peerId) {
                  console.log('Discovered:', peerId.toB58String()); // Log discovered peer
                });
                host.connectionManager.on('peer:connect', function (conn) {
                  console.log('Received connection from:', conn.remotePeer.toB58String()); // Log connected peer
                });
                return _context2.abrupt("return", host.start().then(function () {
                  if (connectToPeers) _this.connectToPeers();
                }));

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function start() {
        return _start.apply(this, arguments);
      }

      return start;
    }()
    /**
     * Stops this service.
     *
     * @returns {Promise<*>} A promise signaling when the service is stopped.
     */

  }, {
    key: "stop",
    value: function () {
      var _stop = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log("Stopping service..");
                _context3.next = 3;
                return this.host;

              case 3:
                return _context3.abrupt("return", _context3.sent.stop());

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function stop() {
        return _stop.apply(this, arguments);
      }

      return stop;
    }()
    /**
     * Connects to all bootstrap peers.
     *
     * @returns {Promise<stream[]>} A promise containing an array of one stream per connected peer.
     */

  }, {
    key: "connectToPeers",
    value: function () {
      var _connectToPeers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        var host, dialPeer, circuitPeers, streamPromises;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.host;

              case 2:
                host = _context6.sent;

                dialPeer = /*#__PURE__*/function () {
                  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(peer) {
                    var conn;
                    return _regenerator["default"].wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            console.log("Connecting to peer:", peer);
                            _context4.next = 3;
                            return host.dial(peer);

                          case 3:
                            conn = _context4.sent;
                            console.log("Connection established");
                            return _context4.abrupt("return", conn.stream);

                          case 6:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));

                  return function dialPeer(_x) {
                    return _ref.apply(this, arguments);
                  };
                }();

                circuitPeers = this.config.bootstrapPeers.filter(function (peer) {
                  return peer.includes("/p2p-circuit/");
                });
                streamPromises = this.config.bootstrapPeers.filter(function (peer) {
                  return !peer.includes("/p2p-circuit/");
                }).map(dialPeer);
                return _context6.abrupt("return", Promise.all(streamPromises).then( /*#__PURE__*/function () {
                  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(streams) {
                    var circuitStreams;
                    return _regenerator["default"].wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            _context5.next = 2;
                            return Promise.all(circuitPeers.map(dialPeer));

                          case 2:
                            circuitStreams = _context5.sent;
                            return _context5.abrupt("return", streams.concat(circuitStreams));

                          case 4:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _callee5);
                  }));

                  return function (_x2) {
                    return _ref2.apply(this, arguments);
                  };
                }()));

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function connectToPeers() {
        return _connectToPeers.apply(this, arguments);
      }

      return connectToPeers;
    }()
  }]);
  return PeerService;
}();

exports["default"] = PeerService;
//# sourceMappingURL=PeerService.js.map