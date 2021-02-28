import Link from 'next/link'
import styles from './blog-nav.module.css'

export default function BlogNav(){
  return <div className={styles.container}>
      <div className="head">
        Fatih Cüre
      </div>

      <div className={styles.nav}>
        <ul>
          <li>
            <Link href='/blog'>
              <a>Home</a>
            </Link>
          </li>
        </ul>
      </div>
  </div>
}