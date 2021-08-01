import Layout from "@/components/Layout";
import Image from "next/image";
import moment from "moment";
import localization from "moment/locale/ja";
import Link from "next/link";

export default function SearchResults({ results }) {
  moment.updateLocale("ja", localization);

  return (
    <div
      className={`relative ${
        results.length > 0 ? "bg-gray-50" : "bg-white"
      } pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8`}
    >
      <div className="absolute inset-none">
        <div className="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {results.map((post) => (
            <div
              key={post.title}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden"
            >
              <div className="flex-shrink-0">
                <Image
                  className="h-48 w-full object-cover"
                  src={post.image ? post.image.formats.medium.url : ""}
                  width={post.image.formats.medium.width}
                  height={post.image.formats.medium.height}
                  alt="blog image"
                />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    <a href={post.category.href} className="hover:underline">
                      {post.category.name}
                    </a>
                  </p>
                  <a href={post.href} className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">
                      {post.title}
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                      {post.description}
                    </p>
                  </a>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="ml-1">
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={post.published_at}>
                        {moment(post.published_at).format("LL")}
                      </time>
                      <span aria-hidden="true">&middot;</span>
                      <Link key={post.id} href={`/posts/find/${post?.slug}`}>
                        <a>
                          <span> Read More</span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
