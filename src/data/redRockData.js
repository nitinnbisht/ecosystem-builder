// Red Rock Study Game Data

export const redRockDataSources = [
  {
    id: 1,
    title: "Red Rock County Census Report 2010-2020",
    type: "chart",
    content: "Official census data shows Red Rock County experienced significant population growth over the decade. In 2010, the county had 45,000 residents, which increased to 58,500 by 2020. The demographic breakdown reveals 60% rural residents (primarily in mining communities) and 40% urban residents (concentrated in Red Rock City). Age distribution shows 35% under 30, 45% aged 30-60, and 20% over 60.",
    data: { pop2010: 45000, pop2020: 58500, rural: 0.6, urban: 0.4 },
    relevant: true
  },
  {
    id: 2,
    title: "Red Rock Economic Development Authority - Industry Revenue Report",
    type: "table",
    content: "Comprehensive analysis of Red Rock County's primary economic sectors. Mining operations generated $12M in 2015, growing to $18M by 2020, driven by increased copper and rare earth mineral extraction. Tourism revenue, boosted by the Red Rock National Monument designation, rose from $8M in 2015 to $15M in 2020. Manufacturing sector contributed $3M annually. Agriculture remained stable at $2M yearly.",
    data: { mining2015: 12000000, tourism2015: 8000000, mining2020: 18000000, tourism2020: 15000000 },
    relevant: true
  },
  {
    id: 3,
    title: "Red Rock Utility Commission - Energy Consumption Study",
    type: "report",
    content: "Detailed analysis of residential energy usage patterns across Red Rock County. Rural households, primarily heated by propane and wood, consume an average of 850 kWh monthly for electrical needs. Urban households, with electric heating and more appliances, average 1,200 kWh monthly. Peak usage occurs during summer months due to air conditioning demands. Solar adoption is growing, with 15% of homes having solar panels.",
    data: { ruralKwh: 850, urbanKwh: 1200 },
    relevant: true
  },
  {
    id: 4,
    title: "State Economic Bureau - Red Rock County GDP Analysis",
    type: "chart",
    content: "Red Rock County's Gross Domestic Product has shown consistent growth over the past decade. Starting at $180M in 2010, the county's GDP reached $295M by 2020, representing a compound annual growth rate of 5.1%. This growth outpaced the state average of 3.2% and was driven primarily by mining expansion and tourism development. Per capita GDP increased from $4,000 to $5,043.",
    data: { gdp2010: 180000000, gdp2020: 295000000 },
    relevant: true
  },
  {
    id: 5,
    title: "Red Rock Mining Consortium - New Copper Mine Feasibility Study",
    type: "table",
    content: "Comprehensive financial analysis for the proposed Sunset Ridge copper mine. Initial capital investment required: $25M for equipment, infrastructure, and environmental compliance. Projected annual revenue: $5M based on current copper prices and estimated reserves. Environmental impact assessment completed. Local employment: 150 direct jobs, 300 indirect jobs. Estimated mine life: 15 years.",
    data: { mineCost: 25000000, mineRevenue: 5000000 },
    relevant: true
  },
  {
    id: 6,
    title: "National Weather Service - Red Rock County Climate Report 2020",
    type: "report",
    content: "Annual meteorological summary for Red Rock County. Average precipitation: 15 inches, below state average of 22 inches. Temperature range: 45°F to 85°F with 280 sunny days per year. Drought conditions occurred for 3 months. Wind patterns favorable for renewable energy development. Climate change projections suggest increasing temperatures and decreasing precipitation over next 20 years.",
    data: { rainfall: 15, tempMin: 45, tempMax: 85 },
    relevant: false
  },
  {
    id: 7,
    title: "Red Rock Transportation Department - Highway Usage Statistics",
    type: "chart",
    content: "Traffic analysis on major highways serving Red Rock County. Highway 89 sees 12,000 vehicles daily, primarily commercial mining trucks. State Route 45 handles 8,500 vehicles daily, mostly tourism-related traffic to Red Rock National Monument. Bridge maintenance costs: $2M annually. Road improvement needs: $15M over 5 years for mining route upgrades.",
    data: { highway89: 12000, route45: 8500, maintenance: 2000000 },
    relevant: false
  },
  {
    id: 8,
    title: "Red Rock Hospital System - Healthcare Utilization Report",
    type: "table",
    content: "Annual healthcare statistics for Red Rock County residents. Emergency room visits: 15,000 annually. Mining-related injuries: 450 cases per year. Tourism-related accidents: 120 cases annually. Healthcare employment: 800 jobs. Hospital revenue: $45M annually. Telemedicine adoption increased 300% during 2020.",
    data: { erVisits: 15000, miningInjuries: 450, tourismAccidents: 120 },
    relevant: false
  }
]

