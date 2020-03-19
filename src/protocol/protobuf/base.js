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
         * @property {messages.IUser|null} [user] PersonalStateMsgEvent user
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
         * PersonalStateMsgEvent user.
         * @member {messages.IUser|null|undefined} user
         * @memberof protobuf.PersonalStateMsgEvent
         * @instance
         */
        PersonalStateMsgEvent.prototype.user = null;

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
            if (message.user != null && message.hasOwnProperty("user"))
                $root.messages.User.encode(message.user, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
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
                    message.user = $root.messages.User.decode(reader, reader.uint32());
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
            if (message.user != null && message.hasOwnProperty("user")) {
                var error = $root.messages.User.verify(message.user);
                if (error)
                    return "user." + error;
            }
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
            if (object.user != null) {
                if (typeof object.user !== "object")
                    throw TypeError(".protobuf.PersonalStateMsgEvent.user: object expected");
                message.user = $root.messages.User.fromObject(object.user);
            }
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
                object.user = null;
                object.state = options.enums === String ? "OFFLINE" : 0;
                object.activity = null;
            }
            if (message.user != null && message.hasOwnProperty("user"))
                object.user = $root.messages.User.toObject(message.user, options);
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
         * @property {messages.IUser|null} [user] ChatMsgEvent user
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
         * ChatMsgEvent user.
         * @member {messages.IUser|null|undefined} user
         * @memberof protobuf.ChatMsgEvent
         * @instance
         */
        ChatMsgEvent.prototype.user = null;

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
            if (message.user != null && message.hasOwnProperty("user"))
                $root.messages.User.encode(message.user, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.emojies != null && message.emojies.length) {
                writer.uint32(/* id 5, wireType 2 =*/42).fork();
                for (var i = 0; i < message.emojies.length; ++i)
                    writer.uint64(message.emojies[i]);
                writer.ldelim();
            }
            if (message.mentions != null && message.mentions.length) {
                writer.uint32(/* id 6, wireType 2 =*/50).fork();
                for (var i = 0; i < message.mentions.length; ++i)
                    writer.uint64(message.mentions[i]);
                writer.ldelim();
            }
            if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                $root.google.protobuf.Timestamp.encode(message.createdAt, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
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
                    message.user = $root.messages.User.decode(reader, reader.uint32());
                    break;
                case 5:
                    if (!(message.emojies && message.emojies.length))
                        message.emojies = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.emojies.push(reader.uint64());
                    } else
                        message.emojies.push(reader.uint64());
                    break;
                case 6:
                    if (!(message.mentions && message.mentions.length))
                        message.mentions = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.mentions.push(reader.uint64());
                    } else
                        message.mentions.push(reader.uint64());
                    break;
                case 7:
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
            if (message.user != null && message.hasOwnProperty("user")) {
                var error = $root.messages.User.verify(message.user);
                if (error)
                    return "user." + error;
            }
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
            if (object.user != null) {
                if (typeof object.user !== "object")
                    throw TypeError(".protobuf.ChatMsgEvent.user: object expected");
                message.user = $root.messages.User.fromObject(object.user);
            }
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
                object.user = null;
                object.createdAt = null;
            }
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = options.bytes === String ? $util.base64.encode(message.message, 0, message.message.length) : options.bytes === Array ? Array.prototype.slice.call(message.message) : message.message;
            if (message.from != null && message.hasOwnProperty("from"))
                object.from = message.from;
            if (message.to != null && message.hasOwnProperty("to"))
                object.to = message.to;
            if (message.user != null && message.hasOwnProperty("user"))
                object.user = $root.messages.User.toObject(message.user, options);
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
                case 12:
                case 13:
                case 14:
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
            case "PERSONAL_STATE_CHANGED":
            case 3:
                message.type = 3;
                break;
            case "PERSONAL_ACTIVITY_CHANGED":
            case 4:
                message.type = 4;
                break;
            case "AUTHORIZED":
            case 5:
                message.type = 5;
                break;
            case "UNAUTHORIZED":
            case 6:
                message.type = 6;
                break;
            case "CHAT_MESSAGES":
            case 7:
                message.type = 7;
                break;
            case "LOG_MESSAGES":
            case 8:
                message.type = 8;
                break;
            case "NEW_CHAT_MESSAGE":
            case 9:
                message.type = 9;
                break;
            case "NEW_LOG_MESSAGE":
            case 10:
                message.type = 10;
                break;
            case "MEMBER_STATE_CHANGED":
            case 11:
                message.type = 11;
                break;
            case "THEATER_MEMBERS":
            case 12:
                message.type = 12;
                break;
            case "THEATER_PLAY":
            case 13:
                message.type = 13;
                break;
            case "THEATER_PAUSE":
            case 14:
                message.type = 14;
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

    protobuf.TheaterMembers = (function() {

        /**
         * Properties of a TheaterMembers.
         * @memberof protobuf
         * @interface ITheaterMembers
         * @property {Array.<messages.IUser>|null} [members] TheaterMembers members
         */

        /**
         * Constructs a new TheaterMembers.
         * @memberof protobuf
         * @classdesc Represents a TheaterMembers.
         * @implements ITheaterMembers
         * @constructor
         * @param {protobuf.ITheaterMembers=} [properties] Properties to set
         */
        function TheaterMembers(properties) {
            this.members = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TheaterMembers members.
         * @member {Array.<messages.IUser>} members
         * @memberof protobuf.TheaterMembers
         * @instance
         */
        TheaterMembers.prototype.members = $util.emptyArray;

        /**
         * Creates a new TheaterMembers instance using the specified properties.
         * @function create
         * @memberof protobuf.TheaterMembers
         * @static
         * @param {protobuf.ITheaterMembers=} [properties] Properties to set
         * @returns {protobuf.TheaterMembers} TheaterMembers instance
         */
        TheaterMembers.create = function create(properties) {
            return new TheaterMembers(properties);
        };

        /**
         * Encodes the specified TheaterMembers message. Does not implicitly {@link protobuf.TheaterMembers.verify|verify} messages.
         * @function encode
         * @memberof protobuf.TheaterMembers
         * @static
         * @param {protobuf.ITheaterMembers} message TheaterMembers message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TheaterMembers.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.members != null && message.members.length)
                for (var i = 0; i < message.members.length; ++i)
                    $root.messages.User.encode(message.members[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TheaterMembers message, length delimited. Does not implicitly {@link protobuf.TheaterMembers.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.TheaterMembers
         * @static
         * @param {protobuf.ITheaterMembers} message TheaterMembers message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TheaterMembers.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TheaterMembers message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.TheaterMembers
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.TheaterMembers} TheaterMembers
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TheaterMembers.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.TheaterMembers();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.members && message.members.length))
                        message.members = [];
                    message.members.push($root.messages.User.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TheaterMembers message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.TheaterMembers
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.TheaterMembers} TheaterMembers
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TheaterMembers.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TheaterMembers message.
         * @function verify
         * @memberof protobuf.TheaterMembers
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TheaterMembers.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.members != null && message.hasOwnProperty("members")) {
                if (!Array.isArray(message.members))
                    return "members: array expected";
                for (var i = 0; i < message.members.length; ++i) {
                    var error = $root.messages.User.verify(message.members[i]);
                    if (error)
                        return "members." + error;
                }
            }
            return null;
        };

        /**
         * Creates a TheaterMembers message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.TheaterMembers
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.TheaterMembers} TheaterMembers
         */
        TheaterMembers.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.TheaterMembers)
                return object;
            var message = new $root.protobuf.TheaterMembers();
            if (object.members) {
                if (!Array.isArray(object.members))
                    throw TypeError(".protobuf.TheaterMembers.members: array expected");
                message.members = [];
                for (var i = 0; i < object.members.length; ++i) {
                    if (typeof object.members[i] !== "object")
                        throw TypeError(".protobuf.TheaterMembers.members: object expected");
                    message.members[i] = $root.messages.User.fromObject(object.members[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a TheaterMembers message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.TheaterMembers
         * @static
         * @param {protobuf.TheaterMembers} message TheaterMembers
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TheaterMembers.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.members = [];
            if (message.members && message.members.length) {
                object.members = [];
                for (var j = 0; j < message.members.length; ++j)
                    object.members[j] = $root.messages.User.toObject(message.members[j], options);
            }
            return object;
        };

        /**
         * Converts this TheaterMembers to JSON.
         * @function toJSON
         * @memberof protobuf.TheaterMembers
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TheaterMembers.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TheaterMembers;
    })();

    protobuf.TheaterVideoPlayer = (function() {

        /**
         * Properties of a TheaterVideoPlayer.
         * @memberof protobuf
         * @interface ITheaterVideoPlayer
         * @property {string|null} [theaterId] TheaterVideoPlayer theaterId
         * @property {string|null} [source] TheaterVideoPlayer source
         * @property {string|null} [poster] TheaterVideoPlayer poster
         * @property {number|null} [currentTime] TheaterVideoPlayer currentTime
         * @property {string|null} [userId] TheaterVideoPlayer userId
         * @property {google.protobuf.ITimestamp|null} [sentAt] TheaterVideoPlayer sentAt
         */

        /**
         * Constructs a new TheaterVideoPlayer.
         * @memberof protobuf
         * @classdesc Represents a TheaterVideoPlayer.
         * @implements ITheaterVideoPlayer
         * @constructor
         * @param {protobuf.ITheaterVideoPlayer=} [properties] Properties to set
         */
        function TheaterVideoPlayer(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TheaterVideoPlayer theaterId.
         * @member {string} theaterId
         * @memberof protobuf.TheaterVideoPlayer
         * @instance
         */
        TheaterVideoPlayer.prototype.theaterId = "";

        /**
         * TheaterVideoPlayer source.
         * @member {string} source
         * @memberof protobuf.TheaterVideoPlayer
         * @instance
         */
        TheaterVideoPlayer.prototype.source = "";

        /**
         * TheaterVideoPlayer poster.
         * @member {string} poster
         * @memberof protobuf.TheaterVideoPlayer
         * @instance
         */
        TheaterVideoPlayer.prototype.poster = "";

        /**
         * TheaterVideoPlayer currentTime.
         * @member {number} currentTime
         * @memberof protobuf.TheaterVideoPlayer
         * @instance
         */
        TheaterVideoPlayer.prototype.currentTime = 0;

        /**
         * TheaterVideoPlayer userId.
         * @member {string} userId
         * @memberof protobuf.TheaterVideoPlayer
         * @instance
         */
        TheaterVideoPlayer.prototype.userId = "";

        /**
         * TheaterVideoPlayer sentAt.
         * @member {google.protobuf.ITimestamp|null|undefined} sentAt
         * @memberof protobuf.TheaterVideoPlayer
         * @instance
         */
        TheaterVideoPlayer.prototype.sentAt = null;

        /**
         * Creates a new TheaterVideoPlayer instance using the specified properties.
         * @function create
         * @memberof protobuf.TheaterVideoPlayer
         * @static
         * @param {protobuf.ITheaterVideoPlayer=} [properties] Properties to set
         * @returns {protobuf.TheaterVideoPlayer} TheaterVideoPlayer instance
         */
        TheaterVideoPlayer.create = function create(properties) {
            return new TheaterVideoPlayer(properties);
        };

        /**
         * Encodes the specified TheaterVideoPlayer message. Does not implicitly {@link protobuf.TheaterVideoPlayer.verify|verify} messages.
         * @function encode
         * @memberof protobuf.TheaterVideoPlayer
         * @static
         * @param {protobuf.ITheaterVideoPlayer} message TheaterVideoPlayer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TheaterVideoPlayer.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.theaterId != null && message.hasOwnProperty("theaterId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.theaterId);
            if (message.source != null && message.hasOwnProperty("source"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.source);
            if (message.poster != null && message.hasOwnProperty("poster"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.poster);
            if (message.currentTime != null && message.hasOwnProperty("currentTime"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.currentTime);
            if (message.userId != null && message.hasOwnProperty("userId"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.userId);
            if (message.sentAt != null && message.hasOwnProperty("sentAt"))
                $root.google.protobuf.Timestamp.encode(message.sentAt, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TheaterVideoPlayer message, length delimited. Does not implicitly {@link protobuf.TheaterVideoPlayer.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.TheaterVideoPlayer
         * @static
         * @param {protobuf.ITheaterVideoPlayer} message TheaterVideoPlayer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TheaterVideoPlayer.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TheaterVideoPlayer message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.TheaterVideoPlayer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.TheaterVideoPlayer} TheaterVideoPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TheaterVideoPlayer.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.TheaterVideoPlayer();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.theaterId = reader.string();
                    break;
                case 2:
                    message.source = reader.string();
                    break;
                case 3:
                    message.poster = reader.string();
                    break;
                case 4:
                    message.currentTime = reader.float();
                    break;
                case 5:
                    message.userId = reader.string();
                    break;
                case 6:
                    message.sentAt = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TheaterVideoPlayer message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.TheaterVideoPlayer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.TheaterVideoPlayer} TheaterVideoPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TheaterVideoPlayer.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TheaterVideoPlayer message.
         * @function verify
         * @memberof protobuf.TheaterVideoPlayer
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TheaterVideoPlayer.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.theaterId != null && message.hasOwnProperty("theaterId"))
                if (!$util.isString(message.theaterId))
                    return "theaterId: string expected";
            if (message.source != null && message.hasOwnProperty("source"))
                if (!$util.isString(message.source))
                    return "source: string expected";
            if (message.poster != null && message.hasOwnProperty("poster"))
                if (!$util.isString(message.poster))
                    return "poster: string expected";
            if (message.currentTime != null && message.hasOwnProperty("currentTime"))
                if (typeof message.currentTime !== "number")
                    return "currentTime: number expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isString(message.userId))
                    return "userId: string expected";
            if (message.sentAt != null && message.hasOwnProperty("sentAt")) {
                var error = $root.google.protobuf.Timestamp.verify(message.sentAt);
                if (error)
                    return "sentAt." + error;
            }
            return null;
        };

        /**
         * Creates a TheaterVideoPlayer message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.TheaterVideoPlayer
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.TheaterVideoPlayer} TheaterVideoPlayer
         */
        TheaterVideoPlayer.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.TheaterVideoPlayer)
                return object;
            var message = new $root.protobuf.TheaterVideoPlayer();
            if (object.theaterId != null)
                message.theaterId = String(object.theaterId);
            if (object.source != null)
                message.source = String(object.source);
            if (object.poster != null)
                message.poster = String(object.poster);
            if (object.currentTime != null)
                message.currentTime = Number(object.currentTime);
            if (object.userId != null)
                message.userId = String(object.userId);
            if (object.sentAt != null) {
                if (typeof object.sentAt !== "object")
                    throw TypeError(".protobuf.TheaterVideoPlayer.sentAt: object expected");
                message.sentAt = $root.google.protobuf.Timestamp.fromObject(object.sentAt);
            }
            return message;
        };

        /**
         * Creates a plain object from a TheaterVideoPlayer message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.TheaterVideoPlayer
         * @static
         * @param {protobuf.TheaterVideoPlayer} message TheaterVideoPlayer
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TheaterVideoPlayer.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.theaterId = "";
                object.source = "";
                object.poster = "";
                object.currentTime = 0;
                object.userId = "";
                object.sentAt = null;
            }
            if (message.theaterId != null && message.hasOwnProperty("theaterId"))
                object.theaterId = message.theaterId;
            if (message.source != null && message.hasOwnProperty("source"))
                object.source = message.source;
            if (message.poster != null && message.hasOwnProperty("poster"))
                object.poster = message.poster;
            if (message.currentTime != null && message.hasOwnProperty("currentTime"))
                object.currentTime = options.json && !isFinite(message.currentTime) ? String(message.currentTime) : message.currentTime;
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.sentAt != null && message.hasOwnProperty("sentAt"))
                object.sentAt = $root.google.protobuf.Timestamp.toObject(message.sentAt, options);
            return object;
        };

        /**
         * Converts this TheaterVideoPlayer to JSON.
         * @function toJSON
         * @memberof protobuf.TheaterVideoPlayer
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TheaterVideoPlayer.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TheaterVideoPlayer;
    })();

    return protobuf;
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
     * @property {number} PERSONAL_STATE_CHANGED=3 PERSONAL_STATE_CHANGED value
     * @property {number} PERSONAL_ACTIVITY_CHANGED=4 PERSONAL_ACTIVITY_CHANGED value
     * @property {number} AUTHORIZED=5 AUTHORIZED value
     * @property {number} UNAUTHORIZED=6 UNAUTHORIZED value
     * @property {number} CHAT_MESSAGES=7 CHAT_MESSAGES value
     * @property {number} LOG_MESSAGES=8 LOG_MESSAGES value
     * @property {number} NEW_CHAT_MESSAGE=9 NEW_CHAT_MESSAGE value
     * @property {number} NEW_LOG_MESSAGE=10 NEW_LOG_MESSAGE value
     * @property {number} MEMBER_STATE_CHANGED=11 MEMBER_STATE_CHANGED value
     * @property {number} THEATER_MEMBERS=12 THEATER_MEMBERS value
     * @property {number} THEATER_PLAY=13 THEATER_PLAY value
     * @property {number} THEATER_PAUSE=14 THEATER_PAUSE value
     */
    enums.EMSG = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "INVALID"] = 0;
        values[valuesById[1] = "LOGON"] = 1;
        values[valuesById[2] = "LOGOUT"] = 2;
        values[valuesById[3] = "PERSONAL_STATE_CHANGED"] = 3;
        values[valuesById[4] = "PERSONAL_ACTIVITY_CHANGED"] = 4;
        values[valuesById[5] = "AUTHORIZED"] = 5;
        values[valuesById[6] = "UNAUTHORIZED"] = 6;
        values[valuesById[7] = "CHAT_MESSAGES"] = 7;
        values[valuesById[8] = "LOG_MESSAGES"] = 8;
        values[valuesById[9] = "NEW_CHAT_MESSAGE"] = 9;
        values[valuesById[10] = "NEW_LOG_MESSAGE"] = 10;
        values[valuesById[11] = "MEMBER_STATE_CHANGED"] = 11;
        values[valuesById[12] = "THEATER_MEMBERS"] = 12;
        values[valuesById[13] = "THEATER_PLAY"] = 13;
        values[valuesById[14] = "THEATER_PAUSE"] = 14;
        return values;
    })();

    return enums;
})();

