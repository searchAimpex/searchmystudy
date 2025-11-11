import dynamic from "next/dynamic";

export const metadata = {
  title: "Blog - Luminix - IT Solution & Technology Next JS Template",
  description: "A simple Next.js app using the App Router",
};

const Achievements = dynamic(() => import("@/components/achievements/index"), {
  loading: () => <p>Loading blog...</p>,
  ssr: true,  
});

export default function Index() {
  return <Achievements />;
}
