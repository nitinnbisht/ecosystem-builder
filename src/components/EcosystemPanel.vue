<template>
  <div class="ecosystem-panel">
    <div class="constraints">
      <h3>Build Ecosystem for {{ currentLocation ? currentLocation.name : 'Unknown Location' }}</h3>
      <div v-if="currentLocation" class="location-details">
        <div class="location-requirement">
          <strong>Environmental Conditions:</strong>
        </div>
        <div class="condition-grid">
          <div class="condition-item">
            <span class="label">Temperature:</span>
            <span class="value">{{ currentLocation.temp }}°C</span>
          </div>
          <div class="condition-item">
            <span class="label">Elevation:</span>
            <span class="value">{{ currentLocation.elevation }}m</span>
          </div>
          <div class="condition-item">
            <span class="label">Wind Speed:</span>
            <span class="value">{{ currentLocation.windSpeed }} km/h</span>
          </div>
          <div class="condition-item">
            <span class="label">pH Level:</span>
            <span class="value">{{ currentLocation.pH }}</span>
          </div>
          <div v-if="currentLocation.waterFlow" class="condition-item">
            <span class="label">Water Flow:</span>
            <span class="value">{{ currentLocation.waterFlow }} L/s</span>
          </div>
          <div v-if="currentLocation.sunlightHours" class="condition-item">
            <span class="label">Sunlight Hours:</span>
            <span class="value">{{ currentLocation.sunlightHours }} h</span>
          </div>
          <div v-if="currentLocation.vegetation" class="condition-item">
            <span class="label">Vegetation:</span>
            <span class="value">{{ currentLocation.vegetation }}%</span>
          </div>
        </div>
      </div>
      <div class="requirements">
        <div>• Select exactly 8 species that can survive in these conditions</div>
        <div>• Each species must have enough food from other species</div>
        <div>• All species must be compatible with the environment</div>
      </div>
    </div>
    
    <div class="ecosystem-area">
      <h3>Your Ecosystem</h3>
      <div class="chain-builder">
        <div v-if="selectedSpecies.length === 0" class="empty-state">
          Click species to add them here (0/8)
        </div>
        <div v-else class="species-count">
          Species selected: {{ selectedSpecies.length }}/8
        </div>
        
        <div v-if="selectedSpecies.length > 0" class="pyramid">
          <!-- Tertiary Consumers -->
          <div v-if="tertiaryConsumers.length > 0" class="pyramid-level tertiary">
            <div class="level-label">Tertiary Consumers</div>
            <div class="level-species">
              <div v-for="species in tertiaryConsumers" :key="species.id" class="species-tile">
                <div class="tile-header">
                  <span class="species-icon">{{ species.icon }}</span>
                  <span class="species-name">{{ species.name }}</span>
                  <button class="remove-btn" @click="$emit('remove-species', species.id)">×</button>
                </div>
                <div class="tile-body">
                  <div class="species-type">{{ species.type }}</div>
                  <div class="species-calories">Out: {{ species.caloriesOutput }} | In: {{ species.caloriesIntake }}</div>
                  <div v-if="species.eats" class="species-diet">Eats: {{ species.eats.join(', ') }}</div>
                  <div class="env-reqs">
                    <div>T: {{ species.temp[0] }}-{{ species.temp[1] }}°C</div>
                    <div>E: {{ species.elevation[0] }}-{{ species.elevation[1] }}m</div>
                    <div>W: {{ species.windSpeed[0] }}-{{ species.windSpeed[1] }}km/h</div>
                    <div>pH: {{ species.pH[0] }}-{{ species.pH[1] }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Secondary Consumers -->
          <div v-if="secondaryConsumers.length > 0" class="pyramid-level secondary">
            <div class="level-label">Secondary Consumers</div>
            <div class="level-species">
              <div v-for="species in secondaryConsumers" :key="species.id" class="species-tile">
                <div class="tile-header">
                  <span class="species-icon">{{ species.icon }}</span>
                  <span class="species-name">{{ species.name }}</span>
                  <button class="remove-btn" @click="$emit('remove-species', species.id)">×</button>
                </div>
                <div class="tile-body">
                  <div class="species-type">{{ species.type }}</div>
                  <div class="species-calories">Out: {{ species.caloriesOutput }} | In: {{ species.caloriesIntake }}</div>
                  <div v-if="species.eats" class="species-diet">Eats: {{ species.eats.join(', ') }}</div>
                  <div class="env-reqs">
                    <div>T: {{ species.temp[0] }}-{{ species.temp[1] }}°C</div>
                    <div>E: {{ species.elevation[0] }}-{{ species.elevation[1] }}m</div>
                    <div>W: {{ species.windSpeed[0] }}-{{ species.windSpeed[1] }}km/h</div>
                    <div>pH: {{ species.pH[0] }}-{{ species.pH[1] }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Primary Consumers -->
          <div v-if="primaryConsumers.length > 0" class="pyramid-level primary">
            <div class="level-label">Primary Consumers</div>
            <div class="level-species">
              <div v-for="species in primaryConsumers" :key="species.id" class="species-tile">
                <div class="tile-header">
                  <span class="species-icon">{{ species.icon }}</span>
                  <span class="species-name">{{ species.name }}</span>
                  <button class="remove-btn" @click="$emit('remove-species', species.id)">×</button>
                </div>
                <div class="tile-body">
                  <div class="species-type">{{ species.type }}</div>
                  <div class="species-calories">Out: {{ species.caloriesOutput }} | In: {{ species.caloriesIntake }}</div>
                  <div v-if="species.eats" class="species-diet">Eats: {{ species.eats.join(', ') }}</div>
                  <div class="env-reqs">
                    <div>T: {{ species.temp[0] }}-{{ species.temp[1] }}°C</div>
                    <div>E: {{ species.elevation[0] }}-{{ species.elevation[1] }}m</div>
                    <div>W: {{ species.windSpeed[0] }}-{{ species.windSpeed[1] }}km/h</div>
                    <div>pH: {{ species.pH[0] }}-{{ species.pH[1] }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Producers -->
          <div v-if="producers.length > 0" class="pyramid-level producers">
            <div class="level-label">Producers</div>
            <div class="level-species">
              <div v-for="species in producers" :key="species.id" class="species-tile">
                <div class="tile-header">
                  <span class="species-icon">{{ species.icon }}</span>
                  <span class="species-name">{{ species.name }}</span>
                  <button class="remove-btn" @click="$emit('remove-species', species.id)">×</button>
                </div>
                <div class="tile-body">
                  <div class="species-type">{{ species.type }}</div>
                  <div class="species-calories">Out: {{ species.caloriesOutput }} | In: {{ species.caloriesIntake }}</div>
                  <div class="env-reqs">
                    <div>T: {{ species.temp[0] }}-{{ species.temp[1] }}°C</div>
                    <div>E: {{ species.elevation[0] }}-{{ species.elevation[1] }}m</div>
                    <div>W: {{ species.windSpeed[0] }}-{{ species.windSpeed[1] }}km/h</div>
                    <div>pH: {{ species.pH[0] }}-{{ species.pH[1] }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Decomposers -->
          <div v-if="decomposers.length > 0" class="pyramid-level decomposers">
            <div class="level-label">Decomposers</div>
            <div class="level-species">
              <div v-for="species in decomposers" :key="species.id" class="species-tile">
                <div class="tile-header">
                  <span class="species-icon">{{ species.icon }}</span>
                  <span class="species-name">{{ species.name }}</span>
                  <button class="remove-btn" @click="$emit('remove-species', species.id)">×</button>
                </div>
                <div class="tile-body">
                  <div class="species-type">{{ species.type }}</div>
                  <div class="species-calories">Out: {{ species.caloriesOutput }} | In: {{ species.caloriesIntake }}</div>
                  <div class="env-reqs">
                    <div>T: {{ species.temp[0] }}-{{ species.temp[1] }}°C</div>
                    <div>E: {{ species.elevation[0] }}-{{ species.elevation[1] }}m</div>
                    <div>W: {{ species.windSpeed[0] }}-{{ species.windSpeed[1] }}km/h</div>
                    <div>pH: {{ species.pH[0] }}-{{ species.pH[1] }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="selectedSpecies.length > 0" class="ecosystem-analysis">
        <h4>Ecosystem Analysis</h4>
        <div v-if="ecosystemBalance && !ecosystemBalance.valid" class="ecosystem-issues">
          <h5>⚠️ Issues Found:</h5>
          <ul>
            <li v-for="issue in ecosystemBalance.issues" :key="issue">{{ issue }}</li>
          </ul>
        </div>
        
        <div v-if="ecosystemBalance && ecosystemBalance.valid" class="ecosystem-valid">
          ✅ Ecosystem is balanced! All species can survive.
          
          <div class="calorie-breakdown">
            <h5>🔥 Calorie Flow Analysis</h5>
            <div class="trophic-levels">
              <div v-if="producers.length > 0" class="trophic-level">
                <div class="level-header">Producers ({{ producers.length }} species)</div>
                <div class="species-list">
                  <div v-for="species in producers" :key="species.id" class="species-calorie">
                    {{ species.icon }} {{ species.name }}: <span class="output">{{ species.caloriesOutput }} cal</span>
                  </div>
                </div>
                <div class="level-total">Total Output: {{ getTotalCalories(producers, 'output') }} calories</div>
              </div>
              
              <div v-if="primaryConsumers.length > 0" class="trophic-level">
                <div class="level-header">Primary Consumers ({{ primaryConsumers.length }} species)</div>
                <div class="species-list">
                  <div v-for="species in primaryConsumers" :key="species.id" class="species-calorie">
                    {{ species.icon }} {{ species.name }}: 
                    <span class="intake">-{{ species.caloriesIntake }} cal</span> / 
                    <span class="output">+{{ species.caloriesOutput }} cal</span>
                  </div>
                </div>
                <div class="level-total">
                  Total Intake: {{ getTotalCalories(primaryConsumers, 'intake') }} | 
                  Total Output: {{ getTotalCalories(primaryConsumers, 'output') }} calories
                </div>
              </div>
              
              <div v-if="secondaryConsumers.length > 0" class="trophic-level">
                <div class="level-header">Secondary Consumers ({{ secondaryConsumers.length }} species)</div>
                <div class="species-list">
                  <div v-for="species in secondaryConsumers" :key="species.id" class="species-calorie">
                    {{ species.icon }} {{ species.name }}: 
                    <span class="intake">-{{ species.caloriesIntake }} cal</span> / 
                    <span class="output">+{{ species.caloriesOutput }} cal</span>
                  </div>
                </div>
                <div class="level-total">
                  Total Intake: {{ getTotalCalories(secondaryConsumers, 'intake') }} | 
                  Total Output: {{ getTotalCalories(secondaryConsumers, 'output') }} calories
                </div>
              </div>
              
              <div v-if="tertiaryConsumers.length > 0" class="trophic-level">
                <div class="level-header">Tertiary Consumers ({{ tertiaryConsumers.length }} species)</div>
                <div class="species-list">
                  <div v-for="species in tertiaryConsumers" :key="species.id" class="species-calorie">
                    {{ species.icon }} {{ species.name }}: 
                    <span class="intake">-{{ species.caloriesIntake }} cal</span> / 
                    <span class="output">+{{ species.caloriesOutput }} cal</span>
                  </div>
                </div>
                <div class="level-total">
                  Total Intake: {{ getTotalCalories(tertiaryConsumers, 'intake') }} | 
                  Total Output: {{ getTotalCalories(tertiaryConsumers, 'output') }} calories
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="ecosystem-details">
          <h5>Food Web Details:</h5>
          <div v-for="species in selectedSpecies.filter(s => s.eats)" :key="species.id" class="food-chain">
            <strong>{{ species.name }}</strong> eats: 
            <span v-for="preyId in species.eats" :key="preyId" class="prey-item">
              {{ getPreyName(preyId) }}
            </span>
          </div>
        </div>
        
        <div v-if="selectedSpecies.length > 0" class="location-compatibility">
          <h5>Location Compatibility:</h5>
          <div class="compatibility-bar">
            <div class="compatibility-fill" :style="{ width: locationCompatibility + '%' }"></div>
          </div>
          <div class="compatibility-text">{{ locationCompatibility }}% of species can survive here</div>
        </div>
      </div>
    </div>
    
    <div class="hints-section">
      <div class="hints-header" @click="showHints = !showHints">
        <span class="toggle-icon">{{ showHints ? '▼' : '▶' }}</span>
        <span>💡 Hints - Valid Combination Example</span>
      </div>
      
      <div v-if="showHints" class="hints-content">
        <div v-if="validCombination.length > 0">
          <div class="hint-actions">
            <button class="use-hint-btn" @click="useHintCombination">Use This Combination</button>
          </div>
          <div class="hint-species">
            <div v-for="species in validCombination" :key="species.id" class="hint-tile">
              <span class="species-icon">{{ species.icon }}</span>
              <span class="species-name">{{ species.name }}</span>
              <span class="species-type">({{ species.type }})</span>
            </div>
          </div>
        </div>
        <div v-else class="no-hints">
          No valid combinations found for this location. Try a different ecosystem variant.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EcosystemPanel',
  props: {
    selectedSpecies: Array,
    ecosystemBalance: Object,
    currentLocation: Object,
    locationCompatibility: Number,
    availableSpecies: Array
  },
  emits: ['remove-species', 'use-hint-combination'],
  data() {
    return {
      showHints: false
    }
  },
  computed: {
    producers() {
      return this.selectedSpecies.filter(s => s.type === 'producer')
    },
    primaryConsumers() {
      return this.selectedSpecies.filter(s => s.type === 'primary')
    },
    secondaryConsumers() {
      return this.selectedSpecies.filter(s => s.type === 'secondary')
    },
    tertiaryConsumers() {
      return this.selectedSpecies.filter(s => s.type === 'tertiary')
    },
    decomposers() {
      return this.selectedSpecies.filter(s => s.type === 'decomposer')
    },
    validCombination() {
      if (!this.currentLocation || !this.availableSpecies) return []
      
      const compatible = this.availableSpecies.filter(species => {
        const tempOk = species.temp[0] <= this.currentLocation.temp && this.currentLocation.temp <= species.temp[1]
        const elevOk = species.elevation[0] <= this.currentLocation.elevation && this.currentLocation.elevation <= species.elevation[1]
        const windOk = species.windSpeed[0] <= this.currentLocation.windSpeed && this.currentLocation.windSpeed <= species.windSpeed[1]
        const pHOk = species.pH[0] <= this.currentLocation.pH && this.currentLocation.pH <= species.pH[1]
        return tempOk && elevOk && windOk && pHOk
      })
      
      const producers = compatible.filter(s => s.type === 'producer')
      const primary = compatible.filter(s => s.type === 'primary')
      const secondary = compatible.filter(s => s.type === 'secondary')
      
      if (producers.length < 4) return []
      
      // Build ecosystem step by step ensuring food relationships
      const result = []
      const usedIds = new Set()
      
      // Step 1: Add producers that animals can actually eat
      const neededProducers = new Set()
      primary.forEach(animal => {
        if (animal.eats) {
          animal.eats.forEach(foodId => {
            if (producers.find(p => p.id === foodId)) {
              neededProducers.add(foodId)
            }
          })
        }
      })
      
      // Add the most needed producers first
      const sortedProducers = producers.sort((a, b) => {
        const aNeeded = neededProducers.has(a.id) ? 1 : 0
        const bNeeded = neededProducers.has(b.id) ? 1 : 0
        return bNeeded - aNeeded
      })
      
      for (let i = 0; i < 4 && i < sortedProducers.length; i++) {
        result.push(sortedProducers[i])
        usedIds.add(sortedProducers[i].id)
      }
      
      const selectedProducerIds = result.map(p => p.id)
      
      // Step 2: Add primary consumers that can eat the selected producers
      const viablePrimary = primary.filter(animal => 
        animal.eats && animal.eats.some(foodId => selectedProducerIds.includes(foodId))
      )
      
      for (let i = 0; i < 2 && i < viablePrimary.length && result.length < 8; i++) {
        result.push(viablePrimary[i])
        usedIds.add(viablePrimary[i].id)
      }
      
      // Step 3: Add secondary consumers that can eat the selected primary consumers
      const selectedPrimaryIds = result.filter(s => s.type === 'primary').map(s => s.id)
      const viableSecondary = secondary.filter(animal => 
        animal.eats && animal.eats.some(foodId => selectedPrimaryIds.includes(foodId))
      )
      
      for (let i = 0; i < 1 && i < viableSecondary.length && result.length < 8; i++) {
        result.push(viableSecondary[i])
        usedIds.add(viableSecondary[i].id)
      }
      
      // Step 4: Fill remaining slots with any compatible animals that have food sources
      const remainingAnimals = compatible.filter(s => 
        s.type !== 'producer' && !usedIds.has(s.id)
      ).filter(animal => {
        if (!animal.eats) return true // No dietary restrictions
        return animal.eats.some(foodId => 
          result.find(species => species.id === foodId)
        )
      })
      
      for (const animal of remainingAnimals) {
        if (result.length >= 8) break
        result.push(animal)
      }
      
      return result.length === 8 ? result : []
    }
  },
  methods: {
    validateCombination(species) {
      if (species.length !== 8) return false
      
      const typeCounts = {}
      species.forEach(s => {
        typeCounts[s.type] = (typeCounts[s.type] || 0) + 1
      })
      
      // Check requirements
      if ((typeCounts.producer || 0) < 2) return false
      if ((typeCounts.decomposer || 0) < 1) return false
      if ((typeCounts.primary || 0) < 1) return false
      if ((typeCounts.secondary || 0) < 1) return false
      
      // Check pyramid structure
      if ((typeCounts.primary || 0) >= (typeCounts.producer || 0)) return false
      if ((typeCounts.secondary || 0) >= (typeCounts.primary || 0)) return false
      if ((typeCounts.tertiary || 0) > 0 && (typeCounts.tertiary || 0) >= (typeCounts.secondary || 0)) return false
      
      // Check calorie balance
      for (const s of species) {
        if (s.caloriesIntake > 0) {
          let availableCalories = 0
          if (s.eats) {
            s.eats.forEach(preyId => {
              const prey = species.find(p => p.id === preyId)
              if (prey) availableCalories += prey.caloriesOutput
            })
          }
          const requiredCalories = Math.ceil(s.caloriesIntake * 1.2)
          if (availableCalories < requiredCalories) return false
        }
      }
      
      return true
    },
    getPreyName(preyId) {
      const allSpecies = [
        ...this.selectedSpecies,
        // Add species names for reference
        { id: 'grass', name: 'Wild Grass' },
        { id: 'wildflower', name: 'Wildflower' },
        { id: 'berry_bush', name: 'Berry Bush' },
        { id: 'oak_tree', name: 'Oak Tree' },
        { id: 'maple_tree', name: 'Maple Tree' },
        { id: 'fern', name: 'Forest Fern' },
        { id: 'pine_tree', name: 'Pine Tree' },
        { id: 'moss', name: 'Forest Moss' },
        { id: 'mushroom', name: 'Forest Mushroom' },
        { id: 'ant', name: 'Forest Ant' },
        { id: 'earthworm', name: 'Earthworm' },
        { id: 'butterfly', name: 'Monarch Butterfly' }
      ]
      const prey = allSpecies.find(s => s.id === preyId)
      return prey ? prey.name : preyId
    },
    useHintCombination() {
      this.$emit('use-hint-combination', this.validCombination)
    },
    getTotalCalories(species, type) {
      return species.reduce((sum, s) => {
        return sum + (type === 'output' ? s.caloriesOutput : s.caloriesIntake)
      }, 0)
    },
    getEnergyEfficiency(level) {
      let consumerIntake = 0
      let producerOutput = 0
      
      if (level === 'primary') {
        consumerIntake = this.getTotalCalories(this.primaryConsumers, 'intake')
        producerOutput = this.getTotalCalories(this.producers, 'output')
      } else if (level === 'secondary') {
        consumerIntake = this.getTotalCalories(this.secondaryConsumers, 'intake')
        producerOutput = this.getTotalCalories(this.primaryConsumers, 'output')
      } else if (level === 'tertiary') {
        consumerIntake = this.getTotalCalories(this.tertiaryConsumers, 'intake')
        producerOutput = this.getTotalCalories(this.secondaryConsumers, 'output')
      }
      
      return producerOutput > 0 ? Math.round((consumerIntake / producerOutput) * 100) : 0
    }
  }
}
</script>

<style scoped>
.ecosystem-panel {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.constraints {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #2196F3;
}

.constraints div {
  margin-bottom: 5px;
}

.chain-builder {
  min-height: 200px;
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-content: flex-start;
}

.empty-state {
  color: #666;
  font-style: italic;
  width: 100%;
  text-align: center;
  margin-top: 80px;
}

.pyramid {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

.pyramid-level {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
}

.pyramid-level.tertiary {
  background: #ffebee;
  border: 2px solid #f44336;
}

.pyramid-level.secondary {
  background: #fff3e0;
  border: 2px solid #ff9800;
}

.pyramid-level.primary {
  background: #e8f5e8;
  border: 2px solid #4CAF50;
}

.pyramid-level.producers {
  background: #e3f2fd;
  border: 2px solid #2196F3;
}

.pyramid-level.decomposers {
  background: #f3e5f5;
  border: 2px solid #9c27b0;
}

.level-label {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 14px;
  color: #333;
}

.level-species {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.species-tile {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  width: 180px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.tile-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  position: relative;
}

.tile-body {
  font-size: 11px;
  color: #666;
}

.species-type {
  color: #666;
  font-size: 10px;
  margin-bottom: 4px;
  text-transform: capitalize;
  font-weight: bold;
}

.species-calories {
  color: #2196F3;
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 4px;
}

.species-diet {
  color: #4CAF50;
  font-size: 9px;
  margin-bottom: 6px;
  font-weight: bold;
}

.env-reqs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  font-size: 8px;
}

.env-reqs div {
  background: #f0f0f0;
  padding: 2px 4px;
  border-radius: 3px;
  border: 1px solid #ddd;
}

.species-icon {
  font-size: 18px;
}

.species-name {
  font-size: 14px;
  font-weight: bold;
}

.remove-btn {
  background: #f44336;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background: #d32f2f;
}

.species-count {
  font-weight: bold;
  color: #2196F3;
  margin-bottom: 10px;
}

.ecosystem-issues {
  background: #ffebee;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #f44336;
}

.ecosystem-issues h4 {
  color: #f44336;
  margin-bottom: 10px;
}

.ecosystem-issues ul {
  margin-left: 20px;
}

.ecosystem-issues li {
  color: #d32f2f;
  margin-bottom: 5px;
}

.ecosystem-analysis {
  margin-top: 15px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.ecosystem-analysis h4 {
  margin-bottom: 10px;
  color: #333;
}

.ecosystem-valid {
  background: #e8f5e8;
  padding: 15px;
  border-radius: 6px;
  border-left: 4px solid #4CAF50;
  color: #2e7d32;
  font-weight: bold;
  margin-bottom: 10px;
}

.calorie-breakdown {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #c8e6c9;
}

.calorie-breakdown h5 {
  color: #2e7d32;
  margin-bottom: 10px;
}

.trophic-levels {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
}

.trophic-level {
  background: #f1f8e9;
  padding: 8px 12px;
  border-radius: 4px;
  border-left: 3px solid #4CAF50;
}

.level-header {
  font-weight: bold;
  color: #1b5e20;
  font-size: 13px;
}

.species-list {
  margin: 8px 0;
}

.species-calorie {
  font-size: 11px;
  color: #2e7d32;
  margin: 2px 0;
  padding: 2px 0;
  font-weight: normal;
}

.intake {
  color: #d32f2f;
  font-weight: bold;
}

.output {
  color: #388e3c;
  font-weight: bold;
}

.level-total {
  font-size: 12px;
  color: #1b5e20;
  margin-top: 6px;
  font-weight: bold;
  border-top: 1px solid #c8e6c9;
  padding-top: 4px;
}

.energy-efficiency {
  background: #e3f2fd;
  padding: 10px;
  border-radius: 4px;
  border-left: 3px solid #2196F3;
}

.efficiency-stat {
  font-size: 12px;
  color: #1565c0;
  margin-top: 2px;
  font-weight: normal;
}

.ecosystem-issues {
  background: #ffebee;
  padding: 15px;
  border-radius: 6px;
  border-left: 4px solid #f44336;
  margin-bottom: 10px;
}

.ecosystem-issues h5 {
  color: #f44336;
  margin-bottom: 8px;
}

.ecosystem-issues ul {
  margin-left: 15px;
}

.ecosystem-issues li {
  color: #d32f2f;
  margin-bottom: 4px;
  font-size: 13px;
}

.ecosystem-details {
  margin-top: 10px;
}

.ecosystem-details h5 {
  color: #333;
  margin-bottom: 8px;
}

.food-chain {
  margin-bottom: 6px;
  font-size: 13px;
  padding: 6px;
  background: white;
  border-radius: 4px;
  border: 1px solid #eee;
}

.prey-item {
  color: #4CAF50;
  font-weight: bold;
  margin-right: 8px;
}

.location-details {
  margin: 10px 0;
}

.location-requirement {
  margin-bottom: 8px;
  color: #333;
}

.condition-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 10px;
}

.condition-item {
  background: #e3f2fd;
  padding: 8px;
  border-radius: 6px;
  border-left: 4px solid #2196F3;
}

.condition-item .label {
  font-weight: bold;
  color: #1976D2;
  display: block;
  font-size: 12px;
}

.condition-item .value {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.requirements {
  font-size: 13px;
  color: #555;
}

.requirements div {
  margin-bottom: 4px;
}

.location-compatibility {
  margin-top: 15px;
  padding: 10px;
  background: #f0f8ff;
  border-radius: 6px;
  border: 1px solid #2196F3;
}

.location-compatibility h5 {
  color: #1976D2;
  margin-bottom: 8px;
}

.compatibility-bar {
  width: 100%;
  height: 20px;
  background: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 5px;
}

.compatibility-fill {
  height: 100%;
  background: linear-gradient(90deg, #f44336, #ff9800, #4CAF50);
  transition: width 0.5s ease;
  border-radius: 10px;
}

.compatibility-text {
  text-align: center;
  font-weight: bold;
  color: #333;
}

.hints-section {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.hints-header {
  background: #f8f9fa;
  padding: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  color: #666;
}

.hints-header:hover {
  background: #e9ecef;
}

.toggle-icon {
  font-size: 12px;
}

.hints-content {
  padding: 15px;
  background: #fff8e1;
  border-top: 1px solid #ddd;
}

.hint-species {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.hint-tile {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 6px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}

.hint-tile .species-name {
  font-weight: bold;
}

.hint-tile .species-type {
  color: #666;
  font-size: 10px;
}

.hint-actions {
  margin-bottom: 15px;
  text-align: center;
}

.use-hint-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
}

.use-hint-btn:hover {
  background: #45a049;
}

.no-hints {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 20px;
}
</style>