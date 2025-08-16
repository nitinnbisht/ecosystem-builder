<template>
  <div class="site-panel">
    <div class="site-header">
      <h3>{{ currentSite.name }}</h3>
      <div class="site-progress">Site {{ currentSiteIndex + 1 }} of 3</div>
    </div>
    
    <div class="requirements">
      <h4>Requirements:</h4>
      <div class="numerical-requirements">
        <div class="requirement">
          <span class="label">Velocity:</span>
          <span class="range">{{ currentSite.velocityRange[0] }} - {{ currentSite.velocityRange[1] }}</span>
        </div>
        <div class="requirement">
          <span class="label">Absorbency:</span>
          <span class="range">{{ currentSite.absorbencyRange[0] }} - {{ currentSite.absorbencyRange[1] }}</span>
        </div>
        <div class="requirement">
          <span class="label">Resilience:</span>
          <span class="range">{{ currentSite.resilienceRange[0] }} - {{ currentSite.resilienceRange[1] }}</span>
        </div>
      </div>
      
      <div class="trait-requirements">
        <div class="trait required">
          <span class="icon">✓</span>
          <span>At least one must be Cold Resistant</span>
        </div>
        <div class="trait forbidden">
          <span class="icon">✗</span>
          <span>None can be Toxic Producer</span>
        </div>
      </div>
    </div>
    
    <div class="selection-area">
      <h4>Selected Microbes ({{ selectedMicrobes.length }}/3):</h4>
      <div class="selected-grid">
        <div v-for="microbe in selectedMicrobes" :key="microbe.id" 
             class="selected-microbe" @click="$emit('remove-microbe', microbe.id)">
          <div class="microbe-name">{{ microbe.name }}</div>
          <div class="microbe-stats">
            <span>V: {{ microbe.velocity }}</span>
            <span>A: {{ microbe.absorbency }}</span>
            <span>R: {{ microbe.resilience }}</span>
          </div>
          <div class="microbe-traits">
            <span v-if="microbe.coldResistant" class="trait-badge cold">❄️</span>
            <span v-if="microbe.toxicProducer" class="trait-badge toxic">☠️</span>
          </div>
        </div>
        
        <div v-for="n in (3 - selectedMicrobes.length)" :key="'empty-' + n" 
             class="empty-slot">
          <span>+</span>
        </div>
      </div>
    </div>
    
    <div v-if="selectedMicrobes.length === 3" class="current-averages">
      <h4>Current Averages:</h4>
      <div class="averages">
        <div class="avg" :class="{ valid: isVelocityValid }">
          Velocity: {{ currentAverages.velocity }}
        </div>
        <div class="avg" :class="{ valid: isAbsorbencyValid }">
          Absorbency: {{ currentAverages.absorbency }}
        </div>
        <div class="avg" :class="{ valid: isResilienceValid }">
          Resilience: {{ currentAverages.resilience }}
        </div>
      </div>
    </div>
    
    <div v-if="showScore" class="score-display">
      <h4>Site Score: {{ siteScore.total }}%</h4>
      <div class="score-breakdown">
        <div class="score-item">Velocity: {{ siteScore.breakdown.velocity }}%</div>
        <div class="score-item">Absorbency: {{ siteScore.breakdown.absorbency }}%</div>
        <div class="score-item">Resilience: {{ siteScore.breakdown.resilience }}%</div>
        <div class="score-item">Required Trait: {{ siteScore.breakdown.requiredTrait }}%</div>
        <div class="score-item">No Forbidden Trait: {{ siteScore.breakdown.forbiddenTrait }}%</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OceanSitePanel',
  props: {
    currentSite: Object,
    currentSiteIndex: Number,
    selectedMicrobes: Array,
    siteScore: Object,
    showScore: Boolean
  },
  emits: ['remove-microbe'],
  computed: {
    currentAverages() {
      if (this.selectedMicrobes.length === 0) return { velocity: 0, absorbency: 0, resilience: 0 }
      
      const velocity = this.selectedMicrobes.reduce((sum, m) => sum + m.velocity, 0) / this.selectedMicrobes.length
      const absorbency = this.selectedMicrobes.reduce((sum, m) => sum + m.absorbency, 0) / this.selectedMicrobes.length
      const resilience = this.selectedMicrobes.reduce((sum, m) => sum + m.resilience, 0) / this.selectedMicrobes.length
      
      return {
        velocity: Math.round(velocity * 10) / 10,
        absorbency: Math.round(absorbency * 10) / 10,
        resilience: Math.round(resilience * 10) / 10
      }
    },
    isVelocityValid() {
      return this.currentAverages.velocity >= this.currentSite.velocityRange[0] && 
             this.currentAverages.velocity <= this.currentSite.velocityRange[1]
    },
    isAbsorbencyValid() {
      return this.currentAverages.absorbency >= this.currentSite.absorbencyRange[0] && 
             this.currentAverages.absorbency <= this.currentSite.absorbencyRange[1]
    },
    isResilienceValid() {
      return this.currentAverages.resilience >= this.currentSite.resilienceRange[0] && 
             this.currentAverages.resilience <= this.currentSite.resilienceRange[1]
    }
  }
}
</script>

<style scoped>
.site-panel {
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  border-radius: 12px;
  padding: 20px;
  color: white;
  width: 100%;
}

.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.site-header h3 {
  margin: 0;
  font-size: 1.4em;
}

.site-progress {
  background: rgba(255,255,255,0.2);
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.9em;
}

.requirements h4 {
  margin: 0 0 12px 0;
  font-size: 1.1em;
}

.numerical-requirements {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 15px;
}

.requirement {
  background: rgba(255,255,255,0.1);
  padding: 8px 12px;
  border-radius: 8px;
  text-align: center;
}

.requirement .label {
  display: block;
  font-size: 0.8em;
  opacity: 0.8;
}

.requirement .range {
  font-weight: bold;
  font-size: 1.1em;
}

.trait-requirements {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.trait {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.9em;
}

.trait.required {
  background: rgba(40, 167, 69, 0.3);
}

.trait.forbidden {
  background: rgba(220, 53, 69, 0.3);
}

.selection-area h4 {
  margin: 0 0 12px 0;
}

.selected-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.selected-microbe {
  background: rgba(255,255,255,0.15);
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.selected-microbe:hover {
  background: rgba(255,255,255,0.25);
  border-color: rgba(255,255,255,0.5);
}

.empty-slot {
  background: rgba(255,255,255,0.05);
  border: 2px dashed rgba(255,255,255,0.2);
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  font-size: 1.5em;
  color: rgba(255,255,255,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
}

.microbe-name {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 0.9em;
}

.microbe-stats {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
  margin-bottom: 5px;
}

.microbe-traits {
  display: flex;
  justify-content: center;
  gap: 5px;
}

.trait-badge {
  font-size: 0.8em;
}

.current-averages {
  background: rgba(255,255,255,0.1);
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.current-averages h4 {
  margin: 0 0 8px 0;
}

.averages {
  display: flex;
  justify-content: space-between;
}

.avg {
  padding: 4px 8px;
  border-radius: 4px;
  background: rgba(220, 53, 69, 0.3);
  font-size: 0.9em;
}

.avg.valid {
  background: rgba(40, 167, 69, 0.3);
}

.score-display {
  background: rgba(255,255,255,0.15);
  padding: 15px;
  border-radius: 8px;
}

.score-display h4 {
  margin: 0 0 10px 0;
  text-align: center;
  font-size: 1.2em;
}

.score-breakdown {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.score-item {
  background: rgba(255,255,255,0.1);
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 0.9em;
  text-align: center;
}
</style>