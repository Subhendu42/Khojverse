
import { IdeaItem, Popularity } from './types';

export const MOCK_IDEAS: IdeaItem[] = [
  {
    id: '1',
    title: 'AI-Driven Personalized Healthcare',
    category: 'Research',
    description: 'Utilizing neural networks to predict personalized health outcomes based on genomic data.',
    popularity: Popularity.High,
    views: 15400,
    tags: ['AI', 'Health', 'Genomics'],
    domain: 'Bio-Informatics',
    abstract: 'This research explores how deep learning can transition medicine from reactive to proactive by analyzing complex patterns in human DNA.',
    author: 'Dr. Sarah Chen'
  },
  {
    id: '2',
    title: 'ClimateTech Global Hackathon',
    category: 'Hackathons',
    description: 'Build solutions for a sustainable future. Focus on carbon sequestration and renewable energy grids.',
    popularity: Popularity.High,
    views: 12890,
    tags: ['Climate', 'Sustainability', 'GreenTech'],
    theme: 'Eco-Innovation',
    organizer: 'GreenEarth Alliance',
    deadline: 'Oct 15, 2024'
  },
  {
    id: '3',
    title: 'Decentralized Identity Protocol',
    category: 'Projects',
    description: 'A blockchain project focusing on user-owned identity without central authorities.',
    popularity: Popularity.Medium,
    views: 4560,
    tags: ['Web3', 'Privacy', 'Identity'],
    difficulty: 'Advanced'
  },
  {
    id: '4',
    title: 'Mars Colonization Habitat Design',
    category: 'Trending',
    description: 'The latest concepts for sustainable life support systems on the red planet.',
    popularity: Popularity.High,
    views: 22100,
    tags: ['Space', 'Architecture', 'Mars'],
    date: 'Sep 1, 2024'
  },
  {
    id: '5',
    title: 'Empowering Women in STEM',
    category: 'Hackathons',
    description: 'Celebrating diversity in tech. Building apps for career growth and mentorship.',
    popularity: Popularity.Medium,
    views: 8900,
    tags: ['Social Good', 'Equality'],
    theme: 'Gender Equality in Tech',
    organizer: 'Future Leaders Org',
    deadline: 'Nov 20, 2024'
  },
  {
    id: '6',
    title: 'Smart Waste Management System',
    category: 'Projects',
    description: 'An IoT project that optimizes garbage collection routes in urban areas.',
    popularity: Popularity.Low,
    views: 340,
    tags: ['IoT', 'Smart City'],
    difficulty: 'Intermediate'
  },
  {
    id: '7',
    title: 'Quantum Computing for Optimization',
    category: 'Research',
    description: 'A study on using quantum algorithms to solve complex logistical problems.',
    popularity: Popularity.Medium,
    views: 2980,
    tags: ['Quantum', 'Algorithms'],
    domain: 'Physics/CS',
    abstract: 'Quantum supremacy is near. This paper identifies key logistical sectors that will benefit from Shor\'s and Grover\'s algorithms.',
    author: 'Prof. Julian Frost'
  },
  {
    id: '8',
    title: 'Minimalist Portfolio Template',
    category: 'Projects',
    description: 'A high-performance React template for creative developers.',
    popularity: Popularity.High,
    views: 18700,
    tags: ['Frontend', 'React', 'Design'],
    difficulty: 'Beginner'
  },
  {
    id: '9',
    title: 'Neuro-Enhancement via Wearables',
    category: 'Trending',
    description: 'How non-invasive brain-computer interfaces are boosting productivity.',
    popularity: Popularity.Medium,
    views: 6540,
    tags: ['BCI', 'Productivity'],
    date: 'Aug 25, 2024'
  },
  {
    id: '10',
    title: 'The Future of Remote Collaboration',
    category: 'Articles',
    description: 'An exploration into VR offices and holographic meetings.',
    popularity: Popularity.Medium,
    views: 12430,
    tags: ['Remote Work', 'VR'],
    author: 'Alex Rivera'
  }
];

export const SEARCH_SUGGESTIONS = [
  "Mars Colonization",
  "Quantum Computing",
  "Climate Change Solutions",
  "Web3 Identity",
  "Neural Networks in Medicine",
  "Sustainable Cities",
  "Women in Tech Hackathons"
];
