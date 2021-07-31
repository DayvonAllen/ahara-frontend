import Search from "@/components/Search";
import { API_URL } from "../config";

export default function search({ posts }) {
  return <Search posts={posts} />;
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/articles`);
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    revalidate: 650,
  };
}
