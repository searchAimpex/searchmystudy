// import BlogSingle from "@";
import service_data from "@/data/service-data";
import dynamic from "next/dynamic";
import { FC } from "react";

export const metadata = {
  title: "Service - Luminix - IT Solution & Technology Next JS Template",
  description: "A simple Next.js app using the App Router",
};



const SingleBlog = dynamic(() => import("@/components/SingleService"), {
  loading: () => <p>Loading Service...</p>,
  ssr: true,
});
const Index: FC = () => {
  return <SingleBlog  />;
};

export default Index;
