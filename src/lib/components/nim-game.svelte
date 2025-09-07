<script lang="ts">
  import { Input } from '$lib/components/ui/input/index.js';
  import { Checkbox } from '$lib/components/ui/checkbox/index.js';

  let coins = $state(20);
  let coinsPerTurn = $state(2);
  let goFirst = $state(false);
  //
  // function takeCoins(num: number) {
  //   coins.set(coins() - num);
  // }

</script>

<div class="m-8 border-2 p-2">
  <p class="my-2">
    <span class="font-bold"> Rules: </span> There is a pre-defined number of coins at the start of the game. Also, each
    player on their turn can take any number of coins from 1 to n (also pre-defined). Whichever player takes the last
    coin wins the game.
  </p>

  <p class="my-2">
    <span class="font-bold"> Configuration: </span>
    <br />
    Total Number of coins: <Input class="inline max-w-3xs h-fit" type="number" bind:value="{coins}" />
    <br />
    Maximum Number of coins per turn: <Input class="inline max-w-3xs" type="number" bind:value="{coinsPerTurn}" />
    <br />
    Do you want to go first?
    <Checkbox class="inline max-w-3xs" bind:checked={goFirst} />
  </p>
</div>