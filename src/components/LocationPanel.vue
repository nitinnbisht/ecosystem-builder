<template>
  <div class="location-panel">
    <h3>Phase 2: Select Location</h3>
    <p>Choose a location where all 8 species can survive based on environmental conditions.</p>
    
    <div class="selected-ecosystem">
      <h4>Your Ecosystem (8 species)</h4>
      <div class="species-summary">
        <div v-for="species in selectedSpecies" :key="species.id" class="species-chip">
          {{ species.name }}
        </div>
      </div>
    </div>
    
    <div class="locations-grid">
      <div 
        v-for="location in availableLocations" 
        :key="location.id"
        class="location-card"
        :class="{ selected: selectedLocation && selectedLocation.id === location.id }"
        @click="$emit('select-location', location)"
      >
        <h4>{{ location.name }}</h4>
        <div class="location-conditions">
          <div class="condition">
            <span class="label">Temperature:</span>
            <span class="value">{{ location.temp }}°C</span>
          </div>
          <div class="condition">
            <span class="label">Elevation:</span>
            <span class="value">{{ location.elevation }}m</span>
          </div>
          <div class="condition">
            <span class="label">Wind Speed:</span>
            <span class="value">{{ location.windSpeed }} km/h</span>
          </div>
          <div class="condition">
            <span class="label">pH Level:</span>
            <span class="value">{{ location.pH }}</span>
          </div>
        </div>
        
        <div v-if="selectedLocation && selectedLocation.id === location.id" class="compatibility-check">
          <h5>Species Compatibility</h5>
          <div v-for="species in selectedSpecies" :key="species.id" class="species-compatibility">
            <span class="species-name">{{ species.name }}</span>
            <span class="compatibility-status" :class="{ compatible: isSpeciesCompatible(species, location), incompatible: !isSpeciesCompatible(species, location) }">
              {{ isSpeciesCompatible(species, location) ? '✓' : '✗' }}
            </span>
          </div>
          <div class="overall-compatibility">
            Overall Compatibility: {{ compatibility }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LocationPanel',
  props: {
    selectedSpecies: Array,
    selectedLocation: Object,
    availableLocations: Array,
    compatibility: Number
  },
  emits: ['select-location'],
  methods: {
    isSpeciesCompatible(species, location) {
      const tempOk = species.temp[0] <= location.temp && location.temp <= species.temp[1]
      const elevOk = species.elevation[0] <= location.elevation && location.elevation <= species.elevation[1]
      const windOk = species.windSpeed[0] <= location.windSpeed && location.windSpeed <= species.windSpeed[1]
      const pHOk = species.pH[0] <= location.pH && location.pH <= species.pH[1]
      
      return tempOk && elevOk && windOk && pHOk
    }
  }
}
</script>

<style scoped>
.location-panel {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.selected-ecosystem {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin: 15px 0;
}

.species-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.species-chip {
  background: #e3f2fd;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  color: #1976D2;
}

.locations-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 20px;
}

.location-card {
  border: 2px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.location-card:hover {
  border-color: #4CAF50;
  background: #f0fff0;
}

.location-card.selected {
  border-color: #2196F3;
  background: #e3f2fd;
}

.location-conditions {
  margin: 10px 0;
}

.condition {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 14px;
}

.label {
  font-weight: bold;
  color: #555;
}

.value {
  color: #333;
}

.compatibility-check {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.compatibility-check h5 {
  margin-bottom: 10px;
  color: #333;
}

.species-compatibility {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  font-size: 12px;
}

.species-name {
  color: #555;
}

.compatibility-status {
  font-weight: bold;
}

.compatibility-status.compatible {
  color: #4CAF50;
}

.compatibility-status.incompatible {
  color: #f44336;
}

.overall-compatibility {
  margin-top: 10px;
  font-weight: bold;
  text-align: center;
  padding: 8px;
  background: #f9f9f9;
  border-radius: 4px;
}
</style>