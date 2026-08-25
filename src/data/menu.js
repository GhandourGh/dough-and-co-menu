export const categories = [
  { id: "popular", label: "Popular" },
  { id: "donuts", label: "Donuts" },
  { id: "coffee", label: "Espresso bar" },
  { id: "iced", label: "Iced & cold brew" },
  { id: "other", label: "Not coffee" },
  { id: "bakery", label: "Bakery" },
  { id: "boxes", label: "Boxes" },
];

const images = {
  donuts: "/assets/donut-1.webp",
  coffee: "/assets/espresso.webp",
  iced: "/assets/icedlatte.webp",
  other: "/assets/matcha.webp",
  bakery: "/assets/donut-4.webp",
  boxes: "/assets/donut-2.webp",
};

export const menu = [
  { id: "strawberry", category: "donuts", badge: "Bestseller", name: "Strawberry", description: "Fragrant strawberry glaze with a bright berry finish.", price: 4, image: "/assets/donut-1.webp", featured: true },
  { id: "sprinkle", category: "donuts", badge: "Bestseller", name: "Choc sprinkle", description: "Dark chocolate glaze and rainbow crunch, edge to edge.", price: 4.25, image: "/assets/donut-2.webp", featured: true },
  { id: "caramel", category: "donuts", name: "Caramel peanut", description: "Salted peanuts, soft caramel, and a dark chocolate drizzle.", price: 4.75, image: "/assets/donut-3.webp" },
  { id: "vanilla", category: "donuts", name: "Vanilla shell", description: "A thin Tahitian vanilla shell over airy brioche.", price: 3.5, image: "/assets/donut-4.webp" },
  { id: "crumble", category: "donuts", badge: "New", name: "Berry crumble", description: "Berry glaze and a generous freeze-dried fruit crumb.", price: 4.5, image: "/assets/donut-5.webp" },
  { id: "boston", category: "donuts", name: "Boston cream", description: "Crème pâtissière piped thick with a glossy dark lid.", price: 4.25, image: "/assets/donut-2.webp" },
  { id: "pistachio", category: "donuts", badge: "Sold out", name: "Pistachio cream", description: "Sicilian pistachio custard with chopped roasted nuts.", price: 4.75, image: "/assets/donut-3.webp", soldOut: true },
  { id: "cinnamon", category: "donuts", name: "Cinnamon sugar", description: "Tossed warm in Ceylon cinnamon and cane sugar.", price: 3.5, image: "/assets/donut-4.webp" },

  { id: "espresso", category: "coffee", name: "Espresso", description: "Two shots with notes of cocoa and dried fig.", price: 3.25, image: "/assets/espresso.webp" },
  { id: "doppio", category: "coffee", name: "Doppio", description: "Four ounces. No milk, no mercy.", price: 3.75 },
  { id: "macchiato", category: "coffee", name: "Macchiato", description: "Espresso marked with a spoon of silky foam.", price: 3.75 },
  { id: "cortado", category: "coffee", name: "Cortado", description: "Equal parts milk and espresso in perfect balance.", price: 4 },
  { id: "americano", category: "coffee", name: "Americano", description: "A long black poured over hot water.", price: 4 },
  { id: "flatwhite", category: "coffee", badge: "Bestseller", name: "Flat white", description: "Six ounces of glossy microfoam and a double shot.", price: 4.75, image: "/assets/latte-art.webp", featured: true },
  { id: "cappuccino", category: "coffee", name: "Cappuccino", description: "Classic thirds, dusted with our darkest cocoa.", price: 4.5 },
  { id: "latte", category: "coffee", name: "Latte", description: "Twelve ounces, gently sweet and endlessly smooth.", price: 5, image: "/assets/latte-art.webp" },
  { id: "mocha", category: "coffee", name: "Mocha", description: "House ganache stirred into a double espresso.", price: 5.25 },
  { id: "batch", category: "coffee", badge: "Vegan", name: "Batch brew", description: "A rotating single origin, brewed bright and poured fast.", price: 3.75 },

  { id: "coldbrew", category: "iced", name: "Cold brew", description: "Steeped for eighteen slow hours, served over ice.", price: 4.75, image: "/assets/cold-brew.webp" },
  { id: "icedlatte", category: "iced", badge: "Bestseller", name: "Iced latte", description: "A double shot and cold milk over clear ice.", price: 5, image: "/assets/iced-latte-new.webp", featured: true },
  { id: "icedamericano", category: "iced", name: "Iced coffee", description: "Chilled coffee and milk poured over plenty of ice.", price: 4.5, image: "/assets/iced-coffee.webp" },
  { id: "esptonic", category: "iced", badge: "New", name: "Iced caramel", description: "Espresso, cold milk, and a ribbon of caramel over ice.", price: 5.5, image: "/assets/iced-caramel.webp" },
  { id: "icedmocha", category: "iced", name: "Caramel cream", description: "Cold brew, caramel, milk, and a cloud of sweet cream.", price: 5.75, image: "/assets/caramel-cream.webp" },
  { id: "affogato", category: "iced", name: "Affogato", description: "Vanilla gelato drowned in a fresh double espresso.", price: 5.5 },

  { id: "matcha", category: "other", badge: "Bestseller", name: "Matcha latte", description: "First-harvest Uji matcha, whisked to order.", price: 5.5, image: "/assets/matcha.webp", featured: true },
  { id: "icedmatcha", category: "other", badge: "New", name: "Strawberry matcha", description: "Uji matcha layered with strawberry milk and fresh fruit.", price: 5.75, image: "/assets/strawberry-matcha.webp" },
  { id: "chai", category: "other", name: "Chai latte", description: "House masala with cracked black pepper.", price: 5 },
  { id: "choc", category: "other", name: "Dark chocolate", description: "Single-origin ganache, hot milk, and sea salt.", price: 5 },
  { id: "tea", category: "other", name: "Loose-leaf tea", description: "Choose Earl Grey, sencha, or peppermint.", price: 3.5 },
  { id: "lemonade", category: "other", badge: "Vegan", name: "Lemonade", description: "Pressed daily, gently sweet, and lightly salted.", price: 4.25 },

  { id: "croissant", category: "bakery", name: "Butter croissant", description: "Laminated over three days and baked deep gold.", price: 4, image: "/assets/butter-croissant.webp" },
  { id: "almond", category: "bakery", badge: "Bestseller", name: "Almond croissant", description: "Frangipane and a generous layer of toasted flakes.", price: 4.75, featured: true },
  { id: "roll", category: "bakery", badge: "Sold out", name: "Cinnamon roll", description: "Cream cheese glaze with a soft, warm centre.", price: 4.5, soldOut: true },
  { id: "banana", category: "bakery", name: "Banana bread", description: "Brown butter, walnut, and a proper thick slice.", price: 3.75 },
  { id: "cookie", category: "bakery", name: "Chocolate cookie", description: "Sea salt on top and still soft in the middle.", price: 3.25, image: "/assets/chocolate-cookie.webp" },

  { id: "half", category: "boxes", name: "Half dozen", description: "Choose any six donuts and we’ll box them beautifully.", price: 21 },
  { id: "dozen", category: "boxes", name: "Baker’s dozen", description: "Twelve donuts, plus one on us.", price: 38 },
  { id: "set", category: "boxes", badge: "Bestseller", name: "Coffee & donut", description: "Any drink with any single donut.", price: 7.5, featured: true },
  { id: "party", category: "boxes", name: "Party box", description: "Twenty-four donuts for the whole office.", price: 70 },
].map((item) => ({ ...item, image: item.image || images[item.category] }));

export const formatMoney = (value) => `$${value.toFixed(2)}`;
