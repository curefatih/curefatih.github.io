import Link from 'next/link'
import styles from './style.module.css'
export default function PostCard(props) {
  const { id, title, date, description } = props
  return (
    <div className={`${styles.box} ${props.className}`}>
      <Link href={'/blog/' + id}>
        <a className={styles.title}>{title}</a>
      </Link>
      <br />
      <p>{description}</p>
      <div className={styles.date}>
        {date}
      </div>
    </div>
  )
}