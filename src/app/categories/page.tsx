import Link from "next/link";
import Image from "next/image";
import { getCategoriesServer } from "@/shared/api/categories.server";

import styles from "./CategoriesPage.module.scss";

export default async function CategoriesPage() {
  const data = await getCategoriesServer();
  const categories = data?.data ?? [];

  return (
    <main className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>Meal Categories</h1>

        <div className={styles.grid}>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/?categoryId=${cat.id}&page=1`}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                {cat.image && (
                  <Image
                    src={cat.image?.formats?.small?.url || "/placeholder.jpg"}
                    alt={cat.title}
                    fill
                    className={styles.image}
                  />
                )}
              </div>

              <div className={styles.overlay}>
                <span className={styles.name}>{cat.title}</span>
                <span className={styles.count}>
                  {cat.recipes?.length ?? 0} recipes
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}