<template>
  <div class="mini-cases-phase">
    <div class="phase-header">
      <h3>Mini Cases</h3>
      <p>Solve {{ miniCases.length }} quick analytical challenges</p>
    </div>
    
    <div class="cases-content">
      <div class="case-progress">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: (currentCase / miniCases.length) * 100 + '%' }"></div>
        </div>
        <span>Case {{ currentCase + 1 }} of {{ miniCases.length }}</span>
      </div>
      
      <div v-if="currentCase < miniCases.length" class="current-case">
        <div class="case-timer">
          <span class="timer-icon">⏱️</span>
          <span class="timer-text">{{ formatTime(timeLeft) }}</span>
        </div>
        
        <div class="case-question">
          <h4>{{ getCurrentCase().question }}</h4>
        </div>
        
        <div class="case-answer">
          <div v-if="getCurrentCase().options" class="multiple-choice">
            <div v-for="option in getCurrentCase().options" :key="option"
                 :class="['option', { selected: selectedOption === option }]"
                 @click="selectedOption = option">
              {{ option }}
            </div>
          </div>
          <div v-else class="numerical-answer">
            <input v-model="numericalAnswer" 
                   type="number" 
                   step="0.1"
                   placeholder="Enter your answer"
                   class="answer-input"
                   @keyup.enter="submitAnswer">
          </div>
        </div>
        
        <div class="case-controls">
          <button @click="submitAnswer" :disabled="!hasAnswer" class="submit-case-btn">
            Submit Answer
          </button>
          <button @click="skipCase" class="skip-btn">Skip</button>
        </div>
      </div>
      
      <div v-else class="cases-complete">
        <h3>All Mini Cases Complete!</h3>
        <div class="final-score">
          <div class="score-breakdown">
            <div class="score-item">
              <span class="score-label">Cases Correct:</span>
              <span class="score-value">{{ correctAnswers }}/{{ miniCases.length }}</span>
            </div>
            <div class="score-item">
              <span class="score-label">Average Time:</span>
              <span class="score-value">{{ averageTime }}s</span>
            </div>
            <div class="score-item">
              <span class="score-label">Accuracy:</span>
              <span class="score-value">{{ Math.round((correctAnswers / miniCases.length) * 100) }}%</span>
            </div>
          </div>
        </div>
        
        <button @click="$emit('finish-game', getCaseResults())" class="finish-btn">
          Complete Red Rock Study
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RedRockMiniCases',
  props: {
    miniCases: Array
  },
  emits: ['finish-game'],
  data() {
    return {
      currentCase: 0,
      selectedOption: '',
      numericalAnswer: '',
      timeLeft: 120,
      caseResults: [],
      caseTimer: null,
      caseStartTime: null
    }
  },
  computed: {
    hasAnswer() {
      return this.getCurrentCase().options ? this.selectedOption : this.numericalAnswer
    },
    correctAnswers() {
      return this.caseResults.filter(r => r.correct).length
    },
    averageTime() {
      if (this.caseResults.length === 0) return 0
      const totalTime = this.caseResults.reduce((sum, r) => sum + r.timeSpent, 0)
      return Math.round(totalTime / this.caseResults.length)
    }
  },
  mounted() {
    this.startCaseTimer()
  },
  beforeUnmount() {
    if (this.caseTimer) clearInterval(this.caseTimer)
  },
  methods: {
    getCurrentCase() {
      return this.miniCases[this.currentCase] || {}
    },
    startCaseTimer() {
      this.caseStartTime = Date.now()
      this.timeLeft = this.getCurrentCase().timeLimit || 120
      
      this.caseTimer = setInterval(() => {
        this.timeLeft--
        if (this.timeLeft <= 0) {
          this.submitAnswer()
        }
      }, 1000)
    },
    submitAnswer() {
      const timeSpent = Math.round((Date.now() - this.caseStartTime) / 1000)
      const currentCase = this.getCurrentCase()
      let correct = false
      
      if (currentCase.options) {
        correct = this.selectedOption === currentCase.answer
      } else {
        const userAnswer = parseFloat(this.numericalAnswer)
        const correctAnswer = currentCase.answer
        const tolerance = currentCase.tolerance || 0.1
        correct = Math.abs(userAnswer - correctAnswer) <= tolerance
      }
      
      this.caseResults.push({
        caseId: currentCase.id,
        answer: this.selectedOption || this.numericalAnswer,
        correct,
        timeSpent
      })
      
      this.nextCase()
    },
    skipCase() {
      this.caseResults.push({
        caseId: this.getCurrentCase().id,
        answer: null,
        correct: false,
        timeSpent: 120
      })
      
      this.nextCase()
    },
    nextCase() {
      if (this.caseTimer) clearInterval(this.caseTimer)
      
      this.currentCase++
      this.selectedOption = ''
      this.numericalAnswer = ''
      
      if (this.currentCase < this.miniCases.length) {
        this.startCaseTimer()
      }
    },
    formatTime(seconds) {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins}:${secs.toString().padStart(2, '0')}`
    },
    getCaseResults() {
      return {
        results: this.caseResults,
        correctAnswers: this.correctAnswers,
        totalCases: this.miniCases.length,
        averageTime: this.averageTime
      }
    }
  }
}
</script>

<style scoped>
.mini-cases-phase {
  padding: 20px;
}

.cases-content {
  background: white;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.case-progress {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #007bff;
  transition: width 0.3s ease;
}

.case-timer {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 1.2em;
  font-weight: bold;
}

.timer-text {
  color: #dc3545;
}

.case-question {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
}

.case-question h4 {
  margin: 0;
  font-size: 1.1em;
  line-height: 1.4;
}

.multiple-choice {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.option {
  padding: 12px 20px;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.option:hover {
  border-color: #007bff;
  background: #f8f9fa;
}

.option.selected {
  border-color: #28a745;
  background: #f8fff9;
}

.numerical-answer {
  margin-bottom: 20px;
  text-align: center;
}

.answer-input {
  padding: 12px 20px;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  font-size: 1.1em;
  text-align: center;
  width: 200px;
}

.case-controls {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.submit-case-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
}

.submit-case-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.skip-btn {
  background: #6c757d;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
}

.cases-complete {
  text-align: center;
}

.final-score {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.score-breakdown {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
}

.score-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.score-label {
  font-size: 0.9em;
  color: #6c757d;
}

.score-value {
  font-size: 1.2em;
  font-weight: bold;
  color: #2c3e50;
}

.finish-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 6px;
  font-size: 1.1em;
  cursor: pointer;
}
</style>