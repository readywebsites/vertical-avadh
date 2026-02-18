import resiRiversideImage from "../src/assets/images/resi-ongoing/01-riverside.webp";
import commArkeliaImage from "../src/assets/images/comm-ongoing/01-arkelia.webp";
import clubUtopiaPlusImage from "../src/assets/images/club/02-utopia-vapi-plus.webp";

export const residentialProjects = [
  {
    id: "res1",
    title: "Avadh Riverside",
    address: "Tukwada, Vapi",
    description: "3 & 4 BHK Ultra Luxury",
    image: resiRiversideImage,
    badge: "New Launch",
    location: "Vapi",
    type: "Villa",
    bhk: "3,4",
  },
  // In a real app, you'd have more projects here, fetched from an API
];

export const commercialProjects = [
  {
    id: "com1",
    title: "Avadh Arkelia",
    address: "Rundh, Surat",
    description: "Premium Retail & Offices",
    image: commArkeliaImage,
    badge: "Iconic",
    location: "surat",
    type: "office,shop",
    status: "ongoing",
  },
  // In a real app, you'd have more projects here
];

export const clubProjects = [
  {
    id: "club1",
    title: "Avadh Utopia Plus",
    address: "Vapi, Gujarat",
    description: "Lifestyle Club",
    image: clubUtopiaPlusImage,
    badge: "Premium",
    location: "vesu",
    type: "club",
    status: "operational",
  },
  // In a real app, you'd have more projects here
];

// Helper to get unique options from project data.
// In a real app, this data might come from the API directly.
const getUniqueOptions = (projects, key) => {
  if (!projects) return [];
  const allValues = projects.flatMap((p) =>
    p[key] ? p[key].split(",").map((s) => s.trim()) : [],
  );
  return [...new Set(allValues)].map((value) => ({
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
  }));
};

export const residentialFilterConfig = [
  {
    key: "location",
    label: "Location",
    data_attr: "location",
    options: getUniqueOptions(residentialProjects, "location"),
  },
  {
    key: "type",
    label: "Type",
    data_attr: "type",
    options: getUniqueOptions(residentialProjects, "type"),
  },
  {
    key: "bhk",
    label: "BHK",
    data_attr: "bhk",
    options: getUniqueOptions(residentialProjects, "bhk"),
  },
];

export const commercialFilterConfig = [
  {
    key: "location",
    label: "Location",
    data_attr: "location",
    options: getUniqueOptions(commercialProjects, "location"),
  },
  {
    key: "type",
    label: "Type",
    data_attr: "type",
    options: getUniqueOptions(commercialProjects, "type"),
  },
  {
    key: "status",
    label: "Status",
    data_attr: "status",
    options: getUniqueOptions(commercialProjects, "status"),
  },
];

export const clubFilterConfig = [
  {
    key: "location",
    label: "Location",
    data_attr: "location",
    options: getUniqueOptions(clubProjects, "location"),
  },
  {
    key: "type",
    label: "Type",
    data_attr: "type",
    options: getUniqueOptions(clubProjects, "type"),
  },
  {
    key: "status",
    label: "Status",
    data_attr: "status",
    options: getUniqueOptions(clubProjects, "status"),
  },
];
