<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { GameState } from '$lib/entities/game/game-state.svelte.js';
  import { GameConfig } from '$lib/entities/game/game-config.svelte.js';
  import { Player } from '$lib/entities/game/player';
  import YourMove from './your-move.svelte';
  import MyMove from './my-move.svelte';

  let gameConfig = new GameConfig(20, 2, false);
  let gameState: GameState | null = $state(null);

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
    <GameConfig bind:gameState={gameState} bind:gameConfig={gameConfig} />
  </div>

  {#if gameState != null}
    <div class="p-2">
      <div class="bg-gray-200 rounded-md font-mono py-2 px-1">
        {gameConfig.getStartGameMessage()}
      </div>

      <div class="my-4 lg:flex lg:flex-row-reverse">
        <div class="lg:w-2/3 p-2 border-b lg:border-b-0 lg:border-l">
          <h1 class="font-bold">Current Stats</h1>
          <p>
            Remaining Coins: {gameState.remainingCoins}
          </p>
          <p>
            Next Player: {gameState.nextPlayer}
          </p>
        </div>
        <div class="lg:w-1/3 h-80 overflow-y-auto p-2">
          <div class="grid lg:grid-cols-4 gap-1">
            {#each gameState.history as move (move.id)}
              <div>
                {#if (move.player === Player.YOU)}
                  Your turn:
                {:else if (move.player === Player.ME)}
                  My turn:
                {/if}
              </div>
              <div class="col-span-3">
                {move.coins}
              </div>
            {/each}
          </div>

          {#if gameState.nextPlayer === Player.ME}
            <MyMove bind:gameState={gameState} gameConfig={gameConfig} />
          {:else if gameState.nextPlayer === Player.YOU}
            <YourMove bind:gameState={gameState} />
          {/if}
        </div>
      </div>
    </div>

    {#if gameState.hasEnded}
      {gameState.getEndGameSummary()}
      <Button onclick={restart}>Restart</Button>
    {:else}
      <div class="my-2">
        <Button onclick={() => gameState?.endGame(Player.ME)}>Accept Defeat</Button>
      </div>
    {/if}
  {/if}
</div>