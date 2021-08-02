import Search from "@/components/Search";
import { API_URL } from "../config";

export default function search({ posts, categories }) {
  return <Search posts={posts} categories={categories} />;
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/articles`);
  const posts = await res.json();
  const cat = await fetch(`${API_URL}/categories`);
  const categories = await cat.json();

  return {
    props: {
      posts,
      categories,
    },
    revalidate: 330,
  };
}
