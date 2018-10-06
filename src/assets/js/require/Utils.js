const colorRarities = {
  //Common
  "0-bronze": "bronze",
  "0-silver": "silver",
  "0-gold": "gold",

  //Rare
  "1-bronze": "rare_bronze",
  "1-silver": "rare_silver",
  "1-gold": "rare_gold",

  //Totw
  "3-bronze": "totw_bronze",
  "3-silver": "totw_silver",
  "3-gold": "totw_gold",


  "4": "hero",

  "6": "record_breaker",

  "8": "motm",
  "9": "pink",
  "10": "pro_player",

  "12": "legend",

  "18-bronze": "fut_champions_bronze",
  "18-silver": "fut_champions_silver",
  "18-gold": "fut_champions_gold",

  "21": "otw",
  "22": "halloween",

  "24": "sbc",
  "25": "sbc_premium",

  "28": "award_winner",

  "42": "potm_bundesliga",
  "43": "potm_pl", //premier league
  "44": "sbc_europe", //sbc_europa
  "45": "motm_europe",
  "46": "europe_live",
  "47": "cl", //champions league
  "48": "cl_rare",
  "49": "motm_cl",
  "50": "cl_live",
  "51": "sbc_flashback",
  "52": "fut_swap_1",
  "53": "fut_swap_2",
  "54": "fut_swap_3",
  "55": "fut_swap_4",
  "56": "fut_swap_5",
  "57": "fut_swap_6",
  "58": "fut_swap_7",
  "59": "fut_swap_8",
  "60": "fut_swap_9",
  "61": "fut_swap_10",
  "62": "fut_swap_11",
  "63": "fut_swap_reward",


  "68": "tott_europa",
  "69": "sbc_ul",
  "70": "tott_ucl",


  "78": "europe_league"
};
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

  static calculateNextLowerPrice(coins, isValid = false) {
    if(!isValid) {
      coins = this.calculateValidPrice(coins);
    }
      if(coins <= 150) return 150;
      if(coins <= 1000) return coins - 50;
      if(coins <= 10000) return  coins - 100;
      if(coins <= 50000) return coins - 250;
      if(coins <= 100000) return coins - 500;
      return coins - 1000;
  }

  static calculateNextHigherPrice(coins, isValid = false) {
      if(!isValid) {
        coins = this.calculateValidPrice(coins);
      }
      if(coins >= 100000) return coins + 1000;
      if(coins >= 50000) return coins + 500;
      if(coins >= 10000) return coins + 250;
      if(coins >= 1000) return coins + 100;
      return coins + 50;
  }

  static randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static getPlayerColor(color, rarityId) {
    const colorUnique = rarityId + '-' + color;
    if(colorRarities[colorUnique]) {
      return colorRarities[colorUnique];
    }

    if(colorRarities[rarityId]) {
      return colorRarities[rarityId];
    }

    return colorUnique;
  }

  static formatPlayer(player) {
    let newPlayer = {};
    Object.assign(newPlayer, player);
    newPlayer.color = Utils.getPlayerColor(player.quality, player.rarityId)
    return newPlayer;
  }
}
