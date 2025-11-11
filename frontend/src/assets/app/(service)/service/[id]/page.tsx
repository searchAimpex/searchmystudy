import service_data from "@/data/service-data";
import dynamic from "next/dynamic";
import { FC } from "react";

export const metadata = {
  title: "Service - Luminix - IT Solution & Technology Next JS Template",
  description: "A simple Next.js app using the App Router",
};



const Service = dynamic(() => import("@/components/service"), {
  loading: () => <p>Loading Service...</p>,
  ssr: true,
});


const Index: FC = () => {

  return <Service  />;
};

export default Index;
