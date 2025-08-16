<template>
  <div class="header">
    <h1>Ecosystem Builder - {{ variant }} Environment</h1>
    <div class="game-info">
      <div class="timer">Time: {{ timer }}</div>
      <div v-if="currentLocation" class="location-info">
        <div class="location-name">{{ currentLocation.name }}</div>
        <div class="location-conditions">
          <span>{{ currentLocation.temp }}°C</span>
          <span>{{ currentLocation.elevation }}m</span>
          <span>{{ currentLocation.windSpeed }}km/h</span>
          <span>pH {{ currentLocation.pH }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    timer: String,
    variant: String,
    currentLocation: Object
  }
}
</script>

<style scoped>
.header {
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.game-info {
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: space-between;
}

.timer {
  font-weight: bold;
  color: #f44336;
  font-size: 1.2rem;
}

.phase {
  font-weight: bold;
  color: #2196F3;
}

.location-info {
  text-align: right;
}

.location-name {
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 4px;
}

.location-conditions {
  display: flex;
  gap: 15px;
  font-size: 0.9rem;
  color: #666;
}

.location-conditions span {
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid #ddd;
}
</style>