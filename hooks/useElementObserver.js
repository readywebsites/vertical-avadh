import { useEffect } from "react";

/**
 * A custom hook to apply an IntersectionObserver to a set of elements matched by a selector.
 * This is an intermediate refactoring step. The ideal long-term solution is to use a ref-based
 * `useIntersectionObserver` on a per-component basis rather than global selectors.
 *
 * @param {string} selector - The CSS selector for the elements to observe.
 * @param {function(IntersectionObserverEntry, IntersectionObserver): void} callback - The function to call for each intersecting entry.
 * @param {IntersectionObserverInit} options - The options for the IntersectionObserver.
 */
const useElementObserver = (selector, callback, options) => {
  // To prevent the effect from re-running on every render due to a new `options` object,
  // we stringify it to create a stable, primitive dependency for the useEffect hook.
  const stringifiedOptions = JSON.stringify(options);

  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
      return;
    }

    const observerOptions = JSON.parse(stringifiedOptions);
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        callback(entry, obs);
      });
    }, observerOptions);

    elements.forEach((element) => {
      observer.observe(element);

      // Also check if element is already in viewport on first observation
      const rect = element.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInViewport) {
        // Trigger callback for already-visible elements
        const syntheticEntry = {
          isIntersecting: true,
          target: element,
          boundingClientRect: rect,
          intersectionRatio: 1,
          rootBounds: null,
          time: Date.now(),
        };
        // Use setTimeout to ensure it fires after observer is fully set up
        setTimeout(() => callback(syntheticEntry, observer), 0);
      }
    });

    // Cleanup function to disconnect observers
    return () => {
      observer.disconnect();
    };
  }, [selector, callback, stringifiedOptions]); // Dependencies are now stable.
};

export default useElementObserver;
