<template>
  <div class="app">
    <div class="game-switcher">
      <button :class="['game-btn', { active: currentGame === 'ecosystem' }]" 
              @click="switchGame('ecosystem')">
        🌱 Ecosystem Builder
      </button>
      <button :class="['game-btn', { active: currentGame === 'ocean' }]" 
              @click="switchGame('ocean')">
        🌊 Ocean Cleanup
      </button>
      <button :class="['game-btn', { active: currentGame === 'redrock' }]" 
              @click="switchGame('redrock')">
        🏔️ Red Rock Study
      </button>
    </div>

    <!-- Ecosystem Game -->
    <div v-if="currentGame === 'ecosystem'">
      <Header 
        :timer="timer" 
        :variant="variant"
        :currentLocation="currentLocation"
      />
      
      <div class="game-area">
        <EcosystemPanel 
          :selectedSpecies="selectedSpecies"
          :ecosystemBalance="ecosystemBalance"
          :currentLocation="currentLocation"
          :locationCompatibility="locationCompatibility"
          :availableSpecies="availableSpecies"
          @remove-species="removeSpecies"
          @use-hint-combination="useHintCombination"
        />
        
        <SpeciesPanel 
          :species="availableSpecies"
          :selectedSpecies="selectedSpecies"
          :currentLocation="currentLocation"
          @select-species="selectSpecies"
        />
      </div>

      <Controls 
        :gameActive="gameActive"
        :canSubmit="canSubmit"
        @start-game="startGame"
        @clear-all="clearAll"
        @submit="submitSolution"
      />

      <GameStatus 
        :selectedSpecies="selectedSpecies"
        :ecosystemBalance="ecosystemBalance"
        :locationCompatibility="locationCompatibility"
        :totalCaloriesOutput="totalCaloriesOutput"
        :totalCaloriesIntake="totalCaloriesIntake"
      />

      <ResultModal 
        v-if="showResult"
        :success="gameSuccess"
        :selectedSpecies="selectedSpecies"
        :currentLocation="currentLocation"
        @restart="restart"
      />
    </div>

    <!-- Ocean Cleanup Game -->
    <div v-if="currentGame === 'ocean'">
      <div class="ocean-header">
        <h1>Ocean Cleanup Mission</h1>
        <div class="ocean-timer">{{ oceanTimer }}</div>
      </div>
      
      <div class="ocean-game-area">
        <OceanSitePanel 
          :currentSite="currentOceanSite"
          :currentSiteIndex="currentSiteIndex"
          :selectedMicrobes="selectedMicrobes"
          :siteScore="currentSiteScore"
          :showScore="showSiteResult"
          @remove-microbe="removeMicrobe"
        />
        
        <MicrobeSelectionPanel 
          :availableMicrobes="availableMicrobes"
          :selectedMicrobes="selectedMicrobes"
          @select-microbe="selectMicrobe"
        />
      </div>

      <div class="ocean-controls">
        <button v-if="!oceanGameActive" @click="startOceanGame" class="start-btn">
          Start Ocean Cleanup (35 min)
        </button>
        <button v-if="oceanGameActive && !showSiteResult" @click="clearAllMicrobes" class="clear-btn">
          Clear Selection
        </button>
        <button v-if="oceanGameActive && !showSiteResult && canSubmitSite" @click="submitSite" class="submit-btn">
          Submit Site {{ currentSiteIndex + 1 }}
        </button>
        <button v-if="showSiteResult && currentSiteIndex < 2" @click="nextSite" class="next-btn">
          Next Site
        </button>
        <button v-if="showSiteResult && currentSiteIndex === 2" @click="finishGame" class="finish-btn">
          Finish Game
        </button>
      </div>

      <div v-if="gameCompleted" class="game-result">
        <h2>Ocean Cleanup Mission Complete!</h2>
        <div class="final-scores">
          <h3>Site Scores:</h3>
          <div v-for="(score, index) in siteScores" :key="index" class="site-score">
            <span>{{ oceanSites[index].name }}: {{ score.total }}%</span>
          </div>
          <div class="total-score">
            <strong>Overall Score: {{ totalGameScore }}%</strong>
          </div>
        </div>
        <button @click="restartOcean">Play Again</button>
      </div>
    </div>

    <!-- Red Rock Study Game -->
    <div v-if="currentGame === 'redrock'">
      <div class="redrock-header">
        <h1>Red Rock Study</h1>
        <div class="redrock-timer">{{ redRockTimer }}</div>
        <div class="phase-indicator">
          Phase: {{ currentPhase }} ({{ currentPhaseIndex + 1 }}/4)
        </div>
      </div>
      
      <RedRockInvestigation 
        v-if="currentPhase === 'Investigation'"
        :dataSources="redRockDataSources"
        @next-phase="nextPhase"
        @update-journal="updateJournal"
      />
      
      <RedRockAnalysis 
        v-if="currentPhase === 'Analysis'"
        :questions="analysisQuestions"
        :journalSources="journalSources"
        @next-phase="nextPhase"
      />
      
      <RedRockReport 
        v-if="currentPhase === 'Report'"
        :chartTypes="chartTypes"
        :analysisAnswers="analysisAnswers"
        @next-phase="nextPhase"
      />
      
      <RedRockMiniCases 
        v-if="currentPhase === 'Mini Cases'"
        :miniCases="miniCases"
        @finish-game="finishRedRockGame"
      />
      
      <div v-if="!redRockGameActive" class="redrock-start">
        <button @click="startRedRockGame" class="start-redrock-btn">
          Start Red Rock Study (35 min)
        </button>
      </div>
      
      <div v-if="redRockGameComplete" class="redrock-result">
        <h2>Red Rock Study Complete!</h2>
        <div class="final-redrock-scores">
          <div class="score-section">
            <h3>Product Score: {{ redRockFinalScore.product }}%</h3>
            <p>Based on calculation accuracy and report quality</p>
          </div>
          <div class="score-section">
            <h3>Process Score: {{ redRockFinalScore.process }}%</h3>
            <p>Based on efficiency and time management</p>
          </div>
          <div class="total-redrock-score">
            <strong>Total Score: {{ redRockFinalScore.total }}%</strong>
          </div>
        </div>
        <button @click="restartRedRock">Play Again</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import EcosystemPanel from './components/EcosystemPanel.vue'
