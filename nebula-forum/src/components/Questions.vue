<template>
<div class="question-page">
  <div class="question-forum">
    <div class="ui massive form">
      <div class="grouped fields">
        <label>{{ question }}</label>
        <div v-for="(choice, index) in choices" class="field" :key="choice.answer">
          <div class="ui radio checkbox">
            <input type="radio" @input="handleSelection(index)" :name="choice.answer" tabindex="0" :checked="index===selected">
            <label>{{ choice.answer }}</label>
          </div>
        </div>
      </div>
      <hr>
      <button @click.prevent="submitAnswer" type="submit" class="submit-button positive ui button">Submit</button>
    </div>
  </div> 
</div>
</template>

<script>
import  { mapGetters } from 'vuex';
import { currentUser } from '../store/getters';
import store from '../store/store.js';

export default {
  data() {
    return {
      choices: '',
      correctAnswer: '',
      key: '',
      question: '',
      selected: null,
    }
  },
  methods: {
    handleSelection(index) {
      this.selected = index;
    },
    submitAnswer() {
      if (this.selected === null) {
        return;
      }
      const votes = this.choices[this.selected].voteCount;
      const payload = {
        key: this.key,
        choices: this.choices,
        selected: this.selected,
        votes: votes+1,
      }
      this.$store.dispatch('submitQuestion', payload);
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
    ]),
  },
  created() {
    this.$store.dispatch('getQuestion').then((data) => {
      console.log(data);
      const question = (JSON.parse(JSON.stringify(data)))[0];
      console.log(question);
      this.choices = question.choices;
      this.correctAnswer = question.correctAnswer;
      this.key = question.key;
      this.question = question.question;
    });
  },
}
</script>

<style>
.question-page {
  background-color: #eeeeee;
  width: 95%;
  max-width: 1100px;
  min-width: 400px;
  height: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  border-radius: 20px;
}

.question-forum {
  width: 60%;
  height: 95%;
  max-width: 1100px;
  min-width: 400px;
  margin: 40px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  padding: 50px;
  background-color: white;
}

.submit-button {
  margin-top: 40px;
  width: 100%;
}

</style>