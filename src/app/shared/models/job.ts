export interface Job {
  id: number;
  company: string;
  logo: string;
  logoBackground: string;
  position: string;
  postedAt: string;
  contract: 'Full Time' | 'Part Time';
  location: string;
  website: string;
  apply: string;
  description: string;
  requirements: JobMetadata;
  role: JobMetadata;
}

export interface JobMetadata {
  content: string;
  items: string[];
}
