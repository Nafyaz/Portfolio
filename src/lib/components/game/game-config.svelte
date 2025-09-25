<script lang="ts">
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Label } from '$lib/components/ui/label';
  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';
  import * as Form from '$lib/components/ui/form';
  // import { GameState } from '$lib/entities/game/game-state.svelte.js';
  import { GameConfig } from '$lib/entities/game/game-config.svelte.js';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { type GameConfigSchema, gameConfigSchema } from '$lib/schemas/game/game-config-schema';

  let hasStarted = $state(false);
  let gameConfig: GameConfig | null = $state(null);

  const form = superForm(gameConfigSchema.parse({}), {
    SPA: true,
    validationMethod: 'oninput',
    validators: zodClient(gameConfigSchema),
    resetForm: false,
    onUpdated: ({ form }) => {
      if (form.valid) {
        //   Enable submit button
      } else {
        // Disable submit button
      }
    },
    onSubmit: ({ form }) => {
      if (form.valid) {
        startGame($formData);
      }
    }
  });

  const { form: formData, enhance } = form;

  function startGame(data: GameConfigSchema) {
    gameConfig = new GameConfig(data.totalCoins, data.coinsPerTurn, data.goFirst);
    // gameState = new GameState(gameConfig);
    hasStarted = true;
  }
</script>

<p class="font-bold"> Configuration: </p>

<form method="POST" use:enhance>
  <div class="grid lg:grid-cols-2 gap-1">
    <Form.Field {form} name="totalCoins">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Total Number of coins:</Form.Label>
          <Input {...props} bind:value={$formData.totalCoins} />
        {/snippet}
      </Form.Control>
      <!--      <Form.Description>This is your public display name.</Form.Description>-->
      <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="coinsPerTurn">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Maximum Number of coins per turn:</Form.Label>
          <Input {...props} bind:value={$formData.coinsPerTurn} />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="goFirst">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Do you want to go first:</Form.Label>
          <Checkbox {...props} bind:checked={$formData.goFirst} />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <!--    <div>-->
    <!--      <Label for="totalCoins">Total Number of coins:</Label>-->
    <!--    </div>-->
    <!--    <div>-->
    <!--      <Input id="totalCoins" class="inline-block align-middle max-w-3xs max-h-lh" type="number"-->
    <!--             readonly={hasStarted}-->
    <!--             bind:value="{$form.totalCoins}" />-->
    <!--    </div>-->


    <!--    <div>-->
    <!--      <Label for="coinsPerTurn">Maximum Number of coins per turn:</Label>-->
    <!--    </div>-->
    <!--    <div>-->
    <!--      <Input id="coinsPerTurn" class="inline-block align-middle max-w-3xs max-h-lh" type="number"-->
    <!--             readonly={hasStarted}-->
    <!--             bind:value="{gameConfig.coinsPerTurn}" />-->
    <!--    </div>-->
    <!--    <div>-->
    <!--      <Label for="goFirst">Do you want to go first?</Label>-->
    <!--    </div>-->
    <!--    <div>-->
    <!--      <Checkbox id="goFirst" class="inline-block align-middle max-w-3xs max-h-lh" readonly={hasStarted}-->
    <!--                bind:checked="{gameConfig.goFirst}" />-->
    <!--    </div>-->
  </div>

  {#if !hasStarted}
    <div class="my-2">
      <!--      TODO: Disable button if form is invalid -->
      <Button type="submit">Start</Button>
    </div>
  {/if}
</form>