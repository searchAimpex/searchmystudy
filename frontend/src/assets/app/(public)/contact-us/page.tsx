import dynamic from "next/dynamic";

export const metadata = {
  title: "Contact us - Luminix - IT Solution & Technology Next JS Template",
  description: "A simple Next.js app using the App Router",
};
 
const Contactus = dynamic(() => import('@/components/ContactUs'), {
  loading: () => <p>Loading contact page...</p>,
  ssr: true,  
});

export default function Index() {
  return <Contactus />;
}
