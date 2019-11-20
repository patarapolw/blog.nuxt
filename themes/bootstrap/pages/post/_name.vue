<template lang="pug">
single(:name="$route.params.name")
</template>

<script>
import Single from "@/components/Single.vue";
import { normalizeArray } from "@/assets/util";
import headers from "@/assets/build/headers.json";
import config from "@/assets/build/config.json";

export default {
  components: {
    Single
  },
  head() {
    return {
      title: `${headers[this.$route.params.name].title} - ${config.title}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: headers[this.$route.params.name].description
        }
      ]
    }
  }
}
</script>