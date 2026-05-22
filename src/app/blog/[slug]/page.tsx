import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Divider } from "@/components/ui";
import { BLOG_POSTS, getPost } from "@/lib/blog";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url: `${SITE.url}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
  };

  return (
    <>
      <article className="px-[5%] py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-8 inline-block text-[12px] uppercase tracking-[0.2em] text-text-muted transition-colors hover:text-gold"
          >
            ← All Posts
          </Link>

          <div className="mb-6 text-[11px] uppercase tracking-[0.25em] text-gold">
            {post.category}
          </div>
          <h1 className="mb-6 text-[clamp(1.6rem,6vw,3rem)] leading-[1.2]">
            {post.title}
          </h1>
          <div className="mb-10 text-[12px] text-text-muted sm:text-[13px]">
            By {post.author} · {post.date} · {post.readingTime}
          </div>

          <div className="mb-12 flex h-56 items-center justify-center border border-border-faint bg-purple-light text-[80px] sm:h-72 sm:text-[120px]">
            {post.emoji}
          </div>

          <div className="space-y-6 text-[15px] leading-[1.9] text-text-base/90 sm:text-[16px]">
            <p className="text-[17px] italic text-text-muted sm:text-[18px]">{post.excerpt}</p>
            {post.content.map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
          </div>
        </div>
      </article>

      <Divider />

      <section className="bg-purple-dark px-[5%] py-14 sm:py-20">
        <h2 className="mb-8 text-center text-[clamp(1.5rem,5vw,2.2rem)] sm:mb-10">
          Keep Reading
        </h2>
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2 sm:gap-6">
          {related.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="block border border-border-faint bg-purple-mid p-6 transition-colors hover:border-gold"
            >
              <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-gold">
                {p.category}
              </div>
              <div className="mb-3 font-display text-[15px] leading-[1.5]">
                {p.title}
              </div>
              <div className="text-[11px] text-text-muted">
                {p.date} · {p.readingTime}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
