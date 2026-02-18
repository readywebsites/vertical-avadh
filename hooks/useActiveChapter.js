import { useEffect } from "react";

const useActiveChapter = (setActiveChapter) => {
  useEffect(() => {
    const chapters = document.querySelectorAll(".chapter");
    if (!chapters.length) return;

    const updateActiveNav = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let currentChapter = 1;

      chapters.forEach((chapter) => {
        const chapterTop = chapter.offsetTop;
        const chapterBottom = chapterTop + chapter.offsetHeight;

        if (scrollPosition >= chapterTop && scrollPosition < chapterBottom) {
          const chapterAttr = chapter.getAttribute("data-chapter");
          if (chapterAttr) {
            currentChapter = parseInt(chapterAttr, 10);
          }
        }
      });
      setActiveChapter(currentChapter);
    };

    updateActiveNav(); // Initial call
    window.addEventListener("scroll", updateActiveNav);

    return () => {
      window.removeEventListener("scroll", updateActiveNav);
    };
  }, [setActiveChapter]);
};

export default useActiveChapter;
