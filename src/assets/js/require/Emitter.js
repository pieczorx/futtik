class Emitter {
  constructor() {
    this.emitListeners = [];
  }

  on(t, f) {
    this.emitListeners[this.emitListeners.length] = {t, f};
  }

  emit(t, d) {
    for(let i = 0; i < this.emitListeners.length) {
      const emitListener = this.emitListeners[i];
      if(emitListener.t == t) {
        emitListener.f(d);
      }
    }
  }
}
