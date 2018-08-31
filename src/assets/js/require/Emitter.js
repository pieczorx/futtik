class Emitter {
  constructor() {
    this.emitListeners = [];
  }

  on(t, f) {
    this.emitListeners.push({t, f});
  }

  emit(t, d) {
    this.emitListeners.forEach(emitListener => {
      if(emitListener.t == t) {
        emitListener.f(d);
      }
    });
  }
}
