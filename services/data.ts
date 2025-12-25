import { Product } from '../types';

export const products: Product[] = [
  {
    id: "semrush-review",
    name: "Semrush",
    category: "SEO & Marketing",
    rating: 4.8,
    reviewCount: 1240,
    logoUrl: "https://picsum.photos/id/1/100/100",
    shortDescription: "The industry standard for SEO, keyword research, and competitor analysis.",
    fullDescription: "Semrush is widely regarded as the Swiss Army Knife of SEO. It offers a comprehensive suite of tools that covers everything from keyword research and site audits to competitor strategy analysis and PPC planning. In our tests, the keyword magic tool provided the most accurate volume data compared to competitors.",
    pros: [
      "Industry-leading keyword database accuracy",
      "Comprehensive site audit features",
      "Excellent competitor traffic analytics",
      "Content marketing toolkit included"
    ],
    cons: [
      "Steep learning curve for beginners",
      "Higher price point than smaller tools",
      "Mobile data is a separate add-on in some plans"
    ],
    pricing: [
      { name: "Pro", price: "$129.95/mo", features: ["5 Projects", "500 Keywords to track", "Competitor Analysis"] },
      { name: "Guru", price: "$249.95/mo", features: ["15 Projects", "1,500 Keywords", "Historical Data", "Content Marketing Platform"] }
    ],
    verdict: "Best overall SEO suite for agencies and serious marketers.",
    affiliateLink: "https://semrush.com",
    bestFor: "Agencies & Enterprises"
  },
  {
    id: "nordvpn-review",
    name: "NordVPN",
    category: "Cybersecurity",
    rating: 4.9,
    reviewCount: 8500,
    logoUrl: "https://picsum.photos/id/2/100/100",
    shortDescription: "Fast, secure, and reliable VPN with military-grade encryption.",
    fullDescription: "NordVPN balances speed and security better than almost any other provider on the market. With over 5,000 servers worldwide and the proprietary NordLynx protocol, we experienced minimal speed loss during our streaming tests. It also includes Threat Protection to block malware and ads at the network level.",
    pros: [
      "Blazing fast NordLynx protocol",
      "Strict no-logs policy audited by PWC",
      "Unlocks major streaming platforms easily",
      "Double VPN for extra privacy"
    ],
    cons: [
      "Map interface can be clunky on desktop",
      "Renewal prices are higher than introductory offers",
      "No router app (requires manual config)"
    ],
    pricing: [
      { name: "Standard", price: "$3.99/mo", features: ["Secure VPN", "Malware Protection", "Tracker Blocker"] },
      { name: "Plus", price: "$4.99/mo", features: ["All Standard Features", "Cross-platform Password Manager", "Data Breach Scanner"] }
    ],
    verdict: "The gold standard for personal privacy and speed.",
    affiliateLink: "https://nordvpn.com",
    bestFor: "Privacy & Streaming"
  },
  {
    id: "bluehost-review",
    name: "Bluehost",
    category: "Web Hosting",
    rating: 4.5,
    reviewCount: 3200,
    logoUrl: "https://picsum.photos/id/3/100/100",
    shortDescription: "The officially recommended hosting provider for WordPress.",
    fullDescription: "Bluehost remains one of the most accessible entry points for building a website. As an officially recommended WordPress host, their one-click installation and integrated dashboard make launching a site incredibly simple. While not the fastest for high-traffic enterprise sites, their value for money for small businesses is unbeatable.",
    pros: [
      "Free domain for the first year",
      "One-click WordPress installation",
      "24/7 Support via chat and phone",
      "Unmetered bandwidth on standard plans"
    ],
    cons: [
      "Aggressive upselling during checkout",
      "US servers only for basic plans",
      "Site migration is a paid add-on"
    ],
    pricing: [
      { name: "Basic", price: "$2.95/mo", features: ["1 Website", "10GB SSD Storage", "Free Domain"] },
      { name: "Choice Plus", price: "$5.45/mo", features: ["Unlimited Websites", "40GB SSD Storage", "Free CDN", "Daily Backups"] }
    ],
    verdict: "Best starting point for new WordPress blogs and small businesses.",
    affiliateLink: "https://bluehost.com",
    bestFor: "Beginners & WordPress"
  },
  {
    id: "shopify-review",
    name: "Shopify",
    category: "E-Commerce",
    rating: 4.7,
    reviewCount: 5100,
    logoUrl: "https://picsum.photos/id/4/100/100",
    shortDescription: "The all-in-one commerce platform to start, run, and grow a business.",
    fullDescription: "Shopify powers millions of businesses worldwide for a reason. Its ecosystem is unmatched, offering thousands of apps to extend functionality. From inventory management to payment processing with Shopify Payments, it streamlines the complex parts of e-commerce so you can focus on selling.",
    pros: [
      "Extremely user-friendly interface",
      "Huge app store ecosystem",
      "Excellent load times and uptime",
      "Integrated payment processing"
    ],
    cons: [
      "Transaction fees if not using Shopify Payments",
      "Advanced customization requires Liquid coding knowledge",
      "URL structure is rigid for SEO"
    ],
    pricing: [
      { name: "Basic", price: "$29/mo", features: ["Basic Reports", "2 Staff Accounts", "Up to 77% shipping discount"] },
      { name: "Shopify", price: "$79/mo", features: ["Professional Reports", "5 Staff Accounts", "Reduced transaction fees"] }
    ],
    verdict: "The most robust scalable platform for online stores.",
    affiliateLink: "https://shopify.com",
    bestFor: "E-commerce Stores"
  }
];