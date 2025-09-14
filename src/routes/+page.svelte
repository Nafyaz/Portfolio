<script>
  import NimGame from '$lib/components/game/nim-game.svelte';
</script>

<div class="m-10">
  <h1 class="text-4xl font-bold">Nafis Faiyaz</h1>
  <div class="text-justify">
    <p class="my-2">
      Hello, mysterious wanderer! Curious to know what brought you to my website. Anyway, I am currently
      working as a software engineer in <a class="text-blue-500 hover:underline" href="https://therapbd.com/">Therap
      BD</a>. Here I work with Java, Spring Boot. Some of my day-to-day responsibilities involve fiddling through
      undocumented legacy codebase, resolving issues, fixing data inconsistencies, removing redundant code, enhancing
      maintainability and performance.
    </p>

    <p class="my-2">
      Outside of my work hours, I have been learning Rust and Svelte. I am also interested in Devops, Reinforcement
      Learning and Robotics.
    </p>

    <p class="my-2">
      In a previous life, I was at <a class="text-blue-500 hover:underline" href="https://cse.iutoic-dhaka.edu/">
      IUT </a>,
      where I got my undergraduate degree, and secured 8th place in <a class="text-blue-500 hover:underline"
                                                                       href="https://icpc.global/ICPCID/J5RB60S8U1J5">
      2022 ICPC Dhaka Regional </a> among many other achievements. I was also among the top 20 National campers from
      <a class="text-blue-500 hover:underline" href="https://online.matholympiad.org.bd/"> Bangladesh Mathematical
        Olympiad </a> when I was in high school in 2016.
    </p>

    <p class="my-2">
      Here is a fun Nim game that I play with my friends and family to prank them. You can learn more about it in this
      <a
        class="text-blue-500 hover:underline"
        href="https://www.amazon.com/Course-Game-Theory-Thomas-Ferguson/dp/9813227346"> Game Theory Book </a>.
    </p>

    <p>
      <span class="italic">(Spoilers: You will always lose)</span>
    </p>

    <!--  <p>Last updated: September, 2025</p>-->
  </div>
</div>

<NimGame />