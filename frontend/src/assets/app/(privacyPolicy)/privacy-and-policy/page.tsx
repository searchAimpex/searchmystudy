import dynamic from "next/dynamic";

export const metadata = {
  title: "Privacy Policy - Smilessence",
  description: "A simple Next.js app using the App Router",
};

const PrivacyPolicy = dynamic(() => import("@/components/PrivacyPolicy/index"), {
  loading: () => <p>Loading Privacy Policy...</p>,
  ssr: true,  
});

export default function Index() {
  return <PrivacyPolicy />;
}
