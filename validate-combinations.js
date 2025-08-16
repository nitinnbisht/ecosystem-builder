import { speciesDatabase, locations } from './src/data/ecosystemData.js'

function isCompatibleWithLocation(species, location) {
  return species.temp[0] <= location.temp && location.temp <= species.temp[1] &&
         species.elevation[0] <= location.elevation && location.elevation <= species.elevation[1] &&
         species.windSpeed[0] <= location.windSpeed && location.windSpeed <= species.windSpeed[1] &&
         species.pH[0] <= location.pH && location.pH <= species.pH[1]
}

function validateEcosystem(selectedSpecies) {
  const typeCounts = {}
  selectedSpecies.forEach(species => {
    typeCounts[species.type] = (typeCounts[species.type] || 0) + 1
  })
  
  // Check requirements
  if ((typeCounts.producer || 0) < 2) return false
  if ((typeCounts.decomposer || 0) < 1) return false
  if ((typeCounts.primary || 0) < 1) return false
  if ((typeCounts.secondary || 0) < 1) return false
  
  // Check pyramid structure
  if ((typeCounts.primary || 0) >= (typeCounts.producer || 0)) return false
  if ((typeCounts.secondary || 0) >= (typeCounts.primary || 0)) return false
  if ((typeCounts.tertiary || 0) > 0 && (typeCounts.tertiary || 0) >= (typeCounts.secondary || 0)) return false
  
  // Check calorie balance with 20% buffer
  for (const species of selectedSpecies) {
    if (species.caloriesIntake > 0) {
      let availableCalories = 0
      if (species.eats) {
        species.eats.forEach(preyId => {
          const prey = selectedSpecies.find(s => s.id === preyId)
          if (prey) availableCalories += prey.caloriesOutput
        })
      }
      const requiredCalories = Math.ceil(species.caloriesIntake * 1.2)
      if (availableCalories < requiredCalories) return false
    }
  }
  
  // Check for isolated species
  for (const species of selectedSpecies) {
    if (species.type !== 'producer' && species.type !== 'decomposer') {
      const hasValidPrey = species.eats && species.eats.some(preyId => 
        selectedSpecies.find(s => s.id === preyId)
      )
      if (!hasValidPrey) return false
    }
  }
  
  return true
}

function findValidCombinations(variant, location, maxCombinations = 100) {
  const availableSpecies = speciesDatabase[variant].filter(species => 
    isCompatibleWithLocation(species, location)
  )
  
  const validCombinations = []
  
  function generateCombinations(species, start, current) {
    if (current.length === 8) {
      if (validateEcosystem(current)) {
        validCombinations.push([...current])
        if (validCombinations.length >= maxCombinations) return true
      }
      return false
    }
    
    for (let i = start; i < species.length; i++) {
      current.push(species[i])
      if (generateCombinations(species, i + 1, current)) return true
      current.pop()
    }
    return false
  }
  
  generateCombinations(availableSpecies, 0, [])
  return validCombinations
}

function validateAllCombinations() {
  const results = {}
  
  for (const [variant, speciesList] of Object.entries(speciesDatabase)) {
    results[variant] = {}
    const variantLocations = locations[variant]
    
    for (const location of variantLocations) {
      console.log(`Checking ${variant} - ${location.name}...`)
      const validCombinations = findValidCombinations(variant, location, 10)
      
      results[variant][location.name] = {
        validCombinations: validCombinations.length,
        compatibleSpecies: speciesList.filter(s => isCompatibleWithLocation(s, location)).length,
        totalSpecies: speciesList.length
      }
      
      console.log(`  Compatible species: ${results[variant][location.name].compatibleSpecies}/${results[variant][location.name].totalSpecies}`)
      console.log(`  Valid combinations found: ${validCombinations.length}`)
    }
  }
  
  return results
}

// Run validation
console.log('Validating ecosystem combinations...\n')
const results = validateAllCombinations()

console.log('\n=== VALIDATION RESULTS ===')
for (const [variant, locations] of Object.entries(results)) {
  console.log(`\n${variant.toUpperCase()}:`)
  for (const [locationName, data] of Object.entries(locations)) {
    const status = data.validCombinations > 0 ? '✅' : '❌'
    console.log(`  ${status} ${locationName}: ${data.validCombinations} valid combinations (${data.compatibleSpecies}/${data.totalSpecies} compatible species)`)
  }
}

// Summary
const totalLocations = Object.values(results).reduce((sum, variant) => sum + Object.keys(variant).length, 0)
const solvableLocations = Object.values(results).reduce((sum, variant) => 
  sum + Object.values(variant).filter(loc => loc.validCombinations > 0).length, 0)

console.log(`\n=== SUMMARY ===`)
console.log(`Total locations: ${totalLocations}`)
console.log(`Solvable locations: ${solvableLocations}`)
console.log(`Unsolvable locations: ${totalLocations - solvableLocations}`)
console.log(`Success rate: ${Math.round((solvableLocations / totalLocations) * 100)}%`)