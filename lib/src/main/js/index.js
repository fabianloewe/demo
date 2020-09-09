/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.demo = (function() {

    /**
     * Namespace demo.
     * @exports demo
     * @namespace
     */
    var demo = {};

    demo.protocol = (function() {

        /**
         * Namespace protocol.
         * @memberof demo
         * @namespace
         */
        var protocol = {};

        protocol.Answer = (function() {

            /**
             * Properties of an Answer.
             * @memberof demo.protocol
             * @interface IAnswer
             * @property {string|null} [type] Answer type
             * @property {google.protobuf.IAny|null} [data] Answer data
             */

            /**
             * Constructs a new Answer.
             * @memberof demo.protocol
             * @classdesc Represents an Answer.
             * @implements IAnswer
             * @constructor
             * @param {demo.protocol.IAnswer=} [properties] Properties to set
             */
            function Answer(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Answer type.
             * @member {string} type
             * @memberof demo.protocol.Answer
             * @instance
             */
            Answer.prototype.type = "";

            /**
             * Answer data.
             * @member {google.protobuf.IAny|null|undefined} data
             * @memberof demo.protocol.Answer
             * @instance
             */
            Answer.prototype.data = null;

            /**
             * Creates a new Answer instance using the specified properties.
             * @function create
             * @memberof demo.protocol.Answer
             * @static
             * @param {demo.protocol.IAnswer=} [properties] Properties to set
             * @returns {demo.protocol.Answer} Answer instance
             */
            Answer.create = function create(properties) {
                return new Answer(properties);
            };

            /**
             * Encodes the specified Answer message. Does not implicitly {@link demo.protocol.Answer.verify|verify} messages.
             * @function encode
             * @memberof demo.protocol.Answer
             * @static
             * @param {demo.protocol.IAnswer} message Answer message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Answer.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.type);
                if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                    $root.google.protobuf.Any.encode(message.data, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Answer message, length delimited. Does not implicitly {@link demo.protocol.Answer.verify|verify} messages.
             * @function encodeDelimited
             * @memberof demo.protocol.Answer
             * @static
             * @param {demo.protocol.IAnswer} message Answer message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Answer.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Answer message from the specified reader or buffer.
             * @function decode
             * @memberof demo.protocol.Answer
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {demo.protocol.Answer} Answer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Answer.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.demo.protocol.Answer();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.type = reader.string();
                        break;
                    case 2:
                        message.data = $root.google.protobuf.Any.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Answer message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof demo.protocol.Answer
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {demo.protocol.Answer} Answer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Answer.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Answer message.
             * @function verify
             * @memberof demo.protocol.Answer
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Answer.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    if (!$util.isString(message.type))
                        return "type: string expected";
                if (message.data != null && message.hasOwnProperty("data")) {
                    var error = $root.google.protobuf.Any.verify(message.data);
                    if (error)
                        return "data." + error;
                }
                return null;
            };

            /**
             * Creates an Answer message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof demo.protocol.Answer
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {demo.protocol.Answer} Answer
             */
            Answer.fromObject = function fromObject(object) {
                if (object instanceof $root.demo.protocol.Answer)
                    return object;
                var message = new $root.demo.protocol.Answer();
                if (object.type != null)
                    message.type = String(object.type);
                if (object.data != null) {
                    if (typeof object.data !== "object")
                        throw TypeError(".demo.protocol.Answer.data: object expected");
                    message.data = $root.google.protobuf.Any.fromObject(object.data);
                }
                return message;
            };

            /**
             * Creates a plain object from an Answer message. Also converts values to other types if specified.
             * @function toObject
             * @memberof demo.protocol.Answer
             * @static
             * @param {demo.protocol.Answer} message Answer
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Answer.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.type = "";
                    object.data = null;
                }
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = message.type;
                if (message.data != null && message.hasOwnProperty("data"))
                    object.data = $root.google.protobuf.Any.toObject(message.data, options);
                return object;
            };

            /**
             * Converts this Answer to JSON.
             * @function toJSON
             * @memberof demo.protocol.Answer
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Answer.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Answer;
        })();

        protocol.Vertex = (function() {

            /**
             * Properties of a Vertex.
             * @memberof demo.protocol
             * @interface IVertex
             * @property {Uint8Array|null} [id] Vertex id
             * @property {Object.<string,string>|null} [properties] Vertex properties
             * @property {Array.<string>|null} [labels] Vertex labels
             */

            /**
             * Constructs a new Vertex.
             * @memberof demo.protocol
             * @classdesc Represents a Vertex.
             * @implements IVertex
             * @constructor
             * @param {demo.protocol.IVertex=} [properties] Properties to set
             */
            function Vertex(properties) {
                this.properties = {};
                this.labels = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Vertex id.
             * @member {Uint8Array} id
             * @memberof demo.protocol.Vertex
             * @instance
             */
            Vertex.prototype.id = $util.newBuffer([]);

            /**
             * Vertex properties.
             * @member {Object.<string,string>} properties
             * @memberof demo.protocol.Vertex
             * @instance
             */
            Vertex.prototype.properties = $util.emptyObject;

            /**
             * Vertex labels.
             * @member {Array.<string>} labels
             * @memberof demo.protocol.Vertex
             * @instance
             */
            Vertex.prototype.labels = $util.emptyArray;

            /**
             * Creates a new Vertex instance using the specified properties.
             * @function create
             * @memberof demo.protocol.Vertex
             * @static
             * @param {demo.protocol.IVertex=} [properties] Properties to set
             * @returns {demo.protocol.Vertex} Vertex instance
             */
            Vertex.create = function create(properties) {
                return new Vertex(properties);
            };

            /**
             * Encodes the specified Vertex message. Does not implicitly {@link demo.protocol.Vertex.verify|verify} messages.
             * @function encode
             * @memberof demo.protocol.Vertex
             * @static
             * @param {demo.protocol.IVertex} message Vertex message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Vertex.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.id);
                if (message.properties != null && Object.hasOwnProperty.call(message, "properties"))
                    for (var keys = Object.keys(message.properties), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.properties[keys[i]]).ldelim();
                if (message.labels != null && message.labels.length)
                    for (var i = 0; i < message.labels.length; ++i)
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.labels[i]);
                return writer;
            };

            /**
             * Encodes the specified Vertex message, length delimited. Does not implicitly {@link demo.protocol.Vertex.verify|verify} messages.
             * @function encodeDelimited
             * @memberof demo.protocol.Vertex
             * @static
             * @param {demo.protocol.IVertex} message Vertex message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Vertex.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Vertex message from the specified reader or buffer.
             * @function decode
             * @memberof demo.protocol.Vertex
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {demo.protocol.Vertex} Vertex
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Vertex.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.demo.protocol.Vertex(), key, value;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.bytes();
                        break;
                    case 2:
                        if (message.properties === $util.emptyObject)
                            message.properties = {};
                        var end2 = reader.uint32() + reader.pos;
                        key = "";
                        value = "";
                        while (reader.pos < end2) {
                            var tag2 = reader.uint32();
                            switch (tag2 >>> 3) {
                            case 1:
                                key = reader.string();
                                break;
                            case 2:
                                value = reader.string();
                                break;
                            default:
                                reader.skipType(tag2 & 7);
                                break;
                            }
                        }
                        message.properties[key] = value;
                        break;
                    case 3:
                        if (!(message.labels && message.labels.length))
                            message.labels = [];
                        message.labels.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Vertex message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof demo.protocol.Vertex
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {demo.protocol.Vertex} Vertex
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Vertex.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Vertex message.
             * @function verify
             * @memberof demo.protocol.Vertex
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Vertex.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!(message.id && typeof message.id.length === "number" || $util.isString(message.id)))
                        return "id: buffer expected";
                if (message.properties != null && message.hasOwnProperty("properties")) {
                    if (!$util.isObject(message.properties))
                        return "properties: object expected";
                    var key = Object.keys(message.properties);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.properties[key[i]]))
                            return "properties: string{k:string} expected";
                }
                if (message.labels != null && message.hasOwnProperty("labels")) {
                    if (!Array.isArray(message.labels))
                        return "labels: array expected";
                    for (var i = 0; i < message.labels.length; ++i)
                        if (!$util.isString(message.labels[i]))
                            return "labels: string[] expected";
                }
                return null;
            };

            /**
             * Creates a Vertex message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof demo.protocol.Vertex
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {demo.protocol.Vertex} Vertex
             */
            Vertex.fromObject = function fromObject(object) {
                if (object instanceof $root.demo.protocol.Vertex)
                    return object;
                var message = new $root.demo.protocol.Vertex();
                if (object.id != null)
                    if (typeof object.id === "string")
                        $util.base64.decode(object.id, message.id = $util.newBuffer($util.base64.length(object.id)), 0);
                    else if (object.id.length)
                        message.id = object.id;
                if (object.properties) {
                    if (typeof object.properties !== "object")
                        throw TypeError(".demo.protocol.Vertex.properties: object expected");
                    message.properties = {};
                    for (var keys = Object.keys(object.properties), i = 0; i < keys.length; ++i)
                        message.properties[keys[i]] = String(object.properties[keys[i]]);
                }
                if (object.labels) {
                    if (!Array.isArray(object.labels))
                        throw TypeError(".demo.protocol.Vertex.labels: array expected");
                    message.labels = [];
                    for (var i = 0; i < object.labels.length; ++i)
                        message.labels[i] = String(object.labels[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from a Vertex message. Also converts values to other types if specified.
             * @function toObject
             * @memberof demo.protocol.Vertex
             * @static
             * @param {demo.protocol.Vertex} message Vertex
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Vertex.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.labels = [];
                if (options.objects || options.defaults)
                    object.properties = {};
                if (options.defaults)
                    if (options.bytes === String)
                        object.id = "";
                    else {
                        object.id = [];
                        if (options.bytes !== Array)
                            object.id = $util.newBuffer(object.id);
                    }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = options.bytes === String ? $util.base64.encode(message.id, 0, message.id.length) : options.bytes === Array ? Array.prototype.slice.call(message.id) : message.id;
                var keys2;
                if (message.properties && (keys2 = Object.keys(message.properties)).length) {
                    object.properties = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.properties[keys2[j]] = message.properties[keys2[j]];
                }
                if (message.labels && message.labels.length) {
                    object.labels = [];
                    for (var j = 0; j < message.labels.length; ++j)
                        object.labels[j] = message.labels[j];
                }
                return object;
            };

            /**
             * Converts this Vertex to JSON.
             * @function toJSON
             * @memberof demo.protocol.Vertex
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Vertex.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Vertex;
        })();

        protocol.Edge = (function() {

            /**
             * Properties of an Edge.
             * @memberof demo.protocol
             * @interface IEdge
             * @property {Uint8Array|null} [id] Edge id
             * @property {Object.<string,string>|null} [properties] Edge properties
             * @property {Array.<string>|null} [labels] Edge labels
             * @property {Uint8Array|null} [fromVertex] Edge fromVertex
             * @property {Uint8Array|null} [toVertex] Edge toVertex
             * @property {Array.<Uint8Array>|null} [metaEdges] Edge metaEdges
             */

            /**
             * Constructs a new Edge.
             * @memberof demo.protocol
             * @classdesc Represents an Edge.
             * @implements IEdge
             * @constructor
             * @param {demo.protocol.IEdge=} [properties] Properties to set
             */
            function Edge(properties) {
                this.properties = {};
                this.labels = [];
                this.metaEdges = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Edge id.
             * @member {Uint8Array} id
             * @memberof demo.protocol.Edge
             * @instance
             */
            Edge.prototype.id = $util.newBuffer([]);

            /**
             * Edge properties.
             * @member {Object.<string,string>} properties
             * @memberof demo.protocol.Edge
             * @instance
             */
            Edge.prototype.properties = $util.emptyObject;

            /**
             * Edge labels.
             * @member {Array.<string>} labels
             * @memberof demo.protocol.Edge
             * @instance
             */
            Edge.prototype.labels = $util.emptyArray;

            /**
             * Edge fromVertex.
             * @member {Uint8Array} fromVertex
             * @memberof demo.protocol.Edge
             * @instance
             */
            Edge.prototype.fromVertex = $util.newBuffer([]);

            /**
             * Edge toVertex.
             * @member {Uint8Array} toVertex
             * @memberof demo.protocol.Edge
             * @instance
             */
            Edge.prototype.toVertex = $util.newBuffer([]);

            /**
             * Edge metaEdges.
             * @member {Array.<Uint8Array>} metaEdges
             * @memberof demo.protocol.Edge
             * @instance
             */
            Edge.prototype.metaEdges = $util.emptyArray;

            /**
             * Creates a new Edge instance using the specified properties.
             * @function create
             * @memberof demo.protocol.Edge
             * @static
             * @param {demo.protocol.IEdge=} [properties] Properties to set
             * @returns {demo.protocol.Edge} Edge instance
             */
            Edge.create = function create(properties) {
                return new Edge(properties);
            };

            /**
             * Encodes the specified Edge message. Does not implicitly {@link demo.protocol.Edge.verify|verify} messages.
             * @function encode
             * @memberof demo.protocol.Edge
             * @static
             * @param {demo.protocol.IEdge} message Edge message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Edge.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.id);
                if (message.properties != null && Object.hasOwnProperty.call(message, "properties"))
                    for (var keys = Object.keys(message.properties), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.properties[keys[i]]).ldelim();
                if (message.labels != null && message.labels.length)
                    for (var i = 0; i < message.labels.length; ++i)
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.labels[i]);
                if (message.fromVertex != null && Object.hasOwnProperty.call(message, "fromVertex"))
                    writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.fromVertex);
                if (message.toVertex != null && Object.hasOwnProperty.call(message, "toVertex"))
                    writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.toVertex);
                if (message.metaEdges != null && message.metaEdges.length)
                    for (var i = 0; i < message.metaEdges.length; ++i)
                        writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.metaEdges[i]);
                return writer;
            };

            /**
             * Encodes the specified Edge message, length delimited. Does not implicitly {@link demo.protocol.Edge.verify|verify} messages.
             * @function encodeDelimited
             * @memberof demo.protocol.Edge
             * @static
             * @param {demo.protocol.IEdge} message Edge message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Edge.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Edge message from the specified reader or buffer.
             * @function decode
             * @memberof demo.protocol.Edge
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {demo.protocol.Edge} Edge
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Edge.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.demo.protocol.Edge(), key, value;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.bytes();
                        break;
                    case 2:
                        if (message.properties === $util.emptyObject)
                            message.properties = {};
                        var end2 = reader.uint32() + reader.pos;
                        key = "";
                        value = "";
                        while (reader.pos < end2) {
                            var tag2 = reader.uint32();
                            switch (tag2 >>> 3) {
                            case 1:
                                key = reader.string();
                                break;
                            case 2:
                                value = reader.string();
                                break;
                            default:
                                reader.skipType(tag2 & 7);
                                break;
                            }
                        }
                        message.properties[key] = value;
                        break;
                    case 3:
                        if (!(message.labels && message.labels.length))
                            message.labels = [];
                        message.labels.push(reader.string());
                        break;
                    case 4:
                        message.fromVertex = reader.bytes();
                        break;
                    case 5:
                        message.toVertex = reader.bytes();
                        break;
                    case 6:
                        if (!(message.metaEdges && message.metaEdges.length))
                            message.metaEdges = [];
                        message.metaEdges.push(reader.bytes());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Edge message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof demo.protocol.Edge
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {demo.protocol.Edge} Edge
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Edge.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Edge message.
             * @function verify
             * @memberof demo.protocol.Edge
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Edge.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!(message.id && typeof message.id.length === "number" || $util.isString(message.id)))
                        return "id: buffer expected";
                if (message.properties != null && message.hasOwnProperty("properties")) {
                    if (!$util.isObject(message.properties))
                        return "properties: object expected";
                    var key = Object.keys(message.properties);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.properties[key[i]]))
                            return "properties: string{k:string} expected";
                }
                if (message.labels != null && message.hasOwnProperty("labels")) {
                    if (!Array.isArray(message.labels))
                        return "labels: array expected";
                    for (var i = 0; i < message.labels.length; ++i)
                        if (!$util.isString(message.labels[i]))
                            return "labels: string[] expected";
                }
                if (message.fromVertex != null && message.hasOwnProperty("fromVertex"))
                    if (!(message.fromVertex && typeof message.fromVertex.length === "number" || $util.isString(message.fromVertex)))
                        return "fromVertex: buffer expected";
                if (message.toVertex != null && message.hasOwnProperty("toVertex"))
                    if (!(message.toVertex && typeof message.toVertex.length === "number" || $util.isString(message.toVertex)))
                        return "toVertex: buffer expected";
                if (message.metaEdges != null && message.hasOwnProperty("metaEdges")) {
                    if (!Array.isArray(message.metaEdges))
                        return "metaEdges: array expected";
                    for (var i = 0; i < message.metaEdges.length; ++i)
                        if (!(message.metaEdges[i] && typeof message.metaEdges[i].length === "number" || $util.isString(message.metaEdges[i])))
                            return "metaEdges: buffer[] expected";
                }
                return null;
            };

            /**
             * Creates an Edge message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof demo.protocol.Edge
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {demo.protocol.Edge} Edge
             */
            Edge.fromObject = function fromObject(object) {
                if (object instanceof $root.demo.protocol.Edge)
                    return object;
                var message = new $root.demo.protocol.Edge();
                if (object.id != null)
                    if (typeof object.id === "string")
                        $util.base64.decode(object.id, message.id = $util.newBuffer($util.base64.length(object.id)), 0);
                    else if (object.id.length)
                        message.id = object.id;
                if (object.properties) {
                    if (typeof object.properties !== "object")
                        throw TypeError(".demo.protocol.Edge.properties: object expected");
                    message.properties = {};
                    for (var keys = Object.keys(object.properties), i = 0; i < keys.length; ++i)
                        message.properties[keys[i]] = String(object.properties[keys[i]]);
                }
                if (object.labels) {
                    if (!Array.isArray(object.labels))
                        throw TypeError(".demo.protocol.Edge.labels: array expected");
                    message.labels = [];
                    for (var i = 0; i < object.labels.length; ++i)
                        message.labels[i] = String(object.labels[i]);
                }
                if (object.fromVertex != null)
                    if (typeof object.fromVertex === "string")
                        $util.base64.decode(object.fromVertex, message.fromVertex = $util.newBuffer($util.base64.length(object.fromVertex)), 0);
                    else if (object.fromVertex.length)
                        message.fromVertex = object.fromVertex;
                if (object.toVertex != null)
                    if (typeof object.toVertex === "string")
                        $util.base64.decode(object.toVertex, message.toVertex = $util.newBuffer($util.base64.length(object.toVertex)), 0);
                    else if (object.toVertex.length)
                        message.toVertex = object.toVertex;
                if (object.metaEdges) {
                    if (!Array.isArray(object.metaEdges))
                        throw TypeError(".demo.protocol.Edge.metaEdges: array expected");
                    message.metaEdges = [];
                    for (var i = 0; i < object.metaEdges.length; ++i)
                        if (typeof object.metaEdges[i] === "string")
                            $util.base64.decode(object.metaEdges[i], message.metaEdges[i] = $util.newBuffer($util.base64.length(object.metaEdges[i])), 0);
                        else if (object.metaEdges[i].length)
                            message.metaEdges[i] = object.metaEdges[i];
                }
                return message;
            };

            /**
             * Creates a plain object from an Edge message. Also converts values to other types if specified.
             * @function toObject
             * @memberof demo.protocol.Edge
             * @static
             * @param {demo.protocol.Edge} message Edge
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Edge.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.labels = [];
                    object.metaEdges = [];
                }
                if (options.objects || options.defaults)
                    object.properties = {};
                if (options.defaults) {
                    if (options.bytes === String)
                        object.id = "";
                    else {
                        object.id = [];
                        if (options.bytes !== Array)
                            object.id = $util.newBuffer(object.id);
                    }
                    if (options.bytes === String)
                        object.fromVertex = "";
                    else {
                        object.fromVertex = [];
                        if (options.bytes !== Array)
                            object.fromVertex = $util.newBuffer(object.fromVertex);
                    }
                    if (options.bytes === String)
                        object.toVertex = "";
                    else {
                        object.toVertex = [];
                        if (options.bytes !== Array)
                            object.toVertex = $util.newBuffer(object.toVertex);
                    }
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = options.bytes === String ? $util.base64.encode(message.id, 0, message.id.length) : options.bytes === Array ? Array.prototype.slice.call(message.id) : message.id;
                var keys2;
                if (message.properties && (keys2 = Object.keys(message.properties)).length) {
                    object.properties = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.properties[keys2[j]] = message.properties[keys2[j]];
                }
                if (message.labels && message.labels.length) {
                    object.labels = [];
                    for (var j = 0; j < message.labels.length; ++j)
                        object.labels[j] = message.labels[j];
                }
                if (message.fromVertex != null && message.hasOwnProperty("fromVertex"))
                    object.fromVertex = options.bytes === String ? $util.base64.encode(message.fromVertex, 0, message.fromVertex.length) : options.bytes === Array ? Array.prototype.slice.call(message.fromVertex) : message.fromVertex;
                if (message.toVertex != null && message.hasOwnProperty("toVertex"))
                    object.toVertex = options.bytes === String ? $util.base64.encode(message.toVertex, 0, message.toVertex.length) : options.bytes === Array ? Array.prototype.slice.call(message.toVertex) : message.toVertex;
                if (message.metaEdges && message.metaEdges.length) {
                    object.metaEdges = [];
                    for (var j = 0; j < message.metaEdges.length; ++j)
                        object.metaEdges[j] = options.bytes === String ? $util.base64.encode(message.metaEdges[j], 0, message.metaEdges[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.metaEdges[j]) : message.metaEdges[j];
                }
                return object;
            };

            /**
             * Converts this Edge to JSON.
             * @function toJSON
             * @memberof demo.protocol.Edge
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Edge.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Edge;
        })();

        protocol.GraphData = (function() {

            /**
             * Properties of a GraphData.
             * @memberof demo.protocol
             * @interface IGraphData
             * @property {Array.<demo.protocol.IVertex>|null} [vertices] GraphData vertices
             * @property {Array.<demo.protocol.IEdge>|null} [edges] GraphData edges
             */

            /**
             * Constructs a new GraphData.
             * @memberof demo.protocol
             * @classdesc Represents a GraphData.
             * @implements IGraphData
             * @constructor
             * @param {demo.protocol.IGraphData=} [properties] Properties to set
             */
            function GraphData(properties) {
                this.vertices = [];
                this.edges = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GraphData vertices.
             * @member {Array.<demo.protocol.IVertex>} vertices
             * @memberof demo.protocol.GraphData
             * @instance
             */
            GraphData.prototype.vertices = $util.emptyArray;

            /**
             * GraphData edges.
             * @member {Array.<demo.protocol.IEdge>} edges
             * @memberof demo.protocol.GraphData
             * @instance
             */
            GraphData.prototype.edges = $util.emptyArray;

            /**
             * Creates a new GraphData instance using the specified properties.
             * @function create
             * @memberof demo.protocol.GraphData
             * @static
             * @param {demo.protocol.IGraphData=} [properties] Properties to set
             * @returns {demo.protocol.GraphData} GraphData instance
             */
            GraphData.create = function create(properties) {
                return new GraphData(properties);
            };

            /**
             * Encodes the specified GraphData message. Does not implicitly {@link demo.protocol.GraphData.verify|verify} messages.
             * @function encode
             * @memberof demo.protocol.GraphData
             * @static
             * @param {demo.protocol.IGraphData} message GraphData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GraphData.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.vertices != null && message.vertices.length)
                    for (var i = 0; i < message.vertices.length; ++i)
                        $root.demo.protocol.Vertex.encode(message.vertices[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.edges != null && message.edges.length)
                    for (var i = 0; i < message.edges.length; ++i)
                        $root.demo.protocol.Edge.encode(message.edges[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified GraphData message, length delimited. Does not implicitly {@link demo.protocol.GraphData.verify|verify} messages.
             * @function encodeDelimited
             * @memberof demo.protocol.GraphData
             * @static
             * @param {demo.protocol.IGraphData} message GraphData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GraphData.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GraphData message from the specified reader or buffer.
             * @function decode
             * @memberof demo.protocol.GraphData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {demo.protocol.GraphData} GraphData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GraphData.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.demo.protocol.GraphData();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.vertices && message.vertices.length))
                            message.vertices = [];
                        message.vertices.push($root.demo.protocol.Vertex.decode(reader, reader.uint32()));
                        break;
                    case 2:
                        if (!(message.edges && message.edges.length))
                            message.edges = [];
                        message.edges.push($root.demo.protocol.Edge.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GraphData message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof demo.protocol.GraphData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {demo.protocol.GraphData} GraphData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GraphData.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GraphData message.
             * @function verify
             * @memberof demo.protocol.GraphData
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GraphData.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.vertices != null && message.hasOwnProperty("vertices")) {
                    if (!Array.isArray(message.vertices))
                        return "vertices: array expected";
                    for (var i = 0; i < message.vertices.length; ++i) {
                        var error = $root.demo.protocol.Vertex.verify(message.vertices[i]);
                        if (error)
                            return "vertices." + error;
                    }
                }
                if (message.edges != null && message.hasOwnProperty("edges")) {
                    if (!Array.isArray(message.edges))
                        return "edges: array expected";
                    for (var i = 0; i < message.edges.length; ++i) {
                        var error = $root.demo.protocol.Edge.verify(message.edges[i]);
                        if (error)
                            return "edges." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a GraphData message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof demo.protocol.GraphData
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {demo.protocol.GraphData} GraphData
             */
            GraphData.fromObject = function fromObject(object) {
                if (object instanceof $root.demo.protocol.GraphData)
                    return object;
                var message = new $root.demo.protocol.GraphData();
                if (object.vertices) {
                    if (!Array.isArray(object.vertices))
                        throw TypeError(".demo.protocol.GraphData.vertices: array expected");
                    message.vertices = [];
                    for (var i = 0; i < object.vertices.length; ++i) {
                        if (typeof object.vertices[i] !== "object")
                            throw TypeError(".demo.protocol.GraphData.vertices: object expected");
                        message.vertices[i] = $root.demo.protocol.Vertex.fromObject(object.vertices[i]);
                    }
                }
                if (object.edges) {
                    if (!Array.isArray(object.edges))
                        throw TypeError(".demo.protocol.GraphData.edges: array expected");
                    message.edges = [];
                    for (var i = 0; i < object.edges.length; ++i) {
                        if (typeof object.edges[i] !== "object")
                            throw TypeError(".demo.protocol.GraphData.edges: object expected");
                        message.edges[i] = $root.demo.protocol.Edge.fromObject(object.edges[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a GraphData message. Also converts values to other types if specified.
             * @function toObject
             * @memberof demo.protocol.GraphData
             * @static
             * @param {demo.protocol.GraphData} message GraphData
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GraphData.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.vertices = [];
                    object.edges = [];
                }
                if (message.vertices && message.vertices.length) {
                    object.vertices = [];
                    for (var j = 0; j < message.vertices.length; ++j)
                        object.vertices[j] = $root.demo.protocol.Vertex.toObject(message.vertices[j], options);
                }
                if (message.edges && message.edges.length) {
                    object.edges = [];
                    for (var j = 0; j < message.edges.length; ++j)
                        object.edges[j] = $root.demo.protocol.Edge.toObject(message.edges[j], options);
                }
                return object;
            };

            /**
             * Converts this GraphData to JSON.
             * @function toJSON
             * @memberof demo.protocol.GraphData
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GraphData.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GraphData;
        })();

        protocol.Query = (function() {

            /**
             * Properties of a Query.
             * @memberof demo.protocol
             * @interface IQuery
             * @property {string|null} [query] Query query
             * @property {string|null} [language] Query language
             * @property {Object.<string,string>|null} [args] Query args
             * @property {Array.<string>|null} [filter] Query filter
             */

            /**
             * Constructs a new Query.
             * @memberof demo.protocol
             * @classdesc Represents a Query.
             * @implements IQuery
             * @constructor
             * @param {demo.protocol.IQuery=} [properties] Properties to set
             */
            function Query(properties) {
                this.args = {};
                this.filter = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Query query.
             * @member {string} query
             * @memberof demo.protocol.Query
             * @instance
             */
            Query.prototype.query = "";

            /**
             * Query language.
             * @member {string} language
             * @memberof demo.protocol.Query
             * @instance
             */
            Query.prototype.language = "";

            /**
             * Query args.
             * @member {Object.<string,string>} args
             * @memberof demo.protocol.Query
             * @instance
             */
            Query.prototype.args = $util.emptyObject;

            /**
             * Query filter.
             * @member {Array.<string>} filter
             * @memberof demo.protocol.Query
             * @instance
             */
            Query.prototype.filter = $util.emptyArray;

            /**
             * Creates a new Query instance using the specified properties.
             * @function create
             * @memberof demo.protocol.Query
             * @static
             * @param {demo.protocol.IQuery=} [properties] Properties to set
             * @returns {demo.protocol.Query} Query instance
             */
            Query.create = function create(properties) {
                return new Query(properties);
            };

            /**
             * Encodes the specified Query message. Does not implicitly {@link demo.protocol.Query.verify|verify} messages.
             * @function encode
             * @memberof demo.protocol.Query
             * @static
             * @param {demo.protocol.IQuery} message Query message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Query.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.query != null && Object.hasOwnProperty.call(message, "query"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.query);
                if (message.language != null && Object.hasOwnProperty.call(message, "language"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.language);
                if (message.args != null && Object.hasOwnProperty.call(message, "args"))
                    for (var keys = Object.keys(message.args), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.args[keys[i]]).ldelim();
                if (message.filter != null && message.filter.length)
                    for (var i = 0; i < message.filter.length; ++i)
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.filter[i]);
                return writer;
            };

            /**
             * Encodes the specified Query message, length delimited. Does not implicitly {@link demo.protocol.Query.verify|verify} messages.
             * @function encodeDelimited
             * @memberof demo.protocol.Query
             * @static
             * @param {demo.protocol.IQuery} message Query message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Query.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Query message from the specified reader or buffer.
             * @function decode
             * @memberof demo.protocol.Query
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {demo.protocol.Query} Query
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Query.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.demo.protocol.Query(), key, value;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.query = reader.string();
                        break;
                    case 2:
                        message.language = reader.string();
                        break;
                    case 3:
                        if (message.args === $util.emptyObject)
                            message.args = {};
                        var end2 = reader.uint32() + reader.pos;
                        key = "";
                        value = "";
                        while (reader.pos < end2) {
                            var tag2 = reader.uint32();
                            switch (tag2 >>> 3) {
                            case 1:
                                key = reader.string();
                                break;
                            case 2:
                                value = reader.string();
                                break;
                            default:
                                reader.skipType(tag2 & 7);
                                break;
                            }
                        }
                        message.args[key] = value;
                        break;
                    case 4:
                        if (!(message.filter && message.filter.length))
                            message.filter = [];
                        message.filter.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Query message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof demo.protocol.Query
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {demo.protocol.Query} Query
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Query.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Query message.
             * @function verify
             * @memberof demo.protocol.Query
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Query.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.query != null && message.hasOwnProperty("query"))
                    if (!$util.isString(message.query))
                        return "query: string expected";
                if (message.language != null && message.hasOwnProperty("language"))
                    if (!$util.isString(message.language))
                        return "language: string expected";
                if (message.args != null && message.hasOwnProperty("args")) {
                    if (!$util.isObject(message.args))
                        return "args: object expected";
                    var key = Object.keys(message.args);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.args[key[i]]))
                            return "args: string{k:string} expected";
                }
                if (message.filter != null && message.hasOwnProperty("filter")) {
                    if (!Array.isArray(message.filter))
                        return "filter: array expected";
                    for (var i = 0; i < message.filter.length; ++i)
                        if (!$util.isString(message.filter[i]))
                            return "filter: string[] expected";
                }
                return null;
            };

            /**
             * Creates a Query message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof demo.protocol.Query
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {demo.protocol.Query} Query
             */
            Query.fromObject = function fromObject(object) {
                if (object instanceof $root.demo.protocol.Query)
                    return object;
                var message = new $root.demo.protocol.Query();
                if (object.query != null)
                    message.query = String(object.query);
                if (object.language != null)
                    message.language = String(object.language);
                if (object.args) {
                    if (typeof object.args !== "object")
                        throw TypeError(".demo.protocol.Query.args: object expected");
                    message.args = {};
                    for (var keys = Object.keys(object.args), i = 0; i < keys.length; ++i)
                        message.args[keys[i]] = String(object.args[keys[i]]);
                }
                if (object.filter) {
                    if (!Array.isArray(object.filter))
                        throw TypeError(".demo.protocol.Query.filter: array expected");
                    message.filter = [];
                    for (var i = 0; i < object.filter.length; ++i)
                        message.filter[i] = String(object.filter[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from a Query message. Also converts values to other types if specified.
             * @function toObject
             * @memberof demo.protocol.Query
             * @static
             * @param {demo.protocol.Query} message Query
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Query.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.filter = [];
                if (options.objects || options.defaults)
                    object.args = {};
                if (options.defaults) {
                    object.query = "";
                    object.language = "";
                }
                if (message.query != null && message.hasOwnProperty("query"))
                    object.query = message.query;
                if (message.language != null && message.hasOwnProperty("language"))
                    object.language = message.language;
                var keys2;
                if (message.args && (keys2 = Object.keys(message.args)).length) {
                    object.args = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.args[keys2[j]] = message.args[keys2[j]];
                }
                if (message.filter && message.filter.length) {
                    object.filter = [];
                    for (var j = 0; j < message.filter.length; ++j)
                        object.filter[j] = message.filter[j];
                }
                return object;
            };

            /**
             * Converts this Query to JSON.
             * @function toJSON
             * @memberof demo.protocol.Query
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Query.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Query;
        })();

        return protocol;
    })();

    return demo;
})();

$root.google = (function() {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    var google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        var protobuf = {};

        protobuf.Any = (function() {

            /**
             * Properties of an Any.
             * @memberof google.protobuf
             * @interface IAny
             * @property {string|null} [type_url] Any type_url
             * @property {Uint8Array|null} [value] Any value
             */

            /**
             * Constructs a new Any.
             * @memberof google.protobuf
             * @classdesc Represents an Any.
             * @implements IAny
             * @constructor
             * @param {google.protobuf.IAny=} [properties] Properties to set
             */
            function Any(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Any type_url.
             * @member {string} type_url
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.type_url = "";

            /**
             * Any value.
             * @member {Uint8Array} value
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.value = $util.newBuffer([]);

            /**
             * Creates a new Any instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny=} [properties] Properties to set
             * @returns {google.protobuf.Any} Any instance
             */
            Any.create = function create(properties) {
                return new Any(properties);
            };

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type_url != null && Object.hasOwnProperty.call(message, "type_url"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.type_url);
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
                return writer;
            };

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Any();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.type_url = reader.string();
                        break;
                    case 2:
                        message.value = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Any message.
             * @function verify
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Any.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    if (!$util.isString(message.type_url))
                        return "type_url: string expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                        return "value: buffer expected";
                return null;
            };

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Any} Any
             */
            Any.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Any)
                    return object;
                var message = new $root.google.protobuf.Any();
                if (object.type_url != null)
                    message.type_url = String(object.type_url);
                if (object.value != null)
                    if (typeof object.value === "string")
                        $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                    else if (object.value.length)
                        message.value = object.value;
                return message;
            };

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.Any} message Any
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Any.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.type_url = "";
                    if (options.bytes === String)
                        object.value = "";
                    else {
                        object.value = [];
                        if (options.bytes !== Array)
                            object.value = $util.newBuffer(object.value);
                    }
                }
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    object.type_url = message.type_url;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                return object;
            };

            /**
             * Converts this Any to JSON.
             * @function toJSON
             * @memberof google.protobuf.Any
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Any.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Any;
        })();

        return protobuf;
    })();

    return google;
})();

module.exports = $root;
