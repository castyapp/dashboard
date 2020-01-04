/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

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
