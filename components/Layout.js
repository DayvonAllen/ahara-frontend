import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/dist/client/router";
import { API_URL } from "../config";

export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();

  const fetchCat = async () => {
    const res = await fetch(`${API_URL}/categories`);
    const categories = await res.json();

    console.log(categories);
  };

  fetchCat();

  return (
    <div
      className={`flex flex-col ${
        !router.pathname.includes("/posts") ? "h-screen" : "h-screen"
      }`}
    >
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      {router.pathname !== "/404" && <Navbar />}
      <div
        className={`${
          !router.pathname.includes("/posts")
            ? "flex-grow"
            : "h-full flex flex-col"
        }`}
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
