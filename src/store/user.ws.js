import log from './logging'
import {store} from './store'
import {bus} from '../main'
import {proto} from 'casty-proto/pbjs/ws.bundle'
import {Packet} from 'casty-proto/protocol/packet'
import {emit} from 'casty-proto/protocol/protocol'

class UserWebsocket {
    connect() {

        if (store.state.token === null || store.state.user === null){
            return
        }

        let user = store.state.user;
        this.ws = new WebSocket(process.env.VUE_APP_API_USER_WEBSOCKET_URI);
        this.ws.binaryType = 'arraybuffer';

        this.ws.onopen = () => {
            log("USER GATEWAY", `Connected to user[${user.id}] gateway!`, 'green');
            emit(this.ws, proto.EMSG.LOGON, proto.LogOnEvent, {
                token: new Buffer(store.state.token),
            });
        };

        this.ws.onerror = e => {
            console.error('Socket encountered error: ', e.message, 'Closing socket');
            this.ws.close();
        };

        this.ws.onclose = () => {
            log("USER GATEWAY", `disconnected from user [${user.id}] gateway!`, 'red');
        };

        this.ws.onmessage = (message) => {
            let packet = new Packet(message.data);
            if (proto.EMSG.UNAUTHORIZED === packet.emsg){
                log("USER GATEWAY", "Unauthorized! try to refresh token!", 'red');
            }
            bus.$emit(proto.EMSG[packet.emsg], packet.data);
        };

        setInterval(this.ping, 5000, this.ws);

        return this.ws;
    }
    ping(ws) {
        if (ws.readyState !== 1) return;
        emit(ws, proto.EMSG.PING, proto.PingMsgEvent, {});
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

export default new UserWebsocket()