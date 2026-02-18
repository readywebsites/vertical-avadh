import React, { useState, useMemo, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import useDebounce from "../hooks/useDebounce";
import PortfolioCard from "../PortfolioCard/PortfolioCard";
import PortfolioCardSkeleton from "../PortfolioCardSkeleton/PortfolioCardSkeleton";
import styles from "./Portfolio.module.css";
import { portfolioData as mockData } from "../data/portfolioData";

const filterCategories = [
  { key: "all", label: "All Projects" },
  { key: "residential", label: "Residential" },
  { key: "commercial", label: "Commercial" },
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Simulate fetching data on component mount
  useEffect(() => {
    // In a real app, you would fetch data from an API here.
    const timer = setTimeout(() => {
      setPortfolioItems(mockData);
      setIsLoading(false);
    }, 1500); // Simulate a 1.5-second network delay

    return () => clearTimeout(timer);
  }, []);

  const filteredItems = useMemo(() => {
    if (isLoading) return [];
    return portfolioItems.filter((item) => {
      const matchesCategory =
        activeFilter === "all" || item.category === activeFilter;

      const lowerCaseSearch = debouncedSearchTerm.toLowerCase().trim();
      const matchesSearch =
        !lowerCaseSearch ||
        item.title.toLowerCase().includes(lowerCaseSearch) ||
        item.location.toLowerCase().includes(lowerCaseSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, debouncedSearchTerm, portfolioItems, isLoading]);

  return (
    <div className={styles.portfolioContainer}>
      <div className={styles.portfolioFilters}>
        <div className={styles.filterButtons}>
          {filterCategories.map((category) => (
            <button
              key={category.key}
              className={`${styles.filterBtn} ${
                activeFilter === category.key ? styles.active : ""
              }`}
              onClick={() => setActiveFilter(category.key)}
            >
              {category.label}
            </button>
          ))}
        </div>
        <div className={styles.searchWrapper}>
          <input
            type="search"
            id="portfolioSearch"
            placeholder="Search by project or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          {/* You can add a search icon inside the wrapper if you like */}
        </div>
      </div>

      <motion.div layout className={styles.portfolioGrid}>
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <PortfolioCardSkeleton key={index} />
            ))
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))
          ) : (
            <motion.p
              className={styles.noResults}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No projects found matching your criteria.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Portfolio;