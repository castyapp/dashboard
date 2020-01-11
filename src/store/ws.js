import {store} from "./store";
import {bus} from "./../main";
import {protobuf, enums} from "./../protocol/protobuf/base";
import {emit} from "./../protocol/messages";
import {Packet} from "./../protocol/protobuf/packet";

class UserWebsocket {
    connect() {

        if (store.state.token === null || store.state.user === null){
            return
        }

        let user = store.state.user;
        this.ws = new WebSocket(`wss://gateway.irgeek.ir/user`);
        this.ws.binaryType = 'arraybuffer';

        this.ws.onopen = () => {
            console.log(`Connected to user[${user.id}] ws!`);
            emit(this.ws, enums.EMSG.LOGON, protobuf.LogOnEvent, {
                token: new Buffer(store.state.token),
            });
        };

        this.ws.onerror = e => {
            console.error('Socket encountered error: ', e.message, 'Closing socket');
            this.ws.close();
        };

        let thisWebs = this;
        this.ws.onclose = e => {

            this.connected = false;
            console.log(`disconnect from user [${user.id}] ws!`);

            if (store.state.token !== null){
                console.log(`Reconnect will be attempted in 1 second. ${e.reason}!`);
                setTimeout(function() {
                    thisWebs.connect();
                }, 2000);
            }

        };

        this.ws.onmessage = (message) => {
            let packet = new Packet(message.data);

            if (enums.EMSG.UNAUTHORIZED === packet.emsg){
                thisWebs.disconnect();
                console.log("Unauthorized! try to refresh token!");
                store.dispatch("refreshToken").then(() => {
                    thisWebs.connect();
                });
            }

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

        this.ws = new WebSocket(`wss://gateway.irgeek.ir/theater`);
        this.ws.binaryType = 'arraybuffer';
        this.connected = false;

        this.ws.onopen = async () => {
            await emit(this.ws, enums.EMSG.THEATER_LOGON, protobuf.TheaterLogOnEvent, {
                room:  new Buffer(room),
                token: new Buffer(store.state.token),
            });

            store.dispatch("getTheaterMembers", room)
                .then(response => {
                    bus.$emit("theater-connected", response.data.result);
                }).catch(err => {
                    console.log(err);
                });

            this.connected = true;
        };

        this.ws.onerror = e => {
            console.error('Socket encountered error: ', e.message, 'Closing socket');
            this.ws.close();
        };

        let thisWebs = this;
        this.ws.onclose = e => {

            this.connected = false;
            console.log(`disconnect from theater [${room}] ws!`);

            if (store.state.token !== null){
                console.log(`Reconnect will be attempted in 1 second. ${e.reason}!`);
                setTimeout(function() {
                    thisWebs.connect(room);
                }, 1000);
            }

        };

        this.ws.onmessage = (message) => {
            let packet = new Packet(message.data);
            bus.$emit(enums.EMSG[packet.emsg], packet.data);
        };

        return this.ws;
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