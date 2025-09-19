<script lang="ts">
  import { Player } from '$lib/components/game/player.js';
  import { Move } from '$lib/components/game/move.js';

  let { gameState = $bindable(), gameConfig } = $props();

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async function wait(remainingSteps: number) {
    let waitingTime;
    if (remainingSteps < 2) {
      waitingTime = 0;
    } else if (remainingSteps < 6) {
      waitingTime = getRandomInt(0, 500);
    } else {
      waitingTime = getRandomInt(500, 2000);
    }

    await new Promise(r => setTimeout(r, waitingTime));
  }

  async function calculateCoins() {
    await wait(gameState.remainingCoins / (gameConfig.coinsPerTurn + 1));

    const coins = gameState.remainingCoins % (gameConfig.coinsPerTurn + 1);
    return coins === 0 ? getRandomInt(1, gameConfig.coinsPerTurn) : coins;
  }

  function makeMyMove(coins: number) {
    let myMove = new Move(Player.ME, coins);
    gameState.makeMove(myMove);
  }

  async function calculateAndMakeMove() {
    const coins = await calculateCoins();
    makeMyMove(coins);
    return coins;
  }

</script>

<div class="grid lg:grid-cols-4 gap-1">
  <div>
    My turn:
  </div>
  <div class="col-span-2">
    <svelte:boundary>
      <p>{await calculateAndMakeMove()}</p>

      {#snippet pending()}
        <p>let me think...</p>
      {/snippet}
    </svelte:boundary>

  </div>
</div>