<script lang="ts">
  import { Player } from '$lib/components/game/player.js';
  import { Move } from '$lib/components/game/move.js';

  let { gameState = $bindable(), gameConfig } = $props();

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function calculateCoins() {
    if (gameState.remainingCoins % (gameConfig.coinsPerTurn + 1) === 0) {
      return getRandomInt(1, gameConfig.coinsPerTurn);

    } else {
      return gameState.remainingCoins % (gameConfig.coinsPerTurn + 1);
    }
  }

  function makeMyMove(coins: number) {
    let myMove = new Move(Player.ME, coins);
    gameState.makeMove(myMove);
  }
</script>

<div class="lg:w-1/3 grid lg:grid-cols-4 gap-1">
  <div>
    My turn:
  </div>
  <div class="col-span-2">
    {calculateCoins()}
  </div>
</div>