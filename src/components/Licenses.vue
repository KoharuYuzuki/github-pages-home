<script lang="ts">
  import licenses from '@/assets/licenses.json'
  import { z } from 'zod'

  const licensesSchema = z.array(
    z.object({
      name: z.string(),
      txtUrl: z.string()
    })
  )

  type Licenses = z.infer<typeof licensesSchema>

  export default {
    data(): {
      licenses: {
        name: string
        text: string[]
      }[]
      display :boolean
    } {
      return {
        licenses: [],
        display: false
      }
    },
    methods: {
      loadLicenses(array: any) {
        const parseResult = licensesSchema.safeParse(array)

        if (!parseResult.success) {
          console.error(parseResult.error)
        } else {
          const promises = (array as Licenses).map((license) => {
            return new Promise<string[]>((resolve, reject) => {
              fetch(license.txtUrl)
              .then((res) => res.text())
              .then((text) => resolve(text.split('\n')))
              .catch(reject)
            })
          })

          Promise.all(promises)
          .then((texts) => {
            this.licenses = texts.map((text, index) => {
              return {
                name: (array as Licenses)[index].name,
                text: text
              }
            })
          })
          .catch(console.error)
        }
      },
      setDisplay(display: boolean) {
        this.display = display
        const licensesElement = this.$refs.licenses as HTMLElement
        const children = licensesElement.querySelectorAll('*')
        const allElements = document.querySelectorAll('*')

        if (display) {
          Array.from(allElements).forEach((element) => {
            element.setAttribute('tabindex', '-1')
          })

          licensesElement.removeAttribute('tabindex')
          Array.from(children).forEach((element) => {
            element.removeAttribute('tabindex')
          })
          console.log()
        } else {
          Array.from(allElements).forEach((element) => {
            element.removeAttribute('tabindex')
          })

          licensesElement.setAttribute('tabindex', '-1')
          Array.from(children).forEach((element) => {
            element.setAttribute('tabindex', '-1')
          })
        }
      }
    },
    mounted() {
      this.loadLicenses(licenses)
      this.setDisplay(false)
    }
  }
</script>

<template>
  <div
    ref="licenses"
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
  >
    <div class="w-fit h-fit bg-slate-50 drop-shadow-xl rounded-2xl m-4">
      <div class="w-fit h-fit max-w-[600px] max-h-[500px] m-4 flex flex-col items-center overflow-y-scroll overscroll-contain">
          <h2 class="text-2xl font-bold	text-slate-500 mb-2">
            サードパーティーライセンス
          </h2>
          <div
            class="w-full flex flex-col [&:not(:first-of-type)]:mt-8"
            v-for="license, index in licenses"
            v-bind:key="index"
          >
            <h3 class="text-xl font-bold text-slate-500 mb-2">
              {{ license.name }}
            </h3>
            <div>
              <p
                class="text-slate-500"
                v-for="line, index in license.text"
                v-bind:key="index"
              >
                {{ line }}
              </p>
            </div>
          </div>

          <p class="text-slate-500">
          </p>
          <button
            class="font-bold text-slate-50 mt-2 px-4 py-2 bg-brown rounded-xl"
            v-on:click="setDisplay(false)"
          >
            閉じる
          </button>
      </div>
    </div>
  </div>
</template>
