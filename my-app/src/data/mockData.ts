import {
  StudentProfile,
  SkillScore,
  LeetCodeData,
  CVAnalysisResult,
  RoadmapStep,
  Course,
  PracticeQuestion,
  Job,
  JobApplication,
  IndustryTrend,
  CareerComparisonItem,
  TimelineEvent,
  RecruiterCandidate,
  PlatformNotification,
} from '../types/career';

export const initialStudentProfile: StudentProfile = {
  id: 'std_01',
  name: 'Arjun Mehta',
  email: 'arjun.mehta@iitb.ac.in',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  headline: 'Senior CS Student | Aspiring Full Stack & Backend Engineer',
  targetCareer: 'Software Developer',
  careerReadiness: 76,
  selectedLanguages: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Go'],
  education: {
    institution: 'Indian Institute of Technology Bombay',
    degree: 'B.Tech. in Computer Science',
    graduationYear: '2026',
    gpa: '3.82',
  },
  cvUrl: 'resume_arjun_mehta_2026.pdf',
  cvFileName: 'Arjun_Mehta_Software_Engineer_CV.pdf',
  cvUploadedAt: '2026-09-28',
  leetcodeUsername: 'arjunmehta_dev',
  privacy: {
    profileVisibility: 'recruiters_only',
    cvVisibility: true,
    contactInfoVisibility: true,
    codingProfileVisibility: true,
    assessmentVisibility: true,
  },
};

export const initialSkills: SkillScore[] = [
  {
    name: 'Python',
    category: 'Language',
    score: 86,
    targetScore: 95,
    history: [
      { date: 'Aug', score: 70 },
      { date: 'Sep', score: 78 },
      { date: 'Oct', score: 86 },
    ],
    sources: ['Coding Drills', 'Practice MCQs', 'CV Analysis', 'Coursework'],
  },
  {
    name: 'Problem Solving',
    category: 'Core',
    score: 81,
    targetScore: 90,
    history: [
      { date: 'Aug', score: 68 },
      { date: 'Sep', score: 74 },
      { date: 'Oct', score: 81 },
    ],
    sources: ['Algorithmic Challenges (342 Solved)', 'Assessments'],
  },
  {
    name: 'SQL',
    category: 'Core',
    score: 79,
    targetScore: 85,
    history: [
      { date: 'Aug', score: 62 },
      { date: 'Sep', score: 71 },
      { date: 'Oct', score: 79 },
    ],
    sources: ['Database Assessment', 'Practice Quizzes'],
  },
  {
    name: 'JavaScript',
    category: 'Language',
    score: 72,
    targetScore: 88,
    history: [
      { date: 'Aug', score: 60 },
      { date: 'Sep', score: 67 },
      { date: 'Oct', score: 72 },
    ],
    sources: ['Practice Quizzes', 'GitHub Projects'],
  },
  {
    name: 'DSA',
    category: 'Core',
    score: 65,
    targetScore: 85,
    history: [
      { date: 'Aug', score: 50 },
      { date: 'Sep', score: 58 },
      { date: 'Oct', score: 65 },
    ],
    sources: ['Coding Tournaments', 'Mock Assessments'],
  },
  {
    name: 'REST APIs',
    category: 'Framework',
    score: 63,
    targetScore: 85,
    history: [
      { date: 'Aug', score: 45 },
      { date: 'Sep', score: 55 },
      { date: 'Oct', score: 63 },
    ],
    sources: ['Projects', 'Backend Quizzes'],
  },
  {
    name: 'Docker',
    category: 'Tool',
    score: 42,
    targetScore: 75,
    history: [
      { date: 'Aug', score: 20 },
      { date: 'Sep', score: 30 },
      { date: 'Oct', score: 42 },
    ],
    sources: ['Coursework'],
  },
  {
    name: 'System Design',
    category: 'Core',
    score: 35,
    targetScore: 70,
    history: [
      { date: 'Aug', score: 15 },
      { date: 'Sep', score: 25 },
      { date: 'Oct', score: 35 },
    ],
    sources: ['Mock Interviews'],
  },
];

export const initialLeetCodeData: LeetCodeData = {
  username: 'arjunmehta_dev',
  connected: true,
  totalSolved: 342,
  easySolved: 180,
  easyTotal: 830,
  mediumSolved: 135,
  mediumTotal: 1720,
  hardSolved: 27,
  hardTotal: 740,
  acceptanceRate: 68.4,
  contestRating: 1845,
  globalRanking: 45210,
  topLanguages: [
    { language: 'Python', problemsCount: 210 },
    { language: 'JavaScript', problemsCount: 85 },
    { language: 'C++', problemsCount: 47 },
  ],
  strongTopics: ['Arrays', 'Strings', 'Hash Tables', 'Two Pointers'],
  weakTopics: ['Dynamic Programming', 'Graphs', 'Recursion', 'Trees'],
  recentSubmissions: [
    { title: 'Subarray Sum Equals K', difficulty: 'Medium', status: 'Accepted', timestamp: '2 hours ago' },
    { title: 'Coin Change', difficulty: 'Medium', status: 'Accepted', timestamp: 'Yesterday' },
    { title: 'Word Break II', difficulty: 'Hard', status: 'Time Limit Exceeded', timestamp: '2 days ago' },
    { title: 'Lowest Common Ancestor', difficulty: 'Medium', status: 'Accepted', timestamp: '3 days ago' },
    { title: 'Trapping Rain Water', difficulty: 'Hard', status: 'Accepted', timestamp: '5 days ago' },
  ],
};

export const sampleCvText = `
ARJUN MEHTA
Mumbai, India | arjun.mehta@iitb.ac.in | github.com/arjunmehta-dev | linkedin.com/in/arjunmehta-tech

EDUCATION
Indian Institute of Technology Bombay, B.Tech. in Computer Science (GPA: 3.82 / 4.0) | Expected May 2026
Relevant Courses: Data Structures & Algorithms, Database Systems, Computer Networks, Operating Systems

SKILLS
Languages: Python, JavaScript, TypeScript, SQL, C++, Go
Frameworks/Tools: React, Node.js, Express, PostgreSQL, Git, Linux, Postman
Concepts: RESTful API design, Object-Oriented Programming, Relational Modeling, Agile/Scrum

EXPERIENCE
Software Engineering Intern | Bengaluru Tech Labs (June 2025 – August 2025)
- Developed and deployed 4 REST API endpoints using Python and FastAPI, reducing client data fetching latency by 28%.
- Integrated PostgreSQL queries and optimized SQL indexes, handling 15,000+ daily requests.
- Participated in weekly sprint reviews, code reviews, and unit test implementations with PyTest (85% coverage).

PROJECTS
DevPulse - Full-Stack Developer Workflow Dashboard (React, Node.js, MongoDB)
- Built interactive developer productivity dashboard with GitHub commit tracking and task management.
- Implemented JWT authentication and responsive UI using Tailwind CSS.

AlgoVisualizer - Interactive Sorting & Pathfinding Simulator (TypeScript, Canvas API)
- Engineered visual demonstrations for Dijkstra, A*, QuickSort, and MergeSort algorithms.
- Achieved 1,200+ monthly active users on GitHub Pages.

ACHIEVEMENTS & CERTIFICATIONS
- 1st Place, CS Department Annual Hackathon (2025)
- Meta Front-End Developer Professional Certificate (Coursera, 2024)
`;

export const initialCvAnalysis: CVAnalysisResult = {
  overallScore: 78,
  scoreBreakdown: {
    skills: 86,
    experience: 72,
    projects: 81,
    achievements: 61,
    formatting: 90,
  },
  extractedData: {
    education: [
      { institution: 'Indian Institute of Technology Bombay', degree: 'B.Tech. in Computer Science', year: 'Expected May 2026' },
    ],
    skills: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'C++', 'Go', 'React', 'Node.js', 'PostgreSQL', 'Git'],
    programmingLanguages: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'C++', 'Go'],
    experience: [
      {
        role: 'Software Engineering Intern',
        company: 'Bengaluru Tech Labs',
        duration: 'June 2025 – August 2025',
        highlights: [
          'Developed and deployed 4 REST API endpoints using Python/FastAPI',
          'Optimized SQL indexes reducing query latency by 28%',
          'Maintained 85% unit test coverage using PyTest',
        ],
      },
    ],
    projects: [
      {
        title: 'DevPulse',
        technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
        description: 'Developer productivity dashboard with GitHub analytics and JWT authentication.',
      },
      {
        title: 'AlgoVisualizer',
        technologies: ['TypeScript', 'Canvas API'],
        description: 'Interactive visualizer for pathfinding and sorting algorithms with 1,200+ monthly visits.',
      },
    ],
    certifications: ['Meta Front-End Developer Certificate'],
    achievements: ['1st Place, CS Department Annual Hackathon (2025)'],
  },
  missingInformation: [
    'No demonstrated containerization experience (Docker, Kubernetes) mentioned in projects.',
    'Cloud deployment details missing (AWS EC2/S3, GCP Cloud Run, or CI/CD pipelines).',
    'Lacks quantitative metrics on user scale or throughput for DevPulse project.',
  ],
  improvementOpportunities: [
    'Your CV lists Python and backend interest, but lacks a production-grade cloud deployment project.',
    'Highlight system architecture and asynchronous task processing (Celery / Redis / Kafka).',
    'Add links to live demos alongside GitHub repositories.',
  ],
  recommendedProjects: [
    {
      title: 'Distributed Task Queue & Microservice API',
      techStack: ['Python', 'FastAPI', 'Docker', 'Redis', 'AWS'],
      rationale:
        'Bridges your 42% Docker score and demonstrates enterprise backend competency for senior recruiter screening.',
      estimatedHours: 24,
    },
    {
      title: 'Full-Stack E-Commerce with Stripe & CI/CD',
      techStack: ['TypeScript', 'Next.js', 'PostgreSQL', 'Docker', 'GitHub Actions'],
      rationale: 'Demonstrates end-to-end DevOps and payment integration, elevating job match from 76% to 92%.',
      estimatedHours: 32,
    },
  ],
  summary:
    'Strong academic foundation and solid internship impact. Upgrading containerization (Docker) and cloud deployments will position candidate in the top 10% of applicants.',
  analyzedAt: '2026-09-28',
};

