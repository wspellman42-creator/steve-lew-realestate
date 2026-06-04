export interface Listing {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  beds: number | null;
  baths: number;
  sqft: number;
  status: "Active" | "Pending" | "Coming Soon" | "Sold";
  openHouse?: string;
  listedBy: string;
  image: string;
  images: string[];
  description?: string;
}

export interface TeamMember {
  name: string;
  title: string;
  image: string;
  bio?: string;
}

export interface Testimonial {
  name: string;
  review: string;
  rating: number;
  date: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

export const mockListings: Listing[] = [
  {
    id: "1",
    address: "3821 W 34th St",
    city: "Indianapolis",
    state: "IN",
    zip: "46222-4625",
    price: 549900,
    beds: null,
    baths: 3,
    sqft: 5292,
    status: "Coming Soon",
    listedBy: "Steve Lew Real Estate Group",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop&auto=format",
    ],
    description:
      "Stunning property in Indianapolis with over 5,000 square feet of living space. This coming soon listing is a rare opportunity.",
  },
  {
    id: "2",
    address: "121 Halldale DR",
    city: "Whiteland",
    state: "IN",
    zip: "46184",
    price: 339900,
    beds: 3,
    baths: 2,
    sqft: 1924,
    status: "Active",
    openHouse: "Open Thu 5:30PM–7PM",
    listedBy: "Isaiah Ullery of Steve Lew Real Estate Group, LLC",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop&auto=format",
    ],
    description:
      "Beautiful 3-bedroom home in Whiteland. Open house Thursday evening — don't miss this one!",
  },
  {
    id: "3",
    address: "4285 Ironclad DR",
    city: "Bargersville",
    state: "IN",
    zip: "46106",
    price: 525000,
    beds: 4,
    baths: 3,
    sqft: 3184,
    status: "Active",
    openHouse: "Open Sat 1PM–3PM",
    listedBy: "Steve Lew of Steve Lew Real Estate Group, LLC",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&auto=format",
    ],
    description:
      "Spacious 4-bedroom home in Bargersville with open concept living and a gorgeous backyard.",
  },
  {
    id: "4",
    address: "15487 Dry Creek RD",
    city: "Noblesville",
    state: "IN",
    zip: "46060",
    price: 254900,
    beds: 3,
    baths: 3,
    sqft: 1380,
    status: "Pending",
    listedBy: "Alfonso Andolz of Steve Lew Real Estate Group, LLC",
    image:
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=600&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800&h=600&fit=crop&auto=format",
    ],
    description:
      "Charming home in Noblesville — currently pending sale.",
  },
  {
    id: "5",
    address: "3388 Buckmoor Pkwy",
    city: "Greenwood",
    state: "IN",
    zip: "46143",
    price: 415000,
    beds: 5,
    baths: 4,
    sqft: 3362,
    status: "Pending",
    listedBy: "Steve Lew of Steve Lew Real Estate Group, LLC",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&auto=format",
    ],
    description:
      "Large 5-bedroom family home in Greenwood's Buckmoor community. Currently pending.",
  },
  {
    id: "6",
    address: "482 Spring DR",
    city: "Greenwood",
    state: "IN",
    zip: "46143",
    price: 280000,
    beds: 4,
    baths: 2,
    sqft: 2076,
    status: "Pending",
    listedBy: "April Grabbe of Steve Lew Real Estate Group, LLC",
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop&auto=format",
    ],
    description:
      "Lovely 4-bedroom home on Spring Drive in Greenwood. Currently under contract.",
  },
  {
    id: "7",
    address: "8821 Pine Creek CT",
    city: "Indianapolis",
    state: "IN",
    zip: "46227",
    price: 319900,
    beds: 3,
    baths: 2,
    sqft: 1740,
    status: "Active",
    listedBy: "Tracy Miller of Steve Lew Real Estate Group, LLC",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format",
    ],
    description:
      "Move-in ready 3-bedroom on a quiet cul-de-sac in southwest Indianapolis.",
  },
  {
    id: "8",
    address: "2241 Heritage Oak DR",
    city: "Greenwood",
    state: "IN",
    zip: "46142",
    price: 459000,
    beds: 4,
    baths: 3,
    sqft: 2890,
    status: "Active",
    listedBy: "Brian Coffey of Steve Lew Real Estate Group, LLC",
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop&auto=format",
    ],
    description:
      "Stunning 4-bedroom in Heritage Oak subdivision with a 3-car garage and finished basement.",
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Steve Lew",
    title: "Managing Broker",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&auto=format",
  },
  {
    name: "Erica Lew",
    title: "Operations Manager",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&auto=format",
  },
  {
    name: "Isaiah Ullery",
    title: "Director of Sales/Broker",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format",
  },
  {
    name: "April Grabbe",
    title: "Inside Sales Rep/Broker",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&auto=format",
  },
  {
    name: "Brian Coffey",
    title: "Broker",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&auto=format",
  },
  {
    name: "Tracy Miller",
    title: "Broker",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&auto=format",
  },
  {
    name: "Autumn Stivers",
    title: "Broker",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&auto=format",
  },
  {
    name: "Sarah Alspach-Whitaker",
    title: "Broker",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&auto=format",
  },
  {
    name: "Natalie Rosetto",
    title: "Broker",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&auto=format",
  },
  {
    name: "Kelsey Rowe",
    title: "Broker",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&auto=format",
  },
  {
    name: "Amy Mack",
    title: "Broker",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&auto=format",
  },
  {
    name: "Brandon Mitchell",
    title: "Broker",
    image:
      "https://images.unsplash.com/photo-1542178243-bc20204b769f?w=400&h=400&fit=crop&auto=format",
  },
  {
    name: "Jasmeen Kahlon",
    title: "Broker",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&auto=format",
  },
  {
    name: "Jason Wolf",
    title: "Broker",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&auto=format",
  },
  {
    name: "Alfonso Andolz",
    title: "Broker",
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&auto=format",
  },
  {
    name: "Brooke Moore",
    title: "Broker",
    image:
      "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=400&h=400&fit=crop&auto=format",
  },
  {
    name: "Will Spellman",
    title: "Broker",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop&auto=format",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Amy Debon",
    review:
      "Isaiah was so patient with us as we looked to find the perfect country home. He was very knowledgeable and looked over each home as if he was buying it for himself. He pointed out things we sometimes overlooked. If you are looking for someone to help you find your next place to call home I recommend Steve Lew and working with Isaiah.",
    rating: 5,
    date: "Mar 07 2026",
  },
  {
    name: "Julie M",
    review:
      "April was the absolute best to work with! Making the home buying process super easy for us. Highly recommend her for your real estate needs!!",
    rating: 5,
    date: "Feb 27 2026",
  },
  {
    name: "Jimmy Ladd",
    review:
      "From the first meeting to closing, Steve and his team made the whole process easy. He went above and beyond to get my house sold and assisted every step of the way. You want someone hard working, creative, and an expert in his field. Call Steve.",
    rating: 5,
    date: "Feb 14 2026",
  },
  {
    name: "Lincoln Packer",
    review:
      "Tracy Miller is fantastic, she works hard helping clients, and is the type of realtor you want representing you in any transaction. Definitely Recommend Tracy and Steve Lew Real estate Group.",
    rating: 5,
    date: "Jan 26 2026",
  },
  {
    name: "Rhonda Bullard",
    review:
      "My husband and I contacted Tracy Miller regarding possibly selling our home a year before we were ready. She was patient, never pushy, and when the time came she handled everything perfectly. Highly recommend!",
    rating: 5,
    date: "Jan 15 2026",
  },
  {
    name: "Stefanie Wallace",
    review:
      "I want to share my experience with our realtor April. She went beyond helping us. We constantly were the problem and she never gave up on us. HIGHLY RECOMMEND April and Steve Lew Real Estate!",
    rating: 5,
    date: "Dec 20 2025",
  },
  {
    name: "Billy Wallace",
    review:
      "April Grabbe is a rockstar. She was extremely patient in showing us homes. She never got discouraged when deals fell through. Always professional and knowledgeable.",
    rating: 5,
    date: "Dec 18 2025",
  },
  {
    name: "Jeremy Bullard",
    review:
      "We had the privilege of working with Tracy Miller. She sold our house and was also able to find our dream home at the same time! Couldn't be happier with the whole process.",
    rating: 5,
    date: "Dec 10 2025",
  },
  {
    name: "Terry Hahn",
    review:
      "Working with Steve Lew to sell our home was an outstanding experience. From day one, Steve made us feel like we were his only client. Highly recommend!",
    rating: 5,
    date: "Nov 30 2025",
  },
  {
    name: "Kendra Nicole",
    review:
      "I learned about April from a friend and I couldn't be happier. We were first time homebuyers that had no clue what we were doing. April guided us through every step with grace and patience.",
    rating: 5,
    date: "Nov 15 2025",
  },
  {
    name: "William Nickoloff",
    review:
      "I am currently active military and it is difficult to purchase a home but Isaiah made everything so smooth and easy. He was flexible with our schedule and always had our best interest in mind.",
    rating: 5,
    date: "Nov 01 2025",
  },
  {
    name: "Hope Caraballo",
    review:
      "We cannot say enough wonderful things about working with Isaiah Ullery to purchase a home for our kids. He was patient, knowledgeable, and truly cared about finding the right fit.",
    rating: 5,
    date: "Oct 22 2025",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "check-out-our-newest-newsletter-and-a-yummy-soup-recipe",
    title: "Check out our newest newsletter and a yummy soup recipe",
    date: "January 28, 2025",
    excerpt:
      "Stay up to date with the latest from Steve Lew Real Estate Group plus a delicious soup recipe to warm up this winter season.",
    image:
      "https://images.unsplash.com/photo-1585399000684-d2f72660f092?w=600&h=400&fit=crop&auto=format",
  },
  {
    slug: "we-crashed-the-party-at-johnson-county-senior-services",
    title: "We crashed the party at Johnson County Senior Services!",
    date: "October 28, 2024",
    excerpt:
      "Last week we had the opportunity to volunteer at the beautiful new Johnson County Senior Services building. What an amazing experience giving back to our community.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop&auto=format",
  },
  {
    slug: "what-has-slre-been-up-to-this-summer",
    title: "What has SLRE been up to this summer?",
    date: "October 02, 2024",
    excerpt:
      "Have you been wondering what we have been doing in the community in 2024, besides helping our clients buy and sell homes? Let us fill you in!",
    image:
      "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&h=400&fit=crop&auto=format",
  },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}
