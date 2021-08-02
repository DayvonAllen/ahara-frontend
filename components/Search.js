import { useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import Layout from "./Layout";

export default function Search({ posts, categories }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      if (searchTerm === "") {
        setSearchResults([]);
      } else {
        const resultArr = posts?.filter(
          ({ title, category }) =>
            title?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
            category?.name?.toLowerCase().indexOf(searchTerm.toLowerCase()) !==
              -1
        );

        const results = [];
        for (let i = 0; i < resultArr.length; i++) {
          results.push(resultArr[i]);
          if (i === 8) {
            break;
          }
        }
        setSearchResults(results);
      }
    };

    getResults();
  }, [searchTerm]);

  return (
    <Layout categories={categories}>
      <div className="flex justify-center h-12 lg:mt-24 sm:mt-24 sm:absolute sm:inset-0 z-40">
        <input
          id="search"
          name="search"
          className="block md:w-1/2 w-3/4 mt-16  md:mt:0 h-12 bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          placeholder="Search Posts"
          onChange={(e) => setSearchTerm(e.target.value)}
          type="search"
        />
      </div>
      <div className="mt-36">
        <SearchResults
          results={searchResults}
          posts={posts}
          searchTerm={searchTerm}
        />
      </div>
    </Layout>
  );
}
