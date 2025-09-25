import { Player } from "$lib/components/game/player";
import type { GameConfig } from "$lib/components/game/game-config.svelte";
import type { Move } from "$lib/components/game/move";

export class GameState {
  remainingCoins = $state<number>()!;
  hasEnded = $state<boolean>()!;
  nextPlayer = $state<Player>()!;
  history = $state<Move[]>()!;
  winner = $state<Player>()!;

  constructor(gameConfig: GameConfig) {
    this.remainingCoins = gameConfig.totalCoins;
    this.hasEnded = false;
    this.nextPlayer = gameConfig.goFirst ? Player.YOU : Player.ME;
    this.history = [];
    this.winner = Player.None;
  }

  makeMove(move: Move) {
    move.id = this.history.length + 1;
    this.history.push(move);
    this.remainingCoins -= move.coins;

    if (this.remainingCoins <= 0) {
      this.endGame(this.nextPlayer);
    } else {
      this.nextPlayer = this.nextPlayer === Player.YOU ? Player.ME : Player.YOU;
    }
  }

  endGame(winner: Player) {
    this.winner = winner;
    this.nextPlayer = Player.None;
    this.hasEnded = true;
  }

  getEndGameSummary() {
    if (Player.ME == this.winner) {
      return "Huh, You didn't believe me! Wanna lose again?";
    } else {
      return "Hey, did you know this before? Anyway, want to play again?";
    }
  }

  dispose() {
    this.remainingCoins = 0;
    this.hasEnded = true;
    this.nextPlayer = Player.None;
    this.history = [];
  }
}
