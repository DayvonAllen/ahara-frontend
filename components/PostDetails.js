import Image from "next/image";
import moment from "moment";
import localization from "moment/locale/ja";
import Link from "next/link";
import LazyLoad from "react-lazyload";
export default function PostDetails({ post }) {
  moment.updateLocale("ja", localization);

  return (
    <div
      key={post.title}
      className="flex flex-col rounded-lg shadow-lg overflow-hidden"
    >
      <div className="flex-shrink-0">
        <LazyLoad
          key={post.image.formats.medium.url}
          offset={500}
          height={100}
          once
        >
          <Image
            className="h-48 w-full object-cover"
            src={post.image ? post.image.formats.medium.url : ""}
            width="430"
            height="350"
            layout="responsive"
            alt="blog image"
          />
        </LazyLoad>
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <LazyLoad key={post.category.slug} offset={500} height={100} once>
            <p className="text-sm font-medium text-pink-600">
              <Link href={`/categories/page/${post.category.slug}`}>
                <a className="hover:underline">{post.category.name}</a>
              </Link>
            </p>
            <a href={post.href} className="block mt-2">
              <p className="text-xl font-semibold text-gray-900">
                {post.title}
              </p>
              <p className="mt-3 text-base text-gray-500">{post.description}</p>
            </a>
          </LazyLoad>
        </div>
        <div className="mt-6 flex items-center">
          <div className="ml-1">
            <div className="flex space-x-1 text-sm text-gray-500">
              <LazyLoad
                key={post.category.slug + post.image.formats.medium.url}
                offset={500}
                height={100}
                once
              >
                <time dateTime={post.published_at}>
                  {moment(post.published_at).format("LL")}
                </time>
                <span aria-hidden="true"> &middot;</span>
                <Link key={post.id} href={`/posts/find/${post?.slug}`}>
                  <a>
                    <span className="hover:text-indigo-500"> Read More</span>
                  </a>
                </Link>
              </LazyLoad>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
