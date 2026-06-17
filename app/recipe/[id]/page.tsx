import Link from "next/link";

import { generateRecipeIdeas } from "@/lib/openai";
import { getSession } from "@/lib/session-store";

import styles from "./recipe.module.css";

type RecipePageProps = {
  params: Promise<{ id: string }>;
};

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  const session = getSession(id);

  if (!session) {
    return (
      <main className={styles.page}>
        <section className={styles.errorCard}>
          <h1>Session nem talalhato</h1>
          <p>
            Ez a receptkeres mar nem elerheto vagy hibas linket kaptal.
          </p>
          <Link href="/" className={styles.cta}>
            Vissza a fooldalra
          </Link>
        </section>
      </main>
    );
  }

  const aiResult = await generateRecipeIdeas(session);

  return (
    <main className={styles.page}>
      <header className={styles.headerCard}>
        <span className={styles.badge}>Generated from iPhone Shortcut</span>
        <h1>Szemelyre szabott receptotletek</h1>
      </header>

      <section className={styles.summaryCard}>
        <h2>Bekert adatok</h2>
        <dl>
          <div>
            <dt>Etkezes celja</dt>
            <dd>{session.mealType}</dd>
          </div>
          <div>
            <dt>Alapanyagok</dt>
            <dd>{session.ingredients}</dd>
          </div>
          <div>
            <dt>Allergiak</dt>
            <dd>{session.allergies}</dd>
          </div>
          <div>
            <dt>Etrendi preferencia</dt>
            <dd>{session.diet}</dd>
          </div>
        </dl>
      </section>

      <section className={styles.aiCard}>
        <h2>AI valasz</h2>
        <pre>{aiResult}</pre>
      </section>

      <footer>
        <Link href="/" className={styles.cta}>
          Uj receptkeres inditasa
        </Link>
      </footer>
    </main>
  );
}
