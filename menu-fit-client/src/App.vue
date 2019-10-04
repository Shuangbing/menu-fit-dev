<template>
  <div id="app">
    <Welcome/>
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from "@/components/Welcome.vue";

export default {
  name: "app",
  components: {
    Welcome
  }
};
</script>

<style scoped>
#app {
  display: flex;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
