<template>
  <div id="app">
    <div class="top-row">
      <nf-header></nf-header>
    </div>

    <div class="main-content-container">
      <!-- <router-view></router-view> -->
      <nf-authentication></nf-authentication>
    </div>

    <div v-if="currentUser" class="bottom-row">
      <nf-footer></nf-footer>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

import Authentication from './components/Authentication.vue'

export default {
  name: 'app',
  components: {
    nfHeader: Header,
    nfFooter: Footer,
    nfAuthentication: Authentication,
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
    ])
  }
};
</script>

<style>


</style>
