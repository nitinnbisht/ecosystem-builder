# Ecosystem Builder Game

A web-based ecosystem simulation game where players must create a balanced food chain ecosystem within 35 minutes.

## How to Play

1. Visit [https://nitinnbisht.github.io/ecosystem-builder/](https://nitinnbisht.github.io/ecosystem-builder/) or run locally with `npm run dev`
2. Click "Start Game" to begin the 35-minute timer
3. Drag species from the right panel to the ecosystem grid
4. Create a balanced ecosystem with:
   - Producers (plants) as the foundation
   - Primary consumers (herbivores)
   - Secondary consumers (carnivores)
   - Decomposers for nutrient cycling
5. Achieve 80%+ stability to win
6. Click on placed species to remove them

## Game Mechanics

### Species Types
- **Producers**: Grass 🌱, Tree 🌳 (Foundation of food chain)
- **Primary Consumers**: Rabbit 🐰, Deer 🦌 (Eat plants)
- **Secondary Consumers**: Fox 🦊, Wolf 🐺 (Eat herbivores)
- **Tertiary Consumers**: Eagle 🦅 (Top predators)
- **Decomposers**: Mushroom 🍄 (Recycle nutrients)

### Scoring Metrics
- **Stability**: Based on proper trophic level ratios
- **Biodiversity**: Variety of species types
- **Food Chain Balance**: Presence of all ecosystem roles

### Winning Conditions
- Achieve 80%+ ecosystem stability
- Complete within 35 minutes
- Maintain balanced predator-prey relationships

## Project Structure
```
src/
├── components/          # Vue components
│   ├── Header.vue      # Game header with timer
│   ├── EcosystemPanel.vue  # Main ecosystem builder
│   ├── SpeciesPanel.vue    # Species selection panel
│   └── ...             # Other components
├── data/               # Game data
│   └── ecosystemData.js    # Species and location data
├── App.vue             # Main Vue app
└── main.js             # Vue app entry point
```

## Features
- **Vue.js 3** with Composition API
- **Vite** for fast development and building
- **Ecosystem Simulation** with 39 species across 3 environments
- **Real-time Validation** of food webs and environmental compatibility
- **Animated Backgrounds** for each ecosystem type
- **Responsive Design** for mobile and desktop
- **GitHub Pages Deployment** with automated CI/CD

## Development Setup

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/nitinnbisht/ecosystem-builder.git
cd ecosystem-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## Live Demo
Play the game online: [https://nitinnbisht.github.io/ecosystem-builder/](https://nitinnbisht.github.io/ecosystem-builder/)

## Game Strategy Tips
1. Start with producers (plants) as your foundation
2. Add herbivores in moderate numbers
3. Include fewer carnivores than herbivores
4. Don't forget decomposers for ecosystem balance
5. Distribute species across the grid for spatial balance