import { useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import SearchResults from "./SearchResults";
import Layout from "./Layout";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      if (searchTerm === "") {
        setSearchResults([]);
      } else {
        const res = await fetch(`/api/search?q=${searchTerm?.toLowerCase()}`);
        const { results } = await res.json();
        setSearchResults(results);
      }
    };

    getResults();
  }, [searchTerm]);

  return (
    <Layout>
      <div className="flex justify-center h-12 mt-40 sm:absolute sm:inset-0">
        <input
          id="search"
          name="search"
          className="block w-1/2 bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Search Posts"
          onChange={(e) => setSearchTerm(e.target.value)}
          type="search"
        />
      </div>
      <div className="mt-36">
        <SearchResults results={searchResults} />
      </div>
    </Layout>
  );
}
