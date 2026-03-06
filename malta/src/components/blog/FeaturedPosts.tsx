import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog/mockPosts';
import PostMeta from './PostMeta';

interface FeaturedPostsProps {
  posts: BlogPost[];
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) return null;

  const [mainPost, ...sidePosts] = posts.slice(0, 3);

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Main Featured Post */}
          <Link
            href={`/blog/${mainPost.slug}`}
            className="md:col-span-2 lg:col-span-2 group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer"
          >
            <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
              <Image
                src={mainPost.coverImage}
                alt={mainPost.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
            </div>
            <div className="p-6 md:p-8">
              <div className="mb-4">
                <PostMeta post={mainPost} />
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                {mainPost.title}
              </h2>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed line-clamp-3">
                {mainPost.excerpt}
              </p>
            </div>
          </Link>

          {/* Side Featured Posts */}
          <div className="flex flex-col gap-6">
            {sidePosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer"
              >
                <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <div className="mb-3">
                    <PostMeta post={post} compact />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
