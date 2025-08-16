<template>
  <div class="investigation-phase">
    <div class="phase-header">
      <h3>Investigation Phase</h3>
      <p>Drag relevant data sources to your Research Journal</p>
    </div>
    
    <div class="investigation-content">
      <div class="data-sources">
        <h4>Available Data Sources</h4>
        <div class="source-list">
          <div v-for="source in availableSources" :key="source.id"
               :class="['data-source', { used: isSourceUsed(source.id) }]"
               draggable="true"
               @dragstart="startDrag($event, source)">
            <div class="source-header">
              <span class="source-type">{{ source.type.toUpperCase() }}</span>
              <span class="source-title">{{ source.title }}</span>
            </div>
            <div class="source-content">{{ source.content }}</div>
          </div>
        </div>
      </div>
      
      <div class="research-journal">
        <h4>Research Journal</h4>
        <div class="journal-drop-zone"
             @drop="dropSource($event)"
             @dragover.prevent
             @dragenter.prevent>
          <div v-if="journalSources.length === 0" class="drop-hint">
            Drop relevant data sources here
          </div>
          <div v-for="source in journalSources" :key="source.id" class="journal-entry">
            <div class="entry-header">
              <span class="entry-title">{{ source.title }}</span>
              <button @click="removeSource(source.id)" class="remove-btn">×</button>
            </div>
            <div class="entry-content">{{ source.content }}</div>
            <div class="entry-notes">
              <input v-model="source.notes" placeholder="Add your notes..." class="notes-input">
              <select v-model="source.priority" class="priority-select">
                <option value="">Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="phase-controls">
      <button @click="$emit('next-phase')" :disabled="journalSources.length < 3" class="next-btn">
        Continue to Analysis ({{ journalSources.length }}/5 sources)
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RedRockInvestigation',
  props: {
    dataSources: Array
  },
  emits: ['next-phase', 'update-journal'],
  data() {
    return {
      journalSources: []
    }
  },
  computed: {
    availableSources() {
      return this.dataSources.filter(source => !this.isSourceUsed(source.id))
    }
  },
  methods: {
    startDrag(event, source) {
      event.dataTransfer.setData('application/json', JSON.stringify(source))
    },
    dropSource(event) {
      event.preventDefault()
      const source = JSON.parse(event.dataTransfer.getData('application/json'))
      if (!this.isSourceUsed(source.id)) {
        this.journalSources.push({ ...source, notes: '', priority: '' })
        this.$emit('update-journal', this.journalSources)
      }
    },
    removeSource(sourceId) {
      this.journalSources = this.journalSources.filter(s => s.id !== sourceId)
      this.$emit('update-journal', this.journalSources)
    },
    isSourceUsed(sourceId) {
      return this.journalSources.some(s => s.id === sourceId)
    }
  }
}
</script>

<style scoped>
.investigation-phase {
  padding: 20px;
}

.phase-header {
  text-align: center;
  margin-bottom: 20px;
}

.investigation-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.data-sources, .research-journal {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.source-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.data-source {
  border: 2px solid #e9ecef;
  border-radius: 6px;
  padding: 12px;
  cursor: grab;
  transition: all 0.3s ease;
}

.data-source:hover {
  border-color: #007bff;
  transform: translateY(-2px);
}

.data-source.used {
  opacity: 0.5;
  cursor: not-allowed;
}

.source-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.source-type {
  background: #007bff;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8em;
}

.source-title {
  font-weight: bold;
}

.source-content {
  font-size: 0.9em;
  color: #6c757d;
}

.journal-drop-zone {
  min-height: 400px;
  border: 2px dashed #dee2e6;
  border-radius: 6px;
  padding: 15px;
}

.drop-hint {
  text-align: center;
  color: #6c757d;
  font-style: italic;
  margin-top: 150px;
}

.journal-entry {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 10px;
}

.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.entry-title {
  font-weight: bold;
  color: #2c3e50;
}

.remove-btn {
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.entry-content {
  font-size: 0.9em;
  margin-bottom: 10px;
}

.entry-notes {
  display: flex;
  gap: 10px;
}

.notes-input {
  flex: 1;
  padding: 4px 8px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

.priority-select {
  padding: 4px 8px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

.phase-controls {
  text-align: center;
}

.next-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
}

.next-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}
</style>