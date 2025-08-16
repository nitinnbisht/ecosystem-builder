<template>
  <div class="report-phase">
    <div class="phase-header">
      <h3>Report Phase</h3>
      <p>Summarize findings and create visualizations</p>
    </div>
    
    <div class="report-content">
      <div class="summary-section">
        <h4>Executive Summary</h4>
        <textarea v-model="summary" 
                  placeholder="Write a 3-5 sentence summary of your key findings..."
                  class="summary-textarea"
                  maxlength="500"></textarea>
        <div class="char-count">{{ summary.length }}/500 characters</div>
      </div>
      
      <div class="visualization-section">
        <h4>Data Visualization</h4>
        <div class="chart-selection">
          <div class="chart-prompt">
            <p>Which chart type best represents Red Rock's population growth over time?</p>
            <div class="chart-options">
              <div v-for="chart in chartTypes" :key="chart.id"
                   :class="['chart-option', { selected: selectedChart === chart.id }]"
                   @click="selectedChart = chart.id">
                <div class="chart-icon">📊</div>
                <div class="chart-name">{{ chart.name }}</div>
                <div class="chart-desc">{{ chart.description }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="selectedChart" class="chart-preview">
          <h5>Preview: {{ getChartName(selectedChart) }}</h5>
          <div class="mock-chart">
            <div v-if="selectedChart === 'line'" class="line-chart">
              <div class="chart-line"></div>
              <div class="chart-axes">
                <span class="x-axis">2010 → 2020</span>
                <span class="y-axis">Population</span>
              </div>
            </div>
            <div v-else-if="selectedChart === 'bar'" class="bar-chart">
              <div class="bar" style="height: 60%"></div>
              <div class="bar" style="height: 80%"></div>
              <div class="chart-labels">
                <span>2010</span>
                <span>2020</span>
              </div>
            </div>
            <div v-else-if="selectedChart === 'pie'" class="pie-chart">
              <div class="pie-slice slice1"></div>
              <div class="pie-slice slice2"></div>
              <div class="chart-legend">
                <span>Rural: 60%</span>
                <span>Urban: 40%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="insights-section">
        <h4>Key Insights</h4>
        <div class="insight-questions">
          <div class="insight-item">
            <label>What is the main driver of Red Rock's economic growth?</label>
            <select v-model="insights.growthDriver" class="insight-select">
              <option value="">Select...</option>
              <option value="mining">Mining expansion</option>
              <option value="tourism">Tourism development</option>
              <option value="population">Population growth</option>
              <option value="mixed">Mixed factors</option>
            </select>
          </div>
          
          <div class="insight-item">
            <label>What trend is most significant for future planning?</label>
            <select v-model="insights.futuretrend" class="insight-select">
              <option value="">Select...</option>
              <option value="urbanization">Increasing urbanization</option>
              <option value="energy">Rising energy consumption</option>
              <option value="diversification">Economic diversification</option>
              <option value="sustainability">Need for sustainability</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
    <div class="phase-controls">
      <button @click="$emit('next-phase', getReportData())" 
              :disabled="!isReportComplete" 
              class="next-btn">
        Continue to Mini Cases
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RedRockReport',
  props: {
    chartTypes: Array,
    analysisAnswers: Object
  },
  emits: ['next-phase'],
  data() {
    return {
      summary: '',
      selectedChart: '',
      insights: {
        growthDriver: '',
        futuretrend: ''
      }
    }
  },
  computed: {
    isReportComplete() {
      return this.summary.length >= 100 && 
             this.selectedChart && 
             this.insights.growthDriver && 
             this.insights.futuretrend
    }
  },
  methods: {
    getChartName(chartId) {
      const chart = this.chartTypes.find(c => c.id === chartId)
      return chart ? chart.name : ''
    },
    getReportData() {
      return {
        summary: this.summary,
        selectedChart: this.selectedChart,
        insights: this.insights
      }
    }
  }
}
</script>

<style scoped>
.report-phase {
  padding: 20px;
}

.report-content {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 20px;
}

.summary-section, .visualization-section, .insights-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.summary-textarea {
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  font-family: inherit;
  font-size: 1em;
  resize: vertical;
}

.char-count {
  text-align: right;
  font-size: 0.8em;
  color: #6c757d;
  margin-top: 5px;
}

.chart-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-top: 15px;
}

.chart-option {
  border: 2px solid #dee2e6;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.chart-option:hover {
  border-color: #007bff;
  transform: translateY(-2px);
}

.chart-option.selected {
  border-color: #28a745;
  background: #f8fff9;
}

.chart-icon {
  font-size: 2em;
  margin-bottom: 8px;
}

.chart-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.chart-desc {
  font-size: 0.8em;
  color: #6c757d;
}

.chart-preview {
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;
}

.mock-chart {
  height: 200px;
  position: relative;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  margin-top: 10px;
}

.line-chart {
  position: relative;
  height: 100%;
  padding: 20px;
}

.chart-line {
  position: absolute;
  top: 60%;
  left: 20px;
  right: 20px;
  height: 3px;
  background: linear-gradient(45deg, #007bff, #28a745);
  transform: rotate(-15deg);
  transform-origin: left;
}

.bar-chart {
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 20px;
  height: 80%;
  padding: 20px;
}

.bar {
  width: 40px;
  background: #007bff;
  border-radius: 4px 4px 0 0;
}

.chart-labels {
  display: flex;
  justify-content: center;
  gap: 40px;
  font-size: 0.8em;
}

.pie-chart {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 20px auto;
  border-radius: 50%;
  background: conic-gradient(#007bff 0deg 216deg, #28a745 216deg 360deg);
}

.chart-legend {
  text-align: center;
  margin-top: 10px;
  font-size: 0.8em;
}

.chart-legend span {
  display: block;
  margin: 2px 0;
}

.insight-questions {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.insight-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.insight-item label {
  font-weight: 500;
}

.insight-select {
  padding: 8px 12px;
  border: 2px solid #dee2e6;
  border-radius: 4px;
  font-size: 1em;
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