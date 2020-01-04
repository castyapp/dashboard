/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.protobuf = (function() {

    /**
     * Namespace protobuf.
     * @exports protobuf
     * @namespace
     */
    var protobuf = {};

    protobuf.CMsgProtoBufHeader = (function() {

        /**
         * Properties of a CMsgProtoBufHeader.
         * @memberof protobuf
         * @interface ICMsgProtoBufHeader
         * @property {Uint8Array|null} [UserHash] CMsgProtoBufHeader UserHash
         * @property {Uint8Array|null} [IpAddr] CMsgProtoBufHeader IpAddr
         * @property {number|null} [SessionClientId] CMsgProtoBufHeader SessionClientId
         * @property {Uint8Array|null} [AuthToken] CMsgProtoBufHeader AuthToken
         */

        /**
         * Constructs a new CMsgProtoBufHeader.
         * @memberof protobuf
         * @classdesc Represents a CMsgProtoBufHeader.
         * @implements ICMsgProtoBufHeader
         * @constructor
         * @param {protobuf.ICMsgProtoBufHeader=} [properties] Properties to set
         */
        function CMsgProtoBufHeader(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CMsgProtoBufHeader UserHash.
         * @member {Uint8Array} UserHash
         * @memberof protobuf.CMsgProtoBufHeader
         * @instance
         */
        CMsgProtoBufHeader.prototype.UserHash = $util.newBuffer([]);

        /**
         * CMsgProtoBufHeader IpAddr.
         * @member {Uint8Array} IpAddr
         * @memberof protobuf.CMsgProtoBufHeader
         * @instance
         */
        CMsgProtoBufHeader.prototype.IpAddr = $util.newBuffer([]);

        /**
         * CMsgProtoBufHeader SessionClientId.
         * @member {number} SessionClientId
         * @memberof protobuf.CMsgProtoBufHeader
         * @instance
         */
        CMsgProtoBufHeader.prototype.SessionClientId = 0;

        /**
         * CMsgProtoBufHeader AuthToken.
         * @member {Uint8Array} AuthToken
         * @memberof protobuf.CMsgProtoBufHeader
         * @instance
         */
        CMsgProtoBufHeader.prototype.AuthToken = $util.newBuffer([]);

        /**
         * Creates a new CMsgProtoBufHeader instance using the specified properties.
         * @function create
         * @memberof protobuf.CMsgProtoBufHeader
         * @static
         * @param {protobuf.ICMsgProtoBufHeader=} [properties] Properties to set
         * @returns {protobuf.CMsgProtoBufHeader} CMsgProtoBufHeader instance
         */
        CMsgProtoBufHeader.create = function create(properties) {
            return new CMsgProtoBufHeader(properties);
        };

        /**
         * Encodes the specified CMsgProtoBufHeader message. Does not implicitly {@link protobuf.CMsgProtoBufHeader.verify|verify} messages.
         * @function encode
         * @memberof protobuf.CMsgProtoBufHeader
         * @static
         * @param {protobuf.ICMsgProtoBufHeader} message CMsgProtoBufHeader message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CMsgProtoBufHeader.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.UserHash != null && message.hasOwnProperty("UserHash"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.UserHash);
            if (message.IpAddr != null && message.hasOwnProperty("IpAddr"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.IpAddr);
            if (message.SessionClientId != null && message.hasOwnProperty("SessionClientId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.SessionClientId);
            if (message.AuthToken != null && message.hasOwnProperty("AuthToken"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.AuthToken);
            return writer;
        };

        /**
         * Encodes the specified CMsgProtoBufHeader message, length delimited. Does not implicitly {@link protobuf.CMsgProtoBufHeader.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.CMsgProtoBufHeader
         * @static
         * @param {protobuf.ICMsgProtoBufHeader} message CMsgProtoBufHeader message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CMsgProtoBufHeader.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CMsgProtoBufHeader message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.CMsgProtoBufHeader
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.CMsgProtoBufHeader} CMsgProtoBufHeader
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CMsgProtoBufHeader.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.CMsgProtoBufHeader();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.UserHash = reader.bytes();
                    break;
                case 2:
                    message.IpAddr = reader.bytes();
                    break;
                case 3:
                    message.SessionClientId = reader.int32();
                    break;
                case 4:
                    message.AuthToken = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CMsgProtoBufHeader message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.CMsgProtoBufHeader
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.CMsgProtoBufHeader} CMsgProtoBufHeader
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CMsgProtoBufHeader.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CMsgProtoBufHeader message.
         * @function verify
         * @memberof protobuf.CMsgProtoBufHeader
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CMsgProtoBufHeader.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.UserHash != null && message.hasOwnProperty("UserHash"))
                if (!(message.UserHash && typeof message.UserHash.length === "number" || $util.isString(message.UserHash)))
                    return "UserHash: buffer expected";
            if (message.IpAddr != null && message.hasOwnProperty("IpAddr"))
                if (!(message.IpAddr && typeof message.IpAddr.length === "number" || $util.isString(message.IpAddr)))
                    return "IpAddr: buffer expected";
            if (message.SessionClientId != null && message.hasOwnProperty("SessionClientId"))
                if (!$util.isInteger(message.SessionClientId))
                    return "SessionClientId: integer expected";
            if (message.AuthToken != null && message.hasOwnProperty("AuthToken"))
                if (!(message.AuthToken && typeof message.AuthToken.length === "number" || $util.isString(message.AuthToken)))
                    return "AuthToken: buffer expected";
            return null;
        };

        /**
         * Creates a CMsgProtoBufHeader message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.CMsgProtoBufHeader
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.CMsgProtoBufHeader} CMsgProtoBufHeader
         */
        CMsgProtoBufHeader.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.CMsgProtoBufHeader)
                return object;
            var message = new $root.protobuf.CMsgProtoBufHeader();
            if (object.UserHash != null)
                if (typeof object.UserHash === "string")
                    $util.base64.decode(object.UserHash, message.UserHash = $util.newBuffer($util.base64.length(object.UserHash)), 0);
                else if (object.UserHash.length)
                    message.UserHash = object.UserHash;
            if (object.IpAddr != null)
                if (typeof object.IpAddr === "string")
                    $util.base64.decode(object.IpAddr, message.IpAddr = $util.newBuffer($util.base64.length(object.IpAddr)), 0);
                else if (object.IpAddr.length)
                    message.IpAddr = object.IpAddr;
            if (object.SessionClientId != null)
                message.SessionClientId = object.SessionClientId | 0;
            if (object.AuthToken != null)
                if (typeof object.AuthToken === "string")
                    $util.base64.decode(object.AuthToken, message.AuthToken = $util.newBuffer($util.base64.length(object.AuthToken)), 0);
                else if (object.AuthToken.length)
                    message.AuthToken = object.AuthToken;
            return message;
        };

        /**
         * Creates a plain object from a CMsgProtoBufHeader message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.CMsgProtoBufHeader
         * @static
         * @param {protobuf.CMsgProtoBufHeader} message CMsgProtoBufHeader
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CMsgProtoBufHeader.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.UserHash = "";
                else {
                    object.UserHash = [];
                    if (options.bytes !== Array)
                        object.UserHash = $util.newBuffer(object.UserHash);
                }
                if (options.bytes === String)
                    object.IpAddr = "";
                else {
                    object.IpAddr = [];
                    if (options.bytes !== Array)
                        object.IpAddr = $util.newBuffer(object.IpAddr);
                }
                object.SessionClientId = 0;
                if (options.bytes === String)
                    object.AuthToken = "";
                else {
                    object.AuthToken = [];
                    if (options.bytes !== Array)
                        object.AuthToken = $util.newBuffer(object.AuthToken);
                }
            }
            if (message.UserHash != null && message.hasOwnProperty("UserHash"))
                object.UserHash = options.bytes === String ? $util.base64.encode(message.UserHash, 0, message.UserHash.length) : options.bytes === Array ? Array.prototype.slice.call(message.UserHash) : message.UserHash;
            if (message.IpAddr != null && message.hasOwnProperty("IpAddr"))
                object.IpAddr = options.bytes === String ? $util.base64.encode(message.IpAddr, 0, message.IpAddr.length) : options.bytes === Array ? Array.prototype.slice.call(message.IpAddr) : message.IpAddr;
            if (message.SessionClientId != null && message.hasOwnProperty("SessionClientId"))
                object.SessionClientId = message.SessionClientId;
            if (message.AuthToken != null && message.hasOwnProperty("AuthToken"))
                object.AuthToken = options.bytes === String ? $util.base64.encode(message.AuthToken, 0, message.AuthToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.AuthToken) : message.AuthToken;
            return object;
        };

        /**
         * Converts this CMsgProtoBufHeader to JSON.
         * @function toJSON
         * @memberof protobuf.CMsgProtoBufHeader
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CMsgProtoBufHeader.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CMsgProtoBufHeader;
    })();

    protobuf.PersonalStateMsgEvent = (function() {

        /**
         * Properties of a PersonalStateMsgEvent.
         * @memberof protobuf
         * @interface IPersonalStateMsgEvent
         * @property {string|null} [userId] PersonalStateMsgEvent userId
         * @property {enums.EMSG_PERSONAL_STATE|null} [state] PersonalStateMsgEvent state
         * @property {protobuf.IPersonalStateActivityMsgEvent|null} [activity] PersonalStateMsgEvent activity
         */

        /**
         * Constructs a new PersonalStateMsgEvent.
         * @memberof protobuf
         * @classdesc Represents a PersonalStateMsgEvent.
         * @implements IPersonalStateMsgEvent
         * @constructor
         * @param {protobuf.IPersonalStateMsgEvent=} [properties] Properties to set
         */
        function PersonalStateMsgEvent(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PersonalStateMsgEvent userId.
         * @member {string} userId
         * @memberof protobuf.PersonalStateMsgEvent
         * @instance
         */
        PersonalStateMsgEvent.prototype.userId = "";

        /**
         * PersonalStateMsgEvent state.
         * @member {enums.EMSG_PERSONAL_STATE} state
         * @memberof protobuf.PersonalStateMsgEvent
         * @instance
         */
        PersonalStateMsgEvent.prototype.state = 0;

        /**
         * PersonalStateMsgEvent activity.
         * @member {protobuf.IPersonalStateActivityMsgEvent|null|undefined} activity
         * @memberof protobuf.PersonalStateMsgEvent
         * @instance
         */
        PersonalStateMsgEvent.prototype.activity = null;

        /**
         * Creates a new PersonalStateMsgEvent instance using the specified properties.
         * @function create
         * @memberof protobuf.PersonalStateMsgEvent
         * @static
         * @param {protobuf.IPersonalStateMsgEvent=} [properties] Properties to set
         * @returns {protobuf.PersonalStateMsgEvent} PersonalStateMsgEvent instance
         */
        PersonalStateMsgEvent.create = function create(properties) {
            return new PersonalStateMsgEvent(properties);
        };

        /**
         * Encodes the specified PersonalStateMsgEvent message. Does not implicitly {@link protobuf.PersonalStateMsgEvent.verify|verify} messages.
         * @function encode
         * @memberof protobuf.PersonalStateMsgEvent
         * @static
         * @param {protobuf.IPersonalStateMsgEvent} message PersonalStateMsgEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PersonalStateMsgEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && message.hasOwnProperty("userId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.userId);
            if (message.state != null && message.hasOwnProperty("state"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.state);
            if (message.activity != null && message.hasOwnProperty("activity"))
                $root.protobuf.PersonalStateActivityMsgEvent.encode(message.activity, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PersonalStateMsgEvent message, length delimited. Does not implicitly {@link protobuf.PersonalStateMsgEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.PersonalStateMsgEvent
         * @static
         * @param {protobuf.IPersonalStateMsgEvent} message PersonalStateMsgEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PersonalStateMsgEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PersonalStateMsgEvent message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.PersonalStateMsgEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.PersonalStateMsgEvent} PersonalStateMsgEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PersonalStateMsgEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.PersonalStateMsgEvent();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userId = reader.string();
                    break;
                case 2:
                    message.state = reader.int32();
                    break;
                case 3:
                    message.activity = $root.protobuf.PersonalStateActivityMsgEvent.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PersonalStateMsgEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.PersonalStateMsgEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.PersonalStateMsgEvent} PersonalStateMsgEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PersonalStateMsgEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PersonalStateMsgEvent message.
         * @function verify
         * @memberof protobuf.PersonalStateMsgEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PersonalStateMsgEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isString(message.userId))
                    return "userId: string expected";
            if (message.state != null && message.hasOwnProperty("state"))
                switch (message.state) {
                default:
                    return "state: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.activity != null && message.hasOwnProperty("activity")) {
                var error = $root.protobuf.PersonalStateActivityMsgEvent.verify(message.activity);
                if (error)
                    return "activity." + error;
            }
            return null;
        };

        /**
         * Creates a PersonalStateMsgEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.PersonalStateMsgEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.PersonalStateMsgEvent} PersonalStateMsgEvent
         */
        PersonalStateMsgEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.PersonalStateMsgEvent)
                return object;
            var message = new $root.protobuf.PersonalStateMsgEvent();
            if (object.userId != null)
                message.userId = String(object.userId);
            switch (object.state) {
            case "OFFLINE":
            case 0:
                message.state = 0;
                break;
            case "ONLINE":
            case 1:
                message.state = 1;
                break;
            case "IDLE":
            case 2:
                message.state = 2;
                break;
            case "BUSY":
            case 3:
                message.state = 3;
                break;
            case "INVISIBLE":
            case 4:
                message.state = 4;
                break;
            }
            if (object.activity != null) {
                if (typeof object.activity !== "object")
                    throw TypeError(".protobuf.PersonalStateMsgEvent.activity: object expected");
                message.activity = $root.protobuf.PersonalStateActivityMsgEvent.fromObject(object.activity);
            }
            return message;
        };

        /**
         * Creates a plain object from a PersonalStateMsgEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.PersonalStateMsgEvent
         * @static
         * @param {protobuf.PersonalStateMsgEvent} message PersonalStateMsgEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PersonalStateMsgEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.userId = "";
                object.state = options.enums === String ? "OFFLINE" : 0;
                object.activity = null;
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.state != null && message.hasOwnProperty("state"))
                object.state = options.enums === String ? $root.enums.EMSG_PERSONAL_STATE[message.state] : message.state;
            if (message.activity != null && message.hasOwnProperty("activity"))
                object.activity = $root.protobuf.PersonalStateActivityMsgEvent.toObject(message.activity, options);
            return object;
        };

        /**
         * Converts this PersonalStateMsgEvent to JSON.
         * @function toJSON
         * @memberof protobuf.PersonalStateMsgEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PersonalStateMsgEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PersonalStateMsgEvent;
    })();

    protobuf.ChatMsgEvent = (function() {

        /**
         * Properties of a ChatMsgEvent.
         * @memberof protobuf
         * @interface IChatMsgEvent
         * @property {Uint8Array|null} [message] ChatMsgEvent message
         * @property {string|null} [from] ChatMsgEvent from
         * @property {string|null} [to] ChatMsgEvent to
         * @property {Array.<number|Long>|null} [emojies] ChatMsgEvent emojies
         * @property {Array.<number|Long>|null} [mentions] ChatMsgEvent mentions
         * @property {google.protobuf.ITimestamp|null} [createdAt] ChatMsgEvent createdAt
         */

        /**
         * Constructs a new ChatMsgEvent.
         * @memberof protobuf
         * @classdesc Represents a ChatMsgEvent.
         * @implements IChatMsgEvent
         * @constructor
         * @param {protobuf.IChatMsgEvent=} [properties] Properties to set
         */
        function ChatMsgEvent(properties) {
            this.emojies = [];
            this.mentions = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ChatMsgEvent message.
         * @member {Uint8Array} message
         * @memberof protobuf.ChatMsgEvent
         * @instance
         */
        ChatMsgEvent.prototype.message = $util.newBuffer([]);

        /**
         * ChatMsgEvent from.
         * @member {string} from
         * @memberof protobuf.ChatMsgEvent
         * @instance
         */
        ChatMsgEvent.prototype.from = "";

        /**
         * ChatMsgEvent to.
         * @member {string} to
         * @memberof protobuf.ChatMsgEvent
         * @instance
         */
        ChatMsgEvent.prototype.to = "";

        /**
         * ChatMsgEvent emojies.
         * @member {Array.<number|Long>} emojies
         * @memberof protobuf.ChatMsgEvent
         * @instance
         */
        ChatMsgEvent.prototype.emojies = $util.emptyArray;

        /**
         * ChatMsgEvent mentions.
         * @member {Array.<number|Long>} mentions
         * @memberof protobuf.ChatMsgEvent
         * @instance
         */
        ChatMsgEvent.prototype.mentions = $util.emptyArray;

        /**
         * ChatMsgEvent createdAt.
         * @member {google.protobuf.ITimestamp|null|undefined} createdAt
         * @memberof protobuf.ChatMsgEvent
         * @instance
         */
        ChatMsgEvent.prototype.createdAt = null;

        /**
         * Creates a new ChatMsgEvent instance using the specified properties.
         * @function create
         * @memberof protobuf.ChatMsgEvent
         * @static
         * @param {protobuf.IChatMsgEvent=} [properties] Properties to set
         * @returns {protobuf.ChatMsgEvent} ChatMsgEvent instance
         */
        ChatMsgEvent.create = function create(properties) {
            return new ChatMsgEvent(properties);
        };

        /**
         * Encodes the specified ChatMsgEvent message. Does not implicitly {@link protobuf.ChatMsgEvent.verify|verify} messages.
         * @function encode
         * @memberof protobuf.ChatMsgEvent
         * @static
         * @param {protobuf.IChatMsgEvent} message ChatMsgEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChatMsgEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.message != null && message.hasOwnProperty("message"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.message);
            if (message.from != null && message.hasOwnProperty("from"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.from);
            if (message.to != null && message.hasOwnProperty("to"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.to);
            if (message.emojies != null && message.emojies.length) {
                writer.uint32(/* id 4, wireType 2 =*/34).fork();
                for (var i = 0; i < message.emojies.length; ++i)
                    writer.uint64(message.emojies[i]);
                writer.ldelim();
            }
            if (message.mentions != null && message.mentions.length) {
                writer.uint32(/* id 5, wireType 2 =*/42).fork();
                for (var i = 0; i < message.mentions.length; ++i)
                    writer.uint64(message.mentions[i]);
                writer.ldelim();
            }
            if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                $root.google.protobuf.Timestamp.encode(message.createdAt, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ChatMsgEvent message, length delimited. Does not implicitly {@link protobuf.ChatMsgEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.ChatMsgEvent
         * @static
         * @param {protobuf.IChatMsgEvent} message ChatMsgEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChatMsgEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ChatMsgEvent message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.ChatMsgEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.ChatMsgEvent} ChatMsgEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChatMsgEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.ChatMsgEvent();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.message = reader.bytes();
                    break;
                case 2:
                    message.from = reader.string();
                    break;
                case 3:
                    message.to = reader.string();
                    break;
                case 4:
                    if (!(message.emojies && message.emojies.length))
                        message.emojies = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.emojies.push(reader.uint64());
                    } else
                        message.emojies.push(reader.uint64());
                    break;
                case 5:
                    if (!(message.mentions && message.mentions.length))
                        message.mentions = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.mentions.push(reader.uint64());
                    } else
                        message.mentions.push(reader.uint64());
                    break;
                case 6:
                    message.createdAt = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ChatMsgEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.ChatMsgEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.ChatMsgEvent} ChatMsgEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChatMsgEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ChatMsgEvent message.
         * @function verify
         * @memberof protobuf.ChatMsgEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ChatMsgEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!(message.message && typeof message.message.length === "number" || $util.isString(message.message)))
                    return "message: buffer expected";
            if (message.from != null && message.hasOwnProperty("from"))
                if (!$util.isString(message.from))
                    return "from: string expected";
            if (message.to != null && message.hasOwnProperty("to"))
                if (!$util.isString(message.to))
                    return "to: string expected";
            if (message.emojies != null && message.hasOwnProperty("emojies")) {
                if (!Array.isArray(message.emojies))
                    return "emojies: array expected";
                for (var i = 0; i < message.emojies.length; ++i)
                    if (!$util.isInteger(message.emojies[i]) && !(message.emojies[i] && $util.isInteger(message.emojies[i].low) && $util.isInteger(message.emojies[i].high)))
                        return "emojies: integer|Long[] expected";
            }
            if (message.mentions != null && message.hasOwnProperty("mentions")) {
                if (!Array.isArray(message.mentions))
                    return "mentions: array expected";
                for (var i = 0; i < message.mentions.length; ++i)
                    if (!$util.isInteger(message.mentions[i]) && !(message.mentions[i] && $util.isInteger(message.mentions[i].low) && $util.isInteger(message.mentions[i].high)))
                        return "mentions: integer|Long[] expected";
            }
            if (message.createdAt != null && message.hasOwnProperty("createdAt")) {
                var error = $root.google.protobuf.Timestamp.verify(message.createdAt);
                if (error)
                    return "createdAt." + error;
            }
            return null;
        };

        /**
         * Creates a ChatMsgEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.ChatMsgEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.ChatMsgEvent} ChatMsgEvent
         */
        ChatMsgEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.ChatMsgEvent)
                return object;
            var message = new $root.protobuf.ChatMsgEvent();
            if (object.message != null)
                if (typeof object.message === "string")
                    $util.base64.decode(object.message, message.message = $util.newBuffer($util.base64.length(object.message)), 0);
                else if (object.message.length)
                    message.message = object.message;
            if (object.from != null)
                message.from = String(object.from);
            if (object.to != null)
                message.to = String(object.to);
            if (object.emojies) {
                if (!Array.isArray(object.emojies))
                    throw TypeError(".protobuf.ChatMsgEvent.emojies: array expected");
                message.emojies = [];
                for (var i = 0; i < object.emojies.length; ++i)
                    if ($util.Long)
                        (message.emojies[i] = $util.Long.fromValue(object.emojies[i])).unsigned = true;
                    else if (typeof object.emojies[i] === "string")
                        message.emojies[i] = parseInt(object.emojies[i], 10);
                    else if (typeof object.emojies[i] === "number")
                        message.emojies[i] = object.emojies[i];
                    else if (typeof object.emojies[i] === "object")
                        message.emojies[i] = new $util.LongBits(object.emojies[i].low >>> 0, object.emojies[i].high >>> 0).toNumber(true);
            }
            if (object.mentions) {
                if (!Array.isArray(object.mentions))
                    throw TypeError(".protobuf.ChatMsgEvent.mentions: array expected");
                message.mentions = [];
                for (var i = 0; i < object.mentions.length; ++i)
                    if ($util.Long)
                        (message.mentions[i] = $util.Long.fromValue(object.mentions[i])).unsigned = true;
                    else if (typeof object.mentions[i] === "string")
                        message.mentions[i] = parseInt(object.mentions[i], 10);
                    else if (typeof object.mentions[i] === "number")
                        message.mentions[i] = object.mentions[i];
                    else if (typeof object.mentions[i] === "object")
                        message.mentions[i] = new $util.LongBits(object.mentions[i].low >>> 0, object.mentions[i].high >>> 0).toNumber(true);
            }
            if (object.createdAt != null) {
                if (typeof object.createdAt !== "object")
                    throw TypeError(".protobuf.ChatMsgEvent.createdAt: object expected");
                message.createdAt = $root.google.protobuf.Timestamp.fromObject(object.createdAt);
            }
            return message;
        };

        /**
         * Creates a plain object from a ChatMsgEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.ChatMsgEvent
         * @static
         * @param {protobuf.ChatMsgEvent} message ChatMsgEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ChatMsgEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.emojies = [];
                object.mentions = [];
            }
            if (options.defaults) {
                if (options.bytes === String)
                    object.message = "";
                else {
                    object.message = [];
                    if (options.bytes !== Array)
                        object.message = $util.newBuffer(object.message);
                }
                object.from = "";
                object.to = "";
                object.createdAt = null;
            }
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = options.bytes === String ? $util.base64.encode(message.message, 0, message.message.length) : options.bytes === Array ? Array.prototype.slice.call(message.message) : message.message;
            if (message.from != null && message.hasOwnProperty("from"))
                object.from = message.from;
            if (message.to != null && message.hasOwnProperty("to"))
                object.to = message.to;
            if (message.emojies && message.emojies.length) {
                object.emojies = [];
                for (var j = 0; j < message.emojies.length; ++j)
                    if (typeof message.emojies[j] === "number")
                        object.emojies[j] = options.longs === String ? String(message.emojies[j]) : message.emojies[j];
                    else
                        object.emojies[j] = options.longs === String ? $util.Long.prototype.toString.call(message.emojies[j]) : options.longs === Number ? new $util.LongBits(message.emojies[j].low >>> 0, message.emojies[j].high >>> 0).toNumber(true) : message.emojies[j];
            }
            if (message.mentions && message.mentions.length) {
                object.mentions = [];
                for (var j = 0; j < message.mentions.length; ++j)
                    if (typeof message.mentions[j] === "number")
                        object.mentions[j] = options.longs === String ? String(message.mentions[j]) : message.mentions[j];
                    else
                        object.mentions[j] = options.longs === String ? $util.Long.prototype.toString.call(message.mentions[j]) : options.longs === Number ? new $util.LongBits(message.mentions[j].low >>> 0, message.mentions[j].high >>> 0).toNumber(true) : message.mentions[j];
            }
            if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                object.createdAt = $root.google.protobuf.Timestamp.toObject(message.createdAt, options);
            return object;
        };

        /**
         * Converts this ChatMsgEvent to JSON.
         * @function toJSON
         * @memberof protobuf.ChatMsgEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ChatMsgEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ChatMsgEvent;
    })();

    protobuf.PersonalStateActivityMsgEvent = (function() {

        /**
         * Properties of a PersonalStateActivityMsgEvent.
         * @memberof protobuf
         * @interface IPersonalStateActivityMsgEvent
         * @property {number|Long|null} [activityId] PersonalStateActivityMsgEvent activityId
         * @property {Uint8Array|null} [activityText] PersonalStateActivityMsgEvent activityText
         */

        /**
         * Constructs a new PersonalStateActivityMsgEvent.
         * @memberof protobuf
         * @classdesc Represents a PersonalStateActivityMsgEvent.
         * @implements IPersonalStateActivityMsgEvent
         * @constructor
         * @param {protobuf.IPersonalStateActivityMsgEvent=} [properties] Properties to set
         */
        function PersonalStateActivityMsgEvent(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PersonalStateActivityMsgEvent activityId.
         * @member {number|Long} activityId
         * @memberof protobuf.PersonalStateActivityMsgEvent
         * @instance
         */
        PersonalStateActivityMsgEvent.prototype.activityId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PersonalStateActivityMsgEvent activityText.
         * @member {Uint8Array} activityText
         * @memberof protobuf.PersonalStateActivityMsgEvent
         * @instance
         */
        PersonalStateActivityMsgEvent.prototype.activityText = $util.newBuffer([]);

        /**
         * Creates a new PersonalStateActivityMsgEvent instance using the specified properties.
         * @function create
         * @memberof protobuf.PersonalStateActivityMsgEvent
         * @static
         * @param {protobuf.IPersonalStateActivityMsgEvent=} [properties] Properties to set
         * @returns {protobuf.PersonalStateActivityMsgEvent} PersonalStateActivityMsgEvent instance
         */
        PersonalStateActivityMsgEvent.create = function create(properties) {
            return new PersonalStateActivityMsgEvent(properties);
        };

        /**
         * Encodes the specified PersonalStateActivityMsgEvent message. Does not implicitly {@link protobuf.PersonalStateActivityMsgEvent.verify|verify} messages.
         * @function encode
         * @memberof protobuf.PersonalStateActivityMsgEvent
         * @static
         * @param {protobuf.IPersonalStateActivityMsgEvent} message PersonalStateActivityMsgEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PersonalStateActivityMsgEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.activityId != null && message.hasOwnProperty("activityId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.activityId);
            if (message.activityText != null && message.hasOwnProperty("activityText"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.activityText);
            return writer;
        };

        /**
         * Encodes the specified PersonalStateActivityMsgEvent message, length delimited. Does not implicitly {@link protobuf.PersonalStateActivityMsgEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.PersonalStateActivityMsgEvent
         * @static
         * @param {protobuf.IPersonalStateActivityMsgEvent} message PersonalStateActivityMsgEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PersonalStateActivityMsgEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PersonalStateActivityMsgEvent message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.PersonalStateActivityMsgEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.PersonalStateActivityMsgEvent} PersonalStateActivityMsgEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PersonalStateActivityMsgEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.PersonalStateActivityMsgEvent();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.activityId = reader.int64();
                    break;
                case 2:
                    message.activityText = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PersonalStateActivityMsgEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.PersonalStateActivityMsgEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.PersonalStateActivityMsgEvent} PersonalStateActivityMsgEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PersonalStateActivityMsgEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PersonalStateActivityMsgEvent message.
         * @function verify
         * @memberof protobuf.PersonalStateActivityMsgEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PersonalStateActivityMsgEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.activityId != null && message.hasOwnProperty("activityId"))
                if (!$util.isInteger(message.activityId) && !(message.activityId && $util.isInteger(message.activityId.low) && $util.isInteger(message.activityId.high)))
                    return "activityId: integer|Long expected";
            if (message.activityText != null && message.hasOwnProperty("activityText"))
                if (!(message.activityText && typeof message.activityText.length === "number" || $util.isString(message.activityText)))
                    return "activityText: buffer expected";
            return null;
        };

        /**
         * Creates a PersonalStateActivityMsgEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.PersonalStateActivityMsgEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.PersonalStateActivityMsgEvent} PersonalStateActivityMsgEvent
         */
        PersonalStateActivityMsgEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.PersonalStateActivityMsgEvent)
                return object;
            var message = new $root.protobuf.PersonalStateActivityMsgEvent();
            if (object.activityId != null)
                if ($util.Long)
                    (message.activityId = $util.Long.fromValue(object.activityId)).unsigned = false;
                else if (typeof object.activityId === "string")
                    message.activityId = parseInt(object.activityId, 10);
                else if (typeof object.activityId === "number")
                    message.activityId = object.activityId;
                else if (typeof object.activityId === "object")
                    message.activityId = new $util.LongBits(object.activityId.low >>> 0, object.activityId.high >>> 0).toNumber();
            if (object.activityText != null)
                if (typeof object.activityText === "string")
                    $util.base64.decode(object.activityText, message.activityText = $util.newBuffer($util.base64.length(object.activityText)), 0);
                else if (object.activityText.length)
                    message.activityText = object.activityText;
            return message;
        };

        /**
         * Creates a plain object from a PersonalStateActivityMsgEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.PersonalStateActivityMsgEvent
         * @static
         * @param {protobuf.PersonalStateActivityMsgEvent} message PersonalStateActivityMsgEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PersonalStateActivityMsgEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.activityId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.activityId = options.longs === String ? "0" : 0;
                if (options.bytes === String)
                    object.activityText = "";
                else {
                    object.activityText = [];
                    if (options.bytes !== Array)
                        object.activityText = $util.newBuffer(object.activityText);
                }
            }
            if (message.activityId != null && message.hasOwnProperty("activityId"))
                if (typeof message.activityId === "number")
                    object.activityId = options.longs === String ? String(message.activityId) : message.activityId;
                else
                    object.activityId = options.longs === String ? $util.Long.prototype.toString.call(message.activityId) : options.longs === Number ? new $util.LongBits(message.activityId.low >>> 0, message.activityId.high >>> 0).toNumber() : message.activityId;
            if (message.activityText != null && message.hasOwnProperty("activityText"))
                object.activityText = options.bytes === String ? $util.base64.encode(message.activityText, 0, message.activityText.length) : options.bytes === Array ? Array.prototype.slice.call(message.activityText) : message.activityText;
            return object;
        };

        /**
         * Converts this PersonalStateActivityMsgEvent to JSON.
         * @function toJSON
         * @memberof protobuf.PersonalStateActivityMsgEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PersonalStateActivityMsgEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PersonalStateActivityMsgEvent;
    })();

    protobuf.TheaterLogOnEvent = (function() {

        /**
         * Properties of a TheaterLogOnEvent.
         * @memberof protobuf
         * @interface ITheaterLogOnEvent
         * @property {Uint8Array|null} [room] TheaterLogOnEvent room
         * @property {Uint8Array|null} [token] TheaterLogOnEvent token
         */

        /**
         * Constructs a new TheaterLogOnEvent.
         * @memberof protobuf
         * @classdesc Represents a TheaterLogOnEvent.
         * @implements ITheaterLogOnEvent
         * @constructor
         * @param {protobuf.ITheaterLogOnEvent=} [properties] Properties to set
         */
        function TheaterLogOnEvent(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TheaterLogOnEvent room.
         * @member {Uint8Array} room
         * @memberof protobuf.TheaterLogOnEvent
         * @instance
         */
        TheaterLogOnEvent.prototype.room = $util.newBuffer([]);

        /**
         * TheaterLogOnEvent token.
         * @member {Uint8Array} token
         * @memberof protobuf.TheaterLogOnEvent
         * @instance
         */
        TheaterLogOnEvent.prototype.token = $util.newBuffer([]);

        /**
         * Creates a new TheaterLogOnEvent instance using the specified properties.
         * @function create
         * @memberof protobuf.TheaterLogOnEvent
         * @static
         * @param {protobuf.ITheaterLogOnEvent=} [properties] Properties to set
         * @returns {protobuf.TheaterLogOnEvent} TheaterLogOnEvent instance
         */
        TheaterLogOnEvent.create = function create(properties) {
            return new TheaterLogOnEvent(properties);
        };

        /**
         * Encodes the specified TheaterLogOnEvent message. Does not implicitly {@link protobuf.TheaterLogOnEvent.verify|verify} messages.
         * @function encode
         * @memberof protobuf.TheaterLogOnEvent
         * @static
         * @param {protobuf.ITheaterLogOnEvent} message TheaterLogOnEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TheaterLogOnEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.room != null && message.hasOwnProperty("room"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.room);
            if (message.token != null && message.hasOwnProperty("token"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.token);
            return writer;
        };

        /**
         * Encodes the specified TheaterLogOnEvent message, length delimited. Does not implicitly {@link protobuf.TheaterLogOnEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.TheaterLogOnEvent
         * @static
         * @param {protobuf.ITheaterLogOnEvent} message TheaterLogOnEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TheaterLogOnEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TheaterLogOnEvent message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.TheaterLogOnEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.TheaterLogOnEvent} TheaterLogOnEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TheaterLogOnEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.TheaterLogOnEvent();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.room = reader.bytes();
                    break;
                case 2:
                    message.token = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TheaterLogOnEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.TheaterLogOnEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.TheaterLogOnEvent} TheaterLogOnEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TheaterLogOnEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TheaterLogOnEvent message.
         * @function verify
         * @memberof protobuf.TheaterLogOnEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TheaterLogOnEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.room != null && message.hasOwnProperty("room"))
                if (!(message.room && typeof message.room.length === "number" || $util.isString(message.room)))
                    return "room: buffer expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!(message.token && typeof message.token.length === "number" || $util.isString(message.token)))
                    return "token: buffer expected";
            return null;
        };

        /**
         * Creates a TheaterLogOnEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.TheaterLogOnEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.TheaterLogOnEvent} TheaterLogOnEvent
         */
        TheaterLogOnEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.TheaterLogOnEvent)
                return object;
            var message = new $root.protobuf.TheaterLogOnEvent();
            if (object.room != null)
                if (typeof object.room === "string")
                    $util.base64.decode(object.room, message.room = $util.newBuffer($util.base64.length(object.room)), 0);
                else if (object.room.length)
                    message.room = object.room;
            if (object.token != null)
                if (typeof object.token === "string")
                    $util.base64.decode(object.token, message.token = $util.newBuffer($util.base64.length(object.token)), 0);
                else if (object.token.length)
                    message.token = object.token;
            return message;
        };

        /**
         * Creates a plain object from a TheaterLogOnEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.TheaterLogOnEvent
         * @static
         * @param {protobuf.TheaterLogOnEvent} message TheaterLogOnEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TheaterLogOnEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.room = "";
                else {
                    object.room = [];
                    if (options.bytes !== Array)
                        object.room = $util.newBuffer(object.room);
                }
                if (options.bytes === String)
                    object.token = "";
                else {
                    object.token = [];
                    if (options.bytes !== Array)
                        object.token = $util.newBuffer(object.token);
                }
            }
            if (message.room != null && message.hasOwnProperty("room"))
                object.room = options.bytes === String ? $util.base64.encode(message.room, 0, message.room.length) : options.bytes === Array ? Array.prototype.slice.call(message.room) : message.room;
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = options.bytes === String ? $util.base64.encode(message.token, 0, message.token.length) : options.bytes === Array ? Array.prototype.slice.call(message.token) : message.token;
            return object;
        };

        /**
         * Converts this TheaterLogOnEvent to JSON.
         * @function toJSON
         * @memberof protobuf.TheaterLogOnEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TheaterLogOnEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TheaterLogOnEvent;
    })();

    protobuf.LogOnEvent = (function() {

        /**
         * Properties of a LogOnEvent.
         * @memberof protobuf
         * @interface ILogOnEvent
         * @property {Uint8Array|null} [username] LogOnEvent username
         * @property {Uint8Array|null} [password] LogOnEvent password
         * @property {Uint8Array|null} [token] LogOnEvent token
         */

        /**
         * Constructs a new LogOnEvent.
         * @memberof protobuf
         * @classdesc Represents a LogOnEvent.
         * @implements ILogOnEvent
         * @constructor
         * @param {protobuf.ILogOnEvent=} [properties] Properties to set
         */
        function LogOnEvent(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LogOnEvent username.
         * @member {Uint8Array} username
         * @memberof protobuf.LogOnEvent
         * @instance
         */
        LogOnEvent.prototype.username = $util.newBuffer([]);

        /**
         * LogOnEvent password.
         * @member {Uint8Array} password
         * @memberof protobuf.LogOnEvent
         * @instance
         */
        LogOnEvent.prototype.password = $util.newBuffer([]);

        /**
         * LogOnEvent token.
         * @member {Uint8Array} token
         * @memberof protobuf.LogOnEvent
         * @instance
         */
        LogOnEvent.prototype.token = $util.newBuffer([]);

        /**
         * Creates a new LogOnEvent instance using the specified properties.
         * @function create
         * @memberof protobuf.LogOnEvent
         * @static
         * @param {protobuf.ILogOnEvent=} [properties] Properties to set
         * @returns {protobuf.LogOnEvent} LogOnEvent instance
         */
        LogOnEvent.create = function create(properties) {
            return new LogOnEvent(properties);
        };

        /**
         * Encodes the specified LogOnEvent message. Does not implicitly {@link protobuf.LogOnEvent.verify|verify} messages.
         * @function encode
         * @memberof protobuf.LogOnEvent
         * @static
         * @param {protobuf.ILogOnEvent} message LogOnEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LogOnEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.username != null && message.hasOwnProperty("username"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.username);
            if (message.password != null && message.hasOwnProperty("password"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.password);
            if (message.token != null && message.hasOwnProperty("token"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.token);
            return writer;
        };

        /**
         * Encodes the specified LogOnEvent message, length delimited. Does not implicitly {@link protobuf.LogOnEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.LogOnEvent
         * @static
         * @param {protobuf.ILogOnEvent} message LogOnEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LogOnEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LogOnEvent message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.LogOnEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.LogOnEvent} LogOnEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LogOnEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.LogOnEvent();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.username = reader.bytes();
                    break;
                case 2:
                    message.password = reader.bytes();
                    break;
                case 3:
                    message.token = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LogOnEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.LogOnEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.LogOnEvent} LogOnEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LogOnEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LogOnEvent message.
         * @function verify
         * @memberof protobuf.LogOnEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LogOnEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.username != null && message.hasOwnProperty("username"))
                if (!(message.username && typeof message.username.length === "number" || $util.isString(message.username)))
                    return "username: buffer expected";
            if (message.password != null && message.hasOwnProperty("password"))
                if (!(message.password && typeof message.password.length === "number" || $util.isString(message.password)))
                    return "password: buffer expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!(message.token && typeof message.token.length === "number" || $util.isString(message.token)))
                    return "token: buffer expected";
            return null;
        };

        /**
         * Creates a LogOnEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.LogOnEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.LogOnEvent} LogOnEvent
         */
        LogOnEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.LogOnEvent)
                return object;
            var message = new $root.protobuf.LogOnEvent();
            if (object.username != null)
                if (typeof object.username === "string")
                    $util.base64.decode(object.username, message.username = $util.newBuffer($util.base64.length(object.username)), 0);
                else if (object.username.length)
                    message.username = object.username;
            if (object.password != null)
                if (typeof object.password === "string")
                    $util.base64.decode(object.password, message.password = $util.newBuffer($util.base64.length(object.password)), 0);
                else if (object.password.length)
                    message.password = object.password;
            if (object.token != null)
                if (typeof object.token === "string")
                    $util.base64.decode(object.token, message.token = $util.newBuffer($util.base64.length(object.token)), 0);
                else if (object.token.length)
                    message.token = object.token;
            return message;
        };

        /**
         * Creates a plain object from a LogOnEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.LogOnEvent
         * @static
         * @param {protobuf.LogOnEvent} message LogOnEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LogOnEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.username = "";
                else {
                    object.username = [];
                    if (options.bytes !== Array)
                        object.username = $util.newBuffer(object.username);
                }
                if (options.bytes === String)
                    object.password = "";
                else {
                    object.password = [];
                    if (options.bytes !== Array)
                        object.password = $util.newBuffer(object.password);
                }
                if (options.bytes === String)
                    object.token = "";
                else {
                    object.token = [];
                    if (options.bytes !== Array)
                        object.token = $util.newBuffer(object.token);
                }
            }
            if (message.username != null && message.hasOwnProperty("username"))
                object.username = options.bytes === String ? $util.base64.encode(message.username, 0, message.username.length) : options.bytes === Array ? Array.prototype.slice.call(message.username) : message.username;
            if (message.password != null && message.hasOwnProperty("password"))
                object.password = options.bytes === String ? $util.base64.encode(message.password, 0, message.password.length) : options.bytes === Array ? Array.prototype.slice.call(message.password) : message.password;
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = options.bytes === String ? $util.base64.encode(message.token, 0, message.token.length) : options.bytes === Array ? Array.prototype.slice.call(message.token) : message.token;
            return object;
        };

        /**
         * Converts this LogOnEvent to JSON.
         * @function toJSON
         * @memberof protobuf.LogOnEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LogOnEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LogOnEvent;
    })();

    protobuf.MsgEvent = (function() {

        /**
         * Properties of a MsgEvent.
         * @memberof protobuf
         * @interface IMsgEvent
         * @property {enums.EMSG|null} [type] MsgEvent type
         * @property {Uint8Array|null} [data] MsgEvent data
         * @property {google.protobuf.ITimestamp|null} [createdAt] MsgEvent createdAt
         */

        /**
         * Constructs a new MsgEvent.
         * @memberof protobuf
         * @classdesc Represents a MsgEvent.
         * @implements IMsgEvent
         * @constructor
         * @param {protobuf.IMsgEvent=} [properties] Properties to set
         */
        function MsgEvent(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MsgEvent type.
         * @member {enums.EMSG} type
         * @memberof protobuf.MsgEvent
         * @instance
         */
        MsgEvent.prototype.type = 0;

        /**
         * MsgEvent data.
         * @member {Uint8Array} data
         * @memberof protobuf.MsgEvent
         * @instance
         */
        MsgEvent.prototype.data = $util.newBuffer([]);

        /**
         * MsgEvent createdAt.
         * @member {google.protobuf.ITimestamp|null|undefined} createdAt
         * @memberof protobuf.MsgEvent
         * @instance
         */
        MsgEvent.prototype.createdAt = null;

        /**
         * Creates a new MsgEvent instance using the specified properties.
         * @function create
         * @memberof protobuf.MsgEvent
         * @static
         * @param {protobuf.IMsgEvent=} [properties] Properties to set
         * @returns {protobuf.MsgEvent} MsgEvent instance
         */
        MsgEvent.create = function create(properties) {
            return new MsgEvent(properties);
        };

        /**
         * Encodes the specified MsgEvent message. Does not implicitly {@link protobuf.MsgEvent.verify|verify} messages.
         * @function encode
         * @memberof protobuf.MsgEvent
         * @static
         * @param {protobuf.IMsgEvent} message MsgEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && message.hasOwnProperty("type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.data != null && message.hasOwnProperty("data"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.data);
            if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                $root.google.protobuf.Timestamp.encode(message.createdAt, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified MsgEvent message, length delimited. Does not implicitly {@link protobuf.MsgEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.MsgEvent
         * @static
         * @param {protobuf.IMsgEvent} message MsgEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgEvent message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.MsgEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.MsgEvent} MsgEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.MsgEvent();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.data = reader.bytes();
                    break;
                case 3:
                    message.createdAt = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MsgEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.MsgEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.MsgEvent} MsgEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgEvent message.
         * @function verify
         * @memberof protobuf.MsgEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                    break;
                }
            if (message.data != null && message.hasOwnProperty("data"))
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
            if (message.createdAt != null && message.hasOwnProperty("createdAt")) {
                var error = $root.google.protobuf.Timestamp.verify(message.createdAt);
                if (error)
                    return "createdAt." + error;
            }
            return null;
        };

        /**
         * Creates a MsgEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.MsgEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.MsgEvent} MsgEvent
         */
        MsgEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.MsgEvent)
                return object;
            var message = new $root.protobuf.MsgEvent();
            switch (object.type) {
            case "INVALID":
            case 0:
                message.type = 0;
                break;
            case "LOGON":
            case 1:
                message.type = 1;
                break;
            case "LOGOUT":
            case 2:
                message.type = 2;
                break;
            case "CHAT_MESSAGE":
            case 3:
                message.type = 3;
                break;
            case "THEATER_ONLINE_USERS":
            case 4:
                message.type = 4;
                break;
            case "THEATER_UPDATE_USER":
            case 5:
                message.type = 5;
                break;
            case "PERSONAL_STATE_CHANGED":
            case 6:
                message.type = 6;
                break;
            case "PERSONAL_ACTIVITY_CHANGED":
            case 7:
                message.type = 7;
                break;
            case "THEATER_LOGON":
            case 8:
                message.type = 8;
                break;
            case "THEATER_LOGOUT":
            case 9:
                message.type = 9;
                break;
            case "AUTHORIZED":
            case 10:
                message.type = 10;
                break;
            case "NEW_CHAT_MESSAGE":
            case 11:
                message.type = 11;
                break;
            }
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length)
                    message.data = object.data;
            if (object.createdAt != null) {
                if (typeof object.createdAt !== "object")
                    throw TypeError(".protobuf.MsgEvent.createdAt: object expected");
                message.createdAt = $root.google.protobuf.Timestamp.fromObject(object.createdAt);
            }
            return message;
        };

        /**
         * Creates a plain object from a MsgEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.MsgEvent
         * @static
         * @param {protobuf.MsgEvent} message MsgEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "INVALID" : 0;
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
                object.createdAt = null;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.enums.EMSG[message.type] : message.type;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                object.createdAt = $root.google.protobuf.Timestamp.toObject(message.createdAt, options);
            return object;
        };

        /**
         * Converts this MsgEvent to JSON.
         * @function toJSON
         * @memberof protobuf.MsgEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MsgEvent;
    })();

    return protobuf;
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

        protobuf.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @property {number|Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             */

            /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             */
            function Timestamp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Timestamp seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             * @returns {google.protobuf.Timestamp} Timestamp instance
             */
            Timestamp.create = function create(properties) {
                return new Timestamp(properties);
            };

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                return writer;
            };

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Timestamp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.seconds = reader.int64();
                        break;
                    case 2:
                        message.nanos = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Timestamp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Timestamp} Timestamp
             */
            Timestamp.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Timestamp)
                    return object;
                var message = new $root.google.protobuf.Timestamp();
                if (object.seconds != null)
                    if ($util.Long)
                        (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                    else if (typeof object.seconds === "string")
                        message.seconds = parseInt(object.seconds, 10);
                    else if (typeof object.seconds === "number")
                        message.seconds = object.seconds;
                    else if (typeof object.seconds === "object")
                        message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Timestamp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof google.protobuf.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Timestamp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Timestamp;
        })();

        return protobuf;
    })();

    return google;
})();

