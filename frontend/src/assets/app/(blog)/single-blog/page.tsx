import dynamic from "next/dynamic";

export const metadata = {
  title: "Blog Details - Luminix - IT Solution & Technology Next JS Template",
  description: "A simple Next.js app using the App Router",
};

const SingleBlog = dynamic(() => import("@/components/SingleBlog"), {
  loading: () => <p>Loading blog details...</p>,
  ssr: true,
});

export default function Index() {
  // return <SingleBlog />;
}
