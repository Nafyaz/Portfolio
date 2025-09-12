<script>
  let { value = $bindable() } = $props();
</script>

<div class="lg:w-1/3 grid lg:grid-cols-4 gap-1">
  <div>
    My move:
  </div>
  <div class="col-span-2">
    {value}
  </div>
</div>