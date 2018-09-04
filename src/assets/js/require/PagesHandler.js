class PagesHandler {
  constructor() {
    this.instances = [];
    let that = this;
    $(window).on('resize', function() {
      that.updateRwd();
    });
  }
  add(name, instance) {
    this.instances.push({name: name, instance: instance});
  }
  stop() {
    for(let instance of this.instances) {
      if(instance.instance._stop) {
        instance.instance._stop();
      }
    }
  }
  load(pages, options) {
    this.currentPages = pages;
    return new Promise(async (resolve, reject) => {
      if(typeof(pages) == 'string') {
        pages = [pages];
      }

      for(let instance of this.instances) {
        if(pages.includes(instance.name)) {

          try {
            instance.instance._updateRwd()
          } catch(e) {

          }

          try {
            if(instance.instance._load) {
              await instance.instance._load(options);
            }
          } catch(e) {
            console.log(e);
            // alrt.show('somethingWentWrong');
            return reject();
          }
        }
      }
      resolve();
    });

  }

  stopAndLoad() {

  }

  updateRwd() {
    if(!this.currentPages) {
      return;
    }
    this.instances.forEach(instance => {
      if(this.currentPages.includes(instance.name)) {
        try {
          instance.instance._updateRwd();
        } catch(e) {

        }
      }
    });
  }
}
