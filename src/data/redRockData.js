// Red Rock Study Game Data

export const redRockDataSources = [
  {
    id: 1,
    title: "Red Rock Population Demographics 2010-2020",
    type: "chart",
    content: "Population grew from 45,000 in 2010 to 58,500 in 2020. Rural: 60%, Urban: 40%",
    data: { pop2010: 45000, pop2020: 58500, rural: 0.6, urban: 0.4 },
    relevant: true
  },
  {
    id: 2,
    title: "Mining Revenue Analysis",
    type: "table",
    content: "2015: $12M mining, $8M tourism. 2020: $18M mining, $15M tourism",
    data: { mining2015: 12000000, tourism2015: 8000000, mining2020: 18000000, tourism2020: 15000000 },
    relevant: true
  },
  {
    id: 3,
    title: "Energy Consumption Patterns",
    type: "report",
    content: "Rural households: 850 kWh/month. Urban households: 1200 kWh/month",
    data: { ruralKwh: 850, urbanKwh: 1200 },
    relevant: true
  },
  {
    id: 4,
    title: "GDP Growth Data",
    type: "chart",
    content: "Red Rock GDP: 2010: $180M, 2020: $295M",
    data: { gdp2010: 180000000, gdp2020: 295000000 },
    relevant: true
  },
  {
    id: 5,
    title: "Infrastructure Investment",
    type: "table",
    content: "New mine cost: $25M, projected annual revenue: $5M",
    data: { mineCost: 25000000, mineRevenue: 5000000 },
    relevant: true
  },
  {
    id: 6,
    title: "Weather Patterns 2020",
    type: "report",
    content: "Average rainfall: 15 inches. Temperature range: 45-85°F",
    data: { rainfall: 15, tempMin: 45, tempMax: 85 },
    relevant: false
  }
]

export const analysisQuestions = [
  {
    id: 1,
    question: "By what percentage did Red Rock's population grow between 2010 and 2020?",
    answer: 30,
    calculation: "(58500 - 45000) / 45000 * 100",
    tolerance: 0.5
  },
  {
    id: 2,
    question: "What is the ratio of mining revenue to tourism revenue in 2015?",
    answer: 1.5,
    calculation: "12000000 / 8000000",
    tolerance: 0.1
  },
  {
    id: 3,
    question: "What is the weighted average energy consumption given the population split?",
    answer: 990,
    calculation: "(850 * 0.6 + 1200 * 0.4)",
    tolerance: 10
  },
  {
    id: 4,
    question: "What is the CAGR of Red Rock GDP over 2010-2020?",
    answer: 5.1,
    calculation: "((295000000/180000000)^(1/10) - 1) * 100",
    tolerance: 0.2
  },
  {
    id: 5,
    question: "How many years until the new mine breaks even?",
    answer: 5,
    calculation: "25000000 / 5000000",
    tolerance: 0.1
  }
]

export const miniCases = [
  {
    id: 1,
    question: "If each household averages 3.5 people and there are 16,714 households, estimate the population.",
    answer: 58499,
    calculation: "3.5 * 16714",
    tolerance: 500,
    timeLimit: 120
  },
  {
    id: 2,
    question: "Which policy yields higher net benefit? Policy A: $10M revenue, $6M cost. Policy B: $8M revenue, $3M cost.",
    options: ["Policy A", "Policy B"],
    answer: "Policy B",
    explanation: "Policy A: $4M net. Policy B: $5M net.",
    timeLimit: 120
  },
  {
    id: 3,
    question: "If Red Rock continues 5.1% annual growth, what will GDP be in 2025?",
    answer: 381,
    calculation: "295 * (1.051)^5",
    tolerance: 10,
    timeLimit: 120
  },
  {
    id: 4,
    question: "Which initiative has the best cost-to-benefit ratio? A: $2M cost, $8M benefit. B: $3M cost, $9M benefit.",
    options: ["Initiative A", "Initiative B"],
    answer: "Initiative A",
    explanation: "A: 4.0 ratio. B: 3.0 ratio.",
    timeLimit: 120
  },
  {
    id: 5,
    question: "If mining revenue rose 10% annually from 2015, what would it be in 2020?",
    answer: 19.3,
    calculation: "12 * (1.1)^5",
    tolerance: 0.5,
    timeLimit: 120
  },
  {
    id: 6,
    question: "What percentage of total 2020 revenue came from tourism?",
    answer: 45.5,
    calculation: "15 / (18 + 15) * 100",
    tolerance: 1,
    timeLimit: 120
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