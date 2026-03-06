import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog/mockPosts';
import PostMeta from './PostMeta';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        {/* Cover Image */}
        <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meta */}
          <div className="mb-3">
            <PostMeta post={post} />
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* CTA */}
          <div className="flex items-center text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
            <span>Devamını Oku</span>
            <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
