<template>
<div class="question-page">
  <div class="question-forum">

    <div v-if="this.show==='question'" class="ui massive form">
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

    <div v-if="this.show==='data'" class="results">
      <p>{{ choices }}</p>
      <p>{{ correctAnswer }}</p>
      <p>{{ question }}</p>
      <p>{{ selected }}</p>
      <hr>
      <button @click.prevent="nextQuestion" class="submit button blue ui button">Next Question</button>
    </div>

    <div v-if="this.show==='none'" class="no-questions">
      <h3>Wow it looks like you finished all the questions!</h3>
      <h4>Don't worry, there are more coming shortly :)</h4>
    </div>

  </div> 
</div>
</template>

<script>
import  { mapGetters } from 'vuex';
import { currentUser } from '../store/getters'
import { dbUsersRef, dbQuestionsRef } from '../firebaseConfig';;
import Firebase from 'firebase';
import store from '../store/store.js';

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
  }
})

export default {
  data() {
    return {
      choices: '',
      correctAnswer: '',
      key: '',
      question: '',
      selected: 'none',
      show: 'question',
      stopper: true,
    }
  },
  methods: {
    handleSelection(index) {
      this.selected = index;
    },
    submitAnswer() {
      this.stopper = false;
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
      this.show="data";
    },
    nextQuestion() {
      this.show = "question";
      this.stopper = true;

      this.$store.dispatch('getQuestion').then((data) => {
        if (data.length === 0) {
          this.show = 'none';
          return;
        }
        const question = (JSON.parse(JSON.stringify(data)))[0];
        this.choices = question.choices;
        this.correctAnswer = question.correctAnswer;
        this.key = question.key;
        this.question = question.question;
        this.selected = 'none';
      });
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
    ]),
  },
  created() {
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
          if (this.stopper === false) {
            return;
          }

          store.dispatch('setUser', newUser).then(() => {
            store.dispatch('setUserQuestions', val.answered).then(() => {
              this.$store.dispatch('getQuestion').then((data) => {
                if (data.length === 0) {
                  this.show = 'none';
                  return;
                }
                const question = (JSON.parse(JSON.stringify(data)))[0];
                this.choices = question.choices;
                this.correctAnswer = question.correctAnswer;
                this.key = question.key;
                this.question = question.question;
              });
            })
          })
        })
      };
    })
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

.no-questions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.results {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>