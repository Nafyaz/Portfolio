import type { Player } from "$lib/components/game/player";

export class Move {
  id: number = 0;
  player: Player;
  coins: number;

  constructor(player: Player, coins: number) {
    this.player = player;
    this.coins = coins;
  }
}
