import {store} from "./store";
import {bus} from "./../main";
import {proto} from "casty-proto/pbjs/proto";
import {Packet} from "casty-proto/pbjs/packet";
import {emit} from "casty-proto/pbjs/protocol";

class UserWebsocket {
    connect() {

        if (store.state.token === null || store.state.user === null){
            return
        }

        let user = store.state.user;
        this.ws = new WebSocket(process.env.VUE_APP_API_USER_WEBSOCKET_URI);
        this.ws.binaryType = 'arraybuffer';

        this.ws.onopen = () => {
            console.log(`Connected to user[${user.id}] ws!`);
            emit(this.ws, proto.EMSG.LOGON, proto.LogOnEvent, {
                token: new Buffer(store.state.token),
            });
        };

        this.ws.onerror = e => {
            console.error('Socket encountered error: ', e.message, 'Closing socket');
            this.ws.close();
        };

        this.ws.onclose = () => {
            console.log(`disconnect from user [${user.id}] ws!`);
        };

        this.ws.onmessage = (message) => {
            let packet = new Packet(message.data);
            if (proto.EMSG.UNAUTHORIZED === packet.emsg){
                console.log("Unauthorized! try to refresh token!");
            }
            bus.$emit(proto.EMSG[packet.emsg], packet.data);
        };

        setInterval(this.ping, 50000, this.ws);

        return this.ws;
    }
    ping(ws) {
        if (ws.readyState !== 1) return;
        emit(ws, proto.EMSG.PING, proto.PingMsgEvent, {});
    }
    sendPacket(eNUM, pROTO, payload) {
        emit(this.ws, eNUM, pROTO, payload);
    }
    sendMessage(message, to) {
        emit(this.ws, proto.EMSG.NEW_CHAT_MESSAGE, proto.ChatMsgEvent, {
            message: new Buffer(message),
            to,
        });
    }
    disconnect() {
        if (typeof this.ws !== 'undefined' && this.ws !== null){
            if (this.ws.readyState === WebSocket.OPEN) {
                this.ws.close();
                this.ws = null;
            }
        }
    }
}

class TheaterWebsocket {
    connect(room) {

        if (store.state.token == null || store.state.user == null){
            return
        }

        this.ws = new WebSocket(process.env.VUE_APP_API_THEATER_WEBSOCKET_URI);
        this.ws.binaryType = 'arraybuffer';

        this.ws.onopen = () => {
            emit(this.ws, proto.EMSG.LOGON, proto.TheaterLogOnEvent, {
                room:  new Buffer(room),
                token: new Buffer(store.state.token),
            });
        };

        this.ws.onerror = e => {
            console.error('Socket encountered error: ', e.message, 'Closing socket');
            this.ws.close();
        };

        this.ws.onclose = () => {
            console.log(`disconnect from theater [${room}] ws!`);
        };

        this.ws.onmessage = (message) => {
            let packet = new Packet(message.data);
            if (packet.emsg === proto.EMSG.AUTHORIZED) {
                bus.$emit("theater-connected", this);
            } else {
                bus.$emit(proto.EMSG[packet.emsg], packet.data);
            }
        };

        setInterval(this.ping, 50000, this.ws);

        return this;
    }
    ping(ws) {
        if (ws.readyState !== 1) return;
        emit(ws, proto.EMSG.PING, proto.PingMsgEvent, {});
    }
    sendMessage(message) {
        emit(this.ws, proto.EMSG.NEW_CHAT_MESSAGE, proto.ChatMsgEvent, {
            message: new Buffer(message),
        });
    }
    disconnect() {
        if (typeof this.ws !== 'undefined' && this.ws !== null){
            if (this.ws.readyState === WebSocket.OPEN) {
                this.ws.close();
                this.ws = null;
            }
        }
    }
}

export const websocket = {
    user:    new UserWebsocket(),
    theater: new TheaterWebsocket(),
};