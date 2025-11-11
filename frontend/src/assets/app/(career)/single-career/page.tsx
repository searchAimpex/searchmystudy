import dynamic from "next/dynamic";

export const metadata = {
  title: "Career Details - Luminix - IT Solution & Technology Next JS Template",
  description: "A simple Next.js app using the App Router",
};

const SingleCareer = dynamic(() => import("@/components/SingleCareer"), {
  loading: () => <p>Loading career details...</p>,
  ssr: true,
});

export default function Index() {
  return <SingleCareer />;
}
