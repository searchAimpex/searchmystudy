import dynamic from "next/dynamic";
import Blogs from "./[id]/page";
// import Blog from "@/components/blog";

export const metadata = {
  title: "Blog - Luminix - IT Solution & Technology Next JS Template",
  description: "A simple Next.js app using the App Router",
};

const Blog = dynamic(() => import("@/components/blog"), {
  loading: () => <p>Loading blog...</p>,
  ssr: true,  
});

export default function Index() {
  return <Blog />;
}
