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
import { dbQuestionsRef, dbUsersRef } from './firebaseConfig';

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

import Authentication from './components/Authentication.vue';
import Questions from './components/Questions.vue';


export default {
  name: 'app',
  components: {
    nfHeader: Header,
    nfFooter: Footer,
    nfAuthentication: Authentication,
    nfQuestions: Questions,
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
    ])
  },
  created() {
    this.$store.dispatch('setQuestionsRef', dbQuestionsRef);
    // this.$store.dispatch('setUsersRef', dbUsersRef);
  },
};
</script>

<style>


</style>
