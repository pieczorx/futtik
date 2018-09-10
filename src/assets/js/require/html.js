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
      <input type="number" name="min" value="${p.min}"/>
      -
      <input type="number" name="max" value="${p.max}"/>
      Sell steps
      <input type="number" name="sellSteps" value="${p.sellSteps}"/>
      Profit
      <input type="number" name="minProfit" value="${p.minProfit}"/>
    </div>
    `;
  }
}
