const ProtoMask = 0x80000000;
import {enums, protobuf} from "./../protocol/protobuf/base";

function new_client_msg_protobuf(eMsg, type, body) {
    if (eMsg == null){
        eMsg = enums.EMSG.INVALID;
    }
    let header = new MsgHdrProtoBuf(eMsg);
    return new ClientMsgProtobuf({header, body, type})
}

function emit(conn, eMsg, type, body) {
    let buffer = new Buffer(4);
    let cmp = new_client_msg_protobuf(eMsg, type, body);
    buffer = cmp.serialize(buffer);
    conn.send(buffer);
}

class ClientMsgProtobuf {
    constructor(props) {
        this.props = props;
    }
    serialize(buffer) {
        let newBuffer = this.props.header.serialize(buffer);
        let body = this.props.type.create(this.props.body);
        let buffered = Buffer.from(this.props.type.encode(body).finish());
        return Buffer.concat([newBuffer, buffered]);
    }
}

class MsgHdrProtoBuf {
    constructor(eMsg) {
        this.emsg = eMsg | ProtoMask;
        this.proto = protobuf.CMsgProtoBufHeader;
    }
    serialize(buffer) {
        let headerEntry = {
            UserHash: "",
            AuthToken: "",
            SessionClientId: 0,
            IpAddr: "",
        };
        let body = this.proto.create(headerEntry);
        let buffered = new Int32Array(this.proto.encode(body).finish());
        let headerBuffer = new Buffer(4);
        headerBuffer.writeInt32LE(buffered.length, 0, 1);
        let hBuffer = Buffer.concat([headerBuffer, Buffer.from(buffered)]);
        buffer.writeInt32LE(this.emsg, 0, 1);
        return Buffer.concat([buffer, hBuffer])
    }
}

export {
    MsgHdrProtoBuf,
    ClientMsgProtobuf,
    new_client_msg_protobuf,
    emit,
};