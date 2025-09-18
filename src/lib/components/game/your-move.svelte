<script lang="ts">
  import { Input } from '$lib/components/ui/input/index.js';
  import { Move } from '$lib/components/game/move.js';
  import { Player } from '$lib/components/game/player.js';

  let { gameState = $bindable() } = $props();
  let coins = $state(1);
  let readOnly = $state(false);

  function makeYourMove() {
    let yourMove = new Move(Player.YOU, coins);
    gameState.makeMove(yourMove);

    coins = 0;
    readOnly = false;
  }

</script>

<div class="grid lg:grid-cols-4 gap-1">
  <div>
    Your turn:
  </div>
  <div class="col-span-2">
    <Input type="number"
           class="inline-block align-middle max-w-3xs max-h-lh"
           bind:value="{coins}"
           readonly={readOnly}
           onkeydown={(e) => {
                    if (e.key === 'Enter') {
                      readOnly=true;
                      makeYourMove();
                    }
                  }} />
  </div>
</div>