export const analysisQuestions = [
  {
    id: 1,
    question: "The Red Rock County Economic Development Authority needs to report population growth to state officials. Based on the census data, what was the percentage increase in Red Rock County's population from 2010 to 2020?",
    answer: 30,
    calculation: "(58500 - 45000) / 45000 * 100",
    tolerance: 0.5,
    context: "This metric will be used to justify increased state funding for infrastructure projects."
  },
  {
    id: 2,
    question: "A local newspaper wants to understand the economic balance in Red Rock County. What was the ratio of mining revenue to tourism revenue in 2015? (Express as a decimal, e.g., 1.5 means mining was 1.5 times larger than tourism)",
    answer: 1.5,
    calculation: "12000000 / 8000000",
    tolerance: 0.1,
    context: "This will help illustrate the county's economic diversification efforts."
  },
  {
    id: 3,
    question: "Red Rock Utility Commission is planning grid capacity upgrades. Given that 60% of residents live in rural areas and 40% in urban areas, what is the weighted average monthly energy consumption per household in kWh?",
    answer: 990,
    calculation: "(850 * 0.6 + 1200 * 0.4)",
    tolerance: 10,
    context: "This figure will determine the scale of infrastructure investments needed."
  },
  {
    id: 4,
    question: "State economic planners want to benchmark Red Rock County's performance. What was the compound annual growth rate (CAGR) of Red Rock County's GDP from 2010 to 2020? (Express as a percentage, rounded to one decimal place)",
    answer: 5.1,
    calculation: "((295000000/180000000)^(1/10) - 1) * 100",
    tolerance: 0.2,
    context: "This will be compared against the state average of 3.2% to assess relative performance."
  },
  {
    id: 5,
    question: "The Red Rock Mining Consortium board needs to evaluate the Sunset Ridge copper mine investment. Based on the initial cost of $25M and projected annual revenue of $5M, how many years will it take for the mine to break even? (Assume no operating costs for this simplified calculation)",
    answer: 5,
    calculation: "25000000 / 5000000",
    tolerance: 0.1,
    context: "This timeline will influence the board's decision on whether to proceed with the project."
  }
]

