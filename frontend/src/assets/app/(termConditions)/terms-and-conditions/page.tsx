import dynamic from "next/dynamic";

export const metadata = {
  title: "Terms and Conditions - Smilessence",
  description: "A simple Next.js app using the App Router",
};

const TermCondition = dynamic(() => import("@/components/TermCondition/index"), {
  loading: () => <p>Loading Terms and Conditions...</p>,
  ssr: true,  
});

export default function Index() {
  return <TermCondition />;
}
