import Link from 'next/link';
import Image from 'next/image';

// In a real application, these would come from a database
const blogPosts = [
  {
    id: '1',
    title: 'Top 10 Cyber Security Threats in 2023',
    excerpt: 'Explore the most critical cyber security threats organizations are facing this year and how to defend against them.',
    date: 'August 15, 2023',
    author: 'John Smith',
    authorRole: 'Chief Security Officer',
    slug: 'top-10-cyber-security-threats-2023',
    image: '/images/blog-1.jpg',
    category: 'Security Threats'
  },
  {
    id: '2',
    title: 'How to Implement Zero Trust Architecture',
    excerpt: 'A comprehensive guide to implementing Zero Trust Architecture in your organization to improve security posture.',
    date: 'July 22, 2023',
    author: 'Sarah Johnson',
    authorRole: 'Security Consultant',
    slug: 'how-to-implement-zero-trust-architecture',
    image: '/images/blog-2.jpg',
    category: 'Security Architecture'
  },
  {
    id: '3',
    title: 'The Rise of Ransomware-as-a-Service',
    excerpt: 'Understanding the growing threat of Ransomware-as-a-Service (RaaS) and strategies for prevention and recovery.',
    date: 'June 10, 2023',
    author: 'Michael Chen',
    authorRole: 'Threat Intelligence Analyst',
    slug: 'the-rise-of-ransomware-as-a-service',
    image: '/images/blog-3.jpg',
    category: 'Ransomware'
  },
  {
    id: '4',
    title: 'Security Considerations for Remote Work',
    excerpt: 'Best practices and essential security considerations for organizations with remote or hybrid workforces.',
    date: 'May 18, 2023',
    author: 'Lisa Wong',
    authorRole: 'CISO',
    slug: 'security-considerations-for-remote-work',
    image: '/images/blog-4.jpg',
    category: 'Remote Work'
  },
  {
    id: '5',
    title: 'Introduction to Digital Forensics',
    excerpt: 'Learn the fundamentals of digital forensics and how organizations can prepare for forensic investigations.',
    date: 'April 5, 2023',
    author: 'James Anderson',
    authorRole: 'Forensic Analyst',
    slug: 'introduction-to-digital-forensics',
    image: '/images/blog-5.jpg',
    category: 'Digital Forensics'
  },
  {
    id: '6',
    title: 'Preparing for GDPR Compliance Audits',
    excerpt: 'A step-by-step guide to preparing your organization for GDPR compliance audits and avoiding penalties.',
    date: 'March 12, 2023',
    author: 'Emma Richards',
    authorRole: 'Compliance Specialist',
    slug: 'preparing-for-gdpr-compliance-audits',
    image: '/images/blog-6.jpg',
    category: 'Compliance'
  }
];

export default function BlogPage() {
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
      
      {/* Blog Post Grid */}
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