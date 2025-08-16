<template>
  <div class="controls">
    <button 
      class="btn btn-primary"
      :disabled="gameActive"
      @click="$emit('start-game')"
    >
      Start Challenge
    </button>
    <button 
      class="btn btn-secondary"
      @click="$emit('clear-all')"
    >
      Clear All
    </button>
    <button 
      class="btn btn-success"
      :disabled="!canSubmit"
      @click="$emit('submit')"
    >
      Submit Solution
    </button>
  </div>
</template>

<script>
export default {
  name: 'Controls',
  props: {
    gameActive: Boolean,
    canSubmit: Boolean
  },
  emits: ['start-game', 'clear-all', 'submit']
}
</script>

<style scoped>
.controls {
  text-align: center;
  margin: 20px 0;
}

.btn {
  padding: 12px 24px;
  margin: 0 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s;
}

.btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn-primary {
  background: #4CAF50;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #45a049;
}

.btn-secondary {
  background: #ff9800;
  color: white;
}

.btn-secondary:hover {
  background: #f57c00;
}

.btn-success {
  background: #2196F3;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: #1976D2;
}
</style>