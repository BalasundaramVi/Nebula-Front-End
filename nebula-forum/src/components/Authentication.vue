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
        <button  @click="signIn" class="ui blue button" type="submit">Login</button>
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
            <input v-model="termsAndConditions" type="checkbox" tabindex="0" class="hidden">
            <label>I agree to the Terms and Conditions</label>
          </div>
        </div>
        <button @click.prevent="createAccount" class="ui positive button" type="submit">Sign up</button>
      </form>
    </div>
  </div>

</template>

<script>
export default {
  methods: {
    signIn() {
      return;
    },
    createAccount() {
      return;
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
    }
  }
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