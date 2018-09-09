class ListExpandable {
  constructor() {
    $(window).on('resize', () => {
      this.update();
    })
  }
  update() {
    $(".listExpandable").each(function () {
      $(this).attr("data-scrollbar-visible", "1");
      if ($(this).hasScrollBar()) {
        $(this).attr("data-scrollbar-visible", "1");
      } else {
        $(this).attr("data-scrollbar-visible", "0");
      }
    });
  }

}

const listExpandable = new ListExpandable();
