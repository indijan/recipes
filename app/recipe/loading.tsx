import styles from "./recipe.module.css";

export default function LoadingRecipePage() {
  return (
    <main className={styles.page}>
      <section className={styles.loadingCard}>
        <span className={styles.badge}>Generated from iPhone Shortcut</span>
        <h1>The AI chef is thinking...</h1>
      </section>
    </main>
  );
}
