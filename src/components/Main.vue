<script lang="ts">
  import thingsObj from '@/assets/things.json'
  import { z } from 'zod'

  const thingSchema = z.record(
    z.object({
      name: z.string(),
      items: z.array(
        z.object({
          name: z.string(),
          desc: z.string(),
          url: z.string().or(z.null()),
          img: z.string()
        }).or(z.object({
          name: z.string(),
          desc: z.string(),
          url: z.string().or(z.null()),
          text: z.string(),
          color: z.enum(['red', 'yellow', 'green', 'blue'])
        }))
      )
    })
  )

  export default {
    data(): {
      things: {
        [key: string]: {
          name: string
          items: ({
            name: string
            desc: string
            url: string | null
            img: string
          } | {
            name: string
            desc: string
            url: string | null
            text: string
            color: 'red' | 'yellow' | 'green' | 'blue'
          })[]
        }
      }
    } {
      return {
        things: {}
      }
    },
    methods: {
      loadThings(obj: any) {
        const parseResult = thingSchema.safeParse(obj)

        if (parseResult.success) {
          this.things = obj
        } else {
          console.error(parseResult.error)
        }
      }
    },
    mounted() {
      this.loadThings(thingsObj)
    }
  }
</script>

<template>
  <main class="grow flex flex-col">
    <article
      class="flex flex-col items-center last-of-type:mb-20"
      v-for="thing, index in things"
      v-bind:key="index"
    >
      <h2 class="text-2xl font-bold	text-slate-500 text-center mt-24 mb-10 mx-4">
        {{ thing.name }}
      </h2>
      <div class="w-[calc(100%-32px)] h-fit max-w-[1200px] bg-slate-200 rounded-3xl">
        <p
          class="text-xl font-bold text-slate-500 text-center my-14"
          v-if="thing.items.length <= 0"
        >
          まだないよ
        </p>
        <div
          class="m-4 p-4 bg-slate-50 rounded-2xl flex items-center"
          v-else
          v-for="item, index in thing.items"
          v-bind:key="index"
        >
          <p
            class="w-16 h-16 m-2 text-3xl font-bold text-slate-500 rounded-xl flex justify-center items-center shrink-0"
            v-if="'text' in item"
            v-bind:class="{
              'bg-red': (item.color === 'red'),
              'bg-yellow': (item.color === 'yellow'),
              'bg-green': (item.color === 'green'),
              'bg-blue': (item.color === 'blue'),
              'bg-slate-300': (item.color === undefined)
            }"
          >
            {{ item.text }}
          </p>
          <img
            class="w-20 shrink-0"
            v-else
            v-bind:src="item.img"
          >
          <div class="w-0 h-fit ml-4 grow flex flex-col items-start">
            <a class="max-w-full mb-2" v-bind:href="item.url || ''">
              <p class="text-2xl font-bold text-slate-500 truncate">
                {{ item.name }}
              </p>
            </a>
            <p class="max-w-full font-bold text-slate-500">
              {{ item.desc }}
            </p>
          </div>
        </div>
      </div>
    </article>
  </main>
</template>
