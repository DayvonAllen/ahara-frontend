import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";

const colors = [
  "bg-pink-600",
  "bg-purple-600",
  "bg-yellow-500",
  "bg-green-500",
];

const projects = [
  {
    name: "News",
    initials: "N",
    href: "/categories/page/news",
    bgColor: "bg-pink-600",
  },
  {
    name: "Food",
    initials: "F",
    href: "/categories/page/food",
    members: 12,
    bgColor: "bg-purple-600",
  },
  {
    name: "Nature",
    initials: "N",
    href: "/categories/page/nature",
    members: 16,
    bgColor: "bg-yellow-500",
  },
  {
    name: "Story",
    initials: "S",
    href: "/categories/page/story",
    members: 8,
    bgColor: "bg-green-500",
  },
  {
    name: "News",
    initials: "N",
    href: "#",
    bgColor: "bg-pink-600",
  },
  {
    name: "Cooking",
    initials: "C",
    href: "#",
    members: 12,
    bgColor: "bg-purple-600",
  },
  {
    name: "Live Abroad",
    initials: "L",
    href: "#",
    members: 16,
    bgColor: "bg-yellow-500",
  },
  {
    name: "Movies",
    initials: "M",
    href: "#",
    members: 8,
    bgColor: "bg-green-500",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Categories({ categories }) {
  const returnedCategories = categories?.map((category, i) => {
    if (i < 4) {
      category.bgColor = colors[i];
      category.textColor = "hover:" + colors[i];
    } else {
      category.bgColor = colors[Math.ceil(i / 4)];
      category.textColor = "hover:" + colors[Math.ceil(i / 4)];
    }
    console.log(category.textColor);
    return category;
  });
  return (
    <Layout>
      <div className="text-center w-1/2 mx-auto mt-6">
        <h2 className="text-gray-500  font-medium uppercase tracking-wide">
          Categories
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {returnedCategories.map((category, i) => (
            <li
              key={category.name}
              className="col-span-1 flex shadow-md rounded-md"
            >
              <div
                className={classNames(
                  category?.bgColor,
                  "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
                )}
              >
                {category.name[0]?.toUpperCase()}
              </div>
              <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                <div className="flex-1 px-4 py-2 text-sm truncate">
                  <Link href={`/categories/page/${category.slug}`}>
                    <a
                      className={
                        "text-gray-900 font-medium hover:text-gray-400"
                      }
                    >
                      {category.name.toUpperCase()}
                    </a>
                  </Link>
                </div>
              </div>
            </li>
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
    revalidate: 1,
  };
}
