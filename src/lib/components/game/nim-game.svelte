<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Button } from '$lib/components/ui/button';
  import { Label } from '$lib/components/ui/label';
  import { GameState } from '$lib/components/game/game-state.svelte';
  import { GameConfig } from '$lib/components/game/game-config.svelte';
  import { Player } from '$lib/components/game/player';
  import YourMove from './your-move.svelte';
  import MyMove from './my-move.svelte';

  let gameConfig = new GameConfig(20, 2, false);
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
        <Label for="totalCoins">Total Number of coins:</Label>
      </div>
      <div>
        <Input id="totalCoins" class="inline-block align-middle max-w-3xs max-h-lh" type="number"
               readonly={gameState != null}
               bind:value="{gameConfig.totalCoins}" />
      </div>
      <div>
        <Label for="coinsPerTurn">Maximum Number of coins per turn:</Label>
      </div>
      <div>
        <Input id="coinsPerTurn" class="inline-block align-middle max-w-3xs max-h-lh" type="number"
               readonly={gameState != null}
               bind:value="{gameConfig.coinsPerTurn}" />
      </div>
      <div>
        <Label for="goFirst">Do you want to go first?</Label>
      </div>
      <div>
        <Checkbox id="goFirst" class="inline-block align-middle max-w-3xs max-h-lh" readonly={gameState != null}
                  bind:checked="{gameConfig.goFirst}" />
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

      <div class="my-4 min-h-80 flex">
        <div class="lg:w-1/3">
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
        <div class="lg:w-2/3">
          <h1 class="font-bold">Current Stats</h1>
          <p>
            Remaining Coins: {gameState.remainingCoins}
          </p>
          <p>
            Next Player: {gameState.nextPlayer}
          </p>
        </div>
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