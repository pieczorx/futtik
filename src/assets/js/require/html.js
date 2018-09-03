class html {
  static captchaListElement(p) {
    return `
    <div class="e l radius" data-id="${p.id}">
      <div class="wrapper w100">
        <div class="arrow left"><i class="fas fa-undo"></i></div>
        <div class="arrow right"><i class="fas fa-undo fa-flip-horizontal"></i></div>
        <img src="${p.imgUrl}" class="l"/>
      </div>
      <button class="radius l w100">Solve</button>
    </div>
    `;
  }
}