export const initialRoadmap: RoadmapStep[] = [
  {
    id: 'step_1',
    title: '1. JavaScript & Modern ESNext',
    category: 'Core Language',
    progress: 90,
    status: 'completed',
    description: 'Master asynchronous JS, Event Loop, closures, and modern ES6+ paradigms.',
    recommendedTime: 'Completed',
    skills: ['Promises', 'Async/Await', 'Event Loop', 'Prototypes'],
  },
  {
    id: 'step_2',
    title: '2. Git & Collaborative Workflows',
    category: 'Tooling',
    progress: 82,
    status: 'completed',
    description: 'Branching strategies, interactive rebasing, merge conflict resolution, CI/CD hooks.',
    recommendedTime: 'Completed',
    skills: ['Git Rebase', 'GitHub Actions', 'Semantic Versioning'],
  },
  {
    id: 'step_3',
    title: '3. SQL & Relational Database Design',
    category: 'Databases',
    progress: 78,
    status: 'completed',
    description: 'Normalization (1NF-3NF), indexing, window functions, and transaction ACID properties.',
    recommendedTime: 'Completed',
    skills: ['PostgreSQL', 'Joins & Subqueries', 'Query Optimization', 'Indexes'],
  },
  {
    id: 'step_4',
    title: '4. React & State Architecture',
    category: 'Frontend',
    progress: 72,
    status: 'in_progress',
    description: 'Hooks lifecycle, custom hooks, context, state management, and performance memoization.',
    recommendedTime: '1 week remaining',
    skills: ['React 19', 'Custom Hooks', 'TanStack Query', 'Memoization'],
  },
  {
    id: 'step_5',
    title: '5. REST APIs & Backend Routing',
    category: 'Backend',
    progress: 65,
    status: 'in_progress',
    description: 'REST constraints, authentication headers, middleware, rate limiting, and OpenAPI specs.',
    recommendedTime: '2 weeks remaining',
    skills: ['Express', 'FastAPI', 'JWT Auth', 'Swagger/OpenAPI'],
  },
  {
    id: 'step_6',
    title: '6. Node.js & Server Runtime',
    category: 'Backend',
    progress: 61,
    status: 'in_progress',
    description: 'Streams, buffers, event emitter, child processes, and cluster management.',
    recommendedTime: '2 weeks remaining',
    skills: ['Node Streams', 'Worker Threads', 'Error Handling'],
  },
  {
    id: 'step_7',
    title: '7. Full-Stack Capstone Projects',
    category: 'Portfolio',
    progress: 55,
    status: 'in_progress',
    description: 'Ship 2 production full-stack apps with database persistence and live deployment.',
    recommendedTime: '3 weeks remaining',
    skills: ['Docker Compose', 'Vercel / Cloud Run', 'Payment Integration'],
  },
  {
    id: 'step_8',
    title: '8. System Design & Scalability',
    category: 'Architecture',
    progress: 42,
    status: 'remaining',
    description: 'Load balancers, caching layers (Redis), horizontal scaling, CDN, database sharding.',
    recommendedTime: '4 weeks needed',
    skills: ['Caching', 'Load Balancing', 'Microservices', 'Message Queues'],
  },
  {
    id: 'step_9',
    title: '9. Technical Interview Preparation',
    category: 'Interview Prep',
    progress: 38,
    status: 'remaining',
    description: 'Behavioral STAR stories, live coding drills, algorithmic problem solving under timed conditions.',
    recommendedTime: 'Ongoing',
    skills: ['STAR Method', 'Mock Interviews', 'DSA Speed Drills'],
  },
];

export const initialCourses: Course[] = [
  // Full Stack / Software Developer
  {
    id: 'crs_yt_01',
    title: 'Full Stack Web Development for Beginners (Full Course 2025/2026)',
    provider: 'freeCodeCamp (YouTube)',
    careerPath: 'Software Developer',
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=nu_pCVPKzTk',
    channelName: 'freeCodeCamp.org',
    price: 'Free on YouTube',
    difficulty: 'Beginner',
    duration: '11.5 Hours',
    skillsCovered: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React', 'Node.js', 'Express', 'MongoDB'],
    priorityRank: 1,
    progress: 45,
    completed: false,
    whyRecommended: 'Complete end-to-end foundation covering frontend, backend, APIs, and real project deployment.',
    thumbnail: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=400&auto=format&fit=crop&q=80',
    rating: 4.9,
    studentsCount: 1450000,
  },
  {
    id: 'crs_paid_01',
    title: 'The Complete 2026 Web Development Bootcamp',
    provider: 'Udemy (Dr. Angela Yu)',
    careerPath: 'Software Developer',
    type: 'paid',
    url: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/',
    price: '₹1,904 (Includes Certificate)',
    difficulty: 'Beginner',
    duration: '65 Hours (80 modules)',
    skillsCovered: ['React 19', 'Next.js', 'PostgreSQL', 'Docker', 'RESTful APIs', 'Authentication', 'Web3'],
    priorityRank: 1,
    progress: 30,
    completed: false,
    whyRecommended: 'Industry-standard portfolio bootcamp with 16 portfolio projects and official certificate of completion.',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&auto=format&fit=crop&q=80',
    rating: 4.8,
    studentsCount: 1200000,
  },
  // Backend Systems
  {
    id: 'crs_yt_02',
    title: 'Python Backend & FastAPI Masterclass - Build Production Microservices',
    provider: 'Traversy Media (YouTube)',
    careerPath: 'Backend Systems',
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=0sOvCWFmrtA',
    channelName: 'Traversy Media',
    price: 'Free on YouTube',
    difficulty: 'Intermediate',
    duration: '9 Hours',
    skillsCovered: ['Python 3.12', 'FastAPI', 'PostgreSQL', 'Pydantic', 'JWT Authentication', 'Docker'],
    priorityRank: 1,
    progress: 60,
    completed: false,
    whyRecommended: 'Directly addresses your target Python backend role at Stripe, Datadog, and tech startups.',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80',
    rating: 4.95,
    studentsCount: 820000,
  },
  {
    id: 'crs_paid_02',
    title: 'Microservices with Node.js and React: Enterprise Docker & Kubernetes',
    provider: 'Udemy (Stephen Grider)',
    careerPath: 'Backend Systems',
    type: 'paid',
    url: 'https://www.udemy.com/course/microservices-with-node-js-and-react/',
    price: '₹2,380 (Includes Certificate)',
    difficulty: 'Advanced',
    duration: '54 Hours',
    skillsCovered: ['Event-Driven Architecture', 'NATS Streaming', 'Kubernetes', 'Docker Compose', 'Redis'],
    priorityRank: 2,
    progress: 20,
    completed: false,
    whyRecommended: 'Teaches distributed systems design, asynchronous events, and container deployment.',
    thumbnail: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400&auto=format&fit=crop&q=80',
    rating: 4.85,
    studentsCount: 145000,
  },
  // AI & Machine Learning
  {
    id: 'crs_yt_03',
    title: 'Machine Learning & Deep Learning with Python (Full Course)',
    provider: 'freeCodeCamp (YouTube)',
    careerPath: 'AI & Machine Learning',
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=i_LwzRVP7bg',
    channelName: 'freeCodeCamp.org',
    price: 'Free on YouTube',
    difficulty: 'Intermediate',
    duration: '10 Hours',
    skillsCovered: ['PyTorch', 'TensorFlow', 'Neural Networks', 'Scikit-Learn', 'Feature Engineering'],
    priorityRank: 1,
    progress: 10,
    completed: false,
    whyRecommended: 'Essential for understanding neural network architectures, model training, and generative AI pipelines.',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=400&auto=format&fit=crop&q=80',
    rating: 4.9,
    studentsCount: 940000,
  },
  {
    id: 'crs_paid_03',
    title: 'Machine Learning Specialization by Andrew Ng',
    provider: 'Coursera (DeepLearning.AI / Stanford)',
    careerPath: 'AI & Machine Learning',
    type: 'paid',
    url: 'https://www.coursera.org/specializations/machine-learning-introduction',
    price: '₹4,667/month (Stanford Verified Certificate)',
    difficulty: 'Intermediate',
    duration: '3 Months (approx. 9 hrs/wk)',
    skillsCovered: ['Supervised Learning', 'Advanced Algorithms', 'Unsupervised Learning', 'Recommender Systems'],
    priorityRank: 1,
    progress: 0,
    completed: false,
    whyRecommended: 'The gold standard certificate in machine learning globally recognized by AI engineering recruiters.',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&auto=format&fit=crop&q=80',
    rating: 4.95,
    studentsCount: 3500000,
  },
  // Cloud & DevOps
  {
    id: 'crs_yt_04',
    title: 'DevOps Engineering Course for Beginners (Docker, Kubernetes, CI/CD)',
    provider: 'TechWorld with Nana (YouTube)',
    careerPath: 'Cloud & DevOps',
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=9pZ2xmsSDdo',
    channelName: 'TechWorld with Nana',
    price: 'Free on YouTube',
    difficulty: 'Intermediate',
    duration: '8 Hours',
    skillsCovered: ['Docker', 'Kubernetes Clusters', 'CI/CD Pipelines', 'GitHub Actions', 'Terraform', 'Prometheus'],
    priorityRank: 2,
    progress: 35,
    completed: false,
    whyRecommended: 'Bridges your current containerization gap (42% score) with real hands-on infrastructure exercises.',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=80',
    rating: 4.92,
    studentsCount: 1100000,
  },
  {
    id: 'crs_paid_04',
    title: 'AWS Certified Solutions Architect Associate (SAA-C03)',
    provider: 'Udemy (Stephane Maarek)',
    careerPath: 'Cloud & DevOps',
    type: 'paid',
    url: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/',
    price: '₹1,809 (Official Exam Preparation)',
    difficulty: 'Intermediate',
    duration: '27 Hours',
    skillsCovered: ['AWS EC2', 'S3', 'RDS & Aurora', 'VPC Networking', 'IAM Security', 'Serverless Lambda'],
    priorityRank: 2,
    progress: 15,
    completed: false,
    whyRecommended: 'Highest ROI cloud qualification on tech resume screenings for infrastructure roles.',
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&auto=format&fit=crop&q=80',
    rating: 4.88,
    studentsCount: 890000,
  },
  // Data Science
  {
    id: 'crs_yt_05',
    title: 'Python for Data Science & Pandas Analysis (Full Course)',
    provider: 'Keith Galli (YouTube)',
    careerPath: 'Data Scientist',
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=vmEHCJofslg',
    channelName: 'Keith Galli',
    price: 'Free on YouTube',
    difficulty: 'Beginner',
    duration: '6 Hours',
    skillsCovered: ['Pandas', 'NumPy', 'Matplotlib', 'Data Wrangling', 'Exploratory Analysis'],
    priorityRank: 1,
    progress: 25,
    completed: false,
    whyRecommended: 'Practical data transformation and analytics techniques using standard Python scientific stack.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80',
    rating: 4.87,
    studentsCount: 650000,
  },
  {
    id: 'crs_paid_05',
    title: 'IBM Data Science Professional Certificate',
    provider: 'Coursera (IBM)',
    careerPath: 'Data Scientist',
    type: 'paid',
    url: 'https://www.coursera.org/professional-certificates/ibm-data-science',
    price: '₹4,667/month (IBM Credential)',
    difficulty: 'Beginner',
    duration: '5 Months (approx. 10 hrs/wk)',
    skillsCovered: ['Python', 'SQL', 'Data Visualization', 'Machine Learning', 'Applied Data Capstone'],
    priorityRank: 2,
    progress: 0,
    completed: false,
    whyRecommended: 'Comprehensive 10-course program with digital IBM credential and portfolio capstone.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80',
    rating: 4.7,
    studentsCount: 950000,
  },
];

