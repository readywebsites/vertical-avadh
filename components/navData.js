/**
 * This file is the central source of truth for the main navigation tabs.
 * To add, remove, or reorder tabs in the navbar, you just need to modify this array.
 * This data is used as a fallback if the API call to `/api/navigation/` fails.
 */

// --- IMPORTANT ---
// Since the 'Asset' folder is inside 'src', we must import each image
// so the build tool can process them and provide the correct public path.

// Residential Project Images
import resOngoingRiverside from "../src/assets/images/resi-ongoing/01-riverside.webp";
import resOngoingBertina from "../src/assets/images/resi-ongoing/02-berthina.webp";
import resCompletedCarolina from "../src/assets/images/resi-complete/03-carolina.webp";
import resCompletedRegalia from "../src/assets/images/resi-complete/04-regelia.webp";
import resCompletedCopperStone from "../src/assets/images/resi-complete/02-copperstone.webp";

// Commercial Project Images
import comOngoingArkelia from "../src/assets/images/comm-ongoing/01-arkelia.webp";
import comOngoingKontina from "../src/assets/images/comm-ongoing/02-industrial.webp";
import comCompletedTextile from "../src/assets/images/comm-complete/02-texttile.webp";
import comCompletedViceroy from "../src/assets/images/comm-complete/03-viceroy.webp";
import comCompletedArena from "../src/assets/images/comm-complete/01-arena.webp";

export const navData = [
  { id: "home", chapter: 1, label: "Home" },
  { id: "about-us", chapter: 2, label: "About Us" },
  {
    id: "residential",
    chapter: 3,
    label: "Residential",
    submenu: [
      {
        id: "res-ongoing",
        title: "On-going Projects",
        projects: [
          {
            id: "res-ongoing-1",
            name: "Avadh Riverside",
            location: "Tukwada, Vapi",
            image: resOngoingRiverside,
            link: "#",
          },
          {
            id: "res-ongoing-2",
            name: "Avadh Bertina",
            location: "Vesu, surat",
            image: resOngoingBertina,
            link: "#",
          },
        ],
        viewAll: { label: "View All Residential", link: "/portfolio.html" },
      },
      {
        id: "res-completed",
        title: "Completed Projects",
        projects: [
          {
            id: "res-completed-1",
            name: "Avadh Carolina",
            location: "Dumas, Surat",
            image: resCompletedCarolina,
            link: "#",
          },
          {
            id: "res-completed-2",
            name: "Avadh Regalia",
            location: "Navsari, Surat",
            image: resCompletedRegalia,
            link: "#",
          },
          {
            id: "res-completed-3",
            name: "Avadh Copper Stone",
            location: "Dumas, Surat",
            image: resCompletedCopperStone,
            link: "#",
          },
        ],
        viewAll: { label: "View All Completed", link: "/portfolio.html" },
      },
    ],
  },
  {
    id: "commercial",
    chapter: 4,
    label: "Commercial",
    submenu: [
      {
        id: "com-ongoing",
        title: "On-going Projects",
        projects: [
          {
            id: "com-ongoing-1",
            name: "Avadh Arkelia",
            location: "Rundh, Surat",
            image: comOngoingArkelia,
            link: "#",
          },
          {
            id: "com-ongoing-2",
            name: "Avadh Kontina",
            location: "Vesu, Surat",
            image: comOngoingKontina,
            link: "#",
          },
        ],
        viewAll: { label: "View All Commercial", link: "/portfolio.html" },
      },
      {
        id: "com-completed",
        title: "Completed Projects",
        projects: [
          {
            id: "com-completed-1",
            name: "Avadh Textile Market",
            location: "Sahara Darwaja, Surat",
            image: comCompletedTextile,
            link: "#",
          },
          {
            id: "com-completed-2",
            name: "Avadh Viceroy",
            location: "Nana Varachha, Surat",
            image: comCompletedViceroy,
            link: "#",
          },
          {
            id: "com-completed-3",
            name: "Avadh Arena",
            location: "Vesu, Surat",
            image: comCompletedArena,
            link: "#",
          },
        ],
        viewAll: { label: "View All Completed", link: "/portfolio.html" },
      },
    ],
  },
  {
    id: "club",
    chapter: 5,
    label: "Lifestyle Club",
    submenu: [
      // This is a simple link-based submenu, not a project-based one.
      {
        id: "club-utopia",
        title: "Club Utopia",
        link: "#",
        isSimpleLink: true,
      },
      {
        id: "club-events",
        title: "Events & Banquets",
        link: "#",
        isSimpleLink: true,
      },
      {
        id: "club-membership",
        title: "Membership",
        link: "#",
        isSimpleLink: true,
      },
    ],
  },
  { id: "BLOG", chapter: 7, label: "BLOG" },
  {
    id: "more",
    chapter: null, // This item doesn't scroll to a chapter
    label: "More",
    submenu: [
      {
        id: "more-media",
        title: "Media",
        link: "#",
        isSimpleLink: true,
      },
      {
        id: "more-contact",
        title: "Contact Us",
        link: "#",
        isSimpleLink: true,
      },
      {
        id: "more-careers",
        title: "Careers",
        link: "#",
        isSimpleLink: true,
      },
    ],
  },
];
