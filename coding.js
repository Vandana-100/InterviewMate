const codingData = [
  {
    id: 1,
    problem: 'Implement a debounced search input that sends API requests only after the user stops typing for 300ms.',
    topic: 'React',
    difficulty: 'Medium',
    solution: 'Use useEffect with a setTimeout and cleanup to delay the request, canceling the previous timer on every keystroke.',
    details: 'This improves UX and reduces backend load for live search and autocomplete features.',
  },
  {
    id: 2,
    problem: 'Build a function to merge two sorted arrays and return a single sorted array.',
    topic: 'Algorithms',
    difficulty: 'Medium',
    solution: 'Use two pointers to compare heads of both arrays and append the smaller value in linear time O(n).',
    details: 'This is a common pattern in merge sort and helps with data stream merging.',
  },
  {
    id: 3,
    problem: 'Design a reusable analytics event tracker for page views and button clicks.',
    topic: 'JavaScript',
    difficulty: 'Hard',
    solution: 'Create a wrapper that normalizes event payloads, batches requests, and retries failed sends.',
    details: 'Production apps need consistent event naming, performance-safe batching, and failure recovery.',
  },
  {
    id: 4,
    problem: 'Implement a function that finds the first non-repeated character in a string.',
    topic: 'Algorithms',
    difficulty: 'Easy',
    solution: 'Count character frequencies with a map, then scan the string to find the first char with count 1.',
    details: 'Useful for text processing and interview screening questions.',
  },
  {
    id: 5,
    problem: 'Create a script that validates and normalizes user registration data before submission.',
    topic: 'Web Development',
    difficulty: 'Hard',
    solution: 'Check required fields, trim whitespace, enforce formats, and map values into a clean request body.',
    details: 'This prevents invalid payloads reaching the backend and improves user form reliability.',
  },
]

export default codingData
