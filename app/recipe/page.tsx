import Link from "next/link";

import { generateRecipeIdeas } from "@/lib/openai";
import { decodeRecipeData } from "@/lib/recipe-data";

import styles from "./recipe.module.css";

type RecipePageProps = {
  searchParams: Promise<{ data?: string }>;
};

export default async function RecipePage({ searchParams }: RecipePageProps) {
  const { data } = await searchParams;

  if (!data) {
    return (
      <main className={styles.page}>
        <section className={styles.errorCard}>
          <h1>Invalid or missing link</h1>
          <p>This recipe request is no longer available or the link is wrong.</p>
          <Link href="/" className={styles.cta}>
            Back to home
          </Link>
        </section>
      </main>
    );
  }

  const decoded = decodeRecipeData(data);

  if (!decoded.valid || !decoded.data) {
    return (
      <main className={styles.page}>
        <section className={styles.errorCard}>
          <h1>Invalid or missing link</h1>
          <p>This recipe request is no longer available or the link is wrong.</p>
          <Link href="/" className={styles.cta}>
            Back to home
          </Link>
        </section>
      </main>
    );
  }

  const requestData = decoded.data;
  const aiResult = await generateRecipeIdeas(requestData);

  return (
    <main className={styles.page}>
      <header className={styles.headerCard}>
        <span className={styles.badge}>Generated from iPhone Shortcut</span>
        <h1>Personalized recipe ideas</h1>
      </header>

      <section className={styles.summaryCard}>
        <h2>Input summary</h2>
        <dl>
          <div>
            <dt>Meal type</dt>
            <dd>{requestData.mealType}</dd>
          </div>
          <div>
            <dt>Ingredients</dt>
            <dd>{requestData.ingredients}</dd>
          </div>
          <div>
            <dt>Allergies</dt>
            <dd>{requestData.allergies}</dd>
          </div>
          <div>
            <dt>Diet preference</dt>
            <dd>{requestData.diet}</dd>
          </div>
        </dl>
      </section>

      <section className={styles.aiCard}>
        <h2>AI response</h2>
        <pre>{aiResult}</pre>
      </section>

      <footer>
        <Link href="/" className={styles.cta}>
          Start a new request
        </Link>
      </footer>
    </main>
  );
}
