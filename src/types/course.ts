export interface CourseMaterial {
  id: string;
  title: string;
  type: string;
  duration?: string | null;
  order?: number | null;
  contentUrl?: string | null;
}

export interface CourseModule {
  id: string;
  title: string;
  description?: string;
  order: number;
  duration?: string | null;
  materials?: CourseMaterial[] | null;
}

export interface CourseSummary {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: string;
  level: string;
  price: number;
  published: boolean;
  thumbnail?: string | null;
  image?: string | null;
  duration?: string | null;
  instructor?: string | null;
  instructorBio?: string | null;
  instructorPhoto?: string | null;
  whatYoullLearn?: string | null;
  prerequisites?: string | null;
  skillsCovered?: string | null;
  certification?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  categorySlug?: string;
  levelSlug?: string;
  materials?: CourseMaterial[];
  modules?: CourseModule[] | null;
}


