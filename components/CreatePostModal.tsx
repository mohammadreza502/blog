
import React, { useState, useCallback } from 'react';
import { Post } from '../types';

interface CreatePostModalProps {
  onClose: () => void;
}

const slugify = (text: string): string =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z0-9-]+/g, '') // Allow Persian, English letters, numbers, and hyphen
    .replace(/--+/g, '-'); // Replace multiple - with single -


const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CopyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75c-.621 0-1.125-.504-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 4.625v2.625a2.625 2.625 0 11-5.25 0v-2.625m0 0V11.25c0-2.22-1.79-4.028-4.097-4.028S3.75 9.03 3.75 11.25v6.75m0 0h1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-1.125m9-13.5V7.875c0 .621-.504 1.125-1.125 1.125H5.625c-.621 0-1.125-.504-1.125-1.125V4.875c0-.621.504-1.125 1.125-1.125h2.073a9.006 9.006 0 011.583-.824c.09-.03.184-.058.28-.082a9.006 9.006 0 011.583.824h2.073c.621 0 1.125.504 1.125 1.125z" />
  </svg>
);


const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [generatedPost, setGeneratedPost] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newId = `${slugify(title || 'untitled')}-${Date.now()}`;
    const newPost: Post = {
      id: newId,
      title,
      excerpt,
      content,
      imageUrl: imageUrl || `https://picsum.photos/seed/${newId}/400/300`,
      date: new Date().toISOString(),
    };

    const postString = JSON.stringify(newPost, null, 2)
      .replace(/"([^"]+)":/g, '$1:') // remove quotes from keys
      .replace(/"/g, "'"); // replace double quotes with single quotes for values

    setGeneratedPost(`{\n${postString.substring(1, postString.length - 1)}\n}`);
    setCopied(false);
  }, [title, excerpt, content, imageUrl]);

  const handleCopyToClipboard = useCallback(() => {
    if (generatedPost) {
      navigator.clipboard.writeText(generatedPost).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(err => console.error('Failed to copy: ', err));
    }
  }, [generatedPost]);

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[100]" 
      onClick={onClose}
      dir="rtl"
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-slate-200">
          <h2 className="text-xl sm:text-2xl font-semibold text-sky-700">ایجاد پست جدید</h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-sky-600 transition-colors p-1 rounded-full hover:bg-slate-100"
            aria-label="بستن مودال"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto">
          {!generatedPost ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">عنوان پست</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-slate-700 mb-1">خلاصه (اکثرپت)</label>
                <textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-1">محتوای کامل پست</label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  required
                />
                 <p className="mt-1 text-xs text-slate-500">می‌توانید از تگ‌های HTML ساده برای форматирование استفاده کنید. خطوط جدید حفظ خواهند شد.</p>
              </div>
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-700 mb-1">URL تصویر (اختیاری)</label>
                <input
                  type="url"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                />
                 <p className="mt-1 text-xs text-slate-500">اگر خالی بگذارید، یک تصویر تصادفی از picsum.photos استفاده خواهد شد.</p>
              </div>
              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-colors duration-150 flex items-center justify-center"
                >
                  تولید داده پست
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-600">داده پست با موفقیت تولید شد!</h3>
              <p className="text-sm text-slate-600">
                دستورالعمل‌های زیر را برای افزودن این پست به وبلاگ خود دنبال کنید:
              </p>
              <ol className="list-decimal list-inside text-sm text-slate-600 space-y-1 bg-slate-50 p-3 rounded-md">
                <li>کد زیر را کپی کنید.</li>
                <li>فایل <code className="bg-slate-200 px-1 py-0.5 rounded text-xs">src/data/posts.ts</code> را در پروژه خود باز کنید.</li>
                <li>این کد را به عنوان یک آبجکت جدید به آرایه <code className="bg-slate-200 px-1 py-0.5 rounded text-xs">initialPosts</code> اضافه کنید.</li>
                <li>فایل را ذخیره کرده، تغییرات خود را commit کنید و سایت GitHub Pages خود را مجدداً deploy کنید.</li>
              </ol>
              <div className="relative bg-slate-800 text-slate-100 p-4 rounded-md shadow-inner">
                <pre className="text-sm whitespace-pre-wrap break-all overflow-x-auto max-h-60">
                  {generatedPost}
                </pre>
                <button
                  onClick={handleCopyToClipboard}
                  className="absolute top-2 left-2 bg-slate-600 hover:bg-slate-500 text-white p-1.5 rounded-md text-xs transition-colors"
                  title={copied ? "کپی شد!" : "کپی در کلیپ‌بورد"}
                >
                  {copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
                </button>
              </div>
              <button
                onClick={() => setGeneratedPost(null)}
                className="w-full mt-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-2 px-4 rounded-md transition-colors duration-150"
              >
                ایجاد پست دیگر
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Simple CheckIcon for copied state
const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);


export default CreatePostModal;
