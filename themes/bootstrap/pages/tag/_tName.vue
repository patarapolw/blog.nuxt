<template lang="pug">
search(:q="`${q} ${$route.params.tName}`")
</template>

<script>
import Search from "@/components/Search.vue";
import { normalizeArray, currentPosts } from "@/assets/util";
import config from "@/assets/build/config.json";

export default {
  components: { Search },
  head() {
    const QParser = require("q2filter").default;
    const htmlToText = require('html-to-text');

    const { tName } = this.$route.params;
    const qp = new QParser(`tag="${tName}"`, {
      isDate: ["date"],
      sortBy: {
        key: "date",
        desc: true
      }
    });

    const h = qp.parse(currentPosts())[0];

    if (h) {
      const metaImage = h.image;
      const description = htmlToText.fromString(h.teaser || "");

      const title = `Tag: ${tName} - ${config.title}`;

      return {
        title,
        meta: [
          {
            hid: "description",
            name: "description",
            content: description
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
            content: metaImage
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
            content: metaImage
          },
        ]
      }
    }

    return {};
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