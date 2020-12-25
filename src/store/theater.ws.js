import log from './logging'
import {store} from './store'
import {proto} from 'casty-proto/pbjs/ws.bundle'
import {Packet} from 'casty-proto/protocol/packet'
import {emit} from 'casty-proto/protocol/protocol'

export default class TheaterWebsocket {

  ws;
  room;
  component;
  forceClose = false;
  reconnectTries = 0;

  constructor(vueComponent) {
    this.component = vueComponent;
  }

  connect(room) {
    this.room = room;
    this.ws = new WebSocket(process.env.VUE_APP_API_THEATER_WEBSOCKET_URI);
    this.ws.binaryType = 'arraybuffer';

    this.ws.onopen = () => {
      if (store.getters.loggedIn) {
        emit(this.ws, proto.EMSG.LOGON, proto.TheaterLogOnEvent, {
          room:  new Buffer(room),
          token: new Buffer(store.state.token),
        });
      } else {
        emit(this.ws, proto.EMSG.LOGON, proto.TheaterLogOnEvent, {
          room:  new Buffer(room),
        });
      }
    };

    this.ws.onerror = e => {
      console.error('Socket encountered error: ', e.message, 'Closing socket');
      this.ws.close();
    };

    this.ws.onclose = () => {
      if (!this.forceClose) {
        this.reconnectTries++;
        log("THEATER GATEWAY", `disconnected from theater [${room}] gateway!`, 'red');
        if (this.reconnectTries < 5) {
          this.connect(this.room);
        }
      }
    };

    this.ws.onmessage = (message) => {
      let packet = new Packet(message.data);
      if (packet.emsg === proto.EMSG.AUTHORIZED) {
        this.component.$emit("theater-connected", this);
      } else {
        this.component.$emit(proto.EMSG[packet.emsg], packet);
      }
    };

    setInterval(this.ping, 10000, this.ws);

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
        this.forceClose = true;
        this.ws.close();
        this.ws = null;
        this.component.$emit("theater-disconnected", this.socket);
      }
    }
  }
}
