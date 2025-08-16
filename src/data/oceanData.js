// Ocean Cleanup Game Data - McKinsey Solve Format

// Master microbe database with 3 numerical attributes and binary traits
export const microbeMasterDatabase = [
  { id: 1, name: 'Alcanivorax', velocity: 7, absorbency: 8, resilience: 6, coldResistant: true, toxicProducer: false },
  { id: 2, name: 'Pseudomonas', velocity: 5, absorbency: 9, resilience: 7, coldResistant: false, toxicProducer: false },
  { id: 3, name: 'Rhodococcus', velocity: 6, absorbency: 7, resilience: 9, coldResistant: true, toxicProducer: true },
  { id: 4, name: 'Bacillus', velocity: 8, absorbency: 6, resilience: 8, coldResistant: false, toxicProducer: false },
  { id: 5, name: 'Marinobacter', velocity: 9, absorbency: 5, resilience: 7, coldResistant: true, toxicProducer: false },
  { id: 6, name: 'Ideonella', velocity: 4, absorbency: 10, resilience: 6, coldResistant: false, toxicProducer: false },
  { id: 7, name: 'Geobacter', velocity: 6, absorbency: 8, resilience: 5, coldResistant: false, toxicProducer: true },
  { id: 8, name: 'Shewanella', velocity: 7, absorbency: 7, resilience: 8, coldResistant: true, toxicProducer: false },
  { id: 9, name: 'Comamonas', velocity: 8, absorbency: 6, resilience: 9, coldResistant: false, toxicProducer: false },
  { id: 10, name: 'Sphingomonas', velocity: 5, absorbency: 9, resilience: 7, coldResistant: false, toxicProducer: true },
  { id: 11, name: 'Arthrobacter', velocity: 9, absorbency: 5, resilience: 8, coldResistant: true, toxicProducer: false },
  { id: 12, name: 'Ralstonia', velocity: 6, absorbency: 8, resilience: 6, coldResistant: false, toxicProducer: false },
  { id: 13, name: 'Nitrosomonas', velocity: 7, absorbency: 7, resilience: 9, coldResistant: true, toxicProducer: true },
  { id: 14, name: 'Thiobacillus', velocity: 8, absorbency: 9, resilience: 5, coldResistant: false, toxicProducer: false },
  { id: 15, name: 'Desulfovibrio', velocity: 4, absorbency: 6, resilience: 10, coldResistant: true, toxicProducer: true },
  { id: 16, name: 'Methylococcus', velocity: 9, absorbency: 8, resilience: 7, coldResistant: false, toxicProducer: false },
  { id: 17, name: 'Acidithiobacillus', velocity: 5, absorbency: 7, resilience: 8, coldResistant: true, toxicProducer: true },
  { id: 18, name: 'Methanosarcina', velocity: 6, absorbency: 9, resilience: 6, coldResistant: false, toxicProducer: false },
  { id: 19, name: 'Chlorobium', velocity: 7, absorbency: 5, resilience: 9, coldResistant: true, toxicProducer: false },
  { id: 20, name: 'Syntrophus', velocity: 8, absorbency: 6, resilience: 7, coldResistant: false, toxicProducer: true }
]

// Ocean sites with specific requirements
export const oceanSites = [
  {
    id: 1,
    name: 'Arctic Cleanup Zone',
    velocityRange: [6, 8],
    absorbencyRange: [7, 9],
    resilienceRange: [6, 8],
    requiredTrait: 'coldResistant',
    forbiddenTrait: 'toxicProducer'
  },
  {
    id: 2,
    name: 'Tropical Reef Sector',
    velocityRange: [5, 7],
    absorbencyRange: [8, 10],
    resilienceRange: [7, 9],
    requiredTrait: 'coldResistant',
    forbiddenTrait: 'toxicProducer'
  },
  {
    id: 3,
    name: 'Deep Ocean Trench',
    velocityRange: [7, 9],
    absorbencyRange: [6, 8],
    resilienceRange: [8, 10],
    requiredTrait: 'coldResistant',
    forbiddenTrait: 'toxicProducer'
  }
]

// Generate random subset of microbes for a site
export function generateMicrobePool(siteId, poolSize = 10) {
  const shuffled = [...microbeMasterDatabase].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, poolSize)
}

// Calculate site score based on McKinsey Solve scoring
export function calculateSiteScore(selectedMicrobes, site) {
  if (selectedMicrobes.length !== 3) {
    return { total: 0, breakdown: { velocity: 0, absorbency: 0, resilience: 0, requiredTrait: 0, forbiddenTrait: 0 } }
  }

  const avgVelocity = selectedMicrobes.reduce((sum, m) => sum + m.velocity, 0) / 3
  const avgAbsorbency = selectedMicrobes.reduce((sum, m) => sum + m.absorbency, 0) / 3
  const avgResilience = selectedMicrobes.reduce((sum, m) => sum + m.resilience, 0) / 3

  const velocityScore = (avgVelocity >= site.velocityRange[0] && avgVelocity <= site.velocityRange[1]) ? 20 : 0
  const absorbencyScore = (avgAbsorbency >= site.absorbencyRange[0] && avgAbsorbency <= site.absorbencyRange[1]) ? 20 : 0
  const resilienceScore = (avgResilience >= site.resilienceRange[0] && avgResilience <= site.resilienceRange[1]) ? 20 : 0

  const hasRequiredTrait = selectedMicrobes.some(m => m[site.requiredTrait])
  const requiredTraitScore = hasRequiredTrait ? 20 : 0

  const hasForbiddenTrait = selectedMicrobes.some(m => m[site.forbiddenTrait])
  const forbiddenTraitScore = hasForbiddenTrait ? 0 : 20

  const total = velocityScore + absorbencyScore + resilienceScore + requiredTraitScore + forbiddenTraitScore

  return {
    total,
    breakdown: {
      velocity: velocityScore,
      absorbency: absorbencyScore,
      resilience: resilienceScore,
      requiredTrait: requiredTraitScore,
      forbiddenTrait: forbiddenTraitScore
    },
    averages: {
      velocity: Math.round(avgVelocity * 10) / 10,
      absorbency: Math.round(avgAbsorbency * 10) / 10,
      resilience: Math.round(avgResilience * 10) / 10
    }
  }
}