import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";

export default function Layout({
  title,
  keywords,
  description,
  children,
  categories,
}) {
  const [fetchedCategories, setCategories] = useState(categories);
  const router = useRouter();

  return (
    <div className={`flex flex-col min-h-screen h-screen"`}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      {router.pathname !== "/404" && <Navbar categories={fetchedCategories} />}
      {router.pathname !== "/categories" &&
      !router.pathname.includes("/posts/find") ? (
        <div className="flex-grow bg-gray-50 "></div>
      ) : null}
      <div
        className={`${
          router.pathname === "/categories"
            ? "flex-grow h-full flex items-center"
            : ""
        } ${router.pathname.includes("/posts/find") ? "flex-grow" : ""}`}
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
