<template>
  <div v-if="species" class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="species-header">
        <div class="species-icon">{{ species.icon }}</div>
        <div>
          <h2>{{ species.name }}</h2>
          <div class="species-type">{{ species.type }} Consumer</div>
        </div>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>
      
      <div class="species-details">
        <div class="detail-section">
          <h3>Basic Metrics</h3>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">Calories:</span>
              <span class="value important">{{ species.calories }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Cost:</span>
              <span class="value important">{{ species.cost }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Energy Efficiency:</span>
              <span class="value">{{ species.energyEfficiency }}%</span>
            </div>
            <div class="detail-item">
              <span class="label">Lifespan:</span>
              <span class="value">{{ species.lifespan }} years</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <h3>Environmental Requirements</h3>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">Temperature:</span>
              <span class="value important">{{ species.temp.join(', ') }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Habitat:</span>
              <span class="value important">{{ species.habitat.join(', ') }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Salinity:</span>
              <span class="value important">{{ species.salinity.join(', ') }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Pollution Tolerance:</span>
              <span class="value">{{ species.pollutionTolerance }}</span>
            </div>
          </div>
        </div>

        <div v-if="species.eats" class="detail-section">
          <h3>Diet</h3>
          <div class="diet-list">
            <span v-for="prey in species.eats" :key="prey" class="diet-item">
              {{ getSpeciesName(prey) }}
            </span>
          </div>
        </div>

        <div class="detail-section">
          <h3>Biological Characteristics</h3>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">Body Size:</span>
              <span class="value">{{ species.bodySize }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Reproduction Season:</span>
              <span class="value">{{ species.reproductionSeason }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Biomass:</span>
              <span class="value">{{ species.biomass || 'N/A' }}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <h3>Additional Data</h3>
          <div class="detail-grid">
            <div v-for="(value, key) in getAdditionalData(species)" :key="key" class="detail-item">
              <span class="label">{{ formatLabel(key) }}:</span>
              <span class="value distractor">{{ value }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-actions">
        <button 
          v-if="!isSelected" 
          class="btn btn-primary"
          :disabled="!isCompatible"
          @click="$emit('select', species)"
        >
          {{ isCompatible ? 'Select Species' : 'Incompatible with Region' }}
        </button>
        <button v-else class="btn btn-secondary" disabled>
          Already Selected
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpeciesDetailModal',
  props: {
    species: Object,
    isSelected: Boolean,
    isCompatible: Boolean,
    allSpecies: Array
  },
  emits: ['close', 'select'],
  methods: {
    getSpeciesName(id) {
      const species = this.allSpecies.find(s => s.id === id)
      return species ? species.name : id
    },
    formatLabel(key) {
      return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
    },
    getAdditionalData(species) {
      const exclude = ['id', 'name', 'type', 'icon', 'calories', 'cost', 'eats', 'habitat', 'temp', 'salinity', 'pollutionTolerance', 'bodySize', 'reproductionSeason', 'biomass', 'energyEfficiency', 'lifespan']
      const additional = {}
      
      Object.keys(species).forEach(key => {
        if (!exclude.includes(key)) {
          additional[key] = species[key]
        }
      })
      
      return additional
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  border-radius: 15px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.species-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  border-bottom: 2px solid #eee;
  position: relative;
}

.species-icon {
  font-size: 3rem;
}

.species-header h2 {
  margin: 0;
  color: #2196F3;
}

.species-type {
  color: #666;
  text-transform: capitalize;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #999;
}

.species-details {
  padding: 20px;
}

.detail-section {
  margin-bottom: 25px;
}

.detail-section h3 {
  color: #333;
  margin-bottom: 10px;
  border-bottom: 2px solid #4CAF50;
  padding-bottom: 5px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background: #f9f9f9;
  border-radius: 4px;
}

.label {
  font-weight: bold;
  color: #555;
}

.value {
  color: #333;
}

.value.important {
  color: #2196F3;
  font-weight: bold;
}

.value.distractor {
  color: #888;
  font-style: italic;
}

.diet-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.diet-item {
  background: #e3f2fd;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 14px;
  color: #1976D2;
}

.modal-actions {
  padding: 20px;
  border-top: 1px solid #eee;
  text-align: center;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.btn-primary {
  background: #4CAF50;
  color: white;
}

.btn-primary:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn-secondary {
  background: #ff9800;
  color: white;
}
</style>