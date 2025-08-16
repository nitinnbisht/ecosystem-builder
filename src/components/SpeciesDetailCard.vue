<template>
  <div class="species-detail-card" @click="$emit('select', species)">
    <div class="species-header">
      <div class="species-icon">{{ species.icon || '🔸' }}</div>
      <div class="species-info">
        <h4>{{ species.name }}</h4>
        <div class="species-type">{{ species.type }}</div>
      </div>
      <div class="selection-status" v-if="isSelected">✓</div>
    </div>
    
    <div class="species-details">
      <div class="detail-row">
        <span>Calories Out:</span>
        <span class="value">{{ species.caloriesOutput }}</span>
      </div>
      <div class="detail-row">
        <span>Calories In:</span>
        <span class="value">{{ species.caloriesIntake }}</span>
      </div>
      <div v-if="species.eats" class="detail-row">
        <span>Eats:</span>
        <span class="value">{{ species.eats.join(', ') }}</span>
      </div>
      
      <div class="environmental-reqs">
        <div class="req-item">
          <span>Temp:</span>
          <span>{{ species.temp[0] }}°-{{ species.temp[1] }}°C</span>
        </div>
        <div class="req-item">
          <span>Elevation:</span>
          <span>{{ species.elevation[0] }}-{{ species.elevation[1] }}m</span>
        </div>
        <div class="req-item">
          <span>Wind:</span>
          <span>{{ species.windSpeed[0] }}-{{ species.windSpeed[1] }} km/h</span>
        </div>
        <div class="req-item">
          <span>pH:</span>
          <span>{{ species.pH[0] }}-{{ species.pH[1] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpeciesDetailCard',
  props: {
    species: Object,
    isSelected: Boolean
  },
  emits: ['select']
}
</script>

<style scoped>
.species-detail-card {
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s;
  background: white;
}

.species-detail-card:hover {
  border-color: #4CAF50;
  background: #f0fff0;
}

.species-detail-card.selected {
  border-color: #2196F3;
  background: #e3f2fd;
}

.species-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  position: relative;
}

.species-icon {
  font-size: 24px;
}

.species-info h4 {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.species-type {
  font-size: 12px;
  color: #666;
  text-transform: capitalize;
}

.selection-status {
  position: absolute;
  top: 0;
  right: 0;
  color: #4CAF50;
  font-weight: bold;
  font-size: 18px;
}

.species-details {
  font-size: 11px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.detail-row span:first-child {
  font-weight: bold;
  color: #555;
}

.value {
  color: #333;
}

.environmental-reqs {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #eee;
}

.req-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
  font-size: 10px;
}

.req-item span:first-child {
  font-weight: bold;
  color: #666;
}
</style>