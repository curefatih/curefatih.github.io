import Head from 'next/head'
import utilStyles from '../../styles/Blog.module.css'
import { getSortedPostsData } from '../../lib/posts'
import PostCard from '@component/post-card/post-card'
import BlogLayout from '@layouts/blog'


export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Blog({ allPostsData }) {

  return (
    <BlogLayout>
      <div className={`${utilStyles.container} wrap xl-center`}>
        <Head>
          <title>Blog | Fatih Cüre</title>
        </Head>

        <section className={`col`}>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title, description }) => (
              <li className={utilStyles.listItem} key={id}>
                <PostCard title={title} date={date} id={id} description={description} />
              </li>
            ))}
          </ul>
        </section>

      </div>
    </BlogLayout>
  )
}
