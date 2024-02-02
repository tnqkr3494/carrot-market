import Layout from "@/components/layout";
import { readFileSync, readdirSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";
import Link from "next/link";

interface Post {
  title: string;
  date: string;
  category: string;
  slug: string;
}

const Blog: NextPage<{ blogPosts: Post[] }> = ({ blogPosts }) => {
  return (
    <Layout title="Blog">
      <h1 className="mb-10 mt-5 text-center text-xl font-bold">Latest Posts</h1>
      {blogPosts.map((post, index) => (
        <div key={index} className="mb-5">
          <div>
            <Link href={`/blog/${post.slug}`} legacyBehavior>
              <a className="font-bold text-red-500">{post.title}</a>
            </Link>
          </div>
          <span>
            {post.date} / {post.category}
          </span>
        </div>
      ))}
    </Layout>
  );
};

export async function getStaticProps() {
  //readdirSync경로 주의!!!
  const blogPosts = readdirSync("./posts").map((post) => {
    const content = readFileSync(`./posts/${post}`, "utf-8");
    const [path, ignore] = post.split(".");
    return { ...matter(content).data, slug: path };
  });
  return {
    props: {
      blogPosts: blogPosts.reverse(),
    },
  };
}

export default Blog;
