"use client";

import classNames from "classnames";
import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";

import styles from "./CategorySelect.module.scss";
import Input from "@/components/Input";
import { useCategoriesQuery } from "@/shared/hooks/useCategoriesQuery";

import { observer } from "mobx-react-lite";
import {useStores} from "@/providers/StoreProvider";

type Option = {
  key: string;
  value: string;
};

type CategorySelectProps = {
  updateParams: (params: Record<string, string | undefined>) => void;
};

const CategorySelect = ({ updateParams }: CategorySelectProps) => {
  const { data, isLoading } = useCategoriesQuery();
  console.log(data)
  const categories = useMemo(() => data?.data ?? [], [data]);

  const searchParams = useSearchParams();
  const categoryIdFromUrl = searchParams.get("categoryId");

  const { dropdownStore } = useStores();

  const rootRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(() => {
    if (!categoryIdFromUrl) return null;

    const found = categories.find((cat) => String(cat.id) === categoryIdFromUrl);

    return found ? { key: String(found.id), value: found.title } : null;
  }, [categoryIdFromUrl, categories]);

  const options: Option[] = useMemo(() => {
    const mapped = categories.map((cat) => ({
      key: String(cat.id),
      value: cat.title,
    }));

    return [{ key: "", value: "All categories" }, ...mapped];
  }, [categories]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        dropdownStore.closeCategory();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownStore]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dropdownStore.closeCategory();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => document.removeEventListener("keydown", handleEsc);
  }, [dropdownStore]);

  const handleSelect = (option: Option) => {
    updateParams({
      categoryId: option.key || undefined,
    });

    dropdownStore.closeCategory();
  };

  return (
    <div ref={rootRef} className={styles.dropdown}>
      <Input
        value={selected?.value || ""}
        placeholder={isLoading ? "Loading..." : "Categories"}
        readOnly
        onFocus={dropdownStore.toggleCategory}
        className={classNames({
          [styles.inputActive]: dropdownStore.categoryOpen,
        })}
        afterSlot={
          <svg
            className={classNames(styles.arrow, {
              [styles.arrowOpen]: dropdownStore.categoryOpen,
            })}
            width="20"
            height="11"
            viewBox="0 0 20 11"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 1.49482L1.32873 0L9.66436 7.40945L18 0L19.3287 1.49482L9.66436 10.0854L0 1.49482Z"
              fill="#AFADB5"
            />
          </svg>
        }
      />

      {dropdownStore.categoryOpen && (
        <div className={styles.menu}>
          {options.map((option) => (
            <div
              key={option.key}
              className={classNames(styles.option, {
                [styles.optionSelected]:
                  (!selected && option.key === "") ||
                  selected?.key === option.key,
              })}
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSelect(option);
              }}
              tabIndex={0}
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default observer(CategorySelect);