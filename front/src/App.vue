<template>
  <div>
    <Header class="z-20" />
    <RouterView
      data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
    />
  </div>
</template>

<script>
import Header from "./assets/General/Header.vue";
console.log(import.meta.env.VITE_KEY);

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
