class Platform extends Emitter {
  constructor() {
    super();
    let that = this;
    $(document).on('click', `[data-role='platformChanger'] .e`, function() {
      const platform = $(this).attr('data-platform');
      that.changePlatform(platform);
    });
  }

  changePlatform(platform) {
    $(`[data-role='platformChanger'] .e`).attr('data-current', 0);
    console.log(`[data-role='platformChanger'] .e[data-platform='${platform}']`)
    $(`[data-role='platformChanger'] .e[data-platform='${platform}']`).attr('data-current', 1);
    this.current = platform;
  }
}
