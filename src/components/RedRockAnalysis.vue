<template>
  <div class="analysis-phase">
    <div class="phase-header">
      <h3>Analysis Phase</h3>
      <p>Answer quantitative questions using your research data</p>
    </div>
    
    <div class="analysis-content">
      <div class="questions-panel">
        <div v-for="(question, index) in questions" :key="question.id" class="question-card">
          <div class="question-header">
            <span class="question-number">Q{{ index + 1 }}</span>
            <span class="question-status" :class="{ answered: answers[question.id] }">
              {{ answers[question.id] ? '✓' : '○' }}
            </span>
          </div>
          <div class="question-text">{{ question.question }}</div>
          <div class="answer-input">
            <input v-model="answers[question.id]" 
                   type="number" 
                   step="0.1"
                   placeholder="Enter answer"
                   class="answer-field">
            <button @click="dragToCalculator(question)" class="calc-btn">📱</button>
          </div>
        </div>
      </div>
      
      <div class="tools-panel">
        <div class="research-summary">
          <h4>Research Journal</h4>
          <div class="journal-summary">
            <div v-for="source in journalSources" :key="source.id" class="summary-item">
              <div class="summary-title">{{ source.title }}</div>
              <div class="summary-data">{{ source.content }}</div>
              <div v-if="source.notes" class="summary-notes">Notes: {{ source.notes }}</div>
            </div>
          </div>
        </div>
        
        <div class="calculator">
          <h4>Calculator</h4>
          <div class="calc-display">
            <input v-model="calcDisplay" readonly class="calc-screen">
          </div>
          <div class="calc-buttons">
            <button v-for="btn in calcButtons" :key="btn" 
                    @click="calcInput(btn)" 
                    :class="['calc-btn', btn === '=' ? 'equals' : '']">
              {{ btn }}
            </button>
          </div>
          <div class="calc-history">
            <div v-for="calc in calcHistory" :key="calc" class="calc-entry">{{ calc }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="phase-controls">
      <button @click="$emit('next-phase', answers)" :disabled="!allAnswered" class="next-btn">
        Continue to Report ({{ answeredCount }}/{{ questions.length }})
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RedRockAnalysis',
  props: {
    questions: Array,
    journalSources: Array
  },
  emits: ['next-phase'],
  data() {
    return {
      answers: {},
      calcDisplay: '0',
      calcHistory: [],
      calcButtons: ['C', '÷', '×', '-', '7', '8', '9', '+', '4', '5', '6', '=', '1', '2', '3', '0', '.']
    }
  },
  computed: {
    answeredCount() {
      return Object.keys(this.answers).filter(key => this.answers[key] !== '' && this.answers[key] !== null).length
    },
    allAnswered() {
      return this.answeredCount === this.questions.length
    }
  },
  methods: {
    calcInput(btn) {
      if (btn === 'C') {
        this.calcDisplay = '0'
      } else if (btn === '=') {
        try {
          const result = eval(this.calcDisplay.replace('×', '*').replace('÷', '/'))
          this.calcHistory.unshift(`${this.calcDisplay} = ${result}`)
          this.calcDisplay = result.toString()
          if (this.calcHistory.length > 5) this.calcHistory.pop()
        } catch (e) {
          this.calcDisplay = 'Error'
        }
      } else {
        if (this.calcDisplay === '0' && !isNaN(btn)) {
          this.calcDisplay = btn
        } else {
          this.calcDisplay += btn
        }
      }
    },
    dragToCalculator(question) {
      // Helper to suggest relevant data for calculation
      const relevantData = this.journalSources.find(s => s.content.includes('population') || s.content.includes('revenue'))
      if (relevantData) {
        alert(`Hint: Check "${relevantData.title}" for relevant numbers`)
      }
    }
  }
}
</script>

<style scoped>
.analysis-phase {
  padding: 20px;
}

.analysis-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.questions-panel {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.question-card {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.question-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.question-number {
  background: #007bff;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8em;
}

.question-status {
  font-size: 1.2em;
  color: #6c757d;
}

.question-status.answered {
  color: #28a745;
}

.question-text {
  margin-bottom: 15px;
  font-weight: 500;
}

.answer-input {
  display: flex;
  gap: 10px;
}

.answer-field {
  flex: 1;
  padding: 8px 12px;
  border: 2px solid #dee2e6;
  border-radius: 4px;
  font-size: 1em;
}

.calc-btn {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.tools-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.research-summary, .calculator {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.journal-summary {
  max-height: 200px;
  overflow-y: auto;
}

.summary-item {
  border-bottom: 1px solid #eee;
  padding: 8px 0;
}

.summary-title {
  font-weight: bold;
  font-size: 0.9em;
}

.summary-data {
  font-size: 0.8em;
  color: #6c757d;
}

.summary-notes {
  font-size: 0.8em;
  color: #007bff;
  font-style: italic;
}

.calc-display {
  margin-bottom: 10px;
}

.calc-screen {
  width: 100%;
  padding: 10px;
  font-size: 1.2em;
  text-align: right;
  border: 2px solid #dee2e6;
  border-radius: 4px;
  background: #f8f9fa;
}

.calc-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  margin-bottom: 10px;
}

.calc-buttons .calc-btn {
  padding: 10px;
  border: 1px solid #dee2e6;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

.calc-buttons .calc-btn:hover {
  background: #f8f9fa;
}

.calc-buttons .equals {
  background: #007bff;
  color: white;
}

.calc-history {
  max-height: 100px;
  overflow-y: auto;
  font-size: 0.8em;
}

.calc-entry {
  padding: 2px 0;
  color: #6c757d;
}

.phase-controls {
  text-align: center;
}

.next-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
}

.next-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}
</style>