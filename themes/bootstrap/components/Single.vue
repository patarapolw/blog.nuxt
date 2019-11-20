<template lang="pug">
div
  div(v-if="name")
    post(:is-teaser="false" :name="name")
    vue-disqus(:shortname="disqus" :identifier="$route.path")
  div(v-else="")
    empty
</template>

<script>
import Post from "@/components/Post.vue";
import Empty from "@/components/Empty.vue";
import dotProp from "dot-prop";
import config from "@/assets/build/config.json";

export default {
  components: {
    Post, Empty
  },
  props: {
    name: String
  },
  data() {
    return {
      disqus: dotProp.get(config, "external.disqus") || ""
    }
  }
}
</script>