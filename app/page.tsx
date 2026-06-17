import Link from "next/link";

import { encodeRecipeData } from "@/lib/recipe-data";

import styles from "./home.module.css";

export default function Home() {
  const samplePayload = `{
  "mealType": "dinner",
  "ingredients": "eggs, cheese, tomato, rice",
  "allergies": "peanut",
  "diet": "kid-friendly",
  "source": "ios-shortcut-demo"
}`;

  const demoDataLink = `/recipe?data=${encodeRecipeData({
    mealType: "dinner",
    ingredients: "eggs, cheese, tomato, rice",
    allergies: "peanut",
    diet: "kid-friendly",
    source: "ios-shortcut-demo",
  })}`;

  return (
    <main className={styles.page}>
      <section className={styles.heroCard}>
        <span className={styles.badge}>iPhone Shortcut + AI Demo</span>
        <h1>Recipe ideas from an iOS Shortcut in seconds</h1>
        <p>
          This is an iPhone Shortcut + AI demo. The Shortcut asks for
          preferences, and the web app generates personalized recipe ideas.
        </p>
        <Link href={demoDataLink} className={styles.linkButton}>
          Open demo recipe page
        </Link>
      </section>

      <section className={styles.flowCard}>
        <h2>Sample JSON payload from the Shortcut</h2>
        <pre>{samplePayload}</pre>
        <p>
          Endpoint: <code>POST /api/recipe-session</code> - returns a URL with
          encoded input data, ready to open.
        </p>
      </section>
    </main>
  );
}
