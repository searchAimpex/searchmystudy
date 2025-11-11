import dynamic from "next/dynamic";

export const metadata = {
  title: "Portfolio - Luminix - IT Solution & Technology Next JS Template",
  description: "A simple Next.js app using the App Router",
};

const Portfolio = dynamic(() => import("@/components/portfolio"), {
  loading: () => <p>Loading Portfolio...</p>,
  ssr: true,
});

export default function Index() {
  return <Portfolio />;
}
