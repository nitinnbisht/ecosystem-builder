<template>
  <div class="game-status">
    <div class="status-item">
      <span class="label">Species</span>
      <span class="value">{{ selectedSpecies.length }}/8</span>
    </div>
    <div class="status-item">
      <span class="label">Calories Out</span>
      <span class="value">{{ totalCaloriesOutput }}</span>
    </div>
    <div class="status-item">
      <span class="label">Calories In</span>
      <span class="value">{{ totalCaloriesIntake }}</span>
    </div>
    <div class="status-item">
      <span class="label">Ecosystem</span>
      <span class="value" :class="{ valid: ecosystemBalance && ecosystemBalance.valid }">
        {{ ecosystemBalance && ecosystemBalance.valid ? 'Valid' : 'Invalid' }}
      </span>
    </div>
    <div class="status-item">
      <span class="label">Location Match</span>
      <span class="value">{{ locationCompatibility }}%</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameStatus',
  props: {
    selectedSpecies: Array,
    ecosystemBalance: Object,
    locationCompatibility: Number,
    totalCaloriesOutput: Number,
    totalCaloriesIntake: Number
  }
}
</script>

<style scoped>
.game-status {
  display: flex;
  justify-content: space-around;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.status-item {
  text-align: center;
}

.label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.value {
  font-size: 24px;
  font-weight: bold;
  color: #2196F3;
}

.value.valid {
  color: #4CAF50;
}
</style>