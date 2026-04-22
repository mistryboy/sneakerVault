import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYMNgG59PAlBDYVeP6nXA1mQa1UhbVEyk",
  authDomain: "sneaker-vault-3e957.firebaseapp.com",
  projectId: "sneaker-vault-3e957",
  storageBucket: "sneaker-vault-3e957.firebasestorage.app",
  messagingSenderId: "902371549124",
  appId: "1:902371549124:web:568445fa395083a0c28e91",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const allProducts = [
  {
    name: "AERO-MAX V2",
    category: "Running",
    style: "Future-Core",
    price: 280,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop",
    tag: "NEW",
    colors: ["#A855F7", "#EF4444", "#F5F5F7"],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
  },
  {
    name: "GHOST RUNNER",
    category: "Running",
    style: "Stealth-Tech",
    price: 240,
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop",
    tag: "TRENDING",
    colors: ["#050505", "#F5F5F7", "#A855F7"],
    sizes: [7, 8, 8.5, 9, 9.5, 10, 11],
  },
  {
    name: "TITAN HIGH",
    category: "Lifestyle",
    style: "Luxury-Street",
    price: 320,
    rating: 4.9,
    reviews: 201,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
    tag: "EXCLUSIVE",
    colors: ["#EF4444", "#050505"],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
  },
  {
    name: "NEON VELOCITY",
    category: "Training",
    style: "Tech-Performance",
    price: 195,
    rating: 4.5,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop",
    tag: null,
    colors: ["#A855F7", "#22C55E", "#F5F5F7"],
    sizes: [7, 7.5, 8, 9, 10, 11],
  },
  {
    name: "VOLT STRIKER",
    category: "Running",
    style: "Carbon-Plated",
    price: 350,
    rating: 4.9,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop",
    tag: "BEST SELLER",
    colors: ["#F5F5F7", "#050505"],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
  },
  {
    name: "STEALTH CORE X",
    category: "Lifestyle",
    style: "Minimal-Tech",
    price: 210,
    rating: 4.7,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=2070&auto=format&fit=crop",
    tag: null,
    colors: ["#050505", "#A855F7"],
    sizes: [8, 9, 10, 11, 12],
  },
  {
    name: "NEON CITY 7",
    category: "Lifestyle",
    style: "Street-Luxury",
    price: 275,
    rating: 4.8,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=2070&auto=format&fit=crop",
    tag: "LIMITED",
    colors: ["#EF4444", "#A855F7", "#F5F5F7"],
    sizes: [7, 8, 9, 10, 11],
  },
  {
    name: "ANCESTRAL TECH",
    category: "Heritage",
    style: "Retro-Future",
    price: 290,
    rating: 4.6,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=1974&auto=format&fit=crop",
    tag: null,
    colors: ["#F5F5F7", "#A855F7", "#050505"],
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
  },
  {
    name: "RUNNING EDGE",
    category: "Running",
    style: "Competition",
    price: 165,
    rating: 4.4,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    tag: null,
    colors: ["#EF4444", "#F5F5F7"],
    sizes: [7, 8, 9, 10, 11, 12],
  },
  {
    name: "MAXIM WEAR",
    category: "Training",
    style: "All-Terrain",
    price: 114,
    rating: 4.3,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1925&auto=format&fit=crop",
    tag: "SALE",
    colors: ["#050505", "#F5F5F7"],
    sizes: [8, 9, 10, 11],
  },
  {
    name: "CLOUD STRIKE",
    category: "Running",
    style: "Comfort-Max",
    price: 225,
    rating: 4.7,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=2071&auto=format&fit=crop",
    tag: "NEW",
    colors: ["#F5F5F7", "#A855F7", "#22C55E"],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
  },
  {
    name: "LIQUID FLOW",
    category: "Lifestyle",
    style: "Future-Casual",
    price: 185,
    rating: 4.5,
    reviews: 73,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1780&auto=format&fit=crop",
    tag: null,
    colors: ["#A855F7", "#F5F5F7"],
    sizes: [8, 9, 10, 11, 12],
  },
];

async function seed() {
  console.log("Starting DB seed...");
  for (const product of allProducts) {
    product.createdAt = new Date().toISOString();
    product.inStock = true;
    product.newRelease = product.tag === 'NEW';
    product.hoverImage = product.image;
    
    await addDoc(collection(db, "products"), product);
    console.log("Imported " + product.name);
  }
  console.log("Database successfully seeded!");
  process.exit(0);
}

seed();
