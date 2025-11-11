import dynamic from "next/dynamic";

export const metadata = {
  title: "Portfolio Details - Luminix - IT Solution & Technology Next JS Template",
  description: "A simple Next.js app using the App Router",
};

const SinglePortfolio = dynamic(() => import("@/components/SinglePortfolio"), {
  loading: () => <p>Loading portfolio details...</p>,
  ssr: true,
});

export default function Index() {
  return <SinglePortfolio />;
}
