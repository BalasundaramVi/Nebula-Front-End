<template>
  <header class="top-header">
    <div class="logo-container" />
    <div class="ui four item menu nav-bar">
      <div :class="{ active: isActive === 'Home' }" class="ui  primary button item">
        HOME
      </div>
      <a :class="{ active: isActive === 'Login' }" class="item">
        Login
      </a>
      <a :class="{ active: isActive === 'Sign up' }" class="item">
        Sign Up
      </a>
      <a :class="{ active: isActive === 'Questions' }" class="item">
        <strong>Questions</strong>
      </a>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isActive: 'Home',
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