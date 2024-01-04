<script lang="ts">
  export default {
    data(): {
      display: boolean
    } {
      return {
        display: false
      }
    },
    methods: {
      setDisplay(display: boolean) {
        this.display = display
        const privacyPolicyElement = this.$refs.privacyPolicy as HTMLElement
        const children = privacyPolicyElement.querySelectorAll('*')
        const allElements = document.querySelectorAll('*')

        if (display) {
          Array.from(allElements).forEach((element) => {
            element.setAttribute('tabindex', '-1')
          })

          privacyPolicyElement.removeAttribute('tabindex')
          Array.from(children).forEach((element) => {
            element.removeAttribute('tabindex')
          })
          console.log()
        } else {
          Array.from(allElements).forEach((element) => {
            element.removeAttribute('tabindex')
          })

          privacyPolicyElement.setAttribute('tabindex', '-1')
          Array.from(children).forEach((element) => {
            element.setAttribute('tabindex', '-1')
          })
        }
      }
    },
    mounted() {
      this.setDisplay(false)
    }
  }
</script>

<template>
  <div
    ref="privacyPolicy"
    class="w-dvw h-dvh fixed m-auto top-0 left-0 bg-slate-500 bg-opacity-50 flex justify-center items-center transition-opacity"
    v-bind:class="[
      ...(
        display ? [
          'opacity-100'
        ] : [
          'opacity-0',
          'pointer-events-none'
        ]
      )
    ]"
    v-on:click="setDisplay(false)"
  >
    <div
      class="w-fit h-fit max-w-[600px] m-4 p-4 bg-slate-50 drop-shadow-xl rounded-2xl flex flex-col items-center"
      v-on:click.stop=""
    >
        <h2 class="text-2xl font-bold	text-slate-500 mb-2">
          プライバシーポリシー
        </h2>
        <p class="text-slate-500">
          当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。
          このGoogleアナリティクスはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
        </p>
        <p class="text-slate-500">
          この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関しての詳細は
          <a class="text-blue-400	underline" href="https://marketingplatform.google.com/about/analytics/terms/jp/">
            Googleアナリティクスサービス利用規約
          </a>
          のページや
          <a class="text-blue-400	underline" href="https://policies.google.com/technologies/ads?hl=ja">
            Googleポリシーと規約ページ
          </a>
          をご覧ください。
        </p>
        <button
          class="font-bold text-slate-50 mt-2 px-4 py-2 bg-brown rounded-xl"
          v-on:click="setDisplay(false)"
        >
          閉じる
        </button>
    </div>
  </div>
</template>
