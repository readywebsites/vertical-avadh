import riversideImage from "../src/assets/images/resi-ongoing/01-riverside.webp";
import berthinaImage from "../src/assets/images/resi-ongoing/02-berthina.webp";
import onicaImage from "../src/assets/images/resi-ongoing/03-onica.webp";
import habitatImage from "../src/assets/images/resi-ongoing/04-habitat.webp";
import holiconiaImage from "../src/assets/images/resi-complete/01-holiconia.webp";
import copperstoneImage from "../src/assets/images/resi-complete/02-copperstone.webp";
import carolinaImage from "../src/assets/images/resi-complete/03-carolina.webp";
import regeliaImage from "../src/assets/images/resi-complete/04-regelia.webp";

export const onGoingProjects = [
  {
    id: "riverside",
    name: "Avadh Riverside",
    title: "Avadh Riverside",
    location: "Tukwada, Vapi",
    address: "Tukwada, Vapi",
    description: "3 & 4 BHK Ultra Luxury",
    image: riversideImage,
    badge: "New Launch",
    tags: { location: "vapi", type: "villa", bhk: ["3", "4"] },
  },
  {
    id: "bertina",
    name: "Avadh Bertina",
    title: "Avadh Bertina",
    location: "Vesu, Surat",
    address: "Vesu, Surat",
    description: "4 & 5 BHK Lifestyle Apts",
    image: berthinaImage,
    badge: "Premium",
    tags: { location: "surat", type: "apartment", bhk: ["4", "5"] },
  },
  {
    id: "onica",
    name: "Avadh Onica",
    title: "Avadh Onica",
    location: "Dumas, Surat",
    address: "Dumas, Surat",
    description: "2 BHK Apartments",
    image: onicaImage,
    badge: null,
    tags: { location: "surat", type: "apartment", bhk: ["2"] },
  },
  {
    id: "habitat",
    name: "Avadh Habitat",
    title: "Avadh Habitat",
    location: "Pal, Surat",
    address: "Pal, Surat",
    description: "3 & 4 BHK Premium Living",
    image: habitatImage,
    badge: "Upcoming",
    tags: { location: "surat", type: "apartment", bhk: ["3", "4"] },
  },
];

export const completedProjects = [
  {
    id: "holiconia",
    name: "Avadh Holiconia",
    title: "Avadh Holiconia",
    location: "Vapi, Gujarat",
    address: "Vapi, Gujarat",
    description: "Premium Residency",
    image: holiconiaImage,
    badge: "Sold Out",
    badgeType: "completed",
    tags: { location: "vapi", type: "villa", bhk: ["3"] },
  },
  {
    id: "copperstone",
    name: "Avadh Copper Stone",
    title: "Avadh Copper Stone",
    location: "Dumas Road, Surat",
    address: "Dumas Road, Surat",
    description: "Apartments",
    image: copperstoneImage,
    badge: "Sold Out",
    badgeType: "completed",
    tags: { location: "surat", type: "apartment", bhk: ["2", "3", "4"] },
  },
  {
    id: "carolina",
    name: "Avadh Carolina",
    title: "Avadh Carolina",
    location: "Dumas Road, Surat",
    address: "Dumas Road, Surat",
    description: "Apartments",
    image: carolinaImage,
    badge: "Sold Out",
    badgeType: "completed",
    tags: { location: "surat", type: "apartment", bhk: ["3"] },
  },
  {
    id: "regalia",
    name: "Avadh Regalia",
    title: "Avadh Regalia",
    location: "Navsari, Gujarat",
    address: "Navsari, Gujarat",
    description: "Premium Villas",
    image: regeliaImage,
    badge: "Sold Out",
    badgeType: "completed",
    tags: { location: "navsari", type: "villa", bhk: ["4"] },
  },
];

const allProjects = [...onGoingProjects, ...completedProjects];

// --- Filter Configuration ---

// Helper to get unique, sorted, lowercase options from project data.
const getUniqueOptions = (projects, tagKey) => {
  const allValues = projects.flatMap((p) => p.tags[tagKey] || []);
  return [...new Set(allValues)].sort();
};

export const filterOptions = {
  locations: getUniqueOptions(allProjects, "location"),
  types: getUniqueOptions(allProjects, "type"),
  bhk: getUniqueOptions(allProjects, "bhk"),
};
