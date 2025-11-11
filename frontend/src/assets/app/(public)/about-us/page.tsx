import dynamic from "next/dynamic";

export const metadata = {
  title: "About us - Luminix - IT Solution & Technology Next JS Template",
  description: "A simple Next.js app using the App Router",
};
 
const Aboutus = dynamic(() => import('@/components/AboutUs'), {
  loading: () => <p>Loading About Us...</p>,
  ssr: true,  
});

export default function Page() {
  return <Aboutus />;
}