export const initialQuestions: PracticeQuestion[] = [
  // ================= PYTHON QUESTIONS =================
  {
    id: 'q_py_01',
    title: 'Two Sum Problem - Hash Map Lookup',
    language: 'Python',
    topic: 'Arrays & Hash Maps',
    difficulty: 'Beginner',
    type: 'CodingChallenge',
    prompt: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. Each input has exactly one solution, and you may not use the same element twice. Aim for O(n) time complexity.',
    starterCode: `def two_sum(nums, target):
    # Type your solution below
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
`,
    testCases: [
      { input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]', description: 'Basic positive numbers' },
      { input: 'nums = [3, 2, 4], target = 6', expected: '[1, 2]', description: 'Indices not from start' },
      { input: 'nums = [3, 3], target = 6', expected: '[0, 1]', description: 'Identical numbers' },
    ],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', 'Exactly one valid answer exists.'],
    correctAnswer: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []`,
    explanation: 'Using a hash map (dictionary in Python) stores previously inspected numbers and their indices, allowing complement lookup in O(1) average time, resulting in overall O(n) time and O(n) space.',
    hint: 'As you iterate, calculate target - num and check if it already exists in your dictionary.',
  },
  {
    id: 'q_py_02',
    title: 'Recursive Fibonacci with Memoization',
    language: 'Python',
    topic: 'Recursion & Dynamic Programming',
    difficulty: 'Intermediate',
    type: 'CodingChallenge',
    prompt: 'Implement an efficient fib(n) function calculating the n-th Fibonacci number. Ensure your solution uses memoization or dynamic programming so that fib(50) runs in milliseconds rather than taking exponential time.',
    starterCode: `def fib(n, memo=None):
    if memo is None:
        memo = {}
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]
`,
    testCases: [
      { input: 'n = 5', expected: '5', description: 'Base small input' },
      { input: 'n = 10', expected: '55', description: 'Moderate input' },
      { input: 'n = 30', expected: '832040', description: 'Requires memoization' },
    ],
    constraints: ['0 <= n <= 50'],
    correctAnswer: `def fib(n, memo=None):
    if memo is None:
        memo = {}
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]`,
    explanation: 'Naive recursion requires O(2^n) time because subproblems are recalculated repeatedly. Memoizing cache states drops runtime to O(n).',
    hint: 'Pass a dictionary to remember previous computed values, or use iterative tabulation.',
  },
  {
    id: 'q_py_03',
    title: 'Valid Palindrome (Ignore Non-Alphanumeric)',
    language: 'Python',
    topic: 'Strings & Two Pointers',
    difficulty: 'Beginner',
    type: 'CodingChallenge',
    prompt: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Return true if s is a palindrome, or false otherwise.',
    starterCode: `def is_palindrome(s: str) -> bool:
    # Type your code here
    cleaned = [c.lower() for c in s if c.isalnum()]
    return cleaned == cleaned[::-1]
`,
    testCases: [
      { input: 's = "A man, a plan, a canal: Panama"', expected: 'True', description: 'Standard punctuation test' },
      { input: 's = "race a car"', expected: 'False', description: 'Non-palindrome test' },
      { input: 's = " "', expected: 'True', description: 'Empty string is palindrome' },
    ],
    constraints: ['1 <= s.length <= 2 * 10^5', 's consists only of printable ASCII characters.'],
    correctAnswer: `def is_palindrome(s: str) -> bool:
    cleaned = [c.lower() for c in s if c.isalnum()]
    return cleaned == cleaned[::-1]`,
    explanation: 'Filtering non-alphanumeric characters with c.isalnum() and comparing the list to its reverse in O(n) time.',
    hint: 'Use two pointers or filter the string to lowercase alphanumeric characters.',
  },

  // ================= JAVASCRIPT QUESTIONS =================
  {
    id: 'q_js_01',
    title: 'Deep Clone Object without JSON Limitations',
    language: 'JavaScript',
    topic: 'Objects & Recursion',
    difficulty: 'Intermediate',
    type: 'CodingChallenge',
    prompt: 'Implement a deepClone(obj) function in JavaScript that recursively duplicates nested objects and arrays without mutating or retaining references to the original object. Handle primitive values and nested arrays/objects.',
    starterCode: `function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(deepClone);
  }
  const cloned = {};
  for (const key of Object.keys(obj)) {
    cloned[key] = deepClone(obj[key]);
  }
  return cloned;
}
`,
    testCases: [
      { input: '{ a: 1, b: { c: 2 } }', expected: '{ a: 1, b: { c: 2 } } (decoupled reference)', description: 'Nested object clone' },
      { input: '[1, [2, 3], { x: 4 }]', expected: '[1, [2, 3], { x: 4 }]', description: 'Arrays and objects mixed' },
    ],
    constraints: ['Inputs contain standard JSON-serializable primitives, arrays, and objects.'],
    correctAnswer: `function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);
  const copy = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepClone(obj[key]);
    }
  }
  return copy;
}`,
    explanation: 'Recursive traversal creates new memory allocations for all array and object structures while returning primitive values unchanged.',
    hint: 'Check typeof obj === "object" and handle Array.isArray separately.',
  },
  {
    id: 'q_js_02',
    title: 'Debounce Function Implementation',
    language: 'JavaScript',
    topic: 'Closures & Timers',
    difficulty: 'Intermediate',
    type: 'CodingChallenge',
    prompt: 'Write a debounce(fn, delay) function that delays invoking fn until after delay milliseconds have elapsed since the last time the debounced function was invoked.',
    starterCode: `function debounce(fn, delay) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
`,
    testCases: [
      { input: 'Multiple rapid calls with delay 300ms', expected: 'Single invocation after 300ms of quiet', description: 'Debounce timing test' },
    ],
    constraints: ['delay >= 0', 'Preserve execution context (this) and arguments.'],
    correctAnswer: `function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}`,
    explanation: 'Clear any pending timer on every invocation and schedule a new setTimeout. Closure over timerId maintains state across invocations.',
    hint: 'Use clearTimeout on the stored timer reference before setting a new timeout.',
  },
  {
    id: 'q_js_03',
    title: 'Flatten Nested Arrays (Any Depth)',
    language: 'JavaScript',
    topic: 'Arrays & Recursion',
    difficulty: 'Beginner',
    type: 'CodingChallenge',
    prompt: 'Write a function flattenArray(arr) that takes a multi-dimensional array and returns a completely flattened one-dimensional array. Do not use Array.prototype.flat().',
    starterCode: `function flattenArray(arr) {
  const result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item));
    } else {
      result.push(item);
    }
  }
  return result;
}
`,
    testCases: [
      { input: '[1, [2, [3, 4], 5]]', expected: '[1, 2, 3, 4, 5]', description: 'Multi-level nested array' },
      { input: '[[1], [2], [3]]', expected: '[1, 2, 3]', description: 'Single level depth' },
    ],
    constraints: ['Array elements can be integers, strings, or nested arrays.'],
    correctAnswer: `function flattenArray(arr) {
  return arr.reduce((acc, val) => 
    Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val), []
  );
}`,
    explanation: 'Recursively concatenate elements: if an element is an array, recursively flatten it; otherwise append it to the accumulator.',
    hint: 'Use reduce or a loop combined with Array.isArray checks.',
  },

  // ================= TYPESCRIPT QUESTIONS =================
  {
    id: 'q_ts_01',
    title: 'Custom Generic Stack Data Structure',
    language: 'TypeScript',
    topic: 'Generics & Classes',
    difficulty: 'Intermediate',
    type: 'CodingChallenge',
    prompt: 'Create a type-safe generic Stack<T> class with push(item: T): void, pop(): T | undefined, peek(): T | undefined, and size(): number methods.',
    starterCode: `class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  size(): number {
    return this.items.length;
  }
}
`,
    testCases: [
      { input: 'push(1), push(2), pop()', expected: 'Returns 2, size is 1', description: 'LIFO order test' },
      { input: 'peek() on empty stack', expected: 'undefined', description: 'Empty stack boundary' },
    ],
    constraints: ['Fully typed generics without any.'],
    correctAnswer: `class Stack<T> {
  private storage: T[] = [];
  push(item: T): void { this.storage.push(item); }
  pop(): T | undefined { return this.storage.pop(); }
  peek(): T | undefined { return this.storage[this.storage.length - 1]; }
  size(): number { return this.storage.length; }
}`,
    explanation: 'Encapsulating items in a private array guarantees LIFO invariance while TypeScript generic parameter T ensures type safety across all method inputs and outputs.',
    hint: 'Use a private array instance variable.',
  },

  // ================= JAVA QUESTIONS =================
  {
    id: 'q_java_01',
    title: 'Valid Parentheses Checker',
    language: 'Java',
    topic: 'Stacks & Strings',
    difficulty: 'Beginner',
    type: 'CodingChallenge',
    prompt: 'Given a string s containing just the characters (, ), {, }, [, ], determine if the input string is valid. Open brackets must be closed by the same type of brackets, and in the correct order.',
    starterCode: `import java.util.Stack;

