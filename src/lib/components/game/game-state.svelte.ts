import { Player } from "$lib/components/game/player";
import type { GameConfig } from "$lib/components/game/game-config.svelte";
import type { Move } from "$lib/components/game/move";

export class GameState {
  remainingCoins = $state<number>()!;
  hasEnded = $state<boolean>()!;
  nextPlayer = $state<Player>()!;
  history = $state<Move[]>()!;

  constructor(gameConfig: GameConfig) {
    this.remainingCoins = gameConfig.totalCoins;
    this.hasEnded = false;
    this.nextPlayer = gameConfig.goFirst ? Player.YOU : Player.ME;
    this.history = [];
  }

  makeMove(move: Move) {
    move.id = this.history.length + 1;
    this.history.push(move);
    this.remainingCoins -= move.coins;
    this.nextPlayer = this.nextPlayer === Player.YOU ? Player.ME : Player.YOU;

    if (this.remainingCoins <= 0) {
      this.endGame();
    }
  }

  endGame() {
    this.hasEnded = true;
    this.nextPlayer = Player.None;
  }

  getEndGameSummary() {
    return "end game summary.";
  }

  dispose() {
    this.remainingCoins = 0;
    this.hasEnded = true;
    this.nextPlayer = Player.None;
    this.history = [];
  }
}
