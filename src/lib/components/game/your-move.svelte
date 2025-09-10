<script>
  import { Input } from '$lib/components/ui/input/index.js';
</script>

Your move: <Input type="number" bind:value="{yourCoins}" onkeydown={(e) => {
                            if (e.key === 'Enter') {

                            }
                          }} />