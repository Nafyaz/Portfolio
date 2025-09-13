export class GameConfig {
  totalCoins: number;
  coinsPerTurn: number;
  goFirst: boolean;

  constructor(totalCoins: number, coinsPerTurn: number, goFirst: boolean) {
    this.totalCoins = totalCoins;
    this.coinsPerTurn = coinsPerTurn;
    this.goFirst = goFirst;
  }

  getStartGameMessage() {
    return `Game has started with ${this.totalCoins} coins on the board and each of us can take at most ${this.coinsPerTurn} coins
      per turn. ${this.goFirst ? "You go first." : "I am going first."}`;
  }
}
