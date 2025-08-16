export const regions = [
  {
    id: 'arctic',
    name: 'Arctic Ocean',
    temperature: 'cold',
    depth: 'deep',
    salinity: 'low',
    currents: 'weak',
    season: 'winter',
    pollution: 'low'
  },
  {
    id: 'tropical',
    name: 'Tropical Coral Sea',
    temperature: 'warm',
    depth: 'shallow',
    salinity: 'high',
    currents: 'strong',
    season: 'summer',
    pollution: 'medium'
  },
  {
    id: 'temperate',
    name: 'Temperate Continental Shelf',
    temperature: 'temperate',
    depth: 'mid',
    salinity: 'medium',
    currents: 'medium',
    season: 'spring',
    pollution: 'high'
  },
  {
    id: 'deep_ocean',
    name: 'Deep Ocean Basin',
    temperature: 'cold',
    depth: 'deep',
    salinity: 'high',
    currents: 'strong',
    season: 'autumn',
    pollution: 'low'
  },
  {
    id: 'coastal',
    name: 'Coastal Upwelling Zone',
    temperature: 'temperate',
    depth: 'shallow',
    salinity: 'medium',
    currents: 'very_strong',
    season: 'summer',
    pollution: 'very_high'
  }
]

export function generateRandomRegion() {
  return regions[Math.floor(Math.random() * regions.length)]
}