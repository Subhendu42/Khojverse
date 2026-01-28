
export type Category = 'Trending' | 'Hackathons' | 'Projects' | 'Research' | 'Articles' | 'Saved' | 'AI Lab' | 'Live Assistant';

export enum Popularity {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low'
}

export interface IdeaItem {
  id: string;
  title: string;
  category: Category;
  description: string;
  popularity: Popularity;
  views: number;
  tags: string[];
  theme?: string;
  organizer?: string;
  deadline?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  domain?: string;
  abstract?: string;
  author?: string;
  date?: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export type SortOption = 'views' | 'new' | 'trending' | 'popularity';
