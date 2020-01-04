import {store} from "./store";
import {bus} from "./../main";
import {protobuf, enums} from "./../protocol/protobuf/base";
import {emit} from "./../protocol/messages";
import {Packet} from "./../protocol/protobuf/packet";

class UserWebsocket {
    connect() {

        let user = store.state.user;
        this.ws = new WebSocket(`ws://78.47.129.161:3000/user`);
        this.ws.binaryType = 'arraybuffer';

        this.ws.onopen = () => {
            console.log(`Connected to user[${user.id}] ws!`);
            emit(this.ws, enums.EMSG.LOGON, protobuf.LogOnEvent, {
                token: new Buffer(store.state.token),
            });
        };

        this.ws.onerror = (e) => {
            console.log(`error in WebSocket connection theater [${user.id}]!`);
            console.log(e);
        };

        this.ws.onclose = () => {
            console.log(`disconnect from user [${user.id}] ws!`);
        };

        this.ws.onmessage = (message) => {
            let packet = new Packet(message.data);
            bus.$emit(enums.EMSG[packet.emsg], packet.data);
        };

        return this.ws;
    }
    sendMessage(message, to) {
        emit(this.ws, enums.EMSG.NEW_CHAT_MESSAGE, protobuf.ChatMsgEvent, {
            message: new Buffer(message),
            to,
        });
    }
    disconnect() {
        if (this.ws !== null){
            if (this.ws.readyState === WebSocket.OPEN) {
                this.ws.close();
                this.ws = null;
            }
        }
    }
}

class TheaterWebsocket {
    connect(room) {

        this.ws = new WebSocket(`wss://gateway.irgeek.ir/theater`);
        this.ws.binaryType = 'arraybuffer';
        this.connected = false;

        this.ws.onopen = async () => {
            await emit(this.ws, enums.EMSG.THEATER_LOGON, protobuf.TheaterLogOnEvent, {
                room:  new Buffer(room),
                token: new Buffer(store.state.token),
            });
            this.connected = true;
        };

        this.ws.onerror = (e) => {
            console.log(`error in WebSocket connection theater [${room}]!`);
            console.log(e);
        };

        this.ws.onclose = () => {
            console.log(`disconnect from theater [${room}] ws!`);
            this.connected = false;
        };

        this.ws.onmessage = (message) => {
            let packet = new Packet(message.data);
            bus.$emit(packet.emsg, packet.data);
        };

        return this.ws;
    }
    disconnect() {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.close();
            this.ws = null;
        }
    }
}

export const websocket = {
    user:    new UserWebsocket(),
    theater: new TheaterWebsocket(),
};