public class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}
`,
    testCases: [
      { input: 's = "()[]{}"', expected: 'true', description: 'Matched pairs' },
      { input: 's = "(]"', expected: 'false', description: 'Mismatched pair' },
      { input: 's = "([)]"', expected: 'false', description: 'Incorrect order' },
    ],
    constraints: ['1 <= s.length() <= 10^4', 's consists of parentheses only: ()[]{}'],
    correctAnswer: `public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    for (char c : s.toCharArray()) {
        if (c == '(') stack.push(')');
        else if (c == '{') stack.push('}');
        else if (c == '[') stack.push(']');
        else if (stack.isEmpty() || stack.pop() != c) return false;
    }
    return stack.isEmpty();
}`,
    explanation: 'Pushing corresponding closing characters onto a stack when seeing an opener simplifies matching: each closer must match stack.pop().',
    hint: 'Push closing brackets onto the stack when opening brackets appear.',
  },

  // ================= C++ QUESTIONS =================
  {
    id: 'q_cpp_01',
    title: 'Reverse String In-Place with Two Pointers',
    language: 'C++',
    topic: 'Pointers & Memory',
    difficulty: 'Beginner',
    type: 'CodingChallenge',
    prompt: 'Write a function that reverses a vector of characters in-place with O(1) extra memory.',
    starterCode: `#include <vector>
using namespace std;

void reverseString(vector<char>& s) {
    int left = 0;
    int right = s.size() - 1;
    while (left < right) {
        swap(s[left], s[right]);
        left++;
        right--;
    }
}
`,
    testCases: [
      { input: 's = ["h","e","l","l","o"]', expected: '["o","l","l","e","h"]', description: 'Standard word' },
      { input: 's = ["H","a","n","n","a","h"]', expected: '["h","a","n","n","a","H"]', description: 'Even length' },
    ],
    constraints: ['1 <= s.size() <= 10^5', 's[i] is a printable ASCII character.'],
    correctAnswer: `void reverseString(vector<char>& s) {
    int left = 0, right = s.size() - 1;
    while (left < right) {
        std::swap(s[left++], s[right--]);
    }
}`,
    explanation: 'Two pointers starting at opposite boundaries swap elements and move inward until they meet, requiring strictly O(1) auxiliary space.',
    hint: 'Use std::swap with two indices incrementing and decrementing.',
  },

  // ================= GO QUESTIONS =================
  {
    id: 'q_go_01',
    title: 'Concurrent Safe Counter with Mutex',
    language: 'Go',
    topic: 'Concurrency & Mutexes',
    difficulty: 'Intermediate',
    type: 'CodingChallenge',
    prompt: 'Implement a thread-safe Counter struct in Go using sync.Mutex. Include Inc() and Value() int methods that work safely across concurrent goroutines.',
    starterCode: `package main

import "sync"

type SafeCounter struct {
    mu sync.Mutex
    v  int
}

func (c *SafeCounter) Inc() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.v++
}

func (c *SafeCounter) Value() int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.v
}
`,
    testCases: [
      { input: '1,000 goroutines calling Inc() concurrently', expected: '1000 with zero race condition', description: 'Data race prevention' },
    ],
    constraints: ['Pass go test -race without data race warnings.'],
    correctAnswer: `type SafeCounter struct {
    mu sync.Mutex
    v  int
}
func (c *SafeCounter) Inc() {
    c.mu.Lock()
    c.v++
    c.mu.Unlock()
}
func (c *SafeCounter) Value() int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.v
}`,
    explanation: 'Protecting shared state v with sync.Mutex avoids race conditions when multiple goroutines write simultaneously.',
    hint: 'Lock the mutex before writing or reading, and unlock via defer or explicit unlock.',
  },

  // ================= SQL QUESTIONS =================
  {
    id: 'q_sql_01',
    title: 'Find Second Highest Salary',
    language: 'SQL',
    topic: 'Subqueries & Aggregates',
    difficulty: 'Beginner',
    type: 'CodingChallenge',
    prompt: 'Write an SQL query to report the second highest distinct salary from the Employee table. If there is no second highest salary, return NULL.',
    starterCode: `SELECT MAX(salary) AS SecondHighestSalary
FROM Employee
WHERE salary < (SELECT MAX(salary) FROM Employee);
`,
    testCases: [
      { input: 'Salaries: [100, 200, 300]', expected: '200', description: 'Standard 3 distinct salaries' },
      { input: 'Salaries: [100]', expected: 'NULL', description: 'Single row returns NULL' },
      { input: 'Salaries: [100, 100]', expected: 'NULL', description: 'Duplicate top salary' },
    ],
    constraints: ['Employee table contains id INT, salary INT.'],
    correctAnswer: `SELECT MAX(salary) AS SecondHighestSalary
