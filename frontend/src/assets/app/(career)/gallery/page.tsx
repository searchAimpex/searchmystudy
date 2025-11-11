import dynamic from "next/dynamic";

export const metadata = {
  title: "Career - Luminix - IT Solution & Technology Next JS Template",
  description: "A simple Next.js app using the App Router",
};

const Career = dynamic(() => import("@/components/gallery"), {
  loading: () => <p>Loading career page...</p>,
  ssr: true,  
});

export default function Index() {
  return <Career />;
}