const DEFAULT_SKILLS = [
  'React',
  'JavaScript',
  'HTML',
  'CSS',
  'REST API',
  'Git',
  'Node',
  'SQL',
  'TypeScript',
  'Redux',
  'Testing',
  'Next.js',
]

const PREPARATION_TOPICS = {
  React: ['Components', 'Props', 'State', 'Hooks'],
  JavaScript: ['Variables', 'Functions', 'Closures', 'Promises'],
  HTML: ['Semantic HTML', 'Forms', 'Accessibility'],
  CSS: ['Flexbox', 'Grid', 'Responsive Design'],
  'REST API': ['API Requests', 'Fetch', 'Error Handling'],
  Git: ['Branches', 'Commits', 'Pull Requests'],
  Node: ['Express', 'Middleware', 'Routes'],
  SQL: ['Queries', 'Joins', 'Normalization'],
  Redux: ['Store', 'Action', 'Reducer', 'Middleware'],
}

export function analyzeDescription(text) {
  const normalized = text.toLowerCase()
  const skills = DEFAULT_SKILLS.filter((skill) =>
    normalized.includes(skill.toLowerCase()),
  )

  const topics = Array.from(
    new Set(
      skills.flatMap((skill) => PREPARATION_TOPICS[skill] || []),
    ),
  )

  const recommended = [
    ...skills,
    ...topics.slice(0, 4),
  ]

  return {
    skills,
    topics: topics.length ? topics : ['Problem Solving', 'Communication'],
    recommended,
  }
}

export function buildPreparationPlan(interviewDate, skills) {
  const today = new Date()
  const target = new Date(interviewDate)
  const diffDays = Math.max(
    1,
    Math.ceil((target - today) / (1000 * 60 * 60 * 24)),
  )
  const topics = skills.length ? skills : ['JavaScript', 'React', 'Coding']
  const planDays = Math.min(diffDays, 7)
  const schedule = []

  for (let day = 1; day <= planDays; day += 1) {
    const skill = topics[(day - 1) % topics.length]
    const taskTopics = PREPARATION_TOPICS[skill] || ['Review basics', 'Practice examples']
    schedule.push({
      id: day,
      title: `DAY ${day}`,
      subject: skill,
      tasks: taskTopics.map((topic, index) => ({
        id: `${day}-${index}`,
        label: topic,
        completed: false,
      })),
    })
  }

  return {
    planDays,
    daysRemaining: diffDays,
    schedule,
  }
}
