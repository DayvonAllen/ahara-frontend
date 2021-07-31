import Layout from "@/components/Layout";
import { API_URL, POST_PER_PAGE } from "@/config/index";
import DOMPurify from "isomorphic-dompurify";
import marked from "marked";

export default function Post({ post }) {
  return (
    <Layout
      title="My First Post"
      description="My first blog post"
      keywords="posts, america, food"
    >
      <div className="relative py-16 bg-white overflow-hidden">
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full"></div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1>
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {post?.title}{" "}
              </span>
            </h1>
          </div>
          <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(marked(post?.content)),
              }}
            ></div>
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

  for (let i = 1; i <= posts.length; i++) {
    if (i === 101) {
      break;
    }
    paths.push({
      params: { slug: posts[i - 1]?.slug || "" },
    });
  }
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${API_URL}/articles/${params?.slug}`);
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
}
