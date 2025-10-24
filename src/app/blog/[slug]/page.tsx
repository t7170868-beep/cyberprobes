import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

interface BlogPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for the page
export async function generateMetadata({ params }: BlogPageProps) {
  const blog = await getBlogBySlug(params.slug);
  
  if (!blog) {
    return {
      title: 'Blog Not Found | Cyber Probes',
      description: 'The requested blog post could not be found.'
    };
  }
  
  return {
    title: `${blog.title} | Cyber Probes Blog`,
    description: blog.content.substring(0, 160)
  };
}

// Get a single blog post by slug, only if it's published
async function getBlogBySlug(slug: string) {
  try {
    // We need to use findFirst to filter by published status
    // findUnique only works with unique fields/primary keys
    const blog = await prisma.blog.findFirst({
      where: {
        slug: slug,
        published: true
      }
    });
    
    return blog;
  } catch (error) {
    console.error('Failed to fetch blog:', error);
    return null;
  }
}

export default async function BlogPost({ params }: BlogPageProps) {
  const blog = await getBlogBySlug(params.slug);
  
  // If blog not found or not published, return 404
  if (!blog) {
    notFound();
  }
  
  // Format date for display
  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Blog Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Blog
        </Link>
        
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        
        <div className="flex items-center text-gray-600 mb-8">
          <span className="mr-4">{formattedDate}</span>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            Cyber Security
          </span>
        </div>
        
        {blog.image && (
          <div className="relative h-96 mb-12">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              priority
              style={{ objectFit: 'cover' }}
              className="rounded-xl"
            />
          </div>
        )}
      </div>
      
      {/* Blog Content */}
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg max-w-none mb-12">
          {/* Simple content rendering - you could use a markdown renderer here */}
          {blog.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
        
        {/* Author Section */}
        <div className="bg-gray-50 rounded-xl p-8 mb-12">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full mr-6"></div>
            <div>
              <h3 className="text-xl font-semibold">Cyber Probes Team</h3>
              <p className="text-gray-600">Security Experts</p>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <Link 
            href="/contact" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg"
          >
            Get in Touch for Cyber Security Solutions
          </Link>
        </div>
      </div>
    </div>
  );
} 