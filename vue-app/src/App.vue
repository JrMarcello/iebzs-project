<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from '@/components/commom/Header';

export default {
  name: 'app',
  components: { AppHeader },
};
</script>

<style lang="scss">
</style>
