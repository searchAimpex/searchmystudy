
import dynamic from "next/dynamic";

export const metadata = {
  title: "Blog - Luminix - IT Solution & Technology Next JS Template",
  description: "A simple Next.js app using the App Router",
};

const Admin = dynamic(() => import("@/components/admin/Admin"), {
  loading: () => <p>Loading blog...</p>,
  ssr: true,  
});

export default function Index() {
  return <Admin/>;
}
