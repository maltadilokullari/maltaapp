'use client';

import Badge from '../ui/Badge';
import { BlogPost } from '@/lib/blog/mockPosts';

interface PostMetaProps {
  post: BlogPost;
  showDate?: boolean;
  compact?: boolean;
}

export default function PostMeta({ post, showDate = true, compact = false }: PostMetaProps) {
  // Otomatik güncel tarih
  const currentDate = new Date().toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const currentDateISO = new Date().toISOString().split('T')[0];

  return (
    <div className={`flex items-center gap-3 ${compact ? 'text-xs' : 'text-sm'}`}>
      <Badge variant="primary">{post.category}</Badge>
      {showDate && (
        <>
          <span className="text-slate-400">•</span>
          <time dateTime={currentDateISO} className="text-slate-500">
            {currentDate}
          </time>
        </>
      )}
      <span className="text-slate-400">•</span>
      <span className="text-slate-500">{post.readingTime} dakika okuma</span>
    </div>
  );
}
