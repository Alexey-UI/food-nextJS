"use client";

import classNames from "classnames";
import type { WineProfile, WineType } from "@/shared/utils/wine/wineRules";
import styles from "./WineProfileEditor.module.scss";

type Props = {
  profile: WineProfile;
  onChange: (patch: Partial<WineProfile>) => void;
};

const TYPES: WineType[] = ["red", "white", "rose", "sparkling", "dessert"];
const BODIES = ["light", "medium", "full"] as const;
const SWEETNESSES = ["dry", "semi-dry", "sweet"] as const;
const ACIDITIES = ["low", "medium", "high"] as const;

function SegmentRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <div className={styles.options}>
        {options.map((opt) => (
          <button
            key={opt}
            className={classNames(styles.option, {
              [styles.optionActive]: value === opt,
            })}
            onClick={() => onChange(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function WineProfileEditor({ profile, onChange }: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Customize Wine Profile</h2>

      <div className={styles.editor}>
        <SegmentRow
          label="Wine Type"
          options={TYPES}
          value={profile.type}
          onChange={(v) => onChange({ type: v })}
        />
        <SegmentRow
          label="Body"
          options={BODIES}
          value={profile.body}
          onChange={(v) => onChange({ body: v })}
        />
        <SegmentRow
          label="Sweetness"
          options={SWEETNESSES}
          value={profile.sweetness}
          onChange={(v) => onChange({ sweetness: v })}
        />
        <SegmentRow
          label="Acidity"
          options={ACIDITIES}
          value={profile.acidity}
          onChange={(v) => onChange({ acidity: v })}
        />
      </div>
    </section>
  );
}