export const miniCases = [
  {
    id: 1,
    question: "The Red Rock Housing Authority is planning new residential developments. If the average household size is 3.5 people and there are currently 16,714 households in the county, what is the estimated total population?",
    answer: 58499,
    calculation: "3.5 * 16714",
    tolerance: 500,
    timeLimit: 120,
    context: "This estimate will be used to determine the number of new housing units needed."
  },
  {
    id: 2,
    question: "The Red Rock County Council must choose between two economic development policies. Policy A (Mining Expansion): $10M projected revenue, $6M implementation cost. Policy B (Tourism Infrastructure): $8M projected revenue, $3M implementation cost. Which policy provides higher net benefit?",
    options: ["Policy A (Mining Expansion)", "Policy B (Tourism Infrastructure)"],
    answer: "Policy B (Tourism Infrastructure)",
    explanation: "Policy A net benefit: $4M. Policy B net benefit: $5M.",
    timeLimit: 120,
    context: "The chosen policy will shape Red Rock County's economic strategy for the next decade."
  },
  {
    id: 3,
    question: "State economic forecasters need Red Rock County's GDP projection. If the county maintains its historical 5.1% annual growth rate, what will the GDP be in 2025? (Answer in millions, rounded to nearest whole number)",
    answer: 381,
    calculation: "295 * (1.051)^5",
    tolerance: 10,
    timeLimit: 120,
    context: "This projection will influence state budget allocations and infrastructure planning."
  },
  {
    id: 4,
    question: "The Red Rock Development Board is evaluating two infrastructure projects. Initiative A (Solar Farm): $2M cost, $8M economic benefit. Initiative B (Highway Expansion): $3M cost, $9M economic benefit. Which initiative has the better cost-to-benefit ratio?",
    options: ["Initiative A (Solar Farm)", "Initiative B (Highway Expansion)"],
    answer: "Initiative A (Solar Farm)",
    explanation: "Initiative A ratio: 4.0. Initiative B ratio: 3.0.",
    timeLimit: 120,
    context: "The board will fund the project with the highest return on investment."
  },
  {
    id: 5,
    question: "A mining industry analyst is reviewing Red Rock's growth trends. If mining revenue had grown at exactly 10% annually from its 2015 level of $12M, what would the revenue have been in 2020? (Answer in millions, one decimal place)",
    answer: 19.3,
    calculation: "12 * (1.1)^5",
    tolerance: 0.5,
    timeLimit: 120,
    context: "This comparison will show whether actual growth exceeded or fell short of a 10% benchmark."
  },
  {
    id: 6,
    question: "The Red Rock Tourism Board wants to highlight their sector's importance. In 2020, tourism generated $15M while mining generated $18M. What percentage of the total revenue from these two sectors came from tourism?",
    answer: 45.5,
    calculation: "15 / (18 + 15) * 100",
    tolerance: 1,
    timeLimit: 120,
    context: "This statistic will be used in grant applications to demonstrate tourism's economic significance."
  },
  {
    id: 7,
    question: "Red Rock County's emergency services are planning resource allocation. With 15,000 annual ER visits and 450 mining-related injuries, what percentage of ER visits are mining-related? (Round to one decimal place)",
    answer: 3.0,
    calculation: "450 / 15000 * 100",
    tolerance: 0.2,
    timeLimit: 120,
    context: "This will help determine specialized medical equipment and training needs."
  },
  {
    id: 8,
    question: "The Red Rock Transportation Department needs to justify budget requests. Highway 89 handles 12,000 vehicles daily while State Route 45 handles 8,500 vehicles daily. What is the ratio of Highway 89 traffic to State Route 45 traffic? (Express as decimal, e.g., 1.4)",
    answer: 1.41,
    calculation: "12000 / 8500",
    tolerance: 0.05,
    timeLimit: 120,
    context: "This ratio will help allocate maintenance budgets proportionally between the two highways."
  }
]

export const chartTypes = [
  { id: 'bar', name: 'Bar Chart', description: 'Compare categories' },
  { id: 'line', name: 'Line Chart', description: 'Show trends over time' },
  { id: 'pie', name: 'Pie Chart', description: 'Show proportions' }
]

export function calculateScore(answers, timeSpent) {
  let productScore = 0
  let processScore = 100

  // Product score based on correct answers
  answers.forEach(answer => {
    if (answer.correct) productScore += answer.points
  })

  // Process score penalty for excessive time
  const expectedTime = 35 * 60 // 35 minutes
  if (timeSpent > expectedTime) {
    processScore -= Math.min(50, (timeSpent - expectedTime) / 60 * 2)
  }

  return {
    product: Math.round(productScore),
    process: Math.round(Math.max(0, processScore)),
    total: Math.round((productScore + Math.max(0, processScore)) / 2)
  }
}