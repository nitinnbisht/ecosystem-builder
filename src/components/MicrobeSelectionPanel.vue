<template>
  <div class="microbe-selection-panel">
    <h3>Available Microbes</h3>
    
    <div class="microbe-list">
      <div v-for="microbe in availableMicrobes" :key="microbe.id"
           :class="['microbe-card', { 
             selected: isSelected(microbe.id),
             disabled: isDisabled(microbe.id)
           }]"
           @click="selectMicrobe(microbe)">
        <div class="microbe-header">
          <span class="microbe-name">{{ microbe.name }}</span>
          <div class="microbe-traits">
            <span v-if="microbe.coldResistant" class="trait-badge cold" title="Cold Resistant">❄️</span>
            <span v-if="microbe.toxicProducer" class="trait-badge toxic" title="Toxic Producer">☠️</span>
          </div>
        </div>
        
        <div class="microbe-attributes">
          <div class="attribute">
            <span class="attr-label">Velocity</span>
            <span class="attr-value">{{ microbe.velocity }}</span>
          </div>
          <div class="attribute">
            <span class="attr-label">Absorbency</span>
            <span class="attr-value">{{ microbe.absorbency }}</span>
          </div>
          <div class="attribute">
            <span class="attr-label">Resilience</span>
            <span class="attr-value">{{ microbe.resilience }}</span>
          </div>
        </div>
        
        <div class="binary-traits">
          <div class="binary-trait">
            <span class="trait-label">Cold Resistant:</span>
            <span :class="['trait-value', microbe.coldResistant ? 'yes' : 'no']">
              {{ microbe.coldResistant ? 'Yes' : 'No' }}
            </span>
          </div>
          <div class="binary-trait">
            <span class="trait-label">Toxic Producer:</span>
            <span :class="['trait-value', microbe.toxicProducer ? 'yes' : 'no']">
              {{ microbe.toxicProducer ? 'Yes' : 'No' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MicrobeSelectionPanel',
  props: {
    availableMicrobes: Array,
    selectedMicrobes: Array
  },
  emits: ['select-microbe'],
  methods: {
    selectMicrobe(microbe) {
      if (!this.isDisabled(microbe.id)) {
        this.$emit('select-microbe', microbe)
      }
    },
    isSelected(microbeId) {
      return this.selectedMicrobes.some(m => m.id === microbeId)
    },
    isDisabled(microbeId) {
      return this.selectedMicrobes.length >= 3 && !this.isSelected(microbeId)
    }
  }
}
</script>

<style scoped>
.microbe-selection-panel {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  max-height: 600px;
  overflow-y: auto;
}

.microbe-selection-panel h3 {
  margin: 0 0 15px 0;
  color: #2c3e50;
}

.microbe-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.microbe-card {
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.microbe-card:hover:not(.disabled) {
  border-color: #007bff;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.microbe-card.selected {
  border-color: #28a745;
  background: #f8fff9;
}

.microbe-card.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.microbe-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.microbe-name {
  font-weight: bold;
  color: #2c3e50;
  font-size: 1.1em;
}

.microbe-traits {
  display: flex;
  gap: 5px;
}

.trait-badge {
  font-size: 1.2em;
}

.microbe-attributes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 12px;
}

.attribute {
  background: #f8f9fa;
  padding: 8px;
  border-radius: 6px;
  text-align: center;
}

.attr-label {
  display: block;
  font-size: 0.8em;
  color: #6c757d;
  margin-bottom: 2px;
}

.attr-value {
  font-weight: bold;
  font-size: 1.2em;
  color: #2c3e50;
}

.binary-traits {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.binary-trait {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  background: #f8f9fa;
  border-radius: 4px;
}

.trait-label {
  font-size: 0.9em;
  color: #6c757d;
}

.trait-value {
  font-weight: bold;
  font-size: 0.9em;
  padding: 2px 8px;
  border-radius: 10px;
}

.trait-value.yes {
  background: #d4edda;
  color: #155724;
}

.trait-value.no {
  background: #f8d7da;
  color: #721c24;
}
</style>