import { NextPage } from "next";
import Head from "next/head";
import { FiExternalLink, FiHeart, FiMessageSquare, FiClock, FiTag, FiEdit2 } from 'react-icons/fi';
import { useEffect, useState } from 'react';

interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string;
  tag_list: string[];
  readable_publish_date: string;
  reading_time_minutes: number;
  positive_reactions_count: number;
  comments_count: number;
  user: {
    name: string;
    profile_image: string;
    username: string;
  };
}

const Blogs: NextPage = () => {
  const [articles, setArticles] = useState<DevToArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevToArticles = async () => {
      try {
        // Replace 'your-devto-username' with your actual Dev.to username
        const response = await fetch('https://dev.to/api/articles?username=your-devto-username');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError('Failed to load articles. Please try again later.');
        console.error('Error fetching Dev.to articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDevToArticles();
  }, []);

  // Sample featured articles (replace with your actual featured content)
  const featuredArticles = [
    {
      id: 1,
      title: 'Getting Started with React and TypeScript',
      excerpt: 'Learn how to set up a new React project with TypeScript and best practices for type safety.',
      readTime: '5 min read',
      tags: ['React', 'TypeScript', 'Frontend'],
      date: 'August 15, 2023',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      externalLink: '#'
    },
    // Add more featured articles as needed
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>Blog | Arman Khan</title>
        <meta name="description" content="Insights, tutorials, and thoughts on technology and development" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Blog | Arman Khan" />
        <meta property="og:description" content="Insights, tutorials, and thoughts on technology and development" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.armankhan.com/blog" />
        <meta property="og:image" content="/og-image.jpg" />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
            Latest Articles
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            My Tech Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Sharing my journey, insights, and knowledge about web development, programming, and technology.
          </p>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <span className="w-2 h-8 bg-indigo-600 rounded-full mr-3"></span>
              Featured Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <div key={article.id} className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium">{article.date}</span>
                        <span className="text-gray-300">•</span>
                        <span className="flex items-center text-sm">
                          <FiClock className="mr-1 w-4 h-4" />
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{article.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, i) => (
                          <span key={i} className="px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{article.excerpt}</p>
                    <a 
                      href={article.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors"
                    >
                      Read full article
                      <FiExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Dev.to Articles */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <span className="w-2 h-8 bg-indigo-600 rounded-full mr-3"></span>
              Latest from Dev.to
            </h2>
            <a 
              href="https://dev.to/your-devto-username" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
            >
              View all on Dev.to
              <FiExternalLink className="ml-1 w-4 h-4" />
            </a>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
                    <div className="flex space-x-2">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <article key={article.id} className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-shadow duration-300">
                    {article.cover_image && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={article.cover_image} 
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span className="flex items-center">
                          <FiClock className="mr-1 w-4 h-4" />
                          {article.reading_time_minutes} min read
                        </span>
                        <span className="mx-2">•</span>
                        <span>{article.readable_publish_date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        <a 
                          href={article.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          {article.title}
                        </a>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {article.description.replace(/<[^>]*>?/gm, '')}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tag_list.slice(0, 3).map((tag, i) => (
                          <span 
                            key={i} 
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                          >
                            <FiTag className="mr-1 w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center">
                          <a 
                            href={`https://dev.to/${article.user.username}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <img 
                              src={article.user.profile_image || 'https://via.placeholder.com/40'} 
                              alt={article.user.name} 
                              className="w-8 h-8 rounded-full mr-2"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {article.user.name}
                            </span>
                          </a>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <FiHeart className="mr-1 w-4 h-4" />
                            {article.positive_reactions_count}
                          </span>
                          <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <FiMessageSquare className="mr-1 w-4 h-4" />
                            {article.comments_count}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
                    <FiEdit2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No articles found</h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    It looks like there are no articles published on Dev.to yet.
                  </p>
                  <a 
                    href="https://dev.to/new" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FiEdit2 className="mr-2 w-4 h-4" />
                    Write your first article
                  </a>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Newsletter CTA */}
        <section className="mt-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Subscribe to my newsletter to get notified when I publish new articles and share valuable content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
              />
              <button className="px-6 py-3 bg-white text-indigo-700 font-medium rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blogs;
