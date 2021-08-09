import { API_URL, POST_PER_PAGE } from "@/config/index";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

export default async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/articles`);
    const posts = await response.json();
    const cat = await fetch(`${API_URL}/categories`);
    const categories = await cat.json();

    const numPages = Math.ceil(posts?.length / POST_PER_PAGE);

    const links = [];
    posts.map((post) => {
      links.push({
        url: `/posts/find/${post?.slug}`,
        changefreq: "daily",
        priority: 0.9,
      });
    });

    categories.map((category) => {
      links.push({
        url: `/categories/page/${category?.slug}`,
        changefreq: "daily",
        priority: 0.9,
      });
    });

    for (let i = 1; i <= numPages; i++) {
      links.push({
        url: `/posts/page/${i}`,
        changefreq: "daily",
        priority: 0.9,
      });
    }

    // Add other pages
    const pages = ["/categories", "/about", "/search"];
    pages.map((url) => {
      links.push({
        url,
        changefreq: "daily",
        priority: 0.9,
      });
    });

    // Create a stream to write to
    const stream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
    });

    res.writeHead(200, {
      "Content-Type": "application/xml",
    });

    const xmlString = await streamToPromise(
      Readable.from(links).pipe(stream)
    ).then((data) => data.toString());

    res.end(xmlString);
  } catch (e) {
    console.log(e);
    res.send(JSON.stringify(e));
  }
};
