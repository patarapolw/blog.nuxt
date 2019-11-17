<template lang="pug">
search(:q="`${q} ${$route.params.tName}`")
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";
import Search from "@/components/Search.vue";
import { normalizeArray } from "@/assets/util";
import config from "@/assets/build/config.json";

@Component({
  components: { Search },
  head() {
    return {
      title: `${this.$route.params.tName} - ${config.title}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.$route.params.tName} - ${config.description}`
        }
      ]
    }
  }
})
export default class Tagged extends Vue {
  q = "";

  @Watch("$route.query.q")
  onRouteChanged() {
    this.q = normalizeArray(this.$route.query.q) || "";
  }
}
</script>