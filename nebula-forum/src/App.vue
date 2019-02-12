<template>
  <div id="app">
    <div class="top-row">
      <nf-header></nf-header>
    </div>

    <div class="main-content-container">
      <router-view></router-view>
    </div>

    <div class="bottom-row">
      <nf-footer></nf-footer>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'app',
  components: {
    nfHeader: Header,
    nfFooter: Footer,
  },
};
</script>

<style>


</style>
