<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div v-for="(item, index) in data" :key="`${index}-about`">{{ item }}</div>
  </div>
</template>

<script>
import createTitle from "../mixins/create-title"
export default {
  mixins: [createTitle],
  title() {
    return "About";
  },
  asyncData({ route, store }) {
    console.log('about', 'asyncData')
    store.dispatch("fetchAboutData");
  },
  computed: {
    data() {
      return this.$store.state.aboutData;
    },
  },
};
</script>
