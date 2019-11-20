<template lang="pug">
search(:q="q")
</template>

<script>
import Search from "@/components/Search.vue";
import { normalizeArray } from "@/assets/util";

export default {
  components: {
    Search
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