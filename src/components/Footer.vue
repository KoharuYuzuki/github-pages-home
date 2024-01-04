<script lang="ts">
  import PrivacyPolicy from '@/components/PrivacyPolicy.vue'
  import Licenses from '@/components/Licenses.vue'

  export default {
    data(): {
      links: ({
        name: string
        url: string
      } | {
        name: string
        onClick: Function
      })[]
    } {
      return {
        links: [
          {
            name: 'Twitter',
            url: 'https://twitter.com/KoharuYuzuki25'
          },
          {
            name: 'GitHub',
            url: 'https://github.com/KoharuYuzuki'
          },
          {
            name: 'プライバシーポリシー',
            onClick: this.displayPrivacyPolicy
          },
          {
            name: 'サードパーティーライセンス',
            onClick: this.displayLicenses
          }
        ]
      }
    },
    methods: {
      displayPrivacyPolicy() {
        const privacyPolicy = this.$refs.privacyPolicy as InstanceType<typeof PrivacyPolicy>
        privacyPolicy.setDisplay(true)
      },
      displayLicenses() {
        const licenses = this.$refs.licenses as InstanceType<typeof Licenses>
        licenses.setDisplay(true)
      }
    },
    components: {
      PrivacyPolicy,
      Licenses
    }
  }
</script>

<template>
  <footer
    class="
      h-fit min-h-20 m-4 relative bg-brown rounded-3xl flex flex-col items-start
      md:flex-row md:justify-end md:items-center
    "
  >
    <div
      class="my-4 mx-6 md:ml-0 md:mr-8 cursor-pointer"
      v-for="link, index in links"
      v-bind:key="index"
    >
      <a
        v-if="'url' in link"
        v-bind:href="link.url"
      >
        <p class="text-base font-bold text-slate-50">
          {{ link.name }}
        </p>
      </a>
      <button
        v-else
        v-on:click="link.onClick"
      >
        <p class="text-base font-bold text-slate-50">
          {{ link.name }}
        </p>
      </button>
    </div>
  </footer>
  <PrivacyPolicy ref="privacyPolicy"></PrivacyPolicy>
  <Licenses ref="licenses"></Licenses>
</template>
