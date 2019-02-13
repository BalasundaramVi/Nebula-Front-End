<template>
  <div class="addQuestion-container">
    <div class="ui inverted segment">
      <form class="ui inverted form">
        
        <div class="field">
          <label>Question</label>
          <textarea v-model="question"></textarea>
        </div>
        
        <div class="field">
          <label>Answer Choice 1</label>
          <input type="text" v-model="choice1" name="last-name">
        </div>
        <div class="field">
          <label>Answer Choice 2</label>
          <input type="text" v-model="choice2" name="last-name">
        </div>
        <div class="field">
          <label>Answer Choice 3</label>
          <input type="text" v-model="choice3" name="last-name">
        </div>
        <div class="field">
          <label>Answer Choice 4</label>
          <input type="text" v-model="choice4" name="last-name">
        </div>
        <div class="field">
          <label>Answer Choice 5</label>
          <input type="text" v-model="choice5" name="last-name">
        </div>
        
        <div class="radio-container">
          <div class="inline fields">
            <label for="fruit">Correct Answer:</label>
            <div class="field">
              <div class="ui radio checkbox">
                <input type="radio" @input="correctAnswer = 0" name="fruit" :checked="correctAnswer === 0" tabindex="0">
                <label>1</label>
              </div>
            </div>
            <div class="field">
              <div class="ui radio checkbox">
                <input type="radio" @input="correctAnswer = 1" name="choice" :checked="correctAnswer === 1" tabindex="0">
                <label>2</label>
              </div>
            </div>
            <div class="field">
              <div class="ui radio checkbox">
                <input type="radio" @input="correctAnswer = 2" name="choice" :checked="correctAnswer === 2" tabindex="0">
                <label>3</label>
              </div>
            </div>
            <div class="field">
              <div class="ui radio checkbox">
                <input type="radio" @input="correctAnswer = 3" name="choice" :checked="correctAnswer === 3" tabindex="0">
                <label>4</label>
              </div>
            </div>
            <div class="field">
              <div class="ui radio checkbox">
                <input type="radio" @input="correctAnswer = 4" name="choice" :checked="correctAnswer === 4" tabindex="0">
                <label>5</label>
              </div>
            </div>
          </div>
        </div>

        <div class="submit-container">
          <button @click.prevent="addQuestion" class="ui positive button" type="submit">Submit</button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import { dbQuestionsRef } from '../firebaseConfig';


export default {
  data() {
    return {
      question: '',
      correctAnswer: 0,
      choice1: '',
      choice2: '',
      choice3: '',
      choice4: '',
      choice5: '',
    }
  },
  methods: {
    addQuestion() {
      const correctAnswer = this[`choice${this.correctAnswer+1}`];
      if (correctAnswer === '') {
        alert('Must be a valid correct answer');
        return;
      }

      const choices = [];
      
      if (this.choice1 !== '') {
        choices.push({
          answer: this.choice1,
          voteCount: 0,
        });
      };

      if (this.choice2 !== '') {
        choices.push({
          answer: this.choice2,
          voteCount: 0,
        });
      };

      if (this.choice3 !== '') {
        choices.push({
          answer: this.choice3,
          voteCount: 0,
        });
      };

      if (this.choice4 !== '') {
        choices.push({
          answer: this.choice4,
          voteCount: 0,
        });
      };

      if (this.choice5 !== '') {
        choices.push({
          answer: this.choice5,
          voteCount: 0,
        });
      };

      dbQuestionsRef.push({
        choices,
        correctAnswer,
        question: this.question,
      }).then(() => {
        this.choice1 = '';
        this.choice2 = '';
        this.choice3 = '';
        this.choice4 = '';
        this.choice5 = '';
        this.question = '';
        this.correctAnswer = 0;
      })
    }
  }
}

</script>


<style>
.addQuestion-container {
  width: 80%;
  max-width: 1100px;
  min-width: 400px;
  margin: auto;
  margin-top: 10px;
}

.radio-container {
  float: left;
  margin-top: 10px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-start;
}

.submit-container {
  display: flex;
  justify-content: flex-end;
}
</style>