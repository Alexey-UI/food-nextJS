"use client";

import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { observer } from "mobx-react-lite";

import styles from "./Header.module.scss";

import heartIcon from "@/assets/heartIcon.svg";
import logoIcon from "@/assets/logoIcon.svg";
import userIcon from "@/assets/userIcon.svg";

import BurgerButton from "@/components/BurgerButton";
import { useAuth } from "@/lib/auth/AuthContext";
import { useStores } from "@/providers/StoreProvider";
import { useFavorites } from "@/shared/hooks/useFavorites";
import { getToken } from "@/lib/auth/authStorage";

const Header = () => {
  const { uiStore } = useStores();

  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated, isLoading } = useAuth();
  const { favorites } = useFavorites(isAuthenticated ? getToken() : null);

  return (
    <header className={styles.header}>
      <div className={classNames(styles.container)}>
        <div className={styles.header__left}>
          <Link
            href="/"
            className={styles.header__logo}
            onClick={() => uiStore.closeMobileMenu()}
          >
            <div className={styles.header__logoIcon}>
              <Image src={logoIcon} alt="Logo" />
            </div>

            <span>Food Client</span>
          </Link>

          <nav
            className={classNames(styles.header__nav, {
              [styles.open]: uiStore.mobileMenuOpen,
            })}
          >
            <Link href="/" className={pathname === "/" ? styles.active : ""}>
              Recipes
            </Link>

            <Link
              href="/categories"
              className={pathname === "/categories" ? styles.active : ""}
            >
              Meals Categories
            </Link>

            <Link
              href="/products"
              className={pathname === "/products" ? styles.active : ""}
            >
              Products
            </Link>

            <Link
              href="/wine-pairing"
              className={pathname === "/wine-pairing" ? styles.active : ""}
            >
              Wine Pairing
            </Link>

            <Link
              href="/planning"
              className={pathname === "/planning" ? styles.active : ""}
            >
              Meal Planning
            </Link>
          </nav>
        </div>

        <div className={styles.header__actions}>
          <div
            className={styles.heartWrapper}
            onClick={() => router.push(isAuthenticated ? "/favorites" : "/login")}
          >
            <Image
              id="favorites-icon"
              src={heartIcon}
              alt="Favorites"
              className={classNames(styles.header__icon, styles.header__heart)}
            />
            {favorites.length > 0 && (
              <span className={styles.badge}>
                {favorites.length > 99 ? "99+" : favorites.length}
              </span>
            )}
          </div>

          <Image
            src={userIcon}
            alt="User"
            className={styles.header__icon}
            onClick={() => {
              if (isLoading) return;

              router.push(isAuthenticated ? "/profile" : "/login");
            }}
          />

          <BurgerButton
            isOpen={uiStore.mobileMenuOpen}
            onClick={() => uiStore.toggleMobileMenu()}
          />
        </div>
      </div>
    </header>
  );
};

export default observer(Header);