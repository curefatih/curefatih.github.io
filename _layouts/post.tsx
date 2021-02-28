import ShadowBox from '@component/shadow-box/shadow-box'
import BlogLayout from './blog'
import styles from './post.module.css'

export default function PostLayout(props) {
  return (
    <BlogLayout title={`Fatih Cüre | ${props.title}`}>
      <div className={`${styles.article} markdown-body`}>
        <article>
          <div dangerouslySetInnerHTML={{ __html: props.content }} />
        </article>
      </div>
    </BlogLayout>
  )
}