FROM Employee
WHERE salary < (SELECT MAX(salary) FROM Employee);`,
    explanation: 'Querying the maximum salary strictly less than the overall table maximum reliably finds the second distinct salary and returns NULL if none exists.',
    hint: 'Use a subquery finding the overall MAX(salary) and select the MAX of remaining rows.',
  },
  {
    id: 'q_sql_02',
    title: 'Cumulative Running Total with Window Function',
    language: 'SQL',
    topic: 'Window Functions',
    difficulty: 'Intermediate',
    type: 'CodingChallenge',
    prompt: 'Write an SQL query to calculate the cumulative running total of amount ordered by transaction_date for each customer_id from the Transactions table.',
    starterCode: `SELECT 
    customer_id,
    transaction_date,
    amount,
    SUM(amount) OVER (
        PARTITION BY customer_id 
        ORDER BY transaction_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total
FROM Transactions;
`,
    testCases: [
      { input: 'Customer 1: $50 (Jan 1), $100 (Jan 2)', expected: 'Running totals: $50, $150', description: 'Window cumulative sum' },
    ],
    constraints: ['Transactions contains customer_id, transaction_date, amount.'],
    correctAnswer: `SELECT customer_id, transaction_date, amount,
       SUM(amount) OVER(PARTITION BY customer_id ORDER BY transaction_date) as running_total
FROM Transactions;`,
    explanation: 'SUM() OVER (PARTITION BY customer_id ORDER BY transaction_date) computes a running sum per partition without grouping rows.',
    hint: 'Use SUM() OVER with PARTITION BY customer_id ORDER BY transaction_date.',
  },

  // ================= RUST QUESTIONS =================
  {
    id: 'q_rust_01',
    title: 'Vector Filter Even Numbers & Ownership',
    language: 'Rust',
    topic: 'Ownership & Iterators',
    difficulty: 'Intermediate',
    type: 'CodingChallenge',
    prompt: 'Write a Rust function filter_evens(nums: &[i32]) -> Vec<i32> that returns a new vector containing only the even integers in the original slice.',
    starterCode: `pub fn filter_evens(nums: &[i32]) -> Vec<i32> {
    nums.iter()
        .copied()
        .filter(|&x| x % 2 == 0)
        .collect()
}
`,
    testCases: [
      { input: 'nums = [1, 2, 3, 4, 5, 6]', expected: '[2, 4, 6]', description: 'Filter even numbers' },
      { input: 'nums = [1, 3, 5]', expected: '[]', description: 'No evens' },
    ],
    constraints: ['Borrows slice without taking ownership.'],
    correctAnswer: `pub fn filter_evens(nums: &[i32]) -> Vec<i32> {
    nums.iter().filter(|&&x| x % 2 == 0).copied().collect()
}`,
    explanation: 'Iterating over borrowed slice &[i32], filtering with closure predicate, and collecting into a new owned Vec<i32>.',
    hint: 'Use .iter().filter(...) and .collect().',
  },
];

// Pre-built comprehensive career roadmap catalog
export const careerRoadmapsCatalog: Record<string, RoadmapStep[]> = {
  'Software Developer': [
    {
      id: 'step_1',
      title: '1. Programming Languages & DSA Foundation',
      category: 'Core Programming',
      progress: 90,
      status: 'completed',
      description: 'Master core language syntax (Python/JavaScript), algorithms, time complexity, and data structures.',
      recommendedTime: 'Completed',
      skills: ['Arrays & HashMaps', 'Two Pointers', 'Recursion', 'Time Complexity O(n)'],
    },
    {
      id: 'step_2',
      title: '2. Git & Version Control Workflows',
      category: 'Engineering Tooling',
      progress: 85,
      status: 'completed',
      description: 'Branching models, merge conflict resolution, pull request etiquette, and GitHub Actions CI.',
      recommendedTime: 'Completed',
      skills: ['Git Rebase', 'GitHub Flow', 'CI/CD Pipelines'],
    },
    {
      id: 'step_3',
      title: '3. Relational Databases & SQL Optimization',
      category: 'Data Storage',
      progress: 78,
      status: 'completed',
      description: 'Database normalization, B-Tree indexes, window functions, and transaction ACID guarantees.',
      recommendedTime: 'Completed',
      skills: ['PostgreSQL', 'Indexes', 'EXPLAIN Query Plans', 'Window Functions'],
    },
    {
      id: 'step_4',
      title: '4. RESTful API Architecture & Authentication',
      category: 'Backend',
      progress: 72,
      status: 'in_progress',
      description: 'Design idempotent REST endpoints, JWT token lifecycles, OAuth2 integration, and rate limiting.',
      recommendedTime: '1 week remaining',
      skills: ['FastAPI', 'Express', 'JWT Auth', 'OpenAPI / Swagger'],
    },
    {
      id: 'step_5',
      title: '5. Frontend Frameworks & State Management',
      category: 'Frontend',
      progress: 68,
      status: 'in_progress',
      description: 'Modern component lifecycle, hooks, reactive state patterns, and responsive UI components.',
      recommendedTime: '2 weeks remaining',
      skills: ['React 19', 'TypeScript', 'Tailwind CSS', 'State Management'],
    },
    {
      id: 'step_6',
      title: '6. Containerization & Cloud Deployment',
      category: 'DevOps & Cloud',
      progress: 42,
      status: 'in_progress',
      description: 'Author multi-stage Dockerfiles, Docker Compose environments, and cloud deployment pipelines.',
      recommendedTime: '3 weeks needed',
      skills: ['Docker', 'Cloud Run / AWS ECS', 'Environment Configuration'],
    },
    {
      id: 'step_7',
      title: '7. Distributed Caching & System Scalability',
      category: 'System Design',
      progress: 35,
      status: 'remaining',
      description: 'In-memory caching with Redis, cache invalidation, load balancers, and vertical/horizontal scaling.',
      recommendedTime: '4 weeks needed',
      skills: ['Redis', 'Load Balancing', 'Microservices', 'Message Queues'],
    },
    {
      id: 'step_8',
      title: '8. Technical Mock Interviews & Behavioral STAR',
      category: 'Interview Prep',
      progress: 30,
      status: 'remaining',
      description: 'Live coding drills, behavioral STAR answers, and live system design whiteboarding.',
      recommendedTime: 'Ongoing',
      skills: ['STAR Method', 'Mock Interviews', 'DSA Speed Drills'],
    },
  ],
  'AI & Machine Learning Engineer': [
    {
      id: 'step_ml_1',
      title: '1. Advanced Python & Numerical Computing',
      category: 'Foundations',
      progress: 88,
      status: 'completed',
      description: 'NumPy vectorized arrays, Pandas data manipulation, and matrix algebra for machine learning.',
      recommendedTime: 'Completed',
      skills: ['NumPy', 'Pandas', 'Vectorization', 'Linear Algebra'],
    },
    {
      id: 'step_ml_2',
      title: '2. Probability, Statistics & Model Evaluation',
      category: 'Math & Stats',
      progress: 75,
      status: 'completed',
      description: 'Hypothesis testing, Bayesian inference, cross-validation metrics, ROC-AUC, and regression analysis.',
      recommendedTime: 'Completed',
      skills: ['Distributions', 'Hypothesis Testing', 'Cross-Validation', 'Loss Functions'],
    },
    {
      id: 'step_ml_3',
      title: '3. Classical Machine Learning Algorithms',
      category: 'Machine Learning',
      progress: 65,
      status: 'in_progress',
      description: 'Supervised and unsupervised models: Random Forests, Gradient Boosted Trees (XGBoost), and K-Means.',
      recommendedTime: '2 weeks remaining',
      skills: ['Scikit-Learn', 'XGBoost', 'Feature Engineering', 'Clustering'],
    },
    {
      id: 'step_ml_4',
      title: '4. Deep Learning Frameworks (PyTorch)',
      category: 'Deep Learning',
      progress: 50,
      status: 'in_progress',
      description: 'Neural network backpropagation, custom PyTorch layers, loss optimization, and GPU acceleration.',
      recommendedTime: '3 weeks needed',
      skills: ['PyTorch', 'Backpropagation', 'Tensors', 'CUDA Acceleration'],
    },
    {
      id: 'step_ml_5',
      title: '5. Transformers, LLMs & Retrieval-Augmented Generation (RAG)',
      category: 'GenAI & NLP',
      progress: 40,
      status: 'in_progress',
      description: 'Attention mechanisms, Transformer architectures, embedding models, Vector DBs, and LLM APIs.',
      recommendedTime: '4 weeks needed',
      skills: ['Transformers', 'Gemini API', 'Vector Embeddings', 'RAG Pipelines'],
    },
    {
      id: 'step_ml_6',
      title: '6. MLOps, Model Serving & Scalable Inference',
      category: 'ML Infrastructure',
      progress: 25,
      status: 'remaining',
      description: 'Serve models via high-throughput endpoints (vLLM / Triton), latency monitoring, and model drift tracking.',
      recommendedTime: '5 weeks needed',
      skills: ['MLflow', 'Docker', 'FastAPI Inference', 'Model Quantization'],
    },
  ],
  'Cloud & DevOps Engineer': [
    {
      id: 'step_ops_1',
      title: '1. Linux Systems Administration & Shell Scripting',
      category: 'Core Systems',
      progress: 82,
      status: 'completed',
      description: 'Process management, network sockets, systemd services, Bash scripting, and SSH key management.',
      recommendedTime: 'Completed',
      skills: ['Linux CLI', 'Bash Scripting', 'Networking Protocols', 'Systemd'],
    },
    {
      id: 'step_ops_2',
      title: '2. Containerization with Docker & Multi-Stage Builds',
      category: 'Containers',
      progress: 65,
      status: 'in_progress',
      description: 'Writing minimal container images, rootless containers, multi-stage builds, and Docker networking.',
      recommendedTime: '1 week remaining',
      skills: ['Dockerfiles', 'Multi-stage Builds', 'Docker Compose', 'Container Security'],
    },
    {
      id: 'step_ops_3',
      title: '3. Infrastructure as Code (Terraform)',
      category: 'IaC',
      progress: 45,
      status: 'in_progress',
      description: 'Declarative cloud provisioning, state file management, modular architecture, and drift detection.',
      recommendedTime: '3 weeks needed',
      skills: ['Terraform', 'HCL', 'Cloud Provisioning', 'State Management'],
    },
    {
      id: 'step_ops_4',
      title: '4. Kubernetes Cluster Orchestration',
      category: 'Orchestration',
      progress: 30,
      status: 'remaining',
      description: 'Deployments, Services, Ingress controllers, Helm charts, and automated horizontal pod autoscaling (HPA).',
      recommendedTime: '4 weeks needed',
      skills: ['Kubernetes', 'Helm', 'Ingress', 'HPA Autoscaling'],
    },
    {
      id: 'step_ops_5',
      title: '5. CI/CD & Observability (OpenTelemetry / Prometheus)',
      category: 'Monitoring & CI/CD',
      progress: 20,
      status: 'remaining',
      description: 'Automated deployment pipelines with canary releases, Prometheus metrics, Grafana dashboards, and alerts.',
      recommendedTime: '5 weeks needed',
      skills: ['GitHub Actions', 'Prometheus', 'Grafana', 'Incident Response'],
    },
  ],
  'Data Scientist & Analytics': [
    {
      id: 'step_ds_1',
      title: '1. Advanced SQL for Analytics & Data Warehousing',
      category: 'SQL & Warehousing',
      progress: 85,
      status: 'completed',
      description: 'Complex window queries, CTEs, snowflake/star schemas, and BigQuery / Snowflake data models.',
      recommendedTime: 'Completed',
      skills: ['SQL Window Functions', 'CTEs', 'BigQuery', 'Data Modeling'],
    },
    {
      id: 'step_ds_2',
      title: '2. Exploratory Data Analysis & Statistical Testing',
      category: 'Statistics & EDA',
      progress: 75,
      status: 'completed',
      description: 'A/B testing methodologies, p-values, sample sizing, and statistical anomaly detection.',
      recommendedTime: 'Completed',
      skills: ['A/B Testing', 'Hypothesis Testing', 'Pandas', 'Seaborn'],
    },
    {
      id: 'step_ds_3',
      title: '3. Predictive Modeling & Feature Engineering',
      category: 'Predictive Analytics',
      progress: 55,
      status: 'in_progress',
      description: 'Building regression and classification pipelines, imputation, and feature importance analysis.',
      recommendedTime: '2 weeks remaining',
      skills: ['Scikit-Learn', 'Feature Importance', 'Hyperparameter Tuning'],
    },
    {
      id: 'step_ds_4',
      title: '4. Business Intelligence & Executive Storytelling',
      category: 'Data Visualization',
      progress: 40,
      status: 'in_progress',
      description: 'Executive dashboards, cohort retention heatmaps, and metric definition frameworks (LTV/CAC).',
      recommendedTime: '3 weeks needed',
      skills: ['Tableau / Looker', 'Metric Framing', 'Executive Presentation'],
    },
  ],
  'Cyber Security Specialist': [
    {
      id: 'step_sec_1',
      title: '1. Computer Networking & Packet Analysis',
      category: 'Networking',
      progress: 80,
      status: 'completed',
      description: 'OSI 7 layers, TCP/IP handshakes, TLS certificates, DNS spoofing, and Wireshark packet inspections.',
      recommendedTime: 'Completed',
      skills: ['TCP/IP', 'Wireshark', 'DNS & TLS', 'Firewalls'],
    },
    {
      id: 'step_sec_2',
      title: '2. Application Security & OWASP Top 10',
      category: 'AppSec',
      progress: 60,
      status: 'in_progress',
      description: 'Identify and patch SQLi, XSS, CSRF, SSRF, broken object level authorization (BOLA), and IDOR.',
      recommendedTime: '2 weeks remaining',
      skills: ['OWASP Top 10', 'Penetration Testing', 'Burp Suite', 'Input Sanitization'],
    },
    {
      id: 'step_sec_3',
      title: '3. Cryptography & Identity Management',
      category: 'Security Architecture',
      progress: 45,
      status: 'in_progress',
      description: 'Symmetric/Asymmetric ciphers, public key infrastructure (PKI), zero-trust architecture, and OAuth2/SAML.',
      recommendedTime: '3 weeks needed',
      skills: ['AES / RSA', 'PKI', 'OAuth 2.0', 'Zero-Trust Architecture'],
    },
    {
      id: 'step_sec_4',
      title: '4. Security Operations (SIEM & Incident Response)',
      category: 'SecOps',
      progress: 30,
      status: 'remaining',
      description: 'Log analysis with Splunk/Elastic, threat hunting, vulnerability scanning, and disaster response playbooks.',
      recommendedTime: '4 weeks needed',
      skills: ['SIEM', 'Threat Modeling', 'Vulnerability Scanners', 'SOC Workflows'],
    },
  ],
};


export const initialJobs: Job[] = [
  {
    id: 'job_01',
    title: 'Python Backend Developer',
    company: 'Stripe',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    location: 'Bengaluru, India (or Remote)',
    workplaceType: 'Remote',
    experienceLevel: 'Entry / Mid',
    experienceYearsReq: 1,
    salaryRange: '₹1,28,59,121 - ₹1,57,16,704',
    requiredSkills: ['Python', 'SQL', 'REST APIs', 'PostgreSQL', 'Docker'],
    programmingLanguages: ['Python', 'SQL'],
    description:
      'Build resilient payment ingestion pipelines and developer API gateways handling millions of global financial transactions.',
    deadline: '2026-11-15',
    careerCategory: 'Backend Development',
    applicantCount: 142,
  },
  {
    id: 'job_02',
    title: 'Cloud & Systems Software Engineer',
    company: 'Datadog',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80',
    location: 'Mumbai, India',
    workplaceType: 'Hybrid',
    experienceLevel: 'Associate (1-2 yrs)',
    experienceYearsReq: 2,
    salaryRange: '₹1,33,35,385 - ₹1,61,92,968',
    requiredSkills: ['Python', 'Go', 'Docker', 'AWS', 'System Design', 'Linux'],
    programmingLanguages: ['Python', 'Go'],
    description:
      'Design high-throughput observability agents, distributed telemetry collectors, and real-time metric aggregation engines.',
    deadline: '2026-11-30',
    careerCategory: 'Cloud & Infrastructure',
    applicantCount: 98,
  },
  {
    id: 'job_03',
    title: 'Full Stack Software Engineer',
    company: 'Airbnb',
    logo: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100&auto=format&fit=crop&q=80',
    location: 'Hyderabad, India',
    workplaceType: 'Hybrid',
    experienceLevel: 'New Graduate / Junior',
    experienceYearsReq: 0,
    salaryRange: '₹1,38,11,649 - ₹1,66,69,231',
    requiredSkills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL', 'REST APIs'],
    programmingLanguages: ['JavaScript', 'TypeScript'],
    description:
      'Create immersive guest experiences, responsive booking interfaces, and microservices supporting global travel discovery.',
    deadline: '2026-10-25',
    careerCategory: 'Full Stack Development',
    applicantCount: 230,
  },
  {
    id: 'job_04',
    title: 'AI Application & Systems Engineer',
    company: 'Anthropic',
    logo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=100&auto=format&fit=crop&q=80',
    location: 'Pune, India',
    workplaceType: 'On-Site',
    experienceLevel: 'Mid-Level',
    experienceYearsReq: 2,
    salaryRange: '₹1,71,45,495 - ₹2,09,55,605',
    requiredSkills: ['Python', 'LLMs', 'Vector Databases', 'REST APIs', 'FastAPI', 'PyTorch'],
    programmingLanguages: ['Python'],
    description:
      'Engineer developer platform features, agentic workflows, and high-performance inference bridges for next-generation intelligence models.',
    deadline: '2026-12-01',
    careerCategory: 'AI Engineering',
    applicantCount: 310,
  },
  {
    id: 'job_05',
    title: 'Product Data Analyst',
    company: 'Shopify',
    logo: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=100&auto=format&fit=crop&q=80',
    location: 'Remote (India)',
    workplaceType: 'Remote',
    experienceLevel: 'Entry / Junior',
    experienceYearsReq: 1,
    salaryRange: '₹1,00,01,539 - ₹1,23,82,858',
    requiredSkills: ['SQL', 'Python', 'Statistics', 'Power BI', 'A/B Testing'],
    programmingLanguages: ['SQL', 'Python'],
    description:
      'Uncover merchant growth insights, analyze conversion funnels, and design statistically rigorous experiments.',
    deadline: '2026-11-20',
    careerCategory: 'Data Analytics',
    applicantCount: 165,
  },
];

export const initialApplications: JobApplication[] = [
  {
    id: 'app_01',
    jobId: 'job_01',
    jobTitle: 'Python Backend Developer',
    company: 'Stripe',
    appliedDate: '2026-09-15',
    matchScore: 91,
    status: 'Interview',
    notes: 'Technical screen passed with flying colors. Next round: Systems & architecture interview on Thursday.',
    lastUpdated: '2026-10-02',
  },
  {
    id: 'app_02',
    jobId: 'job_02',
    jobTitle: 'Cloud & Systems Software Engineer',
    company: 'Datadog',
    appliedDate: '2026-09-20',
    matchScore: 84,
    status: 'Shortlisted',
    notes: 'Recruiter reached out for technical take-home code assessment.',
    lastUpdated: '2026-10-01',
  },
  {
    id: 'app_03',
    jobId: 'job_05',
    jobTitle: 'Product Data Analyst',
    company: 'Shopify',
    appliedDate: '2026-09-25',
    matchScore: 78,
    status: 'Applied',
    notes: 'Resume submitted directly with AI portfolio link.',
    lastUpdated: '2026-09-25',
  },
  {
    id: 'app_04',
    jobId: 'job_03',
    jobTitle: 'Software Engineer',
    company: 'Legacy Corp',
    appliedDate: '2026-08-10',
    matchScore: 72,
    status: 'Rejected',
    notes: 'Position closed due to team reorganization. Feedback: Strong algorithm score, expand cloud experience.',
    lastUpdated: '2026-08-28',
  },
];

export const initialTrends: IndustryTrend[] = [
  {
    id: 'tr_01',
    name: 'Generative AI & LLM Systems',
    domain: 'Software Development & AI',
    popularity: 'Extremely High',
    growthIndicator: '+74% YoY Demand',
    whyItMatters:
      'Increasing demand for AI-native application architectures, agent workflows, function-calling microservices, and vector search systems.',
    relatedJobs: ['AI Application Engineer', 'LLM Systems Architect', 'Prompt & Evaluation Engineer'],
    requiredSkills: ['Python', 'APIs', 'LLMs', 'Prompt Engineering', 'Vector Databases', 'LangChain/LlamaIndex'],
    recommendedCourses: ['Generative AI Fundamentals', 'Building Production LLM Applications with Gemini'],
    recommendedPractice: 'Complete 10 vector database retrieval and function-calling coding challenges.',
  },
  {
    id: 'tr_02',
    name: 'Cloud Computing & Kubernetes Microservices',
    domain: 'Cloud & DevOps',
    popularity: 'Extremely High',
    growthIndicator: '+42% YoY Demand',
    whyItMatters:
      'Enterprises require cost-optimized, containerized microservices running on elastic cloud infrastructure with zero downtime deployments.',
    relatedJobs: ['Cloud Software Engineer', 'DevOps Engineer', 'Site Reliability Engineer (SRE)'],
    requiredSkills: ['Docker', 'Kubernetes', 'AWS/GCP', 'Terraform', 'CI/CD Pipelines'],
    recommendedCourses: ['Cloud Native Architecture with Docker & Kubernetes', 'GCP Associate Cloud Engineer Prep'],
    recommendedPractice: 'Containerize a multi-tier web application with Redis cache and PostgreSQL.',
  },
  {
    id: 'tr_03',
    name: 'Full-Stack Modern Architectures & Edge Runtime',
    domain: 'Web Development',
    popularity: 'High',
    growthIndicator: '+35% YoY Demand',
    whyItMatters:
      'Transition from heavy monolithic codebases to serverless edge rendering, React Server Components, and real-time streaming interfaces.',
    relatedJobs: ['Full Stack Engineer', 'Frontend Platform Engineer', 'React/Next.js Specialist'],
    requiredSkills: ['TypeScript', 'React 19', 'Next.js', 'Tailwind CSS', 'Serverless Functions'],
    recommendedCourses: ['Modern Full-Stack React Architecture', 'Advanced TypeScript Design Patterns'],
    recommendedPractice: 'Solve 15 asynchronous JavaScript and state optimization questions.',
  },
  {
    id: 'tr_04',
    name: 'Cybersecurity & Secure Software Supply Chains',
    domain: 'Security & Systems',
    popularity: 'High',
    growthIndicator: '+38% YoY Demand',
    whyItMatters:
      'Heightened focus on software Bill of Materials (SBOM), zero-trust authentication, OWASP Top 10 mitigation, and automated dependency auditing.',
    relatedJobs: ['Application Security Engineer', 'SecOps Engineer', 'Penetration Tester'],
    requiredSkills: ['Cryptography', 'OAuth2/OIDC', 'Network Security', 'SAST/DAST Tools', 'Linux Hardening'],
    recommendedCourses: ['Secure Software Engineering & OWASP', 'Zero-Trust Architecture Fundamentals'],
    recommendedPractice: 'Practice 10 authentication and SQL injection mitigation exercises.',
  },
  {
    id: 'tr_05',
    name: 'Modern Data Engineering & Real-Time Streaming',
    domain: 'Data & Analytics',
    popularity: 'Rising Fast',
    growthIndicator: '+46% YoY Demand',
    whyItMatters:
      'Shift from batch ETL to real-time event streaming pipelines with Apache Kafka, dbt transformations, and Lakehouse architectures.',
    relatedJobs: ['Data Engineer', 'Analytics Engineer', 'Big Data Architect'],
    requiredSkills: ['Python', 'Advanced SQL', 'Apache Kafka', 'dbt', 'Snowflake/BigQuery', 'Apache Spark'],
    recommendedCourses: ['Event-Driven Data Pipelines with Kafka', 'Modern Analytics Engineering with dbt'],
    recommendedPractice: 'Solve 12 complex SQL window function and partitioning challenges.',
  },
];

export const initialCareerComparisons: CareerComparisonItem[] = [
  {
    career: 'Data Analyst',
    matchScore: 92,
    marketDemand: 'High',
    skillsGap: 'Low',
    medianSalary: '₹93,34,770',
    topSkillsNeeded: ['Power BI', 'Statistics for A/B Testing', 'Tableau'],
    learningTimeEstimate: '3-4 Weeks',
  },
  {
    career: 'Python Developer / Backend',
    matchScore: 88,
    marketDemand: 'Very High',
    skillsGap: 'Medium',
    medianSalary: '₹1,35,25,891',
    topSkillsNeeded: ['Docker', 'System Design', 'Redis Caching'],
    learningTimeEstimate: '5-6 Weeks',
  },
  {
    career: 'Full Stack Engineer',
    matchScore: 81,
    marketDemand: 'Very High',
    skillsGap: 'Medium',
    medianSalary: '₹1,31,44,880',
    topSkillsNeeded: ['React State Mastery', 'CI/CD Pipelines', 'Tailwind'],
    learningTimeEstimate: '4-5 Weeks',
  },
  {
    career: 'AI / LLM Systems Engineer',
    matchScore: 74,
    marketDemand: 'Very High',
    skillsGap: 'High',
    medianSalary: '₹1,66,69,231',
    topSkillsNeeded: ['Vector Databases', 'Prompt Chains', 'Model Fine-Tuning'],
    learningTimeEstimate: '8-10 Weeks',
  },
];

export const initialTimeline: TimelineEvent[] = [
  {
    id: 'tm_01',
    date: 'Aug 15, 2026',
    title: 'Profile Created & CV Uploaded',
    description: 'Initial CV analyzed by AI. Baseline ATS score calculated at 78%.',
    status: 'done',
    icon: 'FileText',
  },
  {
    id: 'tm_02',
    date: 'Aug 22, 2026',
    title: 'Skills Analyzed & Target Career Selected',
    description: 'Target career locked to Software Developer. Weak areas identified in Docker and Recursion.',
    status: 'done',
    icon: 'Target',
  },
  {
    id: 'tm_03',
    date: 'Sep 02, 2026',
    title: 'Coding Proficiency Verified',
    description: 'Completed comprehensive coding benchmark with 342 solved problems and 82% accuracy.',
    status: 'done',
    icon: 'Code2',
  },
  {
    id: 'tm_04',
    date: 'Sep 10, 2026',
    title: '100+ Coding Practice Questions Solved',
    description: 'Python accuracy climbed to 86%. Adaptive algorithm lowered recursion error rate.',
    status: 'done',
    icon: 'Award',
  },
  {
    id: 'tm_05',
    date: 'Sep 15, 2026',
    title: 'First Job Application Submitted',
    description: 'Applied to Stripe Python Backend Developer with 91% AI match score.',
    status: 'done',
    icon: 'Send',
  },
  {
    id: 'tm_06',
    date: 'Oct 02, 2026',
    title: 'Technical Screen Passed at Stripe',
    description: 'Moved into Systems Interview stage. 14-day preparation plan activated.',
    status: 'current',
    icon: 'CheckCircle2',
  },
  {
    id: 'tm_07',
    date: 'Upcoming',
    title: 'Final Round Interview & Offer',
    description: 'Complete system design mock sessions to lock in targeted job offer.',
    status: 'upcoming',
    icon: 'Briefcase',
  },
];

export const initialRecruiterCandidates: RecruiterCandidate[] = [
  {
    id: 'cand_01',
    name: 'Arjun Mehta',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Aspiring Backend / Full Stack Engineer',
    email: 'arjun.mehta@iitb.ac.in',
    matchScore: 94,
    cvScore: 78,
    codingScore: 86,
    assessmentScore: 88,
    strongPoints: ['Python', 'SQL', 'Data Structures & Algorithms', 'FastAPI', 'High Challenges Solved (342)'],
    improvementAreas: ['Cloud Infrastructure (AWS/GCP)', 'Container Orchestration (Kubernetes)'],
    experienceYears: 1,
    leetcodeCount: 342,
    skills: ['Python', 'SQL', 'FastAPI', 'JavaScript', 'PostgreSQL', 'Docker'],
    status: 'Interview',
    appliedJobId: 'job_01',
  },
  {
    id: 'cand_02',
    name: 'Meera Nair',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    role: 'Senior Backend Engineer',
    email: 'meera.nair@example.in',
    matchScore: 89,
    cvScore: 92,
    codingScore: 84,
    assessmentScore: 85,
    strongPoints: ['Distributed Systems', 'Go', 'Docker & Kubernetes', 'PostgreSQL'],
    improvementAreas: ['Python specialized frameworks (FastAPI/Django)'],
    experienceYears: 3,
    leetcodeCount: 280,
    skills: ['Go', 'Python', 'Docker', 'Kubernetes', 'gRPC', 'PostgreSQL'],
    status: 'Shortlisted',
    appliedJobId: 'job_01',
  },
  {
    id: 'cand_03',
    name: 'Rohan Sharma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'Full Stack Developer',
    email: 'rohan.sharma@example.in',
    matchScore: 82,
    cvScore: 80,
    codingScore: 79,
    assessmentScore: 76,
    strongPoints: ['Node.js', 'React', 'MongoDB', 'REST APIs'],
    improvementAreas: ['Low Python production experience', 'Needs deeper SQL query optimization'],
    experienceYears: 1,
    leetcodeCount: 154,
    skills: ['TypeScript', 'React', 'Node.js', 'Python', 'SQL'],
    status: 'Screened',
    appliedJobId: 'job_01',
  },
  {
    id: 'cand_04',
    name: 'Ananya Iyer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    role: 'Junior Software Engineer',
    email: 'ananya.iyer@example.in',
    matchScore: 71,
    cvScore: 74,
    codingScore: 68,
    assessmentScore: 70,
    strongPoints: ['Frontend UI', 'JavaScript', 'HTML/CSS', 'Git'],
    improvementAreas: ['Backend distributed architecture', 'Database indexing', 'Algorithms'],
    experienceYears: 0,
    leetcodeCount: 65,
    skills: ['JavaScript', 'HTML5', 'CSS3', 'React', 'Git'],
    status: 'Applied',
    appliedJobId: 'job_03',
  },
];

export const initialNotifications: PlatformNotification[] = [
  {
    id: 'notif_01',
    title: 'Recruiter Interview Invitation',
    message: 'Stripe recruiter moved your application to Technical Interview for Python Backend Developer!',
    type: 'recruiter',
    timestamp: '1 hour ago',
    read: false,
  },
  {
    id: 'notif_02',
    title: 'New High-Match Job Detected',
    message: 'Datadog posted "Cloud Software Engineer" (84% match with your Python + Go profile).',
    type: 'job',
    timestamp: '5 hours ago',
    read: false,
  },
  {
    id: 'notif_03',
    title: 'Skill Score Increased!',
    message: 'Your Python skill score climbed from 78% to 86% following your 15 accepted submissions.',
    type: 'practice',
    timestamp: 'Yesterday',
    read: true,
  },
  {
    id: 'notif_04',
    title: 'Industry Trend Alert',
    message: 'Generative AI hiring surged +74% this month. Check updated recommended skills.',
    type: 'trend',
    timestamp: '2 days ago',
    read: true,
  },
];

export const initialBehavioralQuestions = [
  {
    id: 'bq_01',
    question: 'Tell me about a time you had to make a high-stakes technical decision with incomplete information.',
    competency: 'Ownership & Initiative' as const,
    description: 'Assesses risk tolerance, analytical bias for action, and clear stakeholder communication under ambiguity.',
    whatToLookFor: [
      'Did the candidate establish a clear evaluation framework?',
      'Did they consider reversibility (two-way door decisions)?',
      'Did they measure the outcome and adapt quickly?',
    ],
    starExample: {
      situation: 'During our payment ingestion overhaul at Bengaluru Tech Labs, our team needed to pick between an async Celery worker architecture or a lightweight Redis Pub/Sub queue, with 2 weeks left before holiday peak traffic.',
      task: 'As the intern assigned to the backend data pipeline, I was asked to formulate the architecture proposal and prototype load benchmarks.',
      action: 'I built two benchmark harness scripts measuring latency under 5,000 req/sec spikes. Realizing Redis Pub/Sub did not offer message persistence if a worker crashed, I chose Redis Streams with Consumer Groups to guarantee at-least-once delivery with low memory overhead.',
      result: 'The chosen architecture sustained holiday traffic with zero dropped events and reduced P95 transaction latency by 32%.',
    },
    redFlags: [
      'Analysis paralysis without taking any action.',
      'Blaming others for missing documentation.',
      'Inability to recall trade-offs or why the alternative was rejected.',
    ],
  },
  {
    id: 'bq_02',
    question: 'Describe a situation where you had a strong technical disagreement with a colleague or lead. How did you resolve it?',
    competency: 'Technical Disagreement' as const,
    description: 'Evaluates humility, data-driven persuasion, professional debate, and "disagree and commit".',
    whatToLookFor: [
      'Focus on objective data/metrics rather than ego.',
      'Active listening and acknowledging the other perspective.',
      'Commitment to the final decision once made.',
    ],
    starExample: {
      situation: 'In our capstone project, my teammate advocated for MongoDB while I proposed PostgreSQL with JSONB columns for our user telemetry store.',
      task: 'We needed to finalize the database schema without stalling the frontend development timeline.',
      action: 'Instead of debating hypotheticals, I created a benchmarking script running 500 concurrent relational JOINs and JSON writes. I scheduled a 20-minute sync, presented the EXPLAIN query plans, and demonstrated that PostgreSQL allowed strict relational constraints on auth while preserving schemaless flexibility via JSONB.',
      result: 'My teammate agreed with the benchmark findings. We implemented PostgreSQL, preventing data integrity issues later during complex user queries.',
    },
    redFlags: [
      'Personalizing disagreements or speaking negatively about peers.',
      'Passive-aggressive compliance without genuine commitment.',
      'Giving in immediately without defending sound engineering principles.',
    ],
  },
  {
    id: 'bq_03',
    question: 'Tell me about a time an outage, critical bug, or project failure occurred under your watch. What did you learn?',
    competency: 'Handling Failure & Feedback' as const,
    description: 'Measures accountability, psychological safety, blameless post-mortem execution, and preventative engineering.',
    whatToLookFor: [
      'Full ownership without scapegoating tools or colleagues.',
      'Rapid incident triage and customer-first focus.',
      'Long-term preventative safeguards (unit tests, alarms, CI guards).',
    ],
    starExample: {
      situation: 'During a Friday deployment of our FastAPI backend, a missing database migration script caused 500 Internal Server Errors on the merchant dashboard.',
      task: 'I had authored the pull request and needed to immediately restore service and diagnose why CI did not catch the issue.',
      action: 'I immediately triggered a rollback to the previous container digest within 3 minutes, restored traffic, and then authored a blameless post-mortem. I added an automated alembic check in GitHub Actions to block any PR whose migrations did not execute in staging.',
      result: 'Downtime was limited to under 4 minutes with zero data corruption. The CI migration guard remains in place and has caught 3 subsequent schema issues.',
    },
    redFlags: [
      'Denying personal responsibility or blaming "bad requirements".',
      'Failing to implement concrete preventative automation.',
      'Hiding mistakes until caught by management.',
    ],
  },
  {
    id: 'bq_04',
    question: 'Describe a time when you faced an aggressive deadline with conflicting stakeholder priorities.',
    competency: 'Delivering Under Pressure' as const,
    description: 'Examines scoping ruthlessness, transparent communication, prioritization, and MVP execution.',
    whatToLookFor: [
      'Negotiating scope rather than sacrificing code quality/testing.',
      'Frequent, transparent status updates to stakeholders.',
      'Delivering incremental value on time.',
    ],
    starExample: {
      situation: 'Our hackathon team had 36 hours to build DevPulse with full GitHub analytics and JWT auth, but third-party API rate limits threatened to block our presentation.',
      task: 'Deliver a working, demonstrable MVP without crashing during live judging.',
      action: 'I negotiated with the team to de-scope real-time webhooks for the initial demo. I implemented an in-memory cache with fallback mock fixtures for rate-limited endpoints, ensuring the judging UI remained responsive.',
      result: 'We successfully presented a flawless demo to 200+ attendees and won 1st Place in the department hackathon.',
    },
    redFlags: [
      'Overpromising and silently failing at the deadline.',
      'Cutting security or stability corners without disclosure.',
    ],
  },
];

export const initialWhiteboardProblems = [
  {
    id: 'wb_01',
    title: 'Design a Distributed Rate Limiter for an API Gateway',
    targetRole: 'Backend / Systems Engineer (e.g. Stripe, Datadog)',
    difficulty: 'Advanced' as const,
    scenario: 'Design a scalable rate limiting service handling 100,000 requests/sec across globally distributed API clients. Must support per-user tiers, sliding window algorithms, and sub-5ms latency.',
    functionalReqs: [
      'Limit API requests based on IP, API Key, or User ID (e.g. 100 requests per minute).',
      'Return HTTP 429 Too Many Requests with Retry-After headers when exceeded.',
      'Support dynamic configuration updates per customer tier without service restarts.',
    ],
    nonFunctionalReqs: [
      'Sub-5ms evaluation latency (low overhead on API traffic).',
      'High availability (rate limiter failure must fail-open to avoid taking down APIs).',
      'Accurate distributed counting across multi-region server clusters.',
    ],
    defaultCapacity: '100,000 QPS peak, 50,000,000 daily active users, 1KB per user rate state in memory.',
    keyComponents: [
      'Client Applications (Web / Mobile)',
      'Global DNS / CDN / Cloudflare',
      'API Gateway (Kong / Envoy)',
      'Distributed Cache (Redis Cluster with Redis Sentinel)',
      'Rate Limiter Worker Service (Go / Python)',
      'Configuration Store (PostgreSQL / DynamoDB)',
      'Telemetry & Kafka Metrics Pipeline',
    ],
    sampleArchitectureNotes: `1. Algorithm: Sliding Window Counter combining fixed time buckets with fractional weighting, or Token Bucket implemented via Redis Lua scripts to ensure atomicity.
2. Caching: Redis Cluster with local in-memory LRU cache on API Gateway to cache frequent customer rate tiers.
3. Resilience: If Redis cluster encounters network partition, fail-open with local degraded bucket limits to ensure payment transactions are not blocked.
4. Scale: Memory footprint: 50M users * 100 bytes = ~5GB RAM, easily accommodated in a 3-node Redis cluster with read replicas.`,
  },
  {
    id: 'wb_02',
    title: 'Design a High-Throughput URL Shortener (Bitly)',
    targetRole: 'Full Stack & Backend Engineer (e.g. Airbnb, Shopify)',
    difficulty: 'Intermediate' as const,
    scenario: 'Design a URL shortening service that generates 7-character short codes, redirects traffic with sub-10ms latency, and stores billions of URLs.',
    functionalReqs: [
      'Generate a unique short URL from a long URL (e.g. bit.ly/3xY7z9).',
      'Redirect short URL to original long destination (HTTP 301 or 302).',
      'Custom alias support and click analytics tracking.',
    ],
    nonFunctionalReqs: [
      'Heavy read-to-write ratio (100:1 read vs write).',
      'Sub-10ms redirect latency worldwide.',
      '99.999% availability and permanent URL durability.',
    ],
    defaultCapacity: 'Read QPS: 10,000. Write QPS: 100. Total URLs stored: 5 Billion over 5 years (~2.5TB storage).',
    keyComponents: [
      'Clients (Browser / API)',
      'Global Anycast DNS & CDN',
      'Load Balancer (Nginx / ALB)',
      'Shortener Web Service (FastAPI / Node)',
      'Distributed Unique ID Generator (Snowflake / Base62 Zookeeper Range)',
      'In-Memory Cache (Redis 80-20 rule)',
      'Distributed NoSQL / Relational DB (PostgreSQL Partitioned / Cassandra)',
    ],
    sampleArchitectureNotes: `1. ID Generation: Base62 encoding (a-z, A-Z, 0-9) yielding 62^7 = 3.5 Trillion unique combinations. Use a centralized range allocation service (Zookeeper) allocating batches of 100k IDs to workers to prevent collisions without cross-node locking.
2. HTTP 301 vs 302: Use HTTP 302 (Found) if click analytics are required per request, or 301 (Permanent) to maximize client browser caching.
3. Storage: Key-Value / NoSQL schema with short_hash as partition key. 80-20 rule cached in Redis Cluster.`,
  },
  {
    id: 'wb_03',
    title: 'Design an Event-Driven Multi-Channel Notification Service',
    targetRole: 'Systems & Cloud Engineer (e.g. Anthropic, Datadog)',
    difficulty: 'Advanced' as const,
    scenario: 'Architect a notification platform capable of dispatching billions of push notifications, emails, and SMS alerts daily with deduplication and user preference filtering.',
    functionalReqs: [
      'Support multi-channel dispatch: Push (APNS/FCM), Email (SendGrid/SES), SMS (Twilio).',
      'User preference management and rate-limiting (e.g. Do Not Disturb hours).',
      'Real-time delivery status tracking and automated retry on transient failures.',
    ],
    nonFunctionalReqs: [
      'Strict deduplication (prevent duplicate notifications on network retry).',
      'High throughput: 50,000 events/sec peak dispatch capability.',
      'Prioritization: Security 2FA codes delivered within 2 seconds; marketing digests batched.',
    ],
    defaultCapacity: 'Peak dispatch: 50,000 notifications/sec. 500M daily notifications.',
    keyComponents: [
      'Internal Upstream Services (Orders, Security, Social)',
      'API Gateway / Ingestion API',
      'Message Broker / Event Log (Apache Kafka / AWS SQS FIFO)',
      'Priority Dispatch Workers (High, Normal, Low priority pools)',
      'User Preference Cache (Redis)',
      'Third-Party Provider Bridges (Twilio, SendGrid, APNS)',
      'Dead Letter Queue (DLQ) & Observability',
    ],
    sampleArchitectureNotes: `1. Partitioning: Kafka topics partitioned by User ID to ensure ordered delivery for a given user.
2. Idempotency: Redis SETNX key with 24-hour TTL containing hash(userId + eventType + payloadId) to guarantee exactly-once receipt.
3. Priority Queues: Separate consumer worker pools for Urgent (2FA/Auth) vs Bulk (Marketing) to prevent queue starvation.`,
  },
];
