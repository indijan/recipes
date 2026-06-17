import Link from "next/link";

import { encodeRecipeData } from "@/lib/recipe-data";

import styles from "./home.module.css";

export default function Home() {
  const samplePayload = `{
  "mealType": "vacsora",
  "ingredients": "tojas, sajt, paradicsom, rizs",
  "allergies": "mogyoro",
  "diet": "gyerekbarat",
  "source": "ios-shortcut-demo"
}`;

  const demoDataLink = `/recipe?data=${encodeRecipeData({
    mealType: "vacsora",
    ingredients: "tojas, sajt, paradicsom, rizs",
    allergies: "mogyoro",
    diet: "gyerekbarat",
    source: "ios-shortcut-demo",
  })}`;

  return (
    <main className={styles.page}>
      <section className={styles.heroCard}>
        <span className={styles.badge}>iPhone Shortcut + AI Demo</span>
        <h1>Receptotletek egy iOS Shortcutbol, masodpercek alatt</h1>
        <p>
          Ez egy iPhone Shortcut + AI demo. A Shortcut bekeri az igenyeket, a
          webapp pedig szemelyre szabott receptotleteket general.
        </p>
        <Link href={demoDataLink} className={styles.linkButton}>
          Pelda oldal megnyitasa
        </Link>
      </section>

      <section className={styles.flowCard}>
        <h2>Pelda JSON payload a Shortcutbol</h2>
        <pre>{samplePayload}</pre>
        <p>
          Endpoint: <code>POST /api/recipe-session</code> - innen kapsz egy
          URL-t, ami mar tartalmazza a kodolt input adatokat.
        </p>
      </section>
    </main>
  );
}
