<template>
  <div class="home">
    <h1>Генератор форм</h1>
    <p>Демонстрация работы компонента FormGenerator</p>

    <div class="form-links">
      <router-link to="/contact" class="form-link">
        Контактная форма
      </router-link>
      <router-link to="/survey" class="form-link">
        Форма опроса
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
});
</script>

<style lang="scss" scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;

  h1 {
    color: #2c3e50;
    margin-bottom: 20px;
  }

  .form-links {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 40px;
  }

  .form-link {
    padding: 15px 30px;
    background-color: #3498db;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-weight: 500;
    transition: background-color 0.2s;

    &:hover {
      background-color: #2980b9;
    }
  }
}
</style>