import SpeciesPanel from './components/SpeciesPanel.vue'
import Controls from './components/Controls.vue'
import GameStatus from './components/GameStatus.vue'
import ResultModal from './components/ResultModal.vue'
import OceanSitePanel from './components/OceanSitePanel.vue'
import MicrobeSelectionPanel from './components/MicrobeSelectionPanel.vue'
import RedRockInvestigation from './components/RedRockInvestigation.vue'
import RedRockAnalysis from './components/RedRockAnalysis.vue'
import RedRockReport from './components/RedRockReport.vue'
import RedRockMiniCases from './components/RedRockMiniCases.vue'
import { speciesDatabase, locations, getRandomVariant } from './data/ecosystemData.js'
import { oceanSites, generateMicrobePool, calculateSiteScore } from './data/oceanData.js'
import { redRockDataSources, analysisQuestions, miniCases, chartTypes, calculateScore } from './data/redRockData.js'

export default {
  name: 'App',
  components: {
    Header,
    EcosystemPanel,
    SpeciesPanel,
    Controls,
    GameStatus,
    ResultModal,
    OceanSitePanel,
    MicrobeSelectionPanel,
    RedRockInvestigation,
    RedRockAnalysis,
    RedRockReport,
    RedRockMiniCases
  },
  data() {
    return {
      currentGame: 'ecosystem',
      // Ecosystem game data
      gameActive: false,
      timeLeft: 2100,
      timer: '35:00',
      variant: 'Forest',
      selectedSpecies: [],
      currentLocation: null,
      showResult: false,
      gameSuccess: false,
      timerInterval: null,
      // Ocean cleanup game data
      oceanGameActive: false,
      oceanTimeLeft: 2100, // 35 minutes total
      oceanTimer: '35:00',
      currentSiteIndex: 0,
      selectedMicrobes: [],
      availableMicrobes: [],
      siteScores: [],
      currentSiteScore: null,
      showSiteResult: false,
      gameCompleted: false,
      oceanTimerInterval: null,
      // Red Rock Study game data
      redRockGameActive: false,
      redRockTimeLeft: 2100, // 35 minutes
      redRockTimer: '35:00',
      currentPhaseIndex: 0,
      phases: ['Investigation', 'Analysis', 'Report', 'Mini Cases'],
      journalSources: [],
      analysisAnswers: {},
      reportData: {},
      miniCaseResults: {},
      redRockGameComplete: false,
      redRockFinalScore: { product: 0, process: 0, total: 0 },
      redRockTimerInterval: null,
      gameStartTime: null
    }
  },
  computed: {
    availableSpecies() {
      return speciesDatabase[this.variant] || []
    },
    availableLocations() {
      return locations[this.variant] || []
    },
    totalCaloriesOutput() {
      return this.selectedSpecies.reduce((sum, species) => sum + species.caloriesOutput, 0)
    },
    totalCaloriesIntake() {
      return this.selectedSpecies.reduce((sum, species) => sum + species.caloriesIntake, 0)
    },
    ecosystemBalance() {
      return this.validateEcosystem()
    },
    locationCompatibility() {
      if (!this.currentLocation || this.selectedSpecies.length === 0) return 100
      
      let compatible = 0
      this.selectedSpecies.forEach(species => {
        const loc = this.currentLocation
        const tempOk = species.temp[0] <= loc.temp && loc.temp <= species.temp[1]
        const elevOk = species.elevation[0] <= loc.elevation && loc.elevation <= species.elevation[1]
        const windOk = species.windSpeed[0] <= loc.windSpeed && loc.windSpeed <= species.windSpeed[1]
        const pHOk = species.pH[0] <= loc.pH && loc.pH <= species.pH[1]
        
        if (tempOk && elevOk && windOk && pHOk) compatible++
      })
      
      return Math.round((compatible / this.selectedSpecies.length) * 100)
    },
    canSubmit() {
      return this.selectedSpecies.length === 8 && this.ecosystemBalance.valid && this.locationCompatibility === 100
    },
    currentOceanSite() {
      return oceanSites[this.currentSiteIndex] || oceanSites[0]
    },
    canSubmitSite() {
      return this.selectedMicrobes.length === 3
    },
    totalGameScore() {
      if (this.siteScores.length === 0) return 0
      return Math.round(this.siteScores.reduce((sum, score) => sum + score.total, 0) / this.siteScores.length)
    },
    // Red Rock Study computed properties
    currentPhase() {
      return this.phases[this.currentPhaseIndex] || 'Investigation'
    },
    redRockDataSources() {
      return redRockDataSources
    },
    analysisQuestions() {
      return analysisQuestions
    },
    miniCases() {
      return miniCases
    },
    chartTypes() {
      return chartTypes
    }
  },
  methods: {
    selectSpecies(species) {
      if (this.selectedSpecies.length >= 8) {
        alert('Maximum 8 species allowed!')
        return
      }
      
      if (this.selectedSpecies.find(s => s.id === species.id)) {
        alert('Species already selected!')
        return
      }

      this.selectedSpecies.push(species)
    },
    generateRandomLocation() {
      const locations = this.availableLocations
      let attempts = 0
      
      while (attempts < 50) {
        const testLocation = locations[Math.floor(Math.random() * locations.length)]
        if (this.hasValidCombination(testLocation)) {
          this.currentLocation = testLocation
          return
        }
        attempts++
      }
      
      // Fallback to first location with valid combination
      for (const location of locations) {
        if (this.hasValidCombination(location)) {
          this.currentLocation = location
          return
        }
      }
    },
    removeSpecies(speciesId) {
      this.selectedSpecies = this.selectedSpecies.filter(s => s.id !== speciesId)
    },
    clearAll() {
      this.selectedSpecies = []
    },
    startGame() {
      this.gameActive = true
      this.timeLeft = 2100 // 35 minutes
      
      this.timerInterval = setInterval(() => {
        this.timeLeft--
        this.updateTimer()
        
        if (this.timeLeft <= 0) {
          this.endGame(false)
        }
      }, 1000)
    },
    updateTimer() {
      const minutes = Math.floor(this.timeLeft / 60)
      const seconds = this.timeLeft % 60
      this.timer = `${minutes}:${seconds.toString().padStart(2, '0')}`
    },
    submitSolution() {
      this.endGame(true)
    },
    endGame(success) {
      this.gameActive = false
      this.gameSuccess = success
      this.showResult = true
      
      if (this.timerInterval) {
        clearInterval(this.timerInterval)
        this.timerInterval = null
      }
    },
    restart() {
      this.showResult = false
      this.gameActive = false
      this.timeLeft = 2100
      this.timer = '35:00'
      this.selectedSpecies = []
      this.gameSuccess = false
      this.variant = getRandomVariant()
      this.generateRandomLocation()
      this.updateBackgroundClass()
    },
    getTypeCounts() {
      const counts = {}
      this.selectedSpecies.forEach(species => {
        counts[species.type] = (counts[species.type] || 0) + 1
      })
      return counts
    },
    validateEcosystem() {
      const issues = []
      let valid = true
      
      if (this.selectedSpecies.length === 0) {
        return { valid: false, issues: ['No species selected'] }
      }
      
      const typeCounts = this.getTypeCounts()
      
      // Basic requirements
      if ((typeCounts.producer || 0) < 1) {
        issues.push('Need at least 1 producer (plant)')
        valid = false
      }
      
      if ((typeCounts.primary || 0) === 0 && (typeCounts.secondary || 0) === 0 && (typeCounts.tertiary || 0) === 0) {
        issues.push('Need at least 1 consumer (herbivore or carnivore)')
        valid = false
      }
      
      // Simple food check - just ensure consumers have some food
      this.selectedSpecies.forEach(species => {
        if (species.type !== 'producer' && species.type !== 'decomposer') {
          const hasFood = species.eats && species.eats.some(preyId => 
            this.selectedSpecies.find(s => s.id === preyId)
          )
          
          if (!hasFood) {
            issues.push(`${species.name} has no available food sources`)
            valid = false
          }
        }
      })
      
      return { valid, issues }
    },
    isSpeciesCompatibleWithLocation(species) {
      if (!this.currentLocation) return true
      
      const loc = this.currentLocation
      const tempOk = species.temp[0] <= loc.temp && loc.temp <= species.temp[1]
      const elevOk = species.elevation[0] <= loc.elevation && loc.elevation <= species.elevation[1]
      const windOk = species.windSpeed[0] <= loc.windSpeed && loc.windSpeed <= species.windSpeed[1]
      const pHOk = species.pH[0] <= loc.pH && loc.pH <= species.pH[1]
      
      return tempOk && elevOk && windOk && pHOk
    },
    useHintCombination(species) {
      this.selectedSpecies = [...species]
    },
    hasValidCombination(location) {
      const compatibleSpecies = this.availableSpecies.filter(species => {
        const tempOk = species.temp[0] <= location.temp && location.temp <= species.temp[1]
        const elevOk = species.elevation[0] <= location.elevation && location.elevation <= species.elevation[1]
        const windOk = species.windSpeed[0] <= location.windSpeed && location.windSpeed <= species.windSpeed[1]
        const pHOk = species.pH[0] <= location.pH && location.pH <= species.pH[1]
        return tempOk && elevOk && windOk && pHOk
      })
      
      // Need at least 4 producers and 4 animals that can eat them
      const producers = compatibleSpecies.filter(s => s.type === 'producer')
      const animals = compatibleSpecies.filter(s => s.type !== 'producer')
      
      if (producers.length < 4) return false
      
      // Check if we have animals that can eat the producers
      const producerIds = producers.map(p => p.id)
      const viableAnimals = animals.filter(animal => 
        animal.eats && animal.eats.some(foodId => producerIds.includes(foodId))
      )
      
      return viableAnimals.length >= 4
    },
    updateBackgroundClass() {
      if (this.currentGame === 'ecosystem') {
        document.body.className = this.variant.toLowerCase().replace(' ', '-')
      } else if (this.currentGame === 'ocean') {
        document.body.className = 'ocean-cleanup'
      } else if (this.currentGame === 'redrock') {
        document.body.className = 'red-rock-study'
      }
    },
    // Game switcher methods
    switchGame(game) {
      this.currentGame = game
      this.updateBackgroundClass()
    },
    // Ocean Cleanup game methods
    selectMicrobe(microbe) {
      if (this.selectedMicrobes.length >= 6) {
        alert('Maximum 6 microbes allowed!')
        return
      }
      
      if (this.selectedMicrobes.find(m => m.id === microbe.id)) {
        alert('Microbe already selected!')
        return
      }

      this.selectedMicrobes.push(microbe)
    },
    removeMicrobe(microbeId) {
      this.selectedMicrobes = this.selectedMicrobes.filter(m => m.id !== microbeId)
    },
    clearAllMicrobes() {
      this.selectedMicrobes = []
    },
    startOceanGame() {
      this.oceanGameActive = true
      this.oceanTimeLeft = 2100 // 35 minutes
      this.currentSiteIndex = 0
      this.selectedMicrobes = []
      this.siteScores = []
      this.currentSiteScore = null
      this.showSiteResult = false
      this.gameCompleted = false
      this.availableMicrobes = generateMicrobePool(this.currentSiteIndex)
      
      this.oceanTimerInterval = setInterval(() => {
        this.oceanTimeLeft--
        this.updateOceanTimer()
        
        if (this.oceanTimeLeft <= 0) {
          this.forceFinishGame()
        }
      }, 1000)
    },
    updateOceanTimer() {
      const minutes = Math.floor(this.oceanTimeLeft / 60)
      const seconds = this.oceanTimeLeft % 60
      this.oceanTimer = `${minutes}:${seconds.toString().padStart(2, '0')}`
    },
    submitSite() {
      const score = calculateSiteScore(this.selectedMicrobes, this.currentOceanSite)
      this.currentSiteScore = score
      this.siteScores.push(score)
      this.showSiteResult = true
    },
    nextSite() {
      this.currentSiteIndex++
      this.selectedMicrobes = []
      this.currentSiteScore = null
      this.showSiteResult = false
      this.availableMicrobes = generateMicrobePool(this.currentSiteIndex)
    },
    finishGame() {
      this.gameCompleted = true
      this.oceanGameActive = false
      
      if (this.oceanTimerInterval) {
        clearInterval(this.oceanTimerInterval)
        this.oceanTimerInterval = null
      }
    },
    forceFinishGame() {
      // Handle time running out
      if (this.selectedMicrobes.length === 3 && !this.showSiteResult) {
        this.submitSite()
      }
      this.finishGame()
    },
    restartOcean() {
      this.gameCompleted = false
      this.oceanGameActive = false
      this.oceanTimeLeft = 2100
      this.oceanTimer = '35:00'
      this.currentSiteIndex = 0
      this.selectedMicrobes = []
      this.availableMicrobes = []
      this.siteScores = []
      this.currentSiteScore = null
      this.showSiteResult = false
    },
    // Red Rock Study game methods
    startRedRockGame() {
      this.redRockGameActive = true
      this.redRockTimeLeft = 2100 // 35 minutes
      this.currentPhaseIndex = 0
      this.journalSources = []
      this.analysisAnswers = {}
      this.reportData = {}
      this.miniCaseResults = {}
      this.redRockGameComplete = false
      this.gameStartTime = Date.now()
      
      this.redRockTimerInterval = setInterval(() => {
        this.redRockTimeLeft--
        this.updateRedRockTimer()
        
        if (this.redRockTimeLeft <= 0) {
          this.forceFinishRedRock()
        }
      }, 1000)
    },
    updateRedRockTimer() {
      const minutes = Math.floor(this.redRockTimeLeft / 60)
      const seconds = this.redRockTimeLeft % 60
      this.redRockTimer = `${minutes}:${seconds.toString().padStart(2, '0')}`
    },
    nextPhase(data) {
      if (this.currentPhase === 'Investigation') {
        this.journalSources = data || []
      } else if (this.currentPhase === 'Analysis') {
        this.analysisAnswers = data || {}
      } else if (this.currentPhase === 'Report') {
        this.reportData = data || {}
      }
      
      this.currentPhaseIndex++
    },
    updateJournal(sources) {
      this.journalSources = sources
    },
    finishRedRockGame(results) {
      this.miniCaseResults = results
      const totalTimeSpent = Math.round((Date.now() - this.gameStartTime) / 1000)
      
      // Calculate final score
      const allAnswers = [
        ...Object.values(this.analysisAnswers).map(a => ({ correct: true, points: 20 })), // Simplified
        ...results.results.map(r => ({ correct: r.correct, points: 10 }))
      ]
      
      this.redRockFinalScore = calculateScore(allAnswers, totalTimeSpent)
      this.redRockGameComplete = true
      this.redRockGameActive = false
      
      if (this.redRockTimerInterval) {
        clearInterval(this.redRockTimerInterval)
        this.redRockTimerInterval = null
      }
    },
    forceFinishRedRock() {
      this.finishRedRockGame({ results: [], correctAnswers: 0, totalCases: 0, averageTime: 0 })
    },
    restartRedRock() {
      this.redRockGameComplete = false
      this.redRockGameActive = false
      this.redRockTimeLeft = 2100
      this.redRockTimer = '35:00'
      this.currentPhaseIndex = 0
      this.journalSources = []
      this.analysisAnswers = {}
      this.reportData = {}
      this.miniCaseResults = {}
      this.redRockFinalScore = { product: 0, process: 0, total: 0 }
    }
  },
  mounted() {
    this.variant = getRandomVariant()
    this.generateRandomLocation()
    this.updateBackgroundClass()
  },
  watch: {
    variant() {
      this.updateBackgroundClass()
    },
    currentGame() {
      this.updateBackgroundClass()
    }
  }
}
</script>