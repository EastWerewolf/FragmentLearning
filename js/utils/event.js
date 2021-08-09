class EventEmitter extends EventTarget {
    on = this.addEventListener;
    off = this.removeEventListener;
    emit = (type, data) => this.dispatchEvent(new CustomEvent(type, { detail: data }));
    once = (type, callback) => this.on(type, callback, { once: true, capture: true });
}

var emitter = new EventEmitter();
function onEventX(ev) {
    console.log("event-x 收到数据:", ev.detail);
}
// 订阅
emitter.on("event-x", onEventX);
emitter.once("event-once", ev => console.log("event-once 收到数据:", ev.detail))
​
// 发布
emitter.emit("event-once", { uid: -100, message: "you love me" })
emitter.emit("event-once", { uid: -100, message: "you love me" })
​
emitter.emit("event-x", { uid: 100, message: "i love you" })
emitter.off("event-x", onEventX);
emitter.emit("event-x", { uid: 100, message: "i love you" })

