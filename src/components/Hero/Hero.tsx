import Image from "next/image";
import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/heroBg.png"
        alt="Hero background"
        fill
        priority
        className={styles.bg}
      />

      <div className={styles.overlay} />

      <div className={styles.container}>
        <div className={styles.title}>
          <Image
            src="/images/recipesTitle.svg"
            alt="Recipes"
            width={459}
            height={286}
            className={styles.hero__title}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;