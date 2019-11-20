<template lang="pug">
div
  b-navbar(toggleable="lg" type="dark" variant="success")
    b-navbar-brand(to="/") {{banner}}
    b-navbar-toggle(target="nav-collapse")
    b-collapse#nav-collapse(is-nav)
      b-navbar-nav
        b-nav-item(v-for="t in tabs" :key="t.name" :href="t.url" :to="t.to") {{t.name}}
      b-navbar-nav.ml-auto
        b-nav-form(@submit.stop.prevent)
          b-form-input.mr-sm-2(size="sm" placeholder="Type to search" style="min-width: 200px" v-model="q"
          @keydown="onSearchKeydown")
  b-container.mt-3
    b-row
      b-col(sm=12 lg=8)
        nuxt
      b-col(sm=12 lg=4)
        sidebar
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import config from "@/assets/build/config.json";

export default {
  components: { Sidebar },
  data() {
    return {
      banner: config.banner,
      tabs: config.tabs || [],
      q: ""
    };
  },
  mounted() {
    this.q = this.$route.query.q || "";
  },
  watch: {
    "$route.query.q"(q) {
      this.q = q || "";
    }
  },
  methods: {
    onSearchKeydown(evt) {
      if (evt.code === "Enter") {
        this.$router.push({query: {q: this.q}});
      }
    }
  }
}
</script>