<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Button } from '$lib/components/ui/button';
  import YourMove from './your-move.svelte';
  import MyMove from './my-move.svelte';
  import { GameState } from '$lib/components/game/game-state';
  import { GameConfig } from '$lib/components/game/game-config';
  import { Player } from '$lib/components/game/player';

  let gameConfig = $state<GameConfig>(new GameConfig(20, 2, false));
  let gameState: GameState | null = $state(null);

  function startGame() {
    gameState = new GameState(gameConfig);
  }

  function restart() {
    gameState?.dispose();
    gameState = null;
  }

</script>

<div class="mx-10 my-8 border-2 p-2">
  <div class="my-2">
    <span class="font-bold"> Rules: </span> There is a pre-defined number of coins at the start of the game. Also, each
    player on their turn can take any number of coins from 1 to n (also pre-defined). Whichever player takes the last
    coin wins the game.
  </div>

  <div class="my-2 lg:w-1/2">
    <p class="font-bold"> Configuration: </p>

    <div class="grid lg:grid-cols-2 gap-1">
      <div>
        Total Number of coins:
      </div>
      <div>
        <Input readonly={gameState != null} class="inline max-w-3xs max-h-lh" type="number"
               bind:value="{gameConfig.totalCoins}" />
      </div>
      <div>
        Maximum Number of coins per turn:
      </div>
      <div>
        <Input readonly={gameState != null} class="inline max-w-3xs max-h-lh" type="number"
               bind:value="{gameConfig.coinsPerTurn}" />
      </div>
      <div>
        Do you want to go first?
      </div>
      <div>
        <Checkbox readonly={gameState != null} class="inline max-w-3xs max-h-lh" bind:checked={gameConfig.goFirst} />
      </div>
    </div>
  </div>

  {#if gameState == null}
    <div class="my-2">
      <Button onclick={startGame}>Start</Button>
    </div>
  {:else}
    <div class="p-2">
      <div class="bg-gray-200 rounded-md font-mono py-2 px-1">
        {gameConfig.getStartGameMessage()}
      </div>

      <div class="my-4 min-h-80">
        {#each gameState.history as move (move.id)}
          move: {move}
        {/each}
        {#if gameState.nextPlayer === Player.YOU}
          <YourMove bind:gameState={gameState} />
        {:else if gameState.nextPlayer === Player.ME}
          <MyMove bind:gameState={gameState} gameConfig={gameConfig} />
        {/if}
      </div>
    </div>

    {#if gameState.hasEnded}
      {gameState.getEndGameSummary()}
      <Button onclick={restart}>Restart</Button>
    {:else}
      <div class="my-2">
        <Button onclick={gameState.endGame}>Accept Defeat</Button>
      </div>
    {/if}
  {/if}
</div>