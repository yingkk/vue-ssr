<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
     <div v-for="(num, key) in data" :key="`${key}-home`">{{ num }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import createTitle from "../mixins/create-title";

export default {
  mixins: [createTitle],
  title: 'home',
  asyncData({ route, store }) {
     console.log('home', 'asyncData')
     store.dispatch("fetchHomeData");
  },
  computed: {
    data() {
      return this.$store.state.homeData;
    },
  },
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
