
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { initialPosts } from './data/posts';
import { Post } from './types';
import PostCard from './components/PostCard';
import PostDetail from './components/PostDetail';
import CreatePostModal from './components/CreatePostModal';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // This effect could be used to load posts from localStorage if desired,
    // but for GitHub Pages, data/posts.ts is the source of truth.
    // For this example, we just use initialPosts.
    setPosts(initialPosts);
  }, []);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
    </svg>
  );
  
  const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 10.707V16.5A1.5 1.5 0 0 1 15.5 18H13.5A1.5 1.5 0 0 1 12 16.5V13.5A1.5 1.5 0 0 0 10.5 12h-1A1.5 1.5 0 0 0 8 13.5V16.5A1.5 1.5 0 0 1 6.5 18H4.5A1.5 1.5 0 0 1 3 16.5V10.707a1 1 0 0 1 .293-.707l7-7Z" clipRule="evenodd" />
    </svg>
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 text-slate-800 flex flex-col" dir="rtl">
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-6">
            <Link to="/" className="text-2xl md:text-3xl font-bold text-sky-600 hover:text-sky-700 transition-colors">
              وبلاگ من
            </Link>
            <div className="flex items-center space-x-3 sm:space-x-4">
               {location.pathname !== '/' && (
                 <Link
                  to="/"
                  className="p-2 rounded-full text-slate-600 hover:bg-sky-100 hover:text-sky-600 transition-colors"
                  title="صفحه اصلی"
                >
                  <HomeIcon className="w-6 h-6" />
                </Link>
               )}
              <button
                onClick={handleOpenModal}
                className="flex items-center bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out transform hover:scale-105"
                title="ایجاد پست جدید"
              >
                <PlusIcon className="w-5 h-5 ml-1 sm:ml-2" />
                <span className="text-sm sm:text-base">پست جدید</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            } 
          />
          <Route path="/post/:postId" element={<PostDetail posts={posts} />} />
        </Routes>
      </main>

      {isModalOpen && <CreatePostModal onClose={handleCloseModal} />}

      <footer className="bg-slate-800 text-slate-300 py-8 text-center mt-12">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} وبلاگ من. ایجاد شده با React و Tailwind CSS.</p>
          <p className="text-sm text-slate-400 mt-1">قدرت گرفته از خلاقیت شما!</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
