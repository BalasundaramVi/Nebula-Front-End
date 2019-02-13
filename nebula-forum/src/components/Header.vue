<template>
  <header class="top-header">
    <div class="logo-container" />
    <div v-if="currentUser" :class="currentUser.admin === true ? 'five' : 'four'" class="ui item menu nav-bar">
      <div :class="{ active: isActive === 'Home' }" @click="$router.push('/')" class="ui  primary button item">
        HOME
      </div>
      <a :class="{ active: isActive === 'Questions' }" @click="$router.push('/questions')" class="item">
        <strong>Questions</strong>
      </a>
      <a :class="{ active: isActive === 'Profile' }" class="item">
        <strong>Your Profile</strong>
      </a>
      <a v-if="currentUser.admin" :class="{ active: isActive === 'Admin'}" class="item">
        <strong>Admin</strong>
      </a>
      <a @click="signOut" class="item">
        <strong>Logout</strong>
      </a>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import Firebase from 'firebase';
import store from '../store/store';
import { dbUsersRef } from '../firebaseConfig';

export default {
  data() {
    return {
      isActive: 'Home',
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
    ]),
  },
  methods: {
    signOut() {
      Firebase.auth().signOut()
        .then(() => {
          this.$router.push('/');
        }).catch((err) => {
          alert(err);
        })
    }
  }
}

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
}

.logo-container {
  background: url('../assets/nebula-logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  height: 50px;
  width: auto;
  flex: 1;
}

.nav-bar {
  height: 40px;
  flex: 3;
}

.or {
  margin-top: 13px;
}

</style>