<script lang="ts">
  import Drip from '@/components/Drip.vue'

  export default {
    components: {
      Drip
    }
  }
</script>

<template>
  <header class="h-20 m-4 relative bg-red rounded-3xl flex justify-center items-center">
    <h1 class="text-2xl font-bold	text-slate-50 tracking-widest">
      こはるの部屋
    </h1>
    <Drip
      class="absolute m-auto top-20 right-24"
      size="small"
    ></Drip>
    <Drip
      class="absolute m-auto top-20 right-6"
      size="medium"
    ></Drip>
  </header>
</template>
