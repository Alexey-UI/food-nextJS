"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

import { useAuth } from "@/shared/auth/AuthContext";

import styles from "./ProfilePage.module.scss";

const ProfilePage = () => {
  const { user, logout, isLoading } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview] = useState<string | null>(null);
  const [uploading] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Not authorized</div>;

  const avatarUrl = avatarPreview

  const handleFileChange = async () => {
    console.log('вроде нет в апишке возможноси поменять аватар, хотя мб я не разобрался')
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Profile</h1>

        <div className={styles.avatarSection}>
          <div
            className={styles.avatar}
            onClick={() => fileInputRef.current?.click()}
          >
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="avatar"
                fill
                className={styles.avatarImage}
              />
            ) : (
              <span className={styles.placeholder}>
                {user.username[0].toUpperCase()}
              </span>
            )}

            <div className={styles.overlay}>
              {uploading ? "Uploading..." : "Change"}
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

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
