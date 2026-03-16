"use client";

import { useRouter } from "next/navigation";

import { useFavorites } from "@/shared/hooks/useFavorites";
import type { RecipeListItem } from "@/shared/api/types";
import { flyToFavorites } from "@/shared/animations/flyToFavorites";

import WineSelector from "@/components/wine/WineSelector";
import WineResults from "@/components/wine/WineResults";
import styles from "./WinePairing.module.scss";
import WineProfileEditor
  from "@/components/wine/WineProfileEditor/WineProfileEditor";
import {useStores} from "@/providers/StoreProvider";
import {observer} from "mobx-react-lite";

type Props = {
  token: string | null;
};
export default observer(function WinePairingClient({ token }: Props) {
  const router = useRouter();
  const favoritesState = useFavorites(token);
  const { winePairingStore: store } = useStores();

  const handleToggleFavorite = (recipe: RecipeListItem, element: Element) => {
    if (!token) {
      router.push("/login");
      return;
    }
    if (!favoritesState.favorites.includes(recipe.id)) {
      flyToFavorites(element);
    }
    favoritesState.toggleFavorite(recipe);
  };

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>Wine Pairing</h1>
          <p className={styles.subtitle}>Find the perfect dishes for your wine</p>
        </div>

        <WineSelector
          selected={store.selectedWine}
          onSelect={store.selectWine}
        />

        <WineProfileEditor
          profile={store.profile}
          onChange={store.changeProfile}
        />

        <div className={styles.findRow}>
          <button
            className={styles.findButton}
            onClick={() => store.findRecipes()}
            disabled={store.loading}
          >
            {store.loading ? "Finding…" : "Find dishes"}
          </button>
        </div>

        {store.loading && <p className={styles.loading}>Finding perfect dishes…</p>}

        {!store.loading && store.searched && (
          <WineResults
            recipes={store.recipes}
            favorites={favoritesState.favorites}
            toggleFavorite={handleToggleFavorite}
            loadingId={favoritesState.loadingId}
          />
        )}

      </div>
    </main>
  );
})

