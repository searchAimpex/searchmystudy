// app/blogs/page.tsx
import Breadcrumb from "@/common/Breadcrumb";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Wrapper from "@/layouts/Wrapper";
import Link from "next/link";

export const metadata = {
  title: "Blogs",
  description: "Read the latest articles",
};

// ✅ Next.js 15 requires viewport separately
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

async function getBlogs() {
  const res = await fetch("https://cmsone.nmpinfotech.com/api/blogs?populate=*", {
    next: { revalidate: 0 }, // request-time fetch (no caching)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (

    <Wrapper>
      <HeaderOne />
      <Breadcrumb title="Blog" subtitle="Blog" bg_img="blog-breadcrumb-bg" />
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Latest Blogs</h1>

        <div className="grid gap-6">
          {blogs?.data?.map((blog: any) => (
            <div
              key={blog.id}
              style={{
                position: "relative",
                width: "300px",
                height: "250px",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                margin: "10px",
                cursor: "pointer",
              }}
            >
              {/* Blog Image */}
              {blog.blog_header_image?.url && (
                <img
                  src={`https://cmsone.nmpinfotech.com/${blog.blog_header_image.url}`}
                  alt={blog.blog_title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}

              {/* Overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  width: "100%",
                  padding: "10px",
                  background: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                }}
              >
                <h2 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 4px 0" }}>
                  <Link href={`/blogs/${blog.slug}`} style={{ color: "white", textDecoration: "none" }}>
                    {blog.blog_title}
                  </Link>
                </h2>
                <p style={{ fontSize: "12px", margin: "0" }}>
                  Published on {new Date(blog.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

          ))}
        </div>
      </div>
      <FooterOne />
    </Wrapper>

  );
}
