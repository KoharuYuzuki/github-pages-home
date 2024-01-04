<script lang="ts">
  import { PropType } from 'vue'

  export default {
    props: {
      size: {
        type: String as PropType<'small' | 'medium'>,
        required: true
      }
    }
  }
</script>

<template>
  <div class="w-fit h-fit flex">
    <div
      class="
        w-3 h-3 relative bg-red
        after:w-3 after:h-3 after:absolute after:m-auto after:top-0 after:left-0 after:bg-slate-50 after:rounded-tr-3xl
      "
    ></div>
    <div
      class="bg-red rounded-b-3xl"
      v-bind:class="{
        'w-12': (size === 'medium'),
        'h-16': (size === 'medium'),
        'w-10': (size === 'small'),
        'h-12': (size === 'small')
      }"
    ></div>
    <div
      class="
        w-3 h-3 relative bg-red
        after:w-3 after:h-3 after:absolute after:m-auto after:top-0 after:left-0 after:bg-slate-50 after:rounded-tl-3xl
      "
    ></div>
  </div>
</template>
