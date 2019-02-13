<template>
  <div class="question forum">
    {{ currentUser }}
  </div>
</template>

<script>
import  { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'currentUser',
    ])
  }
}
</script>