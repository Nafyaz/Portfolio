<script>
  import { Input } from '$lib/components/ui/input/index.js';

  let { value = $bindable() } = $props();
  let readOnly = $state(false);
</script>

<div class="lg:w-1/3 grid lg:grid-cols-4 gap-1">
  <div>
    Your move:
  </div>
  <div class="col-span-2">
    <Input type="number"
           class="inline max-w-3xs max-h-lh"
           bind:value="{value}"
           readonly={readOnly}
           onkeydown={(e) => {
                    if (e.key === 'Enter') {
                      readOnly=true;
                    }
                  }} />
  </div>
</div>