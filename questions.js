const questionsData = [
  {
    id: 1,
    question: 'Describe a time when you improved application performance in production.',
    answer: 'I identified slow page load from large bundle size, introduced code splitting, and optimized images to reduce load time by 35%.',
    topic: 'Behavioral',
    difficulty: 'Medium',
  },
  {
    id: 2,
    question: 'How do you prevent memory leaks in React components?',
    answer: 'Cleanup subscriptions and async operations in useEffect, use AbortController for fetch, and avoid setting state after unmount.',
    topic: 'React',
    difficulty: 'Medium',
  },
  {
    id: 3,
    question: 'Explain the difference between REST and GraphQL and when you would use each.',
    answer: 'REST is resource-based and simple for CRUD, while GraphQL lets clients request exactly the data they need and is useful for complex UIs with multiple nested relationships.',
    topic: 'APIs',
    difficulty: 'Hard',
  },
  {
    id: 4,
    question: 'What strategy would you use to make a UI accessible for keyboard users?',
    answer: 'Ensure focus order, use semantic HTML, add ARIA labels only when needed, and test with tab navigation and screen readers.',
    topic: 'Accessibility',
    difficulty: 'Medium',
  },
  {
    id: 5,
    question: 'How do you approach debugging a production bug that only occurs intermittently?',
    answer: 'Reproduce locally with logs, inspect browser console/network, compare versions, and add targeted telemetry around the failing path.',
    topic: 'Debugging',
    difficulty: 'Hard',
  },
  {
    id: 6,
    question: 'What is a closure in JavaScript and when is it useful?',
    answer: 'A closure is a function that retains access to its lexical scope even after outer function returns; it is useful for private state and callbacks.',
    topic: 'JavaScript',
    difficulty: 'Easy',
  },
]

export default questionsData
