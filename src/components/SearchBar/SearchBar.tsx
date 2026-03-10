"use client";

import {useEffect} from "react";
import { useSearchParams } from "next/navigation";

import styles from "./SearchBar.module.scss";

import Button from "@/components/Button";
import Image from "next/image";
import {useDebounce} from "@/shared/hooks/useDebounce";
import { observer } from "mobx-react-lite";
import {useStores} from "@/providers/StoreProvider";


type SearchBarProps = {
  updateParams: (params: Record<string, string | undefined>) => void;
};

const SearchBar = ({ updateParams }: SearchBarProps) => {
  const searchParams = useSearchParams();
  const searchFromUrl = searchParams.get("search") || "";

  const { searchStore } = useStores();

  const debounced = useDebounce(searchStore.value, 1000);

  useEffect(() => {
    searchStore.setValue(searchFromUrl);
  }, [searchFromUrl, searchStore]);

    useEffect(() => {
      if (debounced === searchFromUrl) return;

      updateParams({
        search: debounced || undefined,
      });
    }, [debounced]);

  const handleSearch = () => {
    updateParams({
      search: searchStore.value || undefined,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Enter dishes"
          value={searchStore.value}
          onChange={(e) => searchStore.setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={styles.input}
        />
      </div>

      <Button onClick={handleSearch} className={styles.button}>
        <Image
          src="/icons/searchIcon.svg"
          alt="Search"
          width={22}
          height={22}
          className={styles.search__icon}
        />
      </Button>
    </div>
  );
};

export default observer(SearchBar);

