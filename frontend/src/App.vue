<template>
  <div id="app">
    <project-index>
    </project-index>
  </div>
</template>

<script>

import ProjectIndex from "./components/ProjectIndex.vue"

export default {
  name: 'App',
  components: {
    ProjectIndex
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
