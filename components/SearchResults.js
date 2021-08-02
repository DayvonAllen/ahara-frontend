import { useEffect, useState } from "react";
import PostDetails from "./PostDetails";
import Results from "./Results";

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
        setFoundPosts(results);
      }
    }
  }, [searchTerm, results]);

  return (
    <div
      className={`relative ${
        !errors ? "bg-gray-50" : "bg-white"
      } md:pt-16 md:pb-20 pb-2 pt-4 px-4 sm:px-6 lg:pt-16 lg:pb-28 lg:px-8`}
    >
      <div className="absolute inset-none">
        <div className="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <Results numberOfPosts={foundPosts?.length} />
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {foundPosts.map((post) => (
            <PostDetails key={post.title} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
