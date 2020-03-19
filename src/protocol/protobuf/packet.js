import {enums} from "./base";
import {Reader} from "protobufjs";

const EMsgMask  = 2147483647;

class Packet {
    constructor(data) {
        let reader = Reader.create(new Buffer(data));
        let rawEMsg = reader.fixed32() >>> 0;
        this.emsg = rawEMsg & EMsgMask;
        this.data = reader;
        if (this.is_proto(this.emsg)){
            this.proto = true;
        }
        return this;
    }
    is_proto() {
        return this.emsg !== enums.INVALID
    }
}

export {
    Packet,
};