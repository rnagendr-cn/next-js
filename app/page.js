import styles from "./page.module.css"
import Chat from "./components/Chat"

export default function Home() {
  return (
    <main className={styles.main}>
      <Chat />
    </main>
  )
}
