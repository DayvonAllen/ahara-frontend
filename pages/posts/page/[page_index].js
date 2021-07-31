import Layout from "@/components/Layout";
import { API_URL, POST_PER_PAGE } from "@/config/index";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import moment from "moment";
import localization from "moment/locale/ja";
import Link from "next/link";
import PostDetails from "@/components/PostDetails";

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
      </div>
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <Link href={`/posts/page/${currentPage - 1}`}>
            <a className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </a>
          </Link>
          <Link href={`/posts/page/${currentPage + 1}`}>
            <a className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </a>
          </Link>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{pagePostCount + 1}</span>{" "}
              to{" "}
              <span className="font-medium">
                {pagePostCount + numberOfPosts}
              </span>{" "}
              of <span className="font-medium">{max}</span> results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <Link
                href={`/posts/page/${currentPage - 1}`}
                className={currentPage === 1 && "disabled-link"}
              >
                <a className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </a>
              </Link>

              {pageCounter.map((page, number) => (
                <Link key={number} href={"/posts/page/" + (number + 1)}>
                  <a
                    key={number}
                    aria-current="page"
                    className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    {number + 1 + ""}
                  </a>
                </Link>
              ))}
              <Link href={`/posts/page/${currentPage + 1}`}>
                <a className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </a>
              </Link>
            </nav>
          </div>
        </div>
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
