import Head from "next/head";
import { getSortedPostsData } from "../../lib/posts";
import PostCard from "@component/PostCard/PostCard";
import BlogLayout from "@layouts/blog";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Blog({ allPostsData }) {
  return (
    <BlogLayout>
      <div className="my-5">
        <Head>
          <title>Blog | Fatih Cüre</title>
        </Head>

        <section className="mt-10">
          <ul>
            {allPostsData.map(({ id, date, title, description }) => (
              <li className={""} key={id}>
                <PostCard
                  title={title}
                  date={date}
                  id={id}
                  description={description}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </BlogLayout>
  );
}
