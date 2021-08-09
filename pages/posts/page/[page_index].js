import Layout from "@/components/Layout";
import { API_URL, POST_PER_PAGE } from "@/config/index";
import moment from "moment";
import localization from "moment/locale/ja";
import Link from "next/link";
import PostDetails from "@/components/PostDetails";
import { v4 as uuidv4 } from "uuid";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";

export default function Posts({ posts, numPages, currentPage, categories }) {
  moment.updateLocale("ja", localization);

  const pageCounter = new Array(numPages);
  pageCounter.fill(0);

  return (
    <Layout title="ブログ一覧" categories={categories}>
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              ブログ一覧
            </h2>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {posts.map((post, i) => (
              <PostDetails key={uuidv4()} post={post} />
            ))}
          </div>
        </div>
        <nav
          className={`border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 mt-12 md:w-1/2 mx-auto ${
            posts?.length < 4 ? "md:mt-80 lg:mt-96 xl:p-30 " : ""
          }`}
        >
          <div className="-mt-px w-0 flex-1 flex z-50">
            {currentPage - 1 >= 1 && (
              <Link
                key={currentPage - 1}
                href={`/posts/page/${currentPage - 1}`}
              >
                <a className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  <ArrowNarrowLeftIcon
                    className="mr-3 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  前に戻る
                </a>
              </Link>
            )}
          </div>
          <div className="hidden md:-mt-px md:flex z-50">
            {pageCounter.map((page, number) => (
              <Link key={number + page} href={"/posts/page/" + (number + 1)}>
                <a
                  aria-current="page"
                  className={`${
                    number + 1 === currentPage
                      ? "border-pink-500 text-pink-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
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
              <Link
                key={currentPage + 1}
                href={`/posts/page/${currentPage + 1}`}
              >
                <a className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  次へ
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
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const page = parseInt((params && params?.page_index) || 1);
  const res = await fetch(`${API_URL}/articles?_sort=published_at:DESC`);
  const posts = await res.json();
  const cat = await fetch(`${API_URL}/categories`);
  const categories = await cat.json();

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
      categories,
    },
    revalidate: 75,
  };
}
