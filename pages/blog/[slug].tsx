import PostLayout from '@layouts/post'
import { getSortedPostsData, getPostData } from "@api"

export default function Post(props) {
  return <PostLayout title={props.title} content={props.content} />
}

export async function getStaticProps(context) {
  return {
    props: await getPostData(context.params.slug)
  }
}

export async function getStaticPaths() {
  let pathsAll = await getSortedPostsData()
  const paths = pathsAll.map(post => ({
    params: { slug: post.id }
  }));
  return {
    paths: paths,
    fallback: false
  }
}