import utopiaSuratImage from "../../src/assets/images/club/01-utopia-surat.webp";
import utopiaVapiPlusImage from "../../src/assets/images/club/02-utopia-vapi-plus.webp";
import utopiaVapiImage from "../../src/assets/images/club/03-utopia-vapi.webp";

const clubProjects = [
  {
    id: 1,
    title: "Avadh Utopia Plus",
    location: "Vapi, Gujarat",
    type: "Club",
    status: "Operational",
    image: utopiaVapiPlusImage,
    badge: "Premium",
    description: "Lifestyle Club",
    category: "club",
  },
  {
    id: 2,
    title: "Avadh Utopia, Vapi",
    location: "Vapi, Gujarat",
    type: "Club",
    status: "Operational",
    image: utopiaVapiImage,
    badge: "Luxury",
    description: "Lifestyle Club",
    category: "club",
  },
  {
    id: 3,
    title: "Avadh Utopia, Surat",
    location: "Dumas Road, Surat",
    type: "Club",
    status: "Booking Open",
    image: utopiaSuratImage,
    badge: "Booking Open",
    description: "Events & Weddings",
    category: "club",
  },
];

export default clubProjects;
