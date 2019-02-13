<template>
  <div id="app">
    <div class="top-row">
      <nf-header></nf-header>
    </div>

    <div class="main-content-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { dbQuestionsRef } from './firebaseConfig';

import Header from './components/Header.vue';

export default {
  name: 'app',
  components: {
    nfHeader: Header,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'currentUser',
    ]),
  },
  created() {
    this.$store.dispatch('setQuestionsRef', dbQuestionsRef);
  },
};
</script>

<style>


</style>
