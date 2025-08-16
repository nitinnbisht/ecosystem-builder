<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2>{{ success ? 'Challenge Complete!' : 'Time Up!' }}</h2>
      <div class="results">
        <div>Species Used: {{ selectedSpecies.length }}/8</div>
        <div v-if="currentLocation">Location: {{ currentLocation.name }}</div>
        <div>Ecosystem: {{ selectedSpecies.length === 8 ? 'Complete' : 'Incomplete' }}</div>
        <div class="rating">
          {{ score >= 75 ? 'Excellent!' : score >= 50 ? 'Good effort!' : 'Try again!' }}
        </div>
      </div>
      <button class="btn btn-primary" @click="$emit('restart')">
        Play Again
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultModal',
  props: {
    success: Boolean,
    selectedSpecies: Array,
    currentLocation: Object
  },
  emits: ['restart']
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 40px;
  border-radius: 15px;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.modal h2 {
  margin-bottom: 20px;
  color: #2196F3;
}

.results {
  margin: 20px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
}

.results div {
  margin-bottom: 10px;
}

.score {
  font-size: 24px;
  font-weight: bold;
  color: #4CAF50;
}

.rating {
  font-size: 18px;
  font-weight: bold;
  color: #ff9800;
  margin-top: 15px;
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

.btn-primary:hover {
  background: #45a049;
}
</style>