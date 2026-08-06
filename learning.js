const learningData = [
  {
    id: 1,
    topic: 'Designing Scalable Frontend Architecture',
    explanation: 'In modern apps, building reusable, decoupled components with clear data flow reduces maintenance risk and improves team collaboration.',
    example: 'Use component libraries, hooks for shared behavior, and feature-based folder structure to keep codebase scalable.',
    points: ['Component abstraction', 'State locality', 'Lazy loading', 'Performance budget'],
  },
  {
    id: 2,
    topic: 'Managing Async State in React',
    explanation: 'Real-world applications must handle network retries, loading states, and error recovery while avoiding stale closures and memory leaks.',
    example: 'Use useEffect with cleanup, abort controllers, and centralized state for request status.',
    points: ['AbortController', 'Optimistic UI', 'Error boundaries', 'Caching strategy'],
  },
  {
    id: 3,
    topic: 'Building Reliable APIs with JavaScript',
    explanation: 'A production-ready frontend must safely consume APIs by validating responses, handling edge cases, and providing fallback UI when services fail.',
    example: 'Wrap fetch calls in reusable helpers that normalize payloads and log telemetry for debugging.',
    points: ['Retry logic', 'Response validation', 'Timeouts', 'Graceful degradation'],
  },
  {
    id: 4,
    topic: 'Writing Maintainable CSS',
    explanation: 'Large applications benefit from consistent naming, component-scoped styles, and responsive behavior rather than ad hoc inline styling.',
    example: 'Use CSS modules or utility-first patterns with a design system for predictable styling.',
    points: ['BEM or utility classes', 'Mobile-first design', 'Theme variables', 'Accessibility'],
  },
  {
    id: 5,
    topic: 'Preparing for Behavioral Interviews',
    explanation: 'Interviewers look for results-driven storytelling, collaboration examples, and how you solved ambiguity or tradeoffs in prior work.',
    example: 'Describe the challenge, your approach, the impact, and any metrics you improved.',
    points: ['STAR format', 'Cross-functional work', 'Stakeholder alignment', 'Learning outcomes'],
  },
]

export default learningData
