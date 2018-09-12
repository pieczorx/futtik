class html {
  static captchaListElement(p) {
    return `
    <div class="e l radius" data-role="captchaListElement" data-id="${p.id}" data-slices="${p.slices}" data-spins="0">
      <div class="wrapper w100">
        <div class="arrow left" data-role="captchaElementSpin" data-direction="right"><i class="fas fa-undo"></i></div>
        <div class="arrow right" data-role="captchaElementSpin" data-direction="left"><i class="fas fa-undo fa-flip-horizontal"></i></div>
        <img src="${p.imgUrl}" class="l"/>
      </div>
      <button class="radius l w100">Solve</button>
    </div>
    `;
  }

  static priceStepListElement(p) {
    return `
    <div class="e w100">
      <input type="number" class="radius" name="min" value="${p.min}"/>
      -
      <input type="number" class="radius" name="max" value="${p.max}"/>
      Sell steps
      <input type="number" class="radius" name="sellSteps" value="${p.sellSteps}"/>
      Profit
      <input type="number" class="radius" name="minProfit" value="${p.minProfit}"/>
    </div>
    `;
  }

  static popupChooseListCategory(p) {
    return `
    <div class="e w100" data-name="${p.name}" data-role="popupChooseListCategory">
      <div class="w100 header">
        <div class="title l">${p.title}</div>
        <div class="selectAll r" data-role="popupChooseListSelectAll">Select all</div>
      </div>
      <div class="w100 sub">
      ${p.list.map(e => {
        return html.popupChooseListSubCategory(e);
      }).join('')}
      </div>
    </div>
    `
  }

  static popupChooseListSubCategory(p) {
    return `
    <div class="e2 l radius" data-role="popupChooseListElement" data-name="${p.name}">
      <div class="title l">${p.title}</div>
    </div>
    `;
  }
}
