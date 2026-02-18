import React from 'react';
import { motion } from 'framer-motion';
import styles from '../Portfolio/Portfolio.module.css';

const PortfolioCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`${styles.portfolioCard} ${styles.skeleton}`}
    >
      <div className={styles.pCardImage}></div>
      <div className={styles.pCardContent}>
        <div className={`${styles.pCardTitle} ${styles.skeletonText}`}></div>
        <div className={`${styles.pCardLoc} ${styles.skeletonText}`}></div>
      </div>
    </motion.div>
  );
};

export default PortfolioCardSkeleton;