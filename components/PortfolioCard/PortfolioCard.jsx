import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import styles from "./Portfolio.module.css";

const PortfolioCard = ({ item }) => {
  return (
    <motion.div
      layout // Animates position changes in the grid
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={styles.portfolioCard}
    >
      <img src={item.image} alt={item.title} className={styles.pCardImage} />
      <div className={styles.pCardContent}>
        <h3 className={styles.pCardTitle}>{item.title}</h3>
        <p className={styles.pCardLoc}>{item.location}</p>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;