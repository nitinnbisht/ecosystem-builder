class EcosystemGame {
    constructor() {
        this.gameTime = 480; // 8 minutes in seconds
        this.gameActive = false;
        this.timer = null;
        this.grid = Array(48).fill(null); // 8x6 grid
        this.placedSpecies = [];
        
        this.species = [
            { id: 'grass', name: 'Grass', type: 'Producer', icon: '🌱', color: '#4CAF50', energy: 100, trophicLevel: 1 },
            { id: 'tree', name: 'Tree', type: 'Producer', icon: '🌳', color: '#2E7D32', energy: 150, trophicLevel: 1 },
            { id: 'rabbit', name: 'Rabbit', type: 'Primary Consumer', icon: '🐰', color: '#8D6E63', energy: 80, trophicLevel: 2 },
            { id: 'deer', name: 'Deer', type: 'Primary Consumer', icon: '🦌', color: '#A1887F', energy: 120, trophicLevel: 2 },
            { id: 'fox', name: 'Fox', type: 'Secondary Consumer', icon: '🦊', color: '#FF5722', energy: 100, trophicLevel: 3 },
            { id: 'wolf', name: 'Wolf', type: 'Secondary Consumer', icon: '🐺', color: '#424242', energy: 140, trophicLevel: 3 },
            { id: 'eagle', name: 'Eagle', type: 'Tertiary Consumer', icon: '🦅', color: '#795548', energy: 120, trophicLevel: 4 },
            { id: 'mushroom', name: 'Mushroom', type: 'Decomposer', icon: '🍄', color: '#8E24AA', energy: 60, trophicLevel: 0 }
        ];
        
        this.init();
    }
    
    init() {
        this.createGrid();
        this.createSpeciesList();
        this.setupEventListeners();
        this.updateStats();
    }
    
    createGrid() {
        const grid = document.getElementById('ecosystem-grid');
        grid.innerHTML = '';
        
        for (let i = 0; i < 48; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.index = i;
            cell.addEventListener('dragover', this.handleDragOver.bind(this));
            cell.addEventListener('drop', this.handleDrop.bind(this));
            cell.addEventListener('click', this.handleCellClick.bind(this));
            grid.appendChild(cell);
        }
    }
    
    createSpeciesList() {
        const speciesList = document.getElementById('species-list');
        speciesList.innerHTML = '';
        
        this.species.forEach(species => {
            const item = document.createElement('div');
            item.className = 'species-item';
            item.draggable = true;
            item.dataset.speciesId = species.id;
            
            item.innerHTML = `
                <div class="species-icon" style="background-color: ${species.color}">
                    ${species.icon}
                </div>
                <div class="species-info">
                    <div class="species-name">${species.name}</div>
                    <div class="species-type">${species.type}</div>
                </div>
            `;
            
            item.addEventListener('dragstart', this.handleDragStart.bind(this));
            item.addEventListener('dragend', this.handleDragEnd.bind(this));
            speciesList.appendChild(item);
        });
    }
    
    setupEventListeners() {
        document.getElementById('start-btn').addEventListener('click', this.startGame.bind(this));
        document.getElementById('reset-btn').addEventListener('click', this.resetGame.bind(this));
        document.getElementById('submit-btn').addEventListener('click', this.submitSolution.bind(this));
        document.getElementById('play-again-btn').addEventListener('click', this.playAgain.bind(this));
    }
    
    handleDragStart(e) {
        if (!this.gameActive) return;
        e.dataTransfer.setData('text/plain', e.target.dataset.speciesId);
        e.target.classList.add('dragging');
    }
    
    handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }
    
    handleDragOver(e) {
        e.preventDefault();
    }
    
    handleDrop(e) {
        e.preventDefault();
        if (!this.gameActive) return;
        
        const speciesId = e.dataTransfer.getData('text/plain');
        const cellIndex = parseInt(e.target.dataset.index);
        
        if (this.grid[cellIndex] === null) {
            this.placeSpecies(speciesId, cellIndex);
        }
    }
    
    handleCellClick(e) {
        if (!this.gameActive) return;
        
        const cellIndex = parseInt(e.target.dataset.index);
        if (this.grid[cellIndex] !== null) {
            this.removeSpecies(cellIndex);
        }
    }
    
    placeSpecies(speciesId, cellIndex) {
        const species = this.species.find(s => s.id === speciesId);
        if (!species) return;
        
        this.grid[cellIndex] = species;
        this.placedSpecies.push({ species, cellIndex });
        
        const cell = document.querySelector(`[data-index="${cellIndex}"]`);
        cell.classList.add('occupied');
        cell.innerHTML = `
            <div class="placed-species" style="background-color: ${species.color}">
                ${species.icon}
            </div>
        `;
        
        this.updateStats();
    }
    
    removeSpecies(cellIndex) {
        this.grid[cellIndex] = null;
        this.placedSpecies = this.placedSpecies.filter(p => p.cellIndex !== cellIndex);
        
        const cell = document.querySelector(`[data-index="${cellIndex}"]`);
        cell.classList.remove('occupied');
        cell.innerHTML = '';
        
        this.updateStats();
    }
    
    calculateStability() {
        if (this.placedSpecies.length === 0) return 0;
        
        const trophicCounts = [0, 0, 0, 0, 0]; // 0=decomposer, 1=producer, 2=primary, 3=secondary, 4=tertiary
        
        this.placedSpecies.forEach(p => {
            trophicCounts[p.species.trophicLevel]++;
        });
        
        // Ideal ratios: many producers, fewer consumers at each level
        const idealRatios = [0.1, 0.4, 0.3, 0.15, 0.05];
        const total = this.placedSpecies.length;
        
        let stability = 0;
        for (let i = 0; i < 5; i++) {
            const actualRatio = trophicCounts[i] / total;
            const difference = Math.abs(actualRatio - idealRatios[i]);
            stability += Math.max(0, 1 - difference * 2);
        }
        
        return Math.min(100, (stability / 5) * 100);
    }
    
    calculateBiodiversity() {
        const uniqueTypes = new Set(this.placedSpecies.map(p => p.species.type));
        return Math.min(100, (uniqueTypes.size / 4) * 100);
    }
    
    calculateBalance() {
        if (this.placedSpecies.length < 3) return 0;
        
        const hasProducers = this.placedSpecies.some(p => p.species.trophicLevel === 1);
        const hasConsumers = this.placedSpecies.some(p => p.species.trophicLevel > 1);
        const hasDecomposers = this.placedSpecies.some(p => p.species.trophicLevel === 0);
        
        let balance = 0;
        if (hasProducers) balance += 40;
        if (hasConsumers) balance += 40;
        if (hasDecomposers) balance += 20;
        
        // Bonus for spatial distribution
        const distribution = this.calculateSpatialDistribution();
        balance += distribution * 20;
        
        return Math.min(100, balance);
    }
    
    calculateSpatialDistribution() {
        if (this.placedSpecies.length < 2) return 0;
        
        let totalDistance = 0;
        let pairs = 0;
        
        for (let i = 0; i < this.placedSpecies.length; i++) {
            for (let j = i + 1; j < this.placedSpecies.length; j++) {
                const pos1 = this.getGridPosition(this.placedSpecies[i].cellIndex);
                const pos2 = this.getGridPosition(this.placedSpecies[j].cellIndex);
                const distance = Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
                totalDistance += distance;
                pairs++;
            }
        }
        
        const avgDistance = totalDistance / pairs;
        return Math.min(1, avgDistance / 4); // Normalize to 0-1
    }
    
    getGridPosition(index) {
        return {
            x: index % 8,
            y: Math.floor(index / 8)
        };
    }
    
    updateStats() {
        const stability = this.calculateStability();
        const biodiversity = this.calculateBiodiversity();
        const balance = this.calculateBalance();
        
        this.updateProgressBar('stability', stability);
        this.updateProgressBar('biodiversity', biodiversity);
        this.updateProgressBar('balance', balance);
        
        document.getElementById('stability-value').textContent = `${Math.round(stability)}%`;
        document.getElementById('biodiversity-value').textContent = `${Math.round(biodiversity)}%`;
        document.getElementById('balance-value').textContent = `${Math.round(balance)}%`;
        
        // Enable submit button if stability is high enough
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.disabled = !this.gameActive || stability < 80;
    }
    
    updateProgressBar(type, value) {
        const progress = document.getElementById(`${type}-progress`);
        progress.style.width = `${value}%`;
    }
    
    startGame() {
        this.gameActive = true;
        this.gameTime = 480;
        document.getElementById('start-btn').disabled = true;
        document.getElementById('submit-btn').disabled = false;
        
        this.timer = setInterval(() => {
            this.gameTime--;
            this.updateTimer();
            
            if (this.gameTime <= 0) {
                this.endGame(false);
            }
        }, 1000);
        
        this.updateTimer();
    }
    
    updateTimer() {
        const minutes = Math.floor(this.gameTime / 60);
        const seconds = this.gameTime % 60;
        document.getElementById('timer').textContent = 
            `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    resetGame() {
        this.gameActive = false;
        clearInterval(this.timer);
        this.gameTime = 480;
        this.grid = Array(48).fill(null);
        this.placedSpecies = [];
        
        document.getElementById('start-btn').disabled = false;
        document.getElementById('submit-btn').disabled = true;
        
        this.createGrid();
        this.updateStats();
        this.updateTimer();
    }
    
    submitSolution() {
        const stability = this.calculateStability();
        if (stability >= 80) {
            this.endGame(true);
        }
    }
    
    endGame(won) {
        this.gameActive = false;
        clearInterval(this.timer);
        
        const modal = document.getElementById('game-over-modal');
        const title = document.getElementById('result-title');
        const message = document.getElementById('result-message');
        const scores = document.getElementById('final-scores');
        
        const stability = this.calculateStability();
        const biodiversity = this.calculateBiodiversity();
        const balance = this.calculateBalance();
        const timeUsed = 480 - this.gameTime;
        
        if (won) {
            title.textContent = 'Congratulations!';
            message.textContent = 'You successfully created a stable ecosystem!';
        } else {
            title.textContent = 'Time\'s Up!';
            message.textContent = 'Try to achieve 80% stability faster next time.';
        }
        
        scores.innerHTML = `
            <h3>Final Scores</h3>
            <p>Stability: ${Math.round(stability)}%</p>
            <p>Biodiversity: ${Math.round(biodiversity)}%</p>
            <p>Balance: ${Math.round(balance)}%</p>
            <p>Time Used: ${Math.floor(timeUsed / 60)}:${(timeUsed % 60).toString().padStart(2, '0')}</p>
            <p>Species Placed: ${this.placedSpecies.length}</p>
        `;
        
        modal.classList.remove('hidden');
    }
    
    playAgain() {
        document.getElementById('game-over-modal').classList.add('hidden');
        this.resetGame();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new EcosystemGame();
});