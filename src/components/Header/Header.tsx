"use client";

import classNames from "classnames";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import styles from "./Header.module.scss";

import heartIcon from "@/assets/heartIcon.svg";
import logoIcon from "@/assets/logoIcon.svg";
import userIcon from "@/assets/userIcon.svg";

import BurgerButton from "@/components/BurgerButton";
import { useAuth } from "@/shared/auth/AuthContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated, isLoading } = useAuth();

  return (
    <header className={styles.header}>
      <div className={classNames(styles.container)}>
        <div className={styles.header__left}>
          <Link href="/" className={styles.header__logo}>
            <div className={styles.header__logoIcon}>
              <Image src={logoIcon} alt="Logo" />
            </div>

            <span>Food Client</span>
          </Link>

          <nav
            className={classNames(styles.header__nav, {
              [styles.open]: isOpen,
            })}
          >
            <Link
              href="/"
              className={pathname === "/" ? styles.active : ""}
            >
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
              href="/menu"
              className={pathname === "/menu" ? styles.active : ""}
            >
              Menu Items
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
          <Image
            src={heartIcon}
            alt="Favorites"
            className={classNames(styles.header__icon, styles.header__heart)}
            onClick={() => router.push(isAuthenticated ? "/favorites" : "/login")}
          />

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
            isOpen={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;