class Backup {
  start() {
    this.timeout = setTimeout(() => {
      this.saveAll();
    }, settings.AUTOMATIC_BACKUP_INTERVAL);
  }

  async saveAll() {
    console.warn('AUTOBACKUP: MAKING BACKUP OF ALL DATA...');
    clearTimeout(this.timeout)
    await autoBuyer.saveAll();
    console.warn('AUTOBACKUP: DONE');
    this.timeout = setTimeout(() => {
      this.saveAll();
    }, settings.AUTOMATIC_BACKUP_INTERVAL);
  }
}
