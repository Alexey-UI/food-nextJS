import styles from './RecipeDirections.module.scss';

type Direction = {
  id: number;
  description: string;
};

type RecipeDirectionsProps = {
  directions?: Direction[];
};

const RecipeDirections = ({ directions }: RecipeDirectionsProps) => {
  if (!directions?.length) return null;

  return (
    <section className={styles.directions}>
      <h2 className={styles.title}>Directions</h2>

      <div className={styles.steps}>
        {directions.map((step, index) => (
          <div key={step.id} className={styles.step}>
            <h3 className={styles.stepTitle}>Step {index + 1}</h3>
            <p className={styles.stepText}>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecipeDirections;
