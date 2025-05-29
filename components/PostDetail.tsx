
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Post } from '../types';

interface PostDetailProps {
  posts: Post[];
}

const PostDetail: React.FC<PostDetailProps> = ({ posts }) => {
  const { postId } = useParams<{ postId: string }>();
  const post = posts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="text-center py-10" dir="rtl">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">پست یافت نشد!</h2>
        <p className="text-slate-600 mb-6">متاسفانه پستی با این شناسه وجود ندارد.</p>
        <Link 
          to="/" 
          className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-xl" dir="rtl">
      <h1 className="text-3xl sm:text-4xl font-bold text-sky-700 mb-4 text-center">
        {post.title}
      </h1>
      <div className="text-sm text-slate-500 mb-6 text-center">
        منتشر شده در: {new Date(post.date).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
      </div>
      <img 
        src={post.imageUrl} 
        alt={post.title} 
        className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8 shadow-md" 
      />
      <div 
        className="prose prose-slate prose-lg max-w-none text-slate-700" 
        style={{ whiteSpace: 'pre-wrap', lineHeight: '1.75' }}
      >
        {post.content}
      </div>
      <div className="mt-10 pt-6 border-t border-slate-200 text-center">
        <Link 
          to="/" 
          className="inline-block px-8 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-colors shadow-sm hover:shadow-md"
        >
          بازگشت به همه پست‌ها
        </Link>
      </div>
    </article>
  );
};

export default PostDetail;
