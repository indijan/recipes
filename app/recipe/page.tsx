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
          <h1>Hibas vagy hianyzo link</h1>
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

  const decoded = decodeRecipeData(data);

  if (!decoded.valid || !decoded.data) {
    return (
      <main className={styles.page}>
        <section className={styles.errorCard}>
          <h1>Hibas vagy hianyzo link</h1>
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

  const requestData = decoded.data;
  const aiResult = await generateRecipeIdeas(requestData);

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
            <dd>{requestData.mealType}</dd>
          </div>
          <div>
            <dt>Alapanyagok</dt>
            <dd>{requestData.ingredients}</dd>
          </div>
          <div>
            <dt>Allergiak</dt>
            <dd>{requestData.allergies}</dd>
          </div>
          <div>
            <dt>Etrendi preferencia</dt>
            <dd>{requestData.diet}</dd>
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
