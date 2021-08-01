import Layout from "@/components/Layout";
import { API_URL, POST_PER_PAGE } from "@/config/index";
import moment from "moment";
import localization from "moment/locale/ja";
import Link from "next/link";
import PostDetails from "@/components/PostDetails";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";

export default function Posts({
  posts,
  numPages,
  currentPage,
  numberOfPosts,
  max,
}) {
  moment.updateLocale("ja", localization);

  const pageCounter = new Array(numPages);
  pageCounter.fill(0);

  const pagePostCount = (currentPage - 1) * POST_PER_PAGE;

  return (
    <Layout
      title="My Post"
      description="Where the magic happens"
      keywords="food, posts, interesting stories, america"
    >
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              Latest Posts
            </h2>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {posts.map((post) => (
              <PostDetails post={post} />
            ))}
          </div>
        </div>
        <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 mt-9 md:w-1/2  mx-auto flex-grow">
          <div className="-mt-px w-0 flex-1 flex z-50">
            {currentPage - 1 >= 1 && (
              <Link href={`/posts/page/${currentPage - 1}`}>
                <a className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  <ArrowNarrowLeftIcon
                    className="mr-3 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Previous
                </a>
              </Link>
            )}
          </div>
          <div className="hidden md:-mt-px md:flex z-50">
            {pageCounter.map((page, number) => (
              <Link key={number} href={"/posts/page/" + (number + 1)}>
                <a
                  key={number}
                  aria-current="page"
                  className={`${
                    number + 1 === currentPage
                      ? "border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                  }`}
                >
                  {number + 1 + ""}
                </a>
              </Link>
            ))}
          </div>
          <div className="-mt-px w-0 flex-1 flex justify-end z-50">
            {currentPage + 1 <= numPages && (
              <Link href={`/posts/page/${currentPage + 1}`}>
                <a className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Next
                  <ArrowNarrowRightIcon
                    className="ml-3 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </a>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/articles`);
  const posts = await res.json();

  const numPages = Math.ceil(posts?.length / POST_PER_PAGE);

  const paths = [];

  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    });
  }
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = parseInt((params && params?.page_index) || 1);
  const res = await fetch(`${API_URL}/articles`);
  const posts = await res.json();

  const numPages = Math.ceil(posts?.length / POST_PER_PAGE);

  const pageIndex = page - 1;

  const orderedPosts = posts.slice(
    pageIndex * POST_PER_PAGE,
    (pageIndex + 1) * POST_PER_PAGE
  );

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
      numberOfPosts: orderedPosts?.length,
      max: posts?.length,
    },
    revalidate: 1,
  };
}
