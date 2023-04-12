import Link from 'next/link'
import styles from '../styles/Home.module.css'

function Index() {
  return (
    <main className={styles.main}>
      <Link href="/admin"> <button>
        <span></span>
        <span></span>
        <span></span>
        <span></span>Admin Panel
      </button></Link>
    </main>
  )
}

export default Index