import { useEffect, useState } from "react";
import PostDetails from "./PostDetails";

export default function SearchResults({ results, posts, searchTerm }) {
  const [foundPosts, setFoundPosts] = useState(posts);
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    if (results.length > 0) {
      setFoundPosts(results);
      setErrors(false);
    } else {
      if (searchTerm?.length === 0) {
        setFoundPosts(posts);
        setErrors(false);
      } else {
        setErrors(true);
      }
    }
  }, [searchTerm, results]);

  return (
    <div
      className={`relative ${
        !errors ? "bg-gray-50" : "bg-white"
      } pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8`}
    >
      <div className="absolute inset-none">
        <div className="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {!errors &&
            foundPosts.map((post) => (
              <PostDetails key={post.title} post={post} />
            ))}
          {errors && <p>No Result Found</p>}
        </div>
      </div>
    </div>
  );
}
