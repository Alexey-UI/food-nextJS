"use client";

import classNames from "classnames";
import Image from "next/image";
import type { SommelierWine, WineType } from "@/shared/utils/wine/wineRules";
import {
  sommelierWines,
  WINE_TYPE_LABEL,
  WINE_TYPE_ICON,
} from "@/shared/utils/wine/sommelierWines";
import styles from "./WineSelector.module.scss";

const WINE_TYPE_ORDER: WineType[] = ["red", "white", "rose", "sparkling", "dessert"];

type Props = {
  selected: SommelierWine | null;
  onSelect: (wine: SommelierWine) => void;
};

export default function WineSelector({ selected, onSelect }: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Select Wine</h2>

      {WINE_TYPE_ORDER.map((type) => {
        const group = sommelierWines.filter((w) => w.profile.type === type);
        return (
          <div key={type} className={styles.group}>
            <p className={styles.groupLabel}>
              <Image
                src={WINE_TYPE_ICON[type]}
                alt={type}
                width={20}
                height={20}
                className={styles.wineIcon}
              />
              {WINE_TYPE_LABEL[type]}
            </p>
            <div className={styles.grid}>
              {group.map((wine) => (
                <button
                  key={wine.name}
                  className={classNames(styles.card, {
                    [styles.cardActive]: selected?.name === wine.name,
                  })}
                  onClick={() => onSelect(wine)}
                >
                  {wine.name}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
