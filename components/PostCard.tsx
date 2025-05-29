
import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link 
      to={`/post/${post.id}`} 
      className="block group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden transform hover:-translate-y-1"
      dir="rtl"
    >
      <div className="aspect-w-16 aspect-h-9">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-sky-700 group-hover:text-sky-600 mb-2 truncate" title={post.title}>
          {post.title}
        </h3>
        <p className="text-sm text-slate-600 mb-3 h-16 overflow-hidden text-ellipsis">
          {post.excerpt}
        </p>
        <div className="text-xs text-slate-400">
          {new Date(post.date).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
