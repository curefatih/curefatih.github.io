import styles from './ShadowBox.module.css'
export default function ShadowBox(props) {
  return (
    <div className={`${styles.box} ${props.className}`}>
      {props.children}
    </div>
  )
}