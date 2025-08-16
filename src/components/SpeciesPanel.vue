<template>
  <div class="species-panel">
    <h3>Available Species ({{ species.length }})</h3>
    
    <div v-for="category in categories" :key="category.name" class="category">
      <div class="category-header" @click="toggleCategory(category.name)">
        <span class="toggle-icon">{{ expandedCategories[category.name] ? '▼' : '▶' }}</span>
        <span>{{ category.name }} ({{ category.species.length }})</span>
      </div>
      
      <div v-if="expandedCategories[category.name]" class="species-grid">
        <div 
          v-for="species in category.species" 
          :key="species.id"
          class="species-card"
          :class="{ selected: isSelected(species.id) }"
          @click="$emit('select-species', species)"
        >
          <div class="species-icon">{{ species.icon || '🔸' }}</div>
          <div class="species-name">{{ species.name }}</div>
          <div class="species-type">{{ species.type }}</div>
          <div class="species-calories">Out: {{ species.caloriesOutput }} | In: {{ species.caloriesIntake }}</div>
          <div v-if="species.eats" class="species-diet">Eats: {{ species.eats.join(', ') }}</div>
          <div class="env-reqs">
            <div>T: {{ species.temp[0] }}-{{ species.temp[1] }}°C</div>
            <div>E: {{ species.elevation[0] }}-{{ species.elevation[1] }}m</div>
            <div>W: {{ species.windSpeed[0] }}-{{ species.windSpeed[1] }}km/h</div>
            <div>pH: {{ species.pH[0] }}-{{ species.pH[1] }}</div>
            <div v-if="species.bodyLength">Len: {{ species.bodyLength }}cm</div>
            <div v-if="species.reproductionRate">Rep: {{ species.reproductionRate }}/yr</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="objectives">
      <h3>Species Requirements</h3>
      <div class="requirement-info">
        <p>Build an ecosystem where all species can survive:</p>
        <ul>
          <li>Each consumer needs enough food calories</li>
          <li>Producers provide energy to the system</li>
          <li>All 8 species must be sustainable</li>
        </ul>
      </div>
    </div>
    

  </div>
</template>

<script>
export default {
  name: 'SpeciesPanel',
  props: {
    species: Array,
    selectedSpecies: Array,
    currentLocation: Object
  },

  emits: ['select-species'],

  data() {
    return {
      expandedCategories: {
        'Producers': true,
        'Animals': true,
        'Apex Predators': true
      }
    }
  },

  computed: {
    categories() {
      const producers = this.species.filter(s => s.type === 'producer')
      const animals = this.species.filter(s => ['primary', 'secondary'].includes(s.type))
      const apexPredators = this.species.filter(s => s.type === 'tertiary')
      
      return [
        { name: 'Producers', species: producers },
        { name: 'Animals', species: animals },
        { name: 'Apex Predators', species: apexPredators }
      ].filter(cat => cat.species.length > 0)
    }
  },

  methods: {
    isSelected(speciesId) {
      return this.selectedSpecies.some(s => s.id === speciesId)
    },
    toggleCategory(categoryName) {
      this.expandedCategories[categoryName] = !this.expandedCategories[categoryName]
    }
  }
}
</script>

<style scoped>
.species-panel {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.category {
  margin-bottom: 15px;
}

.category-header {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.category-header:hover {
  background: #e8e8e8;
}

.toggle-icon {
  font-size: 12px;
  color: #666;
}

.species-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 10px;
  max-height: 300px;
  overflow-y: auto;
}

.species-card {
  border: 2px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
  font-size: 14px;
  min-height: 180px;
}

.species-card:hover {
  border-color: #4CAF50;
  background: #f0fff0;
}

.species-card.selected {
  border-color: #2196F3;
  background: #e3f2fd;
}

.species-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.species-name {
  font-weight: bold;
  margin-bottom: 4px;
  font-size: 13px;
}

.species-type {
  color: #666;
  font-size: 12px;
  margin-bottom: 4px;
  text-transform: capitalize;
}

.species-calories {
  color: #2196F3;
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 4px;
}

.species-diet {
  color: #4CAF50;
  font-size: 10px;
  margin-bottom: 4px;
  font-weight: bold;
}

.env-reqs {
  margin-top: 6px;
  font-size: 9px;
  color: #666;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3px;
}

.env-reqs div {
  background: #f0f0f0;
  padding: 3px 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
}



.requirement-info {
  font-size: 14px;
}

.requirement-info ul {
  margin-left: 20px;
  margin-top: 10px;
}

.requirement-info li {
  margin-bottom: 5px;
}

.objectives {
  border-top: 1px solid #eee;
  padding-top: 15px;
}

.metric-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding: 8px;
  background: #f9f9f9;
  border-radius: 4px;
  font-size: 14px;
}

.status {
  font-size: 12px;
  color: #f44336;
}

.status.met {
  color: #4CAF50;
}
</style>