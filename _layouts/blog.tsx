import Head from 'next/head'
import Link from 'next/link'
import styles from './blog-layout.module.css'

export default function BlogLayout(props) {
  return (
    <div className="blog-layout wrap xl-center">
      <Head>
        <title>{props.title}</title>
        <meta name='description' content={props.description} />
      </Head>

      <div className="col xl-1-1">

        <div className={styles.head}>Fatih Cüre | <span className="color-red">Blog</span></div>

        <nav className={styles.blogNavigation}>
          <ul>
            <li>
              <Link href='/blog'>
                <a>Posts</a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a>Portfolio</a>
              </Link>
            </li>
          </ul>
        </nav>

      </div>

      <div className={`${styles.content} col`}>
        {props.children}
      </div>
    </div>
  )
}