export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  slug: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  date: string;
  techStack: string[];
  features?: string[];
  images?: {
    url: string;
    alt: string;
  }[];
  status: 'completed' | 'in-progress' | 'planned';
  highlights?: string[];
  category: 'web' | 'mobile' | 'blockchain' | 'other';
}

export interface ProjectMeta {
  title: string;
  description: string;
  slug: string;
  date: string;
  tags: string[];
  status: Project['status'];
  category: Project['category'];
}
