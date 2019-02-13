<template>

  <div class="authentication-container">
    
    <div class="login-container">
      <form class="ui form">
        <h4 class="ui dividing header">Log In</h4>
        <div class="field">
          <label>Email address</label>
          <input type="text" v-model="loginEmail" name="email-address" placeholder="Email Address">
        </div>
        <div class="field">
          <label>Password</label>
          <input type="password" v-model="loginPassword" name="password" placeholder="Password">
        </div>
        <button  @click.prevent="signIn" class="ui blue button" type="submit">Login</button>
        <div v-if="loginLoading" class="ui inverted active dimmer">
          <div class="ui text loader">Signing You In...</div>
        </div>
      </form>
    </div>

    <div class="signup-container">

      <form class="ui form">
        <h4 class="ui dividing header">Sign Up</h4>
        <div class="field">
          <label>Name</label>
          <div class="two fields">
            <div class="field">
              <input type="text" v-model="firstname" name="first-name" placeholder="First Name">
            </div>
            <div class="field">
              <input type="text" v-model="lastname" name="last-name" placeholder="Last Name">
            </div>
          </div>
        </div>
        <div class="field">
          <label>Username</label>
          <input v-model="username" type="text" name="user-name" placeholder="Username">
        </div>
        <div class="field">
          <label>Email address</label>
          <input v-model="signupEmail" type="text" name="emailaddress" placeholder="Email address">
        </div>
        <div class="field">
          <label>Password</label>
          <input v-model="signupPassword1" type="password" name="signup-password1" placeholder="Password">
        </div>
        <div class="field">
          <label>Re-enter Password</label>
          <input v-model="signupPassword2" type="password" name="signup-password2" placeholder="Re-enter password">
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" tabindex="0" v-model="termsAndConditions">
            <label>I agree to the Terms and Conditions</label>
          </div>
        </div>
        <button @click.prevent="createAccount" class="ui positive button" type="submit">Sign up</button>
        <div v-if="signUpLoading" class="ui inverted active dimmer">
          <div class="ui text loader">Creating Account...</div>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
import Firebase from 'firebase';
import store from '../store/store';
import { dbUsersRef, dbQuestionsRef } from '../firebaseConfig';
import { mapGetters } from 'vuex';

Firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    dbUsersRef.on("value", (snapshot) => {
      let val = snapshot.val()[user.displayName];
      const questions = [];
      for (let key in val.unansweredQuestions) {
        val.unansweredQuestions[key].key = key;
        questions.push(val.unansweredQuestions[key]);
      }
      const newUser = {
        email: val.email,
        firstname: val.firstname,
        lastname: val.lastname,
        username: val.username,
        answeredQuestions: val.answered,
        key: user.displayName,
      }
      store.dispatch('setUser', newUser);
      store.dispatch('setUserQuestions', val.answered);
    })
  } else {
    store.dispatch('setUser', null);
  }
})

export default {
  methods: {
    signIn() {
      const email = this.loginEmail;
      const password = this.loginPassword;
      this.loginLoading = true;
      Firebase.auth().signInWithEmailAndPassword(email, password)
        .catch((err) => {
          const errorCode = err.code;
          const errorMessage = err.message;

          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password!');
          } else {
            alert(errorMessage);
          }
        }).then(() => {
          this.loginEmail = '';
          this.loginPassword = '';
          this.loginLoading = false;
        })
    },

    createAccount() {
      if (this.signupPassword1 === this.signupPassword2 && this.termsAndConditions) {
        const firstname = this.firstname;
        const lastname = this.lastname;
        const username = this.username;
        const email = this.signupEmail;
        const password = this.signupPassword1;

        dbQuestionsRef.on("value", (snapshot) => {
          dbUsersRef.push({
            firstname,
            lastname,
            username,
            email,
            answeredQuestions: [],
            unansweredQuestions: snapshot.val(),
          }).then(({ key }) => {
            Firebase.auth().createUserWithEmailAndPassword(email, password)
              .then(() => {
                Firebase.auth().signInWithEmailAndPassword(email, password)
                  .catch((err) => {
                    const errorCode = err.code;
                    const errorMessage = err.message;
  
                    if (errorCode === 'auth/wrong-password') {
                      alert('Wrong password!');
                    } else {
                      alert(errorMessage);
                    }
                  }).then(() => {
                    const user = Firebase.auth().currentUser;
                    user.updateProfile({
                      displayName: key,
                    });
                    alert('account has been created - please log in!')
                  })
                })
              }).catch((err) => {
                alert(err);
              })
          })
      };

      this.firstname = '';
      this.lastname = '';
      this.username = '';
      this.signupEmail = '';
      this.signupPassword1 = '';
      this.signupPassword2 = '';
      this.termsAndConditions = false;
    }
  },
  data() {
    return {
      loginEmail: '',
      loginPassword: '',
      firstname: '',
      lastname: '',
      username: '',
      signupEmail: '',
      signupPassword1: '',
      signupPassword2: '',
      termsAndConditions: false,
      loginLoading: false,
      signUpLoading: false,
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
    ]),
  },
}
</script>

<style>
.authentication-container {
  display: flex;
  width: 95%;
  max-width: 1100px;
  min-width: 400px;
  margin: auto;
  margin-top: 10px;
  padding: 10px;
}

.login-container {
  flex: 1;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  background-color: #f5f5f5;
}

.signup-container {
  flex: 1;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  background-color: #f5f5f5;
}

</style>