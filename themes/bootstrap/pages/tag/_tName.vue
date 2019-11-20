<template lang="pug">
search(:q="`${q} ${$route.params.tName}`")
</template>

<script>
import Search from "@/components/Search.vue";
import { normalizeArray } from "@/assets/util";
import config from "@/assets/build/config.json";

export default {
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
  },
  data() {
    return {
      q: ""
    }
  },
  watch: {
    "$route.query.q"(q) {
      this.q = normalizeArray(q) || "";
    }
  }
}
</script>