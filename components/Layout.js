import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/dist/client/router";
export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();

  return (
    <div
      className={`flex flex-col ${
        !router.pathname.includes("/posts") ? "h-screen" : ""
      }`}
    >
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      {router.pathname !== "/404" && <Navbar />}
      <div
        className={`${!router.pathname.includes("/posts") ? "flex-grow" : ""}`}
      >
        {children}
      </div>
      {!router.pathname.includes("/posts/page") &&
        router.pathname !== "/posts" &&
        router.pathname !== "/" &&
        router.pathname !== "/404" && <Footer />}
    </div>
  );
}

Layout.defaultProps = {
  title: "AharaKitchen | An Awesome Blog",
  description: "I like to write about a lot of interesting things",
  keywords: `blog, cooking, food`,
};
