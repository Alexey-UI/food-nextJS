"use client";
import { useFavorites } from '@/shared/hooks/useFavorites';
import styles from './FavoritesPage.module.scss';

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>My Favorites</h1>

      <div className={styles.grid}>
        {favorites.map((id: number) => (
          <div key={id} className={styles.card}>
            Recipe ID: {id}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;