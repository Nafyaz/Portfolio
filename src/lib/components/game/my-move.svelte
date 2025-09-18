<script lang="ts">
  import { Player } from '$lib/components/game/player.js';
  import { Move } from '$lib/components/game/move.js';
  import { onMount } from 'svelte';

  let { gameState = $bindable(), gameConfig } = $props();
  let myCoins = $state<number>()!;

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function makeMyMove(coins: number) {
    let myMove = new Move(Player.ME, coins);
    gameState.makeMove(myMove);
  }

  function calculateCoins() {
    const coins = gameState.remainingCoins % (gameConfig.coinsPerTurn + 1);

    return coins === 0 ? getRandomInt(1, gameConfig.coinsPerTurn) : coins;
  }

  onMount(() => {
    const coins = calculateCoins();
    gameState.makeMove(new Move(Player.ME, coins));
    myCoins = coins;
  });
</script>

<div class="grid lg:grid-cols-4 gap-1">
  <div>
    My turn:
  </div>
  <div class="col-span-2">
    <!--    <svelte:boundary>-->
    <!--      &lt;!&ndash;      <p>{await delayed('hello!')}</p>&ndash;&gt;-->

    <!--      {#snippet pending()}-->
    <!--        <p>let me think...</p>-->
    <!--      {/snippet}-->
    <!--    </svelte:boundary>-->

    {myCoins}
  </div>
</div>