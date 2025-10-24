import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Cybersecurity Blog - Latest Insights & Articles | CyberProbes",
  description: "Stay updated with the latest cybersecurity insights, digital forensics articles, threat analysis, and security best practices from CyberProbes experts.",
  keywords: "cybersecurity blog, digital forensics articles, security insights, threat analysis, cyber security news, incident response guides",
  openGraph: {
    title: "Cybersecurity Blog - Latest Insights & Articles | CyberProbes",
    description: "Stay updated with the latest cybersecurity insights, digital forensics articles, threat analysis, and security best practices from CyberProbes experts.",
    url: '/blog',
    type: 'website',
    images: [{
      url: '/images/blog-1.jpg',
      width: 1200,
      height: 630,
      alt: 'CyberProbes Cybersecurity Blog',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cybersecurity Blog - Latest Insights & Articles | CyberProbes",
    description: "Stay updated with the latest cybersecurity insights, digital forensics articles, threat analysis, and security best practices from CyberProbes experts.",
    images: ['/images/blog-1.jpg'],
  },
  alternates: {
    canonical: '/blog',
  },
};

// Get only published blog posts from database

async function getPublishedBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        published: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return blogs.map(blog => ({
      id: blog.id,
      title: blog.title,
      excerpt: blog.content.substring(0, 150) + '...',
      content: blog.content,
      date: new Date(blog.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      slug: blog.slug,
      image: blog.image || '/images/blog-placeholder.jpg',
      category: 'Cyber Security', // Default category if not available in model
      author: 'Cyber Probes Team', // Default author if not available in model
      authorRole: 'Security Experts' // Default role if not available in model
    }));
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return [];
  }
}

export default async function BlogPage() {
  const blogPosts = await getPublishedBlogs();
  
  if (blogPosts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Cyber Security Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Latest insights, articles, and resources on cyber security and digital forensics.
          </p>
        </div>
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-700">No blog posts available yet.</h2>
          <p className="mt-4 text-gray-600">Check back soon for new articles and insights.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Cyber Security Blog</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Latest insights, articles, and resources on cyber security and digital forensics.
        </p>
      </div>
      
      {/* Featured Post */}
      {blogPosts.length > 0 && (
        <div className="mb-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <Image
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {blogPosts[0].category}
                  </span>
                  <span className="text-gray-500 text-sm ml-4">{blogPosts[0].date}</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  <Link href={`/blog/${blogPosts[0].slug}`} className="hover:text-blue-600 transition">
                    {blogPosts[0].title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <p className="font-medium">{blogPosts[0].author}</p>
                    <p className="text-gray-500 text-sm">{blogPosts[0].authorRole}</p>
                  </div>
                </div>
                <Link 
                  href={`/blog/${blogPosts[0].slug}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Blog Post Grid */}
      {blogPosts.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.slice(1).map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-xs ml-3">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">{post.author}</span>
                  </div>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Subscribe Section */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white rounded-lg p-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Subscribe to Our Newsletter</h2>
          <p className="text-gray-200 mb-6">
            Stay updated with the latest cyber security news, articles, and resources.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-lg focus:outline-none text-gray-900"
              required
            />
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg"
            >
              Subscribe
            </button>
          </form>
          <p className="text-gray-300 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
} 