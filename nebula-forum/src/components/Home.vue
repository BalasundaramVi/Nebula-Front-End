<template>
  <div class="home-row">
    <div id="home" class="">
      <div class="background">
        <h1>Welcome to the Nebula Questionnaire!</h1>
        <h4>You will be asked a series of random multiple choice questions.</h4>
        <h5>After you answer, your entry will be saved and you will be able to see the stats on who voted for what!</h5>
        <h2>Ready to begin?</h2>
        <div class="selection-container">
          <div v-if="!currentUser" class="loggedInCheck">
            <router-link to="/authentication">
              <a class="ui massive primary button">Login | Sign Up</a>
            </router-link>
          </div>
          <div v-else class="loggedInCheck">
            <router-link to="/questions">
              <a class="ui massive primary button">Start</a>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  methods: {
    // goToMenu() {
    //   this.$router.push({ name: 'menuLink' });
    // },
  },
  computed: {
    ...mapGetters([
      'currentUser',
    ]),
  },
};
</script>

<style>

.home-row {
  width: 95%;
  max-width: 1100px;
  min-width: 400px;
  margin: auto;
  margin-top: 10px;
}

#home {
  background: url('../assets/home-background.jpeg');
  height: 700px;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 15% 10%;
  border-radius: 10px;
}

h1, h2 {
  margin: 6%;
}

h5 {
  width: 70%;
  margin: auto;
}

.background {
  background-color: white;
  max-width: 70%;
  margin: 0 auto;
  padding: 20px 0;
  text-align: center;
  opacity: 0.95;
  border-radius: 10px;
}

.selection-container {
  margin: 20px auto;
}
</style>
