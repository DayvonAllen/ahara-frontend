import { API_URL } from "@/config/index";
import { useEffect, useState } from "react";
import PostDetails from "@/components/PostDetails";
import Layout from "@/components/Layout";
// import LazyLoad from "react-lazyload";

export default function CategoryResults({ foundPosts }) {
  return (
    <Layout>
      <div
        className={`relative ${
          foundPosts?.length > 0 ? "bg-gray-50" : "bg-white"
        } pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8`}
      >
        <div className="absolute inset-none">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {foundPosts?.length > 0 &&
              foundPosts.map((post) => <PostDetails post={post} />)}
            {foundPosts?.length === 0 && <p>No Result Found</p>}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/articles`);
  const posts = await res.json();

  const paths = [];
  for (let i = 0; i < posts?.length; i++) {
    paths.push({
      params: { category: posts[i]?.category?.slug },
    });
  }
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${API_URL}/articles`);
  const posts = await res.json();

  const foundPosts = posts?.filter(
    (post) =>
      post?.category?.slug.toLowerCase() === params?.category.toLowerCase()
  );

  return {
    props: {
      foundPosts,
    },
    revalidate: 1,
  };
}