$root.enums = (function() {

    /**
     * Namespace enums.
     * @exports enums
     * @namespace
     */
    var enums = {};

    /**
     * EMSG_PERSONAL_STATE enum.
     * @name enums.EMSG_PERSONAL_STATE
     * @enum {string}
     * @property {number} OFFLINE=0 OFFLINE value
     * @property {number} ONLINE=1 ONLINE value
     * @property {number} IDLE=2 IDLE value
     * @property {number} BUSY=3 BUSY value
     * @property {number} INVISIBLE=4 INVISIBLE value
     */
    enums.EMSG_PERSONAL_STATE = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "OFFLINE"] = 0;
        values[valuesById[1] = "ONLINE"] = 1;
        values[valuesById[2] = "IDLE"] = 2;
        values[valuesById[3] = "BUSY"] = 3;
        values[valuesById[4] = "INVISIBLE"] = 4;
        return values;
    })();

    /**
     * EMSG enum.
     * @name enums.EMSG
     * @enum {string}
     * @property {number} INVALID=0 INVALID value
     * @property {number} LOGON=1 LOGON value
     * @property {number} LOGOUT=2 LOGOUT value
     * @property {number} CHAT_MESSAGE=3 CHAT_MESSAGE value
     * @property {number} THEATER_ONLINE_USERS=4 THEATER_ONLINE_USERS value
     * @property {number} THEATER_UPDATE_USER=5 THEATER_UPDATE_USER value
     * @property {number} PERSONAL_STATE_CHANGED=6 PERSONAL_STATE_CHANGED value
     * @property {number} PERSONAL_ACTIVITY_CHANGED=7 PERSONAL_ACTIVITY_CHANGED value
     * @property {number} THEATER_LOGON=8 THEATER_LOGON value
     * @property {number} THEATER_LOGOUT=9 THEATER_LOGOUT value
     * @property {number} AUTHORIZED=10 AUTHORIZED value
     * @property {number} NEW_CHAT_MESSAGE=11 NEW_CHAT_MESSAGE value
     */
    enums.EMSG = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "INVALID"] = 0;
        values[valuesById[1] = "LOGON"] = 1;
        values[valuesById[2] = "LOGOUT"] = 2;
        values[valuesById[3] = "CHAT_MESSAGE"] = 3;
        values[valuesById[4] = "THEATER_ONLINE_USERS"] = 4;
        values[valuesById[5] = "THEATER_UPDATE_USER"] = 5;
        values[valuesById[6] = "PERSONAL_STATE_CHANGED"] = 6;
        values[valuesById[7] = "PERSONAL_ACTIVITY_CHANGED"] = 7;
        values[valuesById[8] = "THEATER_LOGON"] = 8;
        values[valuesById[9] = "THEATER_LOGOUT"] = 9;
        values[valuesById[10] = "AUTHORIZED"] = 10;
        values[valuesById[11] = "NEW_CHAT_MESSAGE"] = 11;
        return values;
    })();

    return enums;
})();

module.exports = $root;
