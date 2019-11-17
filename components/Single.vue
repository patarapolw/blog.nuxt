<template lang="pug">
div
  div(v-if="name")
    post(:is-teaser="false" :name="name")
    vue-disqus(:shortname="disqus" :identifier="$route.path")
  div(v-else="")
    empty
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import Post from "@/components/Post.vue";
import Empty from "@/components/Empty.vue";
import moment from "moment";
import dotProp from "dot-prop";
import config from "@/assets/build/config.json";
import headers from "@/assets/build/headers.json";

@Component({
  components: {
    Post, Empty
  }
})
export default class Search extends Vue {
  @Prop() name!: string;
  disqus: string = dotProp.get(config, "external.disqus") || "";
}
</script>