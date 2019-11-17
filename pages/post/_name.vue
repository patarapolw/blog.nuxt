<template lang="pug">
single(:name="$route.params.name")
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";
import Single from "@/components/Single.vue";
import { normalizeArray } from "@/assets/util";
import headers from "@/assets/build/headers.json";
import config from "@/assets/build/config.json";

@Component({
  components: { Single },
  head() {
    return {
      title: `${(headers as any)[this.$route.params.name].title} - ${config.title}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: (headers as any)[this.$route.params.name].description
        }
      ]
    }
  }
})
export default class Tagged extends Vue {}
</script>