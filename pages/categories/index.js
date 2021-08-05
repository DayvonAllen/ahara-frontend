import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Categories({ categories }) {
  return (
    <Layout categories={categories}>
      <div className="text-center w-1/2 mx-auto">
        <h1 className="text-gray-500  font-medium text-2xl uppercase tracking-wide border-b md:mt-0 mt-4 pb-2 border-gray-200">
          カテゴリー
        </h1>
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <Link
              key={category.name + i}
              href={`/categories/page/${category.slug}`}
            >
              <a className={"text-gray-900 font-medium hover:text-gray-400"}>
                <li
                  key={category.name}
                  className="col-span-1 flex shadow-md rounded-md"
                >
                  <div
                    className={classNames(
                      "bg-purple-600",
                      "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
                    )}
                  >
                    {category.name[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                    <div className="flex-1 px-4 py-2 text-sm truncate">
                      {category.name.toUpperCase()}
                    </div>
                  </div>
                </li>
              </a>
            </Link>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/categories`);
  const categories = await res.json();

  return {
    props: {
      categories,
    },
    revalidate: 30,
  };
}
