class MemHeap {
  constructor() {
    setInterval(this.get, 1000);
  }
  get() {
    const memMB = process.memoryUsage().heapUsed / 1024 / 1024;
    $(`[data-role='memHeapCurrent']`).text(memMB.toFixed(2) + ' MB')
  }
}
