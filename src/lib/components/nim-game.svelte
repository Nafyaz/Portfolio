<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Button } from '$lib/components/ui/button';

  let totalCoins = $state(20);
  let coinsPerTurn = $state(2);
  let goFirst = $state(false);

  let remainingCoins = $state();
  let hasStarted = $state(false);
  let hasEnded = $state(false);
  let gameHistory = $state<string[]>([]);

  let yourCoins = $state();
  let myCoins = $state();

  function startGame() {
    remainingCoins = totalCoins;
    hasStarted = true;
  }

  function getLastMoveSummary() {
    if (gameHistory.length === 0) {
      return `Game has started with ${totalCoins} coins on the board and each of us can take at most ${coinsPerTurn} coins
      per turn. ${goFirst ? 'You go first.' : 'I am going first.'}`;
    }

    const yourMove = `You took ${yourCoins} coins.`;
    const myMove = `I took ${myCoins} coins.`;

    return `We had ${remainingCoins} coins left. ${goFirst ? yourMove + myMove : myMove + yourMove}`;
  }

  function endGame() {
    hasEnded = true;
  }

  function restart() {
    hasStarted = false;
    hasEnded = false;
  }

  function getEndGameSummary() {
    return 'end game summary.';
  }

</script>

<div class="mx-10 my-8 border-2 p-2">
  <div class="my-2">
    <span class="font-bold"> Rules: </span> There is a pre-defined number of coins at the start of the game. Also, each
    player on their turn can take any number of coins from 1 to n (also pre-defined). Whichever player takes the last
    coin wins the game.
  </div>

  <div class="my-2">
    <p class="font-bold"> Configuration: </p>

    <div class="grid md:grid-cols-2 gap-1">
      <div>
        Total Number of coins:
      </div>
      <div>
        <Input disabled={hasStarted} class="inline max-w-3xs" type="number" bind:value="{totalCoins}" />
      </div>
      <div>
        Maximum Number of coins per turn:
      </div>
      <div>
        <Input disabled={hasStarted} class="inline max-w-3xs" type="number" bind:value="{coinsPerTurn}" />
      </div>
      <div>
        Do you want to go first?
      </div>
      <div>
        <Checkbox disabled={hasStarted} class="inline max-w-3xs" bind:checked={goFirst} />
      </div>
    </div>
  </div>

  {#if !hasStarted}
    <div class="my-2">
      <Button onclick={startGame}>Start</Button>
    </div>
  {:else}
    <div class="bg-gray-200 p-2 font-mono">
      {getLastMoveSummary()}

      {#if goFirst}
        Your move: <Input type="number" bind:value="{yourCoins}" />
        <!--        My move: {getMyMove()}-->
      {:else}
        <!--        My move: {getMyMove()}-->
        Your move: <Input type="number" bind:value="{yourCoins}" />
      {/if}
    </div>

    {#if hasEnded}
      {getEndGameSummary()}
      <Button onclick={restart}>Restart</Button>
    {:else}
      <div class="my-2">
        <Button onclick={endGame}>Accept Defeat</Button>
      </div>
    {/if}
  {/if}
</div>