<template>
  <header class="top-header">
    <div class="logo-container" />
    <div v-if="currentUser" class="ui four item menu nav-bar">
      <div @click="$router.push('/')" class="ui  primary button item">
        HOME
      </div>
      <a @click="$router.push('/questions')" class="item">
        <strong>Questions</strong>
      </a>
      <a @click="$router.push('/addQuestion')" class="item">
        <strong>Add</strong>
      </a>
      <a @click.prevent="signOut" class="item">
        <strong>Logout</strong>
      </a>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import Firebase from 'firebase';

export default {
  computed: {
    ...mapGetters([
      'currentUser',
    ]),
  },
  methods: {
    signOut() {
      Firebase.auth().signOut()
        .then(() => {
          this.$store.dispatch('setUser', null);
          this.$router.push('/');
        }).catch((err) => {
          alert(err);
        });
    },
  },
};

</script>

<style>
.top-header {
  width: 95%;
  max-width: 1100px;
  min-width: 400px;
  margin: auto;
  padding-top: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.logo-container {
  background: url('../assets/nebula-logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  height: 50px;
  width: auto;
  flex: 1;
  margin: 9px 0;
}

.nav-bar {
  height: 30px;
  flex: 3;
}

.admin {
  height: 40px;
}

.admin-container {
  margin-left: 20px;
}

</style>
