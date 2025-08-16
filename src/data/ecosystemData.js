export const variants = ['Forest', 'Mountain', 'Coral Reef']

// Static list of 39 species used across all ecosystems
const masterSpeciesList = [
    // Producers (9 species)
    { id: 'oak_tree', name: 'Oak Tree', type: 'producer', icon: '🌳', caloriesOutput: 1500, caloriesIntake: 0, temp: [15, 30], elevation: [0, 500], windSpeed: [0, 15], pH: [6.0, 7.5], bodyLength: 2500, reproductionRate: 0.1 },
    { id: 'pine_tree', name: 'Pine Tree', type: 'producer', icon: '🌲', caloriesOutput: 1300, caloriesIntake: 0, temp: [5, 20], elevation: [400, 1200], windSpeed: [10, 30], pH: [5.0, 6.5], bodyLength: 1800, reproductionRate: 0.05 },
    { id: 'maple_tree', name: 'Maple Tree', type: 'producer', icon: '🍁', caloriesOutput: 1400, caloriesIntake: 0, temp: [12, 28], elevation: [0, 600], windSpeed: [0, 20], pH: [6.0, 7.8], bodyLength: 2200, reproductionRate: 0.08 },
    { id: 'fern', name: 'Forest Fern', type: 'producer', icon: '🌿', caloriesOutput: 600, caloriesIntake: 0, temp: [18, 35], elevation: [0, 200], windSpeed: [0, 12], pH: [7.0, 8.0], bodyLength: 85, reproductionRate: 2.5 },
    { id: 'moss', name: 'Forest Moss', type: 'producer', icon: '🟢', caloriesOutput: 300, caloriesIntake: 0, temp: [8, 25], elevation: [300, 1200], windSpeed: [5, 25], pH: [4.5, 6.0], bodyLength: 12, reproductionRate: 8.2 },
    { id: 'grass', name: 'Wild Grass', type: 'producer', icon: '🌱', caloriesOutput: 450, caloriesIntake: 0, temp: [10, 32], elevation: [0, 800], windSpeed: [0, 30], pH: [6.0, 8.0], bodyLength: 45, reproductionRate: 4.1 },
    { id: 'berry_bush', name: 'Berry Bush', type: 'producer', icon: '🫐', caloriesOutput: 900, caloriesIntake: 0, temp: [15, 28], elevation: [0, 400], windSpeed: [0, 18], pH: [6.5, 7.5], bodyLength: 180, reproductionRate: 1.2 },
    { id: 'wildflower', name: 'Wildflower', type: 'producer', icon: '🌸', caloriesOutput: 250, caloriesIntake: 0, temp: [20, 35], elevation: [0, 300], windSpeed: [0, 15], pH: [7.2, 8.0], bodyLength: 25, reproductionRate: 6.8 },
    { id: 'mushroom', name: 'Forest Mushroom', type: 'producer', icon: '🍄', caloriesOutput: 200, caloriesIntake: 0, temp: [8, 22], elevation: [0, 800], windSpeed: [0, 20], pH: [5.0, 6.8], bodyLength: 18, reproductionRate: 12.5 },
    
    // Animals (30 species)
    { id: 'rabbit', name: 'Forest Rabbit', type: 'primary', icon: '🐰', caloriesOutput: 600, caloriesIntake: 400, temp: [12, 28], elevation: [0, 400], windSpeed: [0, 18], pH: [6.0, 7.8], bodyLength: 35, reproductionRate: 4.2, eats: ['grass', 'wildflower', 'berry_bush'] },
    { id: 'deer', name: 'White-tailed Deer', type: 'primary', icon: '🦌', caloriesOutput: 1200, caloriesIntake: 800, temp: [8, 25], elevation: [200, 1000], windSpeed: [5, 25], pH: [5.5, 7.0], bodyLength: 180, reproductionRate: 1.8, eats: ['oak_tree', 'maple_tree', 'grass', 'fern'] },
    { id: 'squirrel', name: 'Gray Squirrel', type: 'primary', icon: '🐿️', caloriesOutput: 300, caloriesIntake: 200, temp: [10, 26], elevation: [0, 600], windSpeed: [0, 20], pH: [6.0, 7.5], bodyLength: 28, reproductionRate: 2.8, eats: ['oak_tree', 'pine_tree', 'berry_bush'] },
    { id: 'chipmunk', name: 'Chipmunk', type: 'primary', icon: '🐿️', caloriesOutput: 150, caloriesIntake: 100, temp: [15, 32], elevation: [0, 300], windSpeed: [0, 15], pH: [6.5, 8.0], bodyLength: 22, reproductionRate: 3.5, eats: ['berry_bush', 'wildflower', 'grass'] },
    { id: 'porcupine', name: 'Porcupine', type: 'primary', icon: '🦔', caloriesOutput: 500, caloriesIntake: 350, temp: [5, 18], elevation: [400, 1200], windSpeed: [10, 30], pH: [5.0, 6.5], bodyLength: 75, reproductionRate: 1.5, eats: ['pine_tree', 'oak_tree', 'fern'] },
    { id: 'beaver', name: 'Beaver', type: 'primary', icon: '🦫', caloriesOutput: 800, caloriesIntake: 600, temp: [0, 25], elevation: [0, 600], windSpeed: [0, 20], pH: [6.0, 8.5], bodyLength: 95, reproductionRate: 2.2, eats: ['maple_tree', 'oak_tree', 'grass'] },
    { id: 'vole', name: 'Meadow Vole', type: 'primary', icon: '🐭', caloriesOutput: 180, caloriesIntake: 120, temp: [0, 28], elevation: [0, 1000], windSpeed: [0, 25], pH: [5.5, 8.0], bodyLength: 15, reproductionRate: 6.8, eats: ['grass', 'moss', 'fern'] },
    { id: 'ant', name: 'Forest Ant', type: 'primary', icon: '🐜', caloriesOutput: 50, caloriesIntake: 30, temp: [8, 35], elevation: [0, 1000], windSpeed: [0, 25], pH: [5.0, 8.0], bodyLength: 1.2, reproductionRate: 45.2, eats: ['mushroom', 'wildflower'] },
    { id: 'butterfly', name: 'Monarch Butterfly', type: 'primary', icon: '🦋', caloriesOutput: 30, caloriesIntake: 20, temp: [12, 32], elevation: [0, 800], windSpeed: [0, 15], pH: [6.0, 8.5], bodyLength: 8.5, reproductionRate: 12.8, eats: ['wildflower'] },
    { id: 'bee', name: 'Honey Bee', type: 'primary', icon: '🐝', caloriesOutput: 40, caloriesIntake: 25, temp: [10, 30], elevation: [0, 800], windSpeed: [0, 18], pH: [6.0, 8.0], bodyLength: 1.8, reproductionRate: 28.5, eats: ['wildflower'] },
    { id: 'mouse', name: 'Field Mouse', type: 'primary', icon: '🐁', caloriesOutput: 120, caloriesIntake: 80, temp: [5, 30], elevation: [0, 900], windSpeed: [0, 20], pH: [5.5, 8.0], bodyLength: 12, reproductionRate: 8.2, eats: ['grass', 'berry_bush', 'mushroom'] },
    { id: 'woodchuck', name: 'Woodchuck', type: 'primary', icon: '🦫', caloriesOutput: 400, caloriesIntake: 300, temp: [0, 28], elevation: [0, 800], windSpeed: [0, 22], pH: [5.5, 7.5], bodyLength: 65, reproductionRate: 1.8, eats: ['grass', 'fern', 'wildflower'] },
    { id: 'opossum', name: 'Virginia Opossum', type: 'primary', icon: '🐀', caloriesOutput: 350, caloriesIntake: 250, temp: [5, 32], elevation: [0, 700], windSpeed: [0, 20], pH: [5.5, 8.0], bodyLength: 48, reproductionRate: 2.5, eats: ['berry_bush', 'mushroom', 'grass'] },
    { id: 'skunk', name: 'Striped Skunk', type: 'primary', icon: '🦨', caloriesOutput: 300, caloriesIntake: 200, temp: [0, 30], elevation: [0, 800], windSpeed: [0, 25], pH: [5.0, 8.0], bodyLength: 42, reproductionRate: 3.1, eats: ['mushroom', 'berry_bush', 'ant'] },
    { id: 'mole', name: 'Star-nosed Mole', type: 'primary', icon: '🐭', caloriesOutput: 100, caloriesIntake: 70, temp: [5, 25], elevation: [0, 600], windSpeed: [0, 15], pH: [5.5, 7.5], bodyLength: 18, reproductionRate: 4.8, eats: ['ant', 'mushroom'] },
    { id: 'fox', name: 'Red Fox', type: 'secondary', icon: '🦊', caloriesOutput: 900, caloriesIntake: 600, temp: [8, 25], elevation: [100, 800], windSpeed: [0, 25], pH: [5.5, 7.2], bodyLength: 95, reproductionRate: 3.2, eats: ['rabbit', 'squirrel', 'chipmunk'] },
    { id: 'owl', name: 'Great Horned Owl', type: 'secondary', icon: '🦉', caloriesOutput: 600, caloriesIntake: 400, temp: [5, 22], elevation: [200, 1000], windSpeed: [8, 25], pH: [5.0, 6.8], bodyLength: 58, reproductionRate: 1.8, eats: ['rabbit', 'squirrel', 'vole'] },
    { id: 'hawk', name: 'Red-tailed Hawk', type: 'secondary', icon: '🦅', caloriesOutput: 700, caloriesIntake: 450, temp: [18, 35], elevation: [0, 400], windSpeed: [5, 20], pH: [7.0, 8.0], bodyLength: 52, reproductionRate: 2.1, eats: ['rabbit', 'squirrel', 'chipmunk'] },
    { id: 'weasel', name: 'Long-tailed Weasel', type: 'secondary', icon: '🦦', caloriesOutput: 250, caloriesIntake: 180, temp: [5, 28], elevation: [0, 800], windSpeed: [0, 20], pH: [5.5, 8.0], bodyLength: 32, reproductionRate: 4.5, eats: ['chipmunk', 'vole', 'mouse'] },
    { id: 'snake', name: 'Garter Snake', type: 'secondary', icon: '🐍', caloriesOutput: 300, caloriesIntake: 200, temp: [10, 35], elevation: [0, 700], windSpeed: [0, 18], pH: [5.5, 8.0], bodyLength: 85, reproductionRate: 2.8, eats: ['mouse', 'vole', 'ant'] },
    { id: 'raccoon', name: 'Raccoon', type: 'secondary', icon: '🦝', caloriesOutput: 550, caloriesIntake: 400, temp: [5, 32], elevation: [0, 1000], windSpeed: [0, 25], pH: [5.0, 8.5], bodyLength: 68, reproductionRate: 2.5, eats: ['mouse', 'ant', 'berry_bush'] },
    { id: 'beetle', name: 'Ground Beetle', type: 'secondary', icon: '🪲', caloriesOutput: 80, caloriesIntake: 50, temp: [8, 32], elevation: [0, 1200], windSpeed: [0, 25], pH: [5.0, 8.0], bodyLength: 2.8, reproductionRate: 18.5, eats: ['ant', 'butterfly'] },
    { id: 'spider', name: 'Wolf Spider', type: 'secondary', icon: '🕷️', caloriesOutput: 60, caloriesIntake: 40, temp: [5, 30], elevation: [0, 1000], windSpeed: [0, 20], pH: [5.5, 8.0], bodyLength: 3.2, reproductionRate: 25.8, eats: ['ant', 'butterfly', 'bee'] },
    { id: 'woodpecker', name: 'Pileated Woodpecker', type: 'secondary', icon: '🐦', caloriesOutput: 200, caloriesIntake: 130, temp: [0, 28], elevation: [0, 1000], windSpeed: [0, 25], pH: [5.0, 8.0], bodyLength: 45, reproductionRate: 1.5, eats: ['ant', 'beetle'] },
    { id: 'frog', name: 'Wood Frog', type: 'secondary', icon: '🐸', caloriesOutput: 120, caloriesIntake: 80, temp: [5, 28], elevation: [0, 600], windSpeed: [0, 15], pH: [6.0, 8.5], bodyLength: 8.5, reproductionRate: 12.2, eats: ['ant', 'spider', 'butterfly'] },
    { id: 'salamander', name: 'Red-backed Salamander', type: 'secondary', icon: '🦎', caloriesOutput: 80, caloriesIntake: 50, temp: [8, 25], elevation: [0, 800], windSpeed: [0, 12], pH: [5.0, 7.5], bodyLength: 12, reproductionRate: 8.5, eats: ['ant', 'beetle'] },
    { id: 'bat', name: 'Little Brown Bat', type: 'secondary', icon: '🦇', caloriesOutput: 150, caloriesIntake: 100, temp: [10, 32], elevation: [0, 1200], windSpeed: [0, 30], pH: [5.5, 8.0], bodyLength: 9.5, reproductionRate: 1.2, eats: ['butterfly', 'beetle', 'ant'] },
    { id: 'shrew', name: 'Masked Shrew', type: 'secondary', icon: '🐁', caloriesOutput: 100, caloriesIntake: 70, temp: [5, 26], elevation: [0, 800], windSpeed: [0, 18], pH: [5.0, 8.0], bodyLength: 8.2, reproductionRate: 6.8, eats: ['ant', 'beetle', 'spider'] },
    { id: 'mink', name: 'American Mink', type: 'secondary', icon: '🦦', caloriesOutput: 400, caloriesIntake: 280, temp: [0, 25], elevation: [0, 600], windSpeed: [0, 20], pH: [6.0, 8.5], bodyLength: 55, reproductionRate: 2.8, eats: ['mouse', 'vole', 'frog'] },
    { id: 'wolf', name: 'Gray Wolf', type: 'tertiary', icon: '🐺', caloriesOutput: 1500, caloriesIntake: 1000, temp: [5, 20], elevation: [300, 1200], windSpeed: [10, 35], pH: [5.0, 6.5], bodyLength: 165, reproductionRate: 2.1, eats: ['deer', 'beaver', 'fox'] },
    { id: 'bear', name: 'Black Bear', type: 'tertiary', icon: '🐻', caloriesOutput: 2000, caloriesIntake: 1300, temp: [10, 28], elevation: [0, 800], windSpeed: [0, 25], pH: [5.5, 7.5], bodyLength: 185, reproductionRate: 0.8, eats: ['deer', 'beaver', 'raccoon'] }
]

