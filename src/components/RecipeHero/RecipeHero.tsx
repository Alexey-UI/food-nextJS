import Link from "next/link";
import Image from "next/image";

import styles from "./RecipeHero.module.scss";

type RecipeHeroProps = {
  name: string;
  imageUrl?: string;
  preparationTime?: number;
  cookingTime?: number;
  likes?: number;
  servings?: number;
  rating?: number;
};

const RecipeHero = (
  {
    name,
    imageUrl,
    preparationTime,
    cookingTime,
    likes,
    servings,
    rating,
  }: RecipeHeroProps) => {
  const total = (preparationTime || 0) + (cookingTime || 0);

  return (
    <section className={styles.recipeHero}>
      <Link href="/">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
            stroke="#B5460F"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <h1>{name}</h1>

      <div className={styles.content}>
        {imageUrl && (
          <div className={styles.imageWrapper}>
            <Image
              src={imageUrl}
              alt={name}
              width={600}
              height={400}
              className={styles.image}
            />
          </div>
        )}

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <p>Preparation</p>
            <strong>{preparationTime} minutes</strong>
          </div>

          <div className={styles.metaItem}>
            <p>Cooking</p>
            <strong>{cookingTime} minutes</strong>
          </div>

          <div className={styles.metaItem}>
            <p>Total</p>
            <strong>{total} minutes</strong>
          </div>

          <div className={styles.metaItem}>
            <p>Likes</p>
            <strong>{likes}</strong>
          </div>

          <div className={styles.metaItem}>
            <p>Servings</p>
            <strong>{servings} servings</strong>
          </div>

          <div className={styles.metaItem}>
            <p>Ratings</p>
            <strong>{rating} / 5</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipeHero;