"use client";

import { useAuth } from "@/shared/auth/AuthContext";
import styles from "./ProfilePage.module.scss";

const ProfilePage = () => {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Not authorized</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Profile</h1>

        <p className={styles.info}>
          <span>Username:</span> {user.username}
        </p>

        <p className={styles.info}>
          <span>Email:</span> {user.email}
        </p>

        <button className={styles.logout} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;