// app/blogs/[slug]/page.tsx
import Breadcrumb from "@/common/Breadcrumb";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Wrapper from "@/layouts/Wrapper";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface BlogPageProps {
  params: { slug: string };
}

async function getBlog(slug: string) {
  const res = await fetch(
    `https://cmsone.nmpinfotech.com/api/blogs?filters[slug][$eq]=${slug}&populate=*`,
    {
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  const data = await res.json();
  return data?.data?.[0]; // get first blog
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getBlog(params.slug);

  if (!blog) return notFound();

  return (
    <Wrapper>
      <HeaderOne/>
      <Breadcrumb title={blog.blog_title} subtitle="Blog " bg_img="blog-breadcrumb-bg" />
   <article className="container my-5" style={{ maxWidth: "900px" }}>
  {/* Blog Title */}
  <h1 className="fw-bold mb-4" style={{ fontSize: "2.5rem", lineHeight: "1.3" }}>
    {blog.blog_title}
  </h1>

  {/* Blog Image */}
  {blog.blog_header_image?.url && (
    <div className="mb-4">
      <img
        src={`https://cmsone.nmpinfotech.com/${blog.blog_header_image.url}`}
        alt={blog.blog_title}
        className="img-fluid rounded shadow-sm"
        style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
      />
    </div>
  )}

  {/* Meta Info */}
  <div className="mb-4 text-muted" style={{ fontSize: "0.9rem" }}>
    <span className="badge bg-light text-dark px-3 py-2">
      Published on {new Date(blog.publishedAt).toLocaleDateString()}
    </span>
  </div>

  {/* Blog Content */}
  <div
    className="fs-5 lh-lg"
    style={{ color: "#333", fontFamily: "Georgia, serif" }}
  >
    {blog.blog_content ? (
      <ReactMarkdown>{blog.blog_content}</ReactMarkdown>
    ) : (
      <p className="fst-italic text-muted">No content available.</p>
    )}
  </div>
</article>

    <FooterOne/>
    </Wrapper>
  );
}
