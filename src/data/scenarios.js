import { generateRandomRegion } from './regions.js'

export function createScenario() {
  const region = generateRandomRegion()
  
  return {
    name: "Marine Ecosystem Challenge",
    region: region,
    constraints: {
      maxSpecies: 8,
      totalCalories: 4000,
      minFoodChains: 3,
      timeLimit: 480
    },
    species: [
      // Producers
      { 
        id: 'kelp', name: 'Giant Kelp', type: 'producer', icon: '🌿', 
        calories: 200, cost: 50, 
        habitat: ['shallow'], temp: ['cold', 'temperate'], salinity: ['low', 'medium'],
        growthRate: 'fast', oxygenProduction: 'high', carbonAbsorption: 85,
        seasonalVariation: 'high', pollutionTolerance: 'low', currentNeed: 'medium',
        lifespan: 2, reproductionRate: 'high', biomass: 150
      },
      { 
        id: 'phytoplankton', name: 'Phytoplankton', type: 'producer', icon: '🦠', 
        calories: 150, cost: 40, 
        habitat: ['surface'], temp: ['all'], salinity: ['all'],
        growthRate: 'very_fast', oxygenProduction: 'very_high', carbonAbsorption: 95,
        seasonalVariation: 'medium', pollutionTolerance: 'medium', currentNeed: 'low',
        lifespan: 0.1, reproductionRate: 'very_high', biomass: 50
      },
      { 
        id: 'seagrass', name: 'Seagrass Meadow', type: 'producer', icon: '🌱', 
        calories: 180, cost: 45, 
        habitat: ['shallow'], temp: ['temperate', 'warm'], salinity: ['medium', 'high'],
        growthRate: 'medium', oxygenProduction: 'medium', carbonAbsorption: 70,
        seasonalVariation: 'low', pollutionTolerance: 'very_low', currentNeed: 'low',
        lifespan: 5, reproductionRate: 'medium', biomass: 120
      },
      { 
        id: 'coral', name: 'Coral Reef', type: 'producer', icon: '🪸', 
        calories: 120, cost: 60, 
        habitat: ['shallow'], temp: ['warm'], salinity: ['high'],
        growthRate: 'slow', oxygenProduction: 'medium', carbonAbsorption: 60,
        seasonalVariation: 'very_low', pollutionTolerance: 'very_low', currentNeed: 'medium',
        lifespan: 100, reproductionRate: 'low', biomass: 200
      },
      { 
        id: 'algae', name: 'Marine Algae', type: 'producer', icon: '🟢', 
        calories: 160, cost: 35, 
        habitat: ['shallow', 'mid'], temp: ['all'], salinity: ['all'],
        growthRate: 'fast', oxygenProduction: 'high', carbonAbsorption: 80,
        seasonalVariation: 'medium', pollutionTolerance: 'high', currentNeed: 'low',
        lifespan: 1, reproductionRate: 'high', biomass: 80
      },
      
      // Primary Consumers
      { 
        id: 'krill', name: 'Antarctic Krill', type: 'primary', icon: '🦐', 
        calories: 100, cost: 80, eats: ['phytoplankton'], 
        habitat: ['surface', 'mid'], temp: ['cold', 'temperate'], salinity: ['low', 'medium'],
        swarmSize: 'massive', migrationPattern: 'vertical', metabolicRate: 'high',
        predatorAvoidance: 'schooling', reproductionSeason: 'spring', pollutionTolerance: 'medium',
        lifespan: 2, bodySize: 'tiny', energyEfficiency: 85
      },
      { 
        id: 'sea_urchin', name: 'Purple Sea Urchin', type: 'primary', icon: '🔴', 
        calories: 120, cost: 90, eats: ['kelp', 'algae'], 
        habitat: ['shallow'], temp: ['cold', 'temperate'], salinity: ['medium', 'high'],
        spineCount: 4000, movementSpeed: 'very_slow', grazingRate: 'high',
        predatorAvoidance: 'spines', reproductionSeason: 'summer', pollutionTolerance: 'low',
        lifespan: 30, bodySize: 'small', energyEfficiency: 70
      },
      { 
        id: 'parrotfish', name: 'Rainbow Parrotfish', type: 'primary', icon: '🐠', 
        calories: 250, cost: 120, eats: ['coral', 'algae'], 
        habitat: ['shallow'], temp: ['warm'], salinity: ['high'],
        beakStrength: 'very_high', swimmingSpeed: 'medium', schoolSize: 'small',
        predatorAvoidance: 'speed', reproductionSeason: 'year_round', pollutionTolerance: 'low',
        lifespan: 7, bodySize: 'medium', energyEfficiency: 75
      },
      { 
        id: 'zooplankton', name: 'Copepod Zooplankton', type: 'primary', icon: '🔵', 
        calories: 80, cost: 70, eats: ['phytoplankton'], 
        habitat: ['surface'], temp: ['all'], salinity: ['all'],
        swarmDensity: 'extreme', migrationPattern: 'daily', metabolicRate: 'very_high',
        predatorAvoidance: 'transparency', reproductionSeason: 'continuous', pollutionTolerance: 'high',
        lifespan: 0.5, bodySize: 'microscopic', energyEfficiency: 90
      },
      { 
        id: 'manatee', name: 'West Indian Manatee', type: 'primary', icon: '🐋', 
        calories: 800, cost: 300, eats: ['seagrass', 'algae'], 
        habitat: ['shallow'], temp: ['warm'], salinity: ['low', 'medium'],
        bodyWeight: 590, swimmingSpeed: 'slow', grazingTime: 8,
        predatorAvoidance: 'size', reproductionSeason: 'year_round', pollutionTolerance: 'very_low',
        lifespan: 60, bodySize: 'very_large', energyEfficiency: 60
      },
      { 
        id: 'green_turtle', name: 'Green Sea Turtle', type: 'primary', icon: '🐢', 
        calories: 600, cost: 250, eats: ['seagrass', 'algae'], 
        habitat: ['shallow', 'surface'], temp: ['temperate', 'warm'], salinity: ['medium', 'high'],
        shellHardness: 'very_high', divingDepth: 150, migrationDistance: 2000,
        predatorAvoidance: 'shell', reproductionSeason: 'summer', pollutionTolerance: 'low',
        lifespan: 80, bodySize: 'large', energyEfficiency: 65
      },
      
      // Secondary Consumers
      { 
        id: 'anchovy', name: 'European Anchovy', type: 'secondary', icon: '🐟', 
        calories: 150, cost: 100, eats: ['zooplankton', 'krill'], 
        habitat: ['surface', 'mid'], temp: ['temperate', 'warm'], salinity: ['medium', 'high'],
        schoolSize: 'massive', swimmingSpeed: 'fast', filterEfficiency: 'high',
        predatorAvoidance: 'schooling', reproductionSeason: 'spring', pollutionTolerance: 'medium',
        lifespan: 4, bodySize: 'small', energyEfficiency: 80
      },
      { 
        id: 'sardine', name: 'Pacific Sardine', type: 'secondary', icon: '🐠', 
        calories: 180, cost: 110, eats: ['zooplankton', 'phytoplankton'], 
        habitat: ['surface'], temp: ['temperate'], salinity: ['medium'],
        schoolSize: 'very_large', swimmingSpeed: 'fast', filterEfficiency: 'very_high',
        predatorAvoidance: 'schooling', reproductionSeason: 'summer', pollutionTolerance: 'high',
        lifespan: 6, bodySize: 'small', energyEfficiency: 85
      },
      { 
        id: 'crab', name: 'Dungeness Crab', type: 'secondary', icon: '🦀', 
        calories: 200, cost: 130, eats: ['algae', 'sea_urchin'], 
        habitat: ['shallow'], temp: ['all'], salinity: ['medium', 'high'],
        clawStrength: 'high', burrowingAbility: 'excellent', molting_frequency: 'annual',
        predatorAvoidance: 'claws', reproductionSeason: 'winter', pollutionTolerance: 'medium',
        lifespan: 8, bodySize: 'medium', energyEfficiency: 70
      },
      { 
        id: 'lobster', name: 'American Lobster', type: 'secondary', icon: '🦞', 
        calories: 300, cost: 180, eats: ['sea_urchin', 'crab'], 
        habitat: ['shallow', 'mid'], temp: ['cold', 'temperate'], salinity: ['high'],
        clawStrength: 'very_high', burrowingAbility: 'good', molting_frequency: 'annual',
        predatorAvoidance: 'claws', reproductionSeason: 'summer', pollutionTolerance: 'low',
        lifespan: 50, bodySize: 'large', energyEfficiency: 65
      },
      { 
        id: 'octopus', name: 'Giant Pacific Octopus', type: 'secondary', icon: '🐙', 
        calories: 400, cost: 200, eats: ['crab', 'lobster'], 
        habitat: ['shallow', 'mid'], temp: ['all'], salinity: ['high'],
        intelligence: 'very_high', camouflageAbility: 'perfect', armCount: 8,
        predatorAvoidance: 'camouflage', reproductionSeason: 'autumn', pollutionTolerance: 'medium',
        lifespan: 4, bodySize: 'very_large', energyEfficiency: 75
      },
      { 
        id: 'squid', name: 'Humboldt Squid', type: 'secondary', icon: '🦑', 
        calories: 350, cost: 190, eats: ['anchovy', 'sardine', 'krill'], 
        habitat: ['mid', 'deep'], temp: ['all'], salinity: ['high'],
        jetPropulsion: 'excellent', tentacleCount: 10, huntingStrategy: 'pack',
        predatorAvoidance: 'speed', reproductionSeason: 'year_round', pollutionTolerance: 'high',
        lifespan: 2, bodySize: 'large', energyEfficiency: 80
      },
      
      // Tertiary Consumers
      { 
        id: 'tuna', name: 'Bluefin Tuna', type: 'tertiary', icon: '🐟', 
        calories: 500, cost: 300, eats: ['anchovy', 'sardine', 'squid'], 
        habitat: ['surface', 'mid'], temp: ['temperate', 'warm'], salinity: ['high'],
        swimmingSpeed: 'very_fast', bodyTemperature: 'warm_blooded', migrationDistance: 5000,
        predatorAvoidance: 'speed', reproductionSeason: 'spring', pollutionTolerance: 'low',
        lifespan: 20, bodySize: 'very_large', energyEfficiency: 70
      },
      { 
        id: 'salmon', name: 'Atlantic Salmon', type: 'tertiary', icon: '🐠', 
        calories: 450, cost: 280, eats: ['anchovy', 'krill'], 
        habitat: ['surface', 'mid'], temp: ['cold', 'temperate'], salinity: ['low', 'medium'],
        swimmingSpeed: 'fast', jumpingAbility: 'excellent', migrationDistance: 3000,
        predatorAvoidance: 'speed', reproductionSeason: 'autumn', pollutionTolerance: 'very_low',
        lifespan: 8, bodySize: 'large', energyEfficiency: 75
      },
      { 
        id: 'seal', name: 'Harbor Seal', type: 'tertiary', icon: '🦭', 
        calories: 700, cost: 400, eats: ['salmon', 'anchovy', 'squid'], 
        habitat: ['surface'], temp: ['cold', 'temperate'], salinity: ['medium', 'high'],
        divingDepth: 200, breathHoldTime: 20, blubberThickness: 'thick',
        predatorAvoidance: 'agility', reproductionSeason: 'summer', pollutionTolerance: 'low',
        lifespan: 25, bodySize: 'large', energyEfficiency: 60
      },
      { 
        id: 'dolphin', name: 'Bottlenose Dolphin', type: 'tertiary', icon: '🐬', 
        calories: 800, cost: 450, eats: ['tuna', 'sardine', 'squid'], 
        habitat: ['surface', 'mid'], temp: ['temperate', 'warm'], salinity: ['high'],
        intelligence: 'very_high', echolocationRange: 100, podSize: 15,
        predatorAvoidance: 'intelligence', reproductionSeason: 'spring', pollutionTolerance: 'low',
        lifespan: 45, bodySize: 'large', energyEfficiency: 65
      },
      { 
        id: 'shark', name: 'Tiger Shark', type: 'tertiary', icon: '🦈', 
        calories: 1000, cost: 500, eats: ['tuna', 'salmon', 'seal'], 
        habitat: ['mid', 'deep'], temp: ['all'], salinity: ['high'],
        biteForce: 'extreme', electroreception: 'excellent', territorySize: 'large',
        predatorAvoidance: 'aggression', reproductionSeason: 'summer', pollutionTolerance: 'medium',
        lifespan: 30, bodySize: 'very_large', energyEfficiency: 55
      },
      
      // Apex Predators
      { 
        id: 'orca', name: 'Killer Whale (Orca)', type: 'apex', icon: '🐋', 
        calories: 1500, cost: 800, eats: ['seal', 'dolphin', 'shark'], 
        habitat: ['surface', 'mid'], temp: ['cold', 'temperate'], salinity: ['high'],
        intelligence: 'extreme', echolocationRange: 500, podSize: 8,
        predatorAvoidance: 'none', reproductionSeason: 'year_round', pollutionTolerance: 'very_low',
        lifespan: 90, bodySize: 'massive', energyEfficiency: 50
      },
      { 
        id: 'great_white', name: 'Great White Shark', type: 'apex', icon: '🦈', 
        calories: 1200, cost: 600, eats: ['seal', 'tuna', 'dolphin'], 
        habitat: ['surface', 'mid'], temp: ['temperate', 'warm'], salinity: ['high'],
        biteForce: 'maximum', electroreception: 'perfect', territorySize: 'massive',
        predatorAvoidance: 'none', reproductionSeason: 'summer', pollutionTolerance: 'low',
        lifespan: 70, bodySize: 'massive', energyEfficiency: 45
      }
    ],
    objectives: {
      totalCaloriesTarget: 4000,
      minProducers: 2,
      maxApex: 1,
      biodiversityBonus: 0.2,
      efficiencyTarget: 0.15
    }
  }
}

export const scenarios = [createScenario()]