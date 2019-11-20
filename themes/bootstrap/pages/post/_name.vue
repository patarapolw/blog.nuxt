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
    const h = headers[this.$route.params.name];
    if (h) {
      const htmlToText = require('html-to-text');
      let { title, teaser } = h;
      title = `${title} - ${config.title}`;
      const description = htmlToText.fromString(teaser);

      return {
        title,
        meta: [
          {
            hid: "description",
            name: "description",
            content: description
          },
          {
            hid: "keywords",
            name: "keywords",
            content: (h.keyword || h.tag || []).join(", ")
          },
          {
            hid: 'og:title',
            property: 'og:title',
            content: title
          },
          {
            hid: `og:description`,
            property: 'og:description',
            content: description
          },
          {
            hid: 'og:image',
            property: 'og:image',
            content: h.image
          },
          {
            hid: 'twitter:title',
            property: 'twitter:title',
            content: title
          },
          {
            hid: 'twitter:description',
            property: 'twitter:description',
            content: description
          },
          {
            hid: 'twitter:image',
            property: 'twitter:image',
            content: h.image
          },
        ]
      }
    }
    return {};
  }
}
</script>