$root.messages = (function() {

    /**
     * Namespace messages.
     * @exports messages
     * @namespace
     */
    var messages = {};

    /**
     * PERSONAL_STATE enum.
     * @name messages.PERSONAL_STATE
     * @enum {string}
     * @property {number} OFFLINE=0 OFFLINE value
     * @property {number} ONLINE=1 ONLINE value
     * @property {number} IDLE=2 IDLE value
     * @property {number} BUSY=3 BUSY value
     * @property {number} INVISIBLE=4 INVISIBLE value
     */
    messages.PERSONAL_STATE = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "OFFLINE"] = 0;
        values[valuesById[1] = "ONLINE"] = 1;
        values[valuesById[2] = "IDLE"] = 2;
        values[valuesById[3] = "BUSY"] = 3;
        values[valuesById[4] = "INVISIBLE"] = 4;
        return values;
    })();

    messages.Activity = (function() {

        /**
         * Properties of an Activity.
         * @memberof messages
         * @interface IActivity
         * @property {string|null} [id] Activity id
         * @property {string|null} [activity] Activity activity
         */

        /**
         * Constructs a new Activity.
         * @memberof messages
         * @classdesc Represents an Activity.
         * @implements IActivity
         * @constructor
         * @param {messages.IActivity=} [properties] Properties to set
         */
        function Activity(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Activity id.
         * @member {string} id
         * @memberof messages.Activity
         * @instance
         */
        Activity.prototype.id = "";

        /**
         * Activity activity.
         * @member {string} activity
         * @memberof messages.Activity
         * @instance
         */
        Activity.prototype.activity = "";

        /**
         * Creates a new Activity instance using the specified properties.
         * @function create
         * @memberof messages.Activity
         * @static
         * @param {messages.IActivity=} [properties] Properties to set
         * @returns {messages.Activity} Activity instance
         */
        Activity.create = function create(properties) {
            return new Activity(properties);
        };

        /**
         * Encodes the specified Activity message. Does not implicitly {@link messages.Activity.verify|verify} messages.
         * @function encode
         * @memberof messages.Activity
         * @static
         * @param {messages.IActivity} message Activity message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Activity.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.activity != null && message.hasOwnProperty("activity"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.activity);
            return writer;
        };

        /**
         * Encodes the specified Activity message, length delimited. Does not implicitly {@link messages.Activity.verify|verify} messages.
         * @function encodeDelimited
         * @memberof messages.Activity
         * @static
         * @param {messages.IActivity} message Activity message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Activity.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Activity message from the specified reader or buffer.
         * @function decode
         * @memberof messages.Activity
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {messages.Activity} Activity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Activity.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.messages.Activity();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.activity = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Activity message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof messages.Activity
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {messages.Activity} Activity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Activity.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Activity message.
         * @function verify
         * @memberof messages.Activity
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Activity.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.activity != null && message.hasOwnProperty("activity"))
                if (!$util.isString(message.activity))
                    return "activity: string expected";
            return null;
        };

        /**
         * Creates an Activity message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof messages.Activity
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {messages.Activity} Activity
         */
        Activity.fromObject = function fromObject(object) {
            if (object instanceof $root.messages.Activity)
                return object;
            var message = new $root.messages.Activity();
            if (object.id != null)
                message.id = String(object.id);
            if (object.activity != null)
                message.activity = String(object.activity);
            return message;
        };

        /**
         * Creates a plain object from an Activity message. Also converts values to other types if specified.
         * @function toObject
         * @memberof messages.Activity
         * @static
         * @param {messages.Activity} message Activity
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Activity.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = "";
                object.activity = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.activity != null && message.hasOwnProperty("activity"))
                object.activity = message.activity;
            return object;
        };

        /**
         * Converts this Activity to JSON.
         * @function toJSON
         * @memberof messages.Activity
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Activity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Activity;
    })();

    messages.User = (function() {

        /**
         * Properties of a User.
         * @memberof messages
         * @interface IUser
         * @property {string|null} [id] User id
         * @property {string|null} [fullname] User fullname
         * @property {string|null} [username] User username
         * @property {string|null} [hash] User hash
         * @property {string|null} [email] User email
         * @property {string|null} [password] User password
         * @property {boolean|null} [isActive] User isActive
         * @property {string|null} [avatar] User avatar
         * @property {messages.IActivity|null} [activity] User activity
         * @property {messages.PERSONAL_STATE|null} [state] User state
         * @property {google.protobuf.ITimestamp|null} [lastLogin] User lastLogin
         * @property {google.protobuf.ITimestamp|null} [joinedAt] User joinedAt
         * @property {google.protobuf.ITimestamp|null} [updatedAt] User updatedAt
         */

        /**
         * Constructs a new User.
         * @memberof messages
         * @classdesc Represents a User.
         * @implements IUser
         * @constructor
         * @param {messages.IUser=} [properties] Properties to set
         */
        function User(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * User id.
         * @member {string} id
         * @memberof messages.User
         * @instance
         */
        User.prototype.id = "";

        /**
         * User fullname.
         * @member {string} fullname
         * @memberof messages.User
         * @instance
         */
        User.prototype.fullname = "";

        /**
         * User username.
         * @member {string} username
         * @memberof messages.User
         * @instance
         */
        User.prototype.username = "";

        /**
         * User hash.
         * @member {string} hash
         * @memberof messages.User
         * @instance
         */
        User.prototype.hash = "";

        /**
         * User email.
         * @member {string} email
         * @memberof messages.User
         * @instance
         */
        User.prototype.email = "";

        /**
         * User password.
         * @member {string} password
         * @memberof messages.User
         * @instance
         */
        User.prototype.password = "";

        /**
         * User isActive.
         * @member {boolean} isActive
         * @memberof messages.User
         * @instance
         */
        User.prototype.isActive = false;

        /**
         * User avatar.
         * @member {string} avatar
         * @memberof messages.User
         * @instance
         */
        User.prototype.avatar = "";

        /**
         * User activity.
         * @member {messages.IActivity|null|undefined} activity
         * @memberof messages.User
         * @instance
         */
        User.prototype.activity = null;

        /**
         * User state.
         * @member {messages.PERSONAL_STATE} state
         * @memberof messages.User
         * @instance
         */
        User.prototype.state = 0;

        /**
         * User lastLogin.
         * @member {google.protobuf.ITimestamp|null|undefined} lastLogin
         * @memberof messages.User
         * @instance
         */
        User.prototype.lastLogin = null;

        /**
         * User joinedAt.
         * @member {google.protobuf.ITimestamp|null|undefined} joinedAt
         * @memberof messages.User
         * @instance
         */
        User.prototype.joinedAt = null;

        /**
         * User updatedAt.
         * @member {google.protobuf.ITimestamp|null|undefined} updatedAt
         * @memberof messages.User
         * @instance
         */
        User.prototype.updatedAt = null;

        /**
         * Creates a new User instance using the specified properties.
         * @function create
         * @memberof messages.User
         * @static
         * @param {messages.IUser=} [properties] Properties to set
         * @returns {messages.User} User instance
         */
        User.create = function create(properties) {
            return new User(properties);
        };

        /**
         * Encodes the specified User message. Does not implicitly {@link messages.User.verify|verify} messages.
         * @function encode
         * @memberof messages.User
         * @static
         * @param {messages.IUser} message User message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        User.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.fullname != null && message.hasOwnProperty("fullname"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.fullname);
            if (message.username != null && message.hasOwnProperty("username"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.username);
            if (message.hash != null && message.hasOwnProperty("hash"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.hash);
            if (message.email != null && message.hasOwnProperty("email"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.email);
            if (message.password != null && message.hasOwnProperty("password"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.password);
            if (message.isActive != null && message.hasOwnProperty("isActive"))
                writer.uint32(/* id 7, wireType 0 =*/56).bool(message.isActive);
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.avatar);
            if (message.activity != null && message.hasOwnProperty("activity"))
                $root.messages.Activity.encode(message.activity, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.state != null && message.hasOwnProperty("state"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.state);
            if (message.lastLogin != null && message.hasOwnProperty("lastLogin"))
                $root.google.protobuf.Timestamp.encode(message.lastLogin, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
            if (message.joinedAt != null && message.hasOwnProperty("joinedAt"))
                $root.google.protobuf.Timestamp.encode(message.joinedAt, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
            if (message.updatedAt != null && message.hasOwnProperty("updatedAt"))
                $root.google.protobuf.Timestamp.encode(message.updatedAt, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified User message, length delimited. Does not implicitly {@link messages.User.verify|verify} messages.
         * @function encodeDelimited
         * @memberof messages.User
         * @static
         * @param {messages.IUser} message User message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        User.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a User message from the specified reader or buffer.
         * @function decode
         * @memberof messages.User
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {messages.User} User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        User.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.messages.User();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.fullname = reader.string();
                    break;
                case 3:
                    message.username = reader.string();
                    break;
                case 4:
                    message.hash = reader.string();
                    break;
                case 5:
                    message.email = reader.string();
                    break;
                case 6:
                    message.password = reader.string();
                    break;
                case 7:
                    message.isActive = reader.bool();
                    break;
                case 8:
                    message.avatar = reader.string();
                    break;
                case 9:
                    message.activity = $root.messages.Activity.decode(reader, reader.uint32());
                    break;
                case 10:
                    message.state = reader.int32();
                    break;
                case 11:
                    message.lastLogin = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                    break;
                case 12:
                    message.joinedAt = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                    break;
                case 13:
                    message.updatedAt = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a User message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof messages.User
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {messages.User} User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        User.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a User message.
         * @function verify
         * @memberof messages.User
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        User.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.fullname != null && message.hasOwnProperty("fullname"))
                if (!$util.isString(message.fullname))
                    return "fullname: string expected";
            if (message.username != null && message.hasOwnProperty("username"))
                if (!$util.isString(message.username))
                    return "username: string expected";
            if (message.hash != null && message.hasOwnProperty("hash"))
                if (!$util.isString(message.hash))
                    return "hash: string expected";
            if (message.email != null && message.hasOwnProperty("email"))
                if (!$util.isString(message.email))
                    return "email: string expected";
            if (message.password != null && message.hasOwnProperty("password"))
                if (!$util.isString(message.password))
                    return "password: string expected";
            if (message.isActive != null && message.hasOwnProperty("isActive"))
                if (typeof message.isActive !== "boolean")
                    return "isActive: boolean expected";
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                if (!$util.isString(message.avatar))
                    return "avatar: string expected";
            if (message.activity != null && message.hasOwnProperty("activity")) {
                var error = $root.messages.Activity.verify(message.activity);
                if (error)
                    return "activity." + error;
            }
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
            if (message.lastLogin != null && message.hasOwnProperty("lastLogin")) {
                var error = $root.google.protobuf.Timestamp.verify(message.lastLogin);
                if (error)
                    return "lastLogin." + error;
            }
            if (message.joinedAt != null && message.hasOwnProperty("joinedAt")) {
                var error = $root.google.protobuf.Timestamp.verify(message.joinedAt);
                if (error)
                    return "joinedAt." + error;
            }
            if (message.updatedAt != null && message.hasOwnProperty("updatedAt")) {
                var error = $root.google.protobuf.Timestamp.verify(message.updatedAt);
                if (error)
                    return "updatedAt." + error;
            }
            return null;
        };

        /**
         * Creates a User message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof messages.User
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {messages.User} User
         */
        User.fromObject = function fromObject(object) {
            if (object instanceof $root.messages.User)
                return object;
            var message = new $root.messages.User();
            if (object.id != null)
                message.id = String(object.id);
            if (object.fullname != null)
                message.fullname = String(object.fullname);
            if (object.username != null)
                message.username = String(object.username);
            if (object.hash != null)
                message.hash = String(object.hash);
            if (object.email != null)
                message.email = String(object.email);
            if (object.password != null)
                message.password = String(object.password);
            if (object.isActive != null)
                message.isActive = Boolean(object.isActive);
            if (object.avatar != null)
                message.avatar = String(object.avatar);
            if (object.activity != null) {
                if (typeof object.activity !== "object")
                    throw TypeError(".messages.User.activity: object expected");
                message.activity = $root.messages.Activity.fromObject(object.activity);
            }
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
            if (object.lastLogin != null) {
                if (typeof object.lastLogin !== "object")
                    throw TypeError(".messages.User.lastLogin: object expected");
                message.lastLogin = $root.google.protobuf.Timestamp.fromObject(object.lastLogin);
            }
            if (object.joinedAt != null) {
                if (typeof object.joinedAt !== "object")
                    throw TypeError(".messages.User.joinedAt: object expected");
                message.joinedAt = $root.google.protobuf.Timestamp.fromObject(object.joinedAt);
            }
            if (object.updatedAt != null) {
                if (typeof object.updatedAt !== "object")
                    throw TypeError(".messages.User.updatedAt: object expected");
                message.updatedAt = $root.google.protobuf.Timestamp.fromObject(object.updatedAt);
            }
            return message;
        };

        /**
         * Creates a plain object from a User message. Also converts values to other types if specified.
         * @function toObject
         * @memberof messages.User
         * @static
         * @param {messages.User} message User
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        User.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = "";
                object.fullname = "";
                object.username = "";
                object.hash = "";
                object.email = "";
                object.password = "";
                object.isActive = false;
                object.avatar = "";
                object.activity = null;
                object.state = options.enums === String ? "OFFLINE" : 0;
                object.lastLogin = null;
                object.joinedAt = null;
                object.updatedAt = null;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.fullname != null && message.hasOwnProperty("fullname"))
                object.fullname = message.fullname;
            if (message.username != null && message.hasOwnProperty("username"))
                object.username = message.username;
            if (message.hash != null && message.hasOwnProperty("hash"))
                object.hash = message.hash;
            if (message.email != null && message.hasOwnProperty("email"))
                object.email = message.email;
            if (message.password != null && message.hasOwnProperty("password"))
                object.password = message.password;
            if (message.isActive != null && message.hasOwnProperty("isActive"))
                object.isActive = message.isActive;
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                object.avatar = message.avatar;
            if (message.activity != null && message.hasOwnProperty("activity"))
                object.activity = $root.messages.Activity.toObject(message.activity, options);
            if (message.state != null && message.hasOwnProperty("state"))
                object.state = options.enums === String ? $root.messages.PERSONAL_STATE[message.state] : message.state;
            if (message.lastLogin != null && message.hasOwnProperty("lastLogin"))
                object.lastLogin = $root.google.protobuf.Timestamp.toObject(message.lastLogin, options);
            if (message.joinedAt != null && message.hasOwnProperty("joinedAt"))
                object.joinedAt = $root.google.protobuf.Timestamp.toObject(message.joinedAt, options);
            if (message.updatedAt != null && message.hasOwnProperty("updatedAt"))
                object.updatedAt = $root.google.protobuf.Timestamp.toObject(message.updatedAt, options);
            return object;
        };

        /**
         * Converts this User to JSON.
         * @function toJSON
         * @memberof messages.User
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        User.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return User;
    })();

    return messages;
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

module.exports = $root;
