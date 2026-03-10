import Image from "next/image";
import styles from "./RecipeDetails.module.scss";

type Ingredient = {
  id: number;
  amount: number;
  unit: string;
  name: string;
};

type Equipment = {
  id: number;
  name: string;
};

type RecipeDetailsProps = {
  ingradients?: Ingredient[];
  equipment?: Equipment[];
};

const RecipeDetails = ({ ingradients, equipment }: RecipeDetailsProps) => {
  return (
    <section className={styles.recipeDetails}>
      <div className={styles.columns}>
        <div className={styles.section1}>
          <h2>Ingredients</h2>

          <ul className={styles.list}>
            {ingradients?.map((item) => (
              <li key={item.id}>
                <Image
                  src="/icons/bellIcon.svg"
                  alt="bell"
                  width={20}
                  height={20}
                  className={styles.bell__icon}
                />

                <span>
                  {item.amount} {item.unit} {item.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.divider} />

        <div className={styles.section2}>
          <h2>Equipment</h2>

          <ul className={styles.list}>
            {equipment?.map((item) => (
              <li key={item.id}>
                <Image
                  src="/icons/ladelIcon.svg"
                  alt="ladel"
                  width={20}
                  height={20}
                  className={styles.ladel__icon}
                />

                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RecipeDetails;