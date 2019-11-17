<template lang="pug">
search(:q="q")
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";
import Search from "@/components/Search.vue";
import { normalizeArray } from "@/assets/util";

@Component({
  components: { Search }
})
export default class App extends Vue {
  q = "";

  @Watch("$route.query.q")
  onRouteChanged() {
    this.q = normalizeArray(this.$route.query.q) || "";
  }
}
</script>