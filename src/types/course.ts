export interface CourseMaterial {
  id: string;
  title: string;
  type: string;
  duration?: string;
  order?: number;
  contentUrl?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  description?: string;
  order: number;
  duration?: string;
  materials?: CourseMaterial[];
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
  thumbnail?: string;
  image?: string;
  duration?: string;
  instructor?: string;
  instructorBio?: string;
  instructorPhoto?: string;
  whatYoullLearn?: string;
  prerequisites?: string;
  skillsCovered?: string;
  certification?: string;
  createdAt?: string;
  categorySlug?: string;
  levelSlug?: string;
  materials?: CourseMaterial[];
  modules?: CourseModule[];
}


