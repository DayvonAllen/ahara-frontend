import { API_URL } from "@/config/index";
import fs from "fs";
import path from "path";

export default async (req, res) => {
  let posts;
  if (process.env.NODE_ENV === "production") {
  } else {
    const res = await fetch(`${API_URL}/articles`);
    const data = await res.json();
    posts = data;
  }

  const resultArr = posts?.filter(
    ({ title, category }) =>
      title?.toLowerCase().indexOf(req.query.q) !== -1 ||
      category?.slug?.toLowerCase().indexOf(req.query.q) !== -1
  );

  const results = [];
  for (let i = 0; i < resultArr.length; i++) {
    results.push(resultArr[i]);
    if (i === 8) {
      break;
    }
  }
  res.status(200).json({ results });
};
