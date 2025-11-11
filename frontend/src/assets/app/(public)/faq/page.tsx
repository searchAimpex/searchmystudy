import dynamic from "next/dynamic";

export const metadata = {
  title: "Faq - Luminix - IT Solution & Technology Next JS Template",
  description: "A simple Next.js app using the App Router",
};

const Faq = dynamic(() => import("@/components/faq"), {
  loading: () => <p>Loading FAQ...</p>,
  ssr: true,  
});

export default function Index() {
  return <Faq />;
}
