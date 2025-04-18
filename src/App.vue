<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/" class="nav-link">Главная</router-link>
      <router-link to="/contact" class="nav-link">Контактная форма</router-link>
      <router-link to="/survey" class="nav-link">Опрос</router-link>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.navbar {
  background-color: #3498db;
  padding: 15px 20px;
  display: flex;
  gap: 15px;

  .nav-link {
    color: white;
    text-decoration: none;
    font-weight: 500;
    padding: 5px 10px;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    &.router-link-exact-active {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
