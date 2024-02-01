import Layout from "@/components/layout";
import { readFileSync, readdirSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";

interface Post {
  title: string;
  date: string;
  category: string;
}

const Blog: NextPage<{ blogPosts: Post[] }> = ({ blogPosts }) => {
  return (
    <Layout title="Blog">
      <h1 className="mb-10 mt-5 text-center text-xl font-bold">Latest Posts</h1>
      {blogPosts.map((post) => (
        <div className="mb-5">
          <div>
            <span className="font-bold text-red-500">{post.title}</span>
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
  const blogPosts = readdirSync("./posts").map((post) => {
    const content = readFileSync(`./posts/${post}`, "utf-8");
    return matter(content).data;
  });
  return {
    props: {
      blogPosts: blogPosts.reverse(),
    },
  };
}

export default Blog;