export const speciesDatabase = {
  Forest: masterSpeciesList,
  Mountain: masterSpeciesList,
  'Coral Reef': masterSpeciesList
}

export const locations = {
  Forest: [
    { id: 'temperate_valley', name: 'Temperate Valley', temp: 18, elevation: 200, windSpeed: 8, pH: 6.8, waterFlow: 45, sunlightHours: 7.2, vegetation: 68 },
    { id: 'mountain_slope', name: 'Mountain Slope', temp: 12, elevation: 900, windSpeed: 18, pH: 6.2, waterFlow: 12, sunlightHours: 6.8, vegetation: 45 },
    { id: 'lowland_forest', name: 'Lowland Forest', temp: 22, elevation: 50, windSpeed: 5, pH: 7.2, waterFlow: 78, sunlightHours: 8.1, vegetation: 85 },
    { id: 'highland_plateau', name: 'Highland Plateau', temp: 8, elevation: 1100, windSpeed: 22, pH: 5.8, waterFlow: 8, sunlightHours: 5.9, vegetation: 32 },
    { id: 'river_valley', name: 'River Valley', temp: 20, elevation: 150, windSpeed: 6, pH: 7.5, waterFlow: 95, sunlightHours: 7.8, vegetation: 72 },
    { id: 'pine_forest', name: 'Pine Forest', temp: 15, elevation: 600, windSpeed: 12, pH: 6.0, waterFlow: 25, sunlightHours: 6.5, vegetation: 58 },
    { id: 'deciduous_grove', name: 'Deciduous Grove', temp: 24, elevation: 100, windSpeed: 4, pH: 7.0, waterFlow: 62, sunlightHours: 8.5, vegetation: 78 },
    { id: 'forest_edge', name: 'Forest Edge', temp: 26, elevation: 80, windSpeed: 14, pH: 6.5, waterFlow: 38, sunlightHours: 9.2, vegetation: 55 }
  ],
  
  Mountain: [
    { id: 'alpine_meadow', name: 'Alpine Meadow', temp: 15, elevation: 800, windSpeed: 18, pH: 6.2, waterFlow: 15, sunlightHours: 9.5, vegetation: 42 },
    { id: 'rocky_peak', name: 'Rocky Peak', temp: 10, elevation: 1000, windSpeed: 25, pH: 5.8, waterFlow: 3, sunlightHours: 11.2, vegetation: 8 },
    { id: 'mountain_valley', name: 'Mountain Valley', temp: 18, elevation: 600, windSpeed: 15, pH: 6.5, waterFlow: 28, sunlightHours: 8.8, vegetation: 65 },
    { id: 'glacier_edge', name: 'Glacier Edge', temp: 8, elevation: 900, windSpeed: 20, pH: 5.5, waterFlow: 85, sunlightHours: 10.8, vegetation: 12 },
    { id: 'treeline', name: 'Treeline Zone', temp: 12, elevation: 700, windSpeed: 16, pH: 6.0, waterFlow: 18, sunlightHours: 9.1, vegetation: 35 },
    { id: 'high_plateau', name: 'High Plateau', temp: 14, elevation: 850, windSpeed: 22, pH: 5.9, waterFlow: 6, sunlightHours: 10.5, vegetation: 18 }
  ],
  
  'Coral Reef': [
    { id: 'shallow_reef', name: 'Shallow Reef', temp: 26, elevation: 50, windSpeed: 8, pH: 7.8, waterFlow: 22, sunlightHours: 12.5, vegetation: 88 },
    { id: 'deep_reef', name: 'Deep Reef', temp: 24, elevation: 100, windSpeed: 12, pH: 7.5, waterFlow: 35, sunlightHours: 4.2, vegetation: 45 },
    { id: 'lagoon', name: 'Coral Lagoon', temp: 28, elevation: 30, windSpeed: 5, pH: 7.9, waterFlow: 8, sunlightHours: 13.1, vegetation: 92 },
    { id: 'reef_wall', name: 'Reef Wall', temp: 25, elevation: 80, windSpeed: 15, pH: 7.6, waterFlow: 48, sunlightHours: 3.8, vegetation: 38 },
    { id: 'atoll_rim', name: 'Atoll Rim', temp: 27, elevation: 60, windSpeed: 10, pH: 7.7, waterFlow: 18, sunlightHours: 11.8, vegetation: 75 },
    { id: 'back_reef', name: 'Back Reef', temp: 29, elevation: 40, windSpeed: 6, pH: 7.8, waterFlow: 12, sunlightHours: 13.8, vegetation: 95 }
  ]
}

export function getRandomVariant() {
  return variants[Math.floor(Math.random() * variants.length)]
}