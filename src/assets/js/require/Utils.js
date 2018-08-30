class Utils {
  static calculateValidPrice(coins){
    coins = Math.round(coins);
    if(coins < 150) return 150;
    if(coins < 1000) return coins - (coins % 50);
    if(coins < 10000) return  coins - (coins % 100);
    if(coins < 50000) return coins - (coins % 250);
    if(coins < 100000) return coins - (coins % 500);
    return coins - (coins % 1000);
  }
  static calculateNextLowerPrice(coins) {
      coins = this.calculateValidPrice(coins);
      if(coins <= 150) return 150;
      if(coins <= 1000) return coins - 50;
      if(coins <= 10000) return  coins - 100;
      if(coins <= 50000) return coins - 250;
      if(coins <= 100000) return coins - 500;
      return coins - 1000;
  }
}
