
import dynamic from "next/dynamic";

export const metadata = {
  title: "Blog - Luminix - IT Solution & Technology Next JS Template",
  description: "A simple Next.js app using the App Router",
};

const Awards = dynamic(() => import("@/components/Awards/index"), {
  loading: () => <p>Loading blog...</p>,
  ssr: true,  
});

export default function Index() {
  return <Awards />;
}
