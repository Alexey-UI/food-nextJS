import styles from './RecipeSummary.module.scss';

type RecipeSummaryProps = {
  summary: string;
};

const RecipeSummary = ({ summary }: RecipeSummaryProps) => {
  return (
    <section className={styles.recipeSummary}>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: summary }} />
    </section>
  );
};

export default RecipeSummary;
