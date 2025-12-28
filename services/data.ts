import { Product } from '../types';

export const products: Product[] = [
  // --- SEO & Marketing Tools ---
  {
    id: "semrush-review",
    name: "Semrush",
    category: "SEO & Marketing",
    rating: 4.8,
    reviewCount: 1240,
    logoUrl: "https://www.semrush.com/company/logo/images/semrush-logo.svg",
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
    id: "ahrefs-review",
    name: "Ahrefs",
    category: "SEO & Marketing",
    rating: 4.7,
    reviewCount: 980,
    logoUrl: "https://cdn.ahrefs.com/images/logo/logo_180x.png",
    shortDescription: "Powerful backlink checker and content research tool.",
    fullDescription: "Ahrefs boasts one of the most active web crawlers in the SEO industry. It excels at backlink analysis and finding content gaps. While its credit-based system is controversial, the quality of data regarding domain authority and site health is unmatched.",
    pros: [
      "Best-in-class backlink index",
      "Intuitive user interface",
      "Content Explorer is excellent for ideation",
      "Detailed site audit reports"
    ],
    cons: [
      "Credit-based usage limits",
      "No free trial available",
      "Expensive for solo bloggers"
    ],
    pricing: [
      { name: "Lite", price: "$99/mo", features: ["Essential data", "5 projects", "Limited credits"] },
      { name: "Standard", price: "$199/mo", features: ["Content Explorer", "Broken link building", "6 months history"] }
    ],
    verdict: "Essential for serious link building and content strategy.",
    affiliateLink: "https://ahrefs.com",
    bestFor: "Content Marketers & SEOs"
  },
  {
    id: "brevo-review",
    name: "Brevo (Sendinblue)",
    category: "Email Marketing",
    rating: 4.6,
    reviewCount: 850,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Brevo_Logo.svg/2560px-Brevo_Logo.svg.png",
    shortDescription: "The most wallet-friendly email marketing platform with CRM.",
    fullDescription: "Formerly Sendinblue, Brevo has rebranded to become a full CRM suite. It is unique because it charges based on email volume, not the number of contacts. This makes it incredibly cost-effective for businesses with large lists but low sending frequency. Deliverability rates tested high in our 2024 benchmarks.",
    pros: [
      "Unlimited contacts on all plans",
      "Built-in CRM and SMS marketing",
      "Robust free plan available",
      "Transactional email API included"
    ],
    cons: [
      "Landing page builder is basic",
      "Initial account validation can be strict",
      "Support response times vary"
    ],
    pricing: [
      { name: "Free", price: "$0/mo", features: ["Unlimited contacts", "300 emails/day", "Chat support"] },
      { name: "Starter", price: "$25/mo", features: ["No daily sending limit", "Basic reporting", "Email support"] }
    ],
    verdict: "Top choice for SMBs looking for value and scalability.",
    affiliateLink: "https://brevo.com",
    bestFor: "Small Business & Startups"
  },
  
  // --- VPN & Security ---
  {
    id: "nordvpn-review",
    name: "NordVPN",
    category: "Cybersecurity",
    rating: 4.9,
    reviewCount: 8500,
    logoUrl: "https://nordvpn.com/wp-content/themes/nordvpn/assets/images/logo/nordvpn.svg",
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
    id: "expressvpn-review",
    name: "ExpressVPN",
    category: "Cybersecurity",
    rating: 4.8,
    reviewCount: 6200,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/ExpressVPN_logo.svg/2560px-ExpressVPN_logo.svg.png",
    shortDescription: "Premium VPN service known for ease of use and speed.",
    fullDescription: "ExpressVPN is often cited as the most user-friendly VPN. Its Lightway protocol ensures instant connections and stability on mobile networks. While pricier than competitors, its TrustedServer technology (running on RAM only) guarantees that no data is ever written to a hard drive.",
    pros: [
      "TrustedServer technology (RAM-only servers)",
      "Incredibly easy to use apps",
      "Works in restrictive countries",
      "24/7 live chat support"
    ],
    cons: [
      "More expensive than average",
      "Only 5 simultaneous connections",
      "Fewer configuration options for power users"
    ],
    pricing: [
      { name: "1 Month", price: "$12.95/mo", features: ["All apps", "Unlimited bandwidth", "30-day guarantee"] },
      { name: "12 Months", price: "$6.67/mo", features: ["3 months free", "Password manager included", "Cloud backup"] }
    ],
    verdict: "Best for users who want a 'set it and forget it' privacy solution.",
    affiliateLink: "https://expressvpn.com",
    bestFor: "Ease of Use & Travel"
  },

  // --- Hosting ---
  {
    id: "bluehost-review",
    name: "Bluehost",
    category: "Web Hosting",
    rating: 4.5,
    reviewCount: 3200,
    logoUrl: "https://www.bluehost.com/blog/wp-content/uploads/2016/06/bluehost-logo.png",
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
    id: "hostinger-review",
    name: "Hostinger",
    category: "Web Hosting",
    rating: 4.8,
    reviewCount: 4500,
    logoUrl: "https://assets.hostinger.com/images/logo-hostinger-black.svg",
    shortDescription: "High-performance hosting with an intuitive hPanel interface.",
    fullDescription: "Hostinger has revolutionized budget hosting by offering LiteSpeed server performance at entry-level prices. Their custom-built hPanel is often easier for beginners to navigate than traditional cPanel. Benchmarks show impressive uptime and load speeds for the price point.",
    pros: [
      "Excellent price-to-performance ratio",
      "LiteSpeed servers included",
      "User-friendly custom hPanel",
      "Data centers globally"
    ],
    cons: [
      "No daily backups on cheapest plan",
      "Phone support is not available",
      "Strict refund policy on domains"
    ],
    pricing: [
      { name: "Premium", price: "$2.99/mo", features: ["100 Websites", "100GB SSD", "Free Email", "Unlimited Bandwidth"] },
      { name: "Business", price: "$3.99/mo", features: ["Increased Performance", "Daily Backups", "CDN Included"] }
    ],
    verdict: "Best value hosting for speed enthusiasts on a budget.",
    affiliateLink: "https://hostinger.com",
    bestFor: "Budget Performance"
  },
  {
    id: "kinsta-review",
    name: "Kinsta",
    category: "Web Hosting",
    rating: 4.9,
    reviewCount: 1100,
    logoUrl: "https://kinsta.com/wp-content/uploads/2017/01/kinsta-logo-1.png",
    shortDescription: "Premium managed WordPress hosting powered by Google Cloud.",
    fullDescription: "Kinsta offers a managed hosting experience that is virtually hands-off. Running entirely on the Google Cloud Platform's premium tier, it delivers exceptional speed and security. Their support team consists solely of WordPress engineers, ensuring high-quality assistance.",
    pros: [
      "Powered by Google Cloud Platform",
      "Hack-fix guarantee included",
      "Free migrations",
      "MyKinsta dashboard is best-in-class"
    ],
    cons: [
      "Premium pricing model",
      "No email hosting included",
      "Strict plugin restrictions for performance"
    ],
    pricing: [
      { name: "Starter", price: "$35/mo", features: ["1 WordPress install", "25k visits", "10GB storage"] },
      { name: "Pro", price: "$70/mo", features: ["2 WordPress installs", "50k visits", "20GB storage"] }
    ],
    verdict: "The ultimate choice for high-traffic, mission-critical sites.",
    affiliateLink: "https://kinsta.com",
    bestFor: "High-Traffic Sites"
  },

  // --- E-Commerce & Marketing ---
  {
    id: "shopify-review",
    name: "Shopify",
    category: "E-Commerce",
    rating: 4.7,
    reviewCount: 5100,
    logoUrl: "https://cdn.shopify.com/assets/images/logos/shopify-bag.png",
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
  },
  {
    id: "getresponse-review",
    name: "GetResponse",
    category: "Email Marketing",
    rating: 4.5,
    reviewCount: 2300,
    logoUrl: "https://www.getresponse.com/hydra/assets/images/logo/getresponse-logo-blue.svg",
    shortDescription: "Versatile marketing automation and webinar platform.",
    fullDescription: "GetResponse goes beyond email by integrating webinars and landing pages directly into the platform. It's particularly strong for course creators and marketers who need a sales funnel approach without buying separate tools. The automation builder is visual and easy to use.",
    pros: [
      "Webinar hosting included",
      "Visual automation builder",
      "Conversion funnels feature",
      "Paid ads management"
    ],
    cons: [
      "Deliverability can fluctuate",
      "Drag-and-drop builder can be slow",
      "Phone support only on max tier"
    ],
    pricing: [
      { name: "Email Marketing", price: "$19/mo", features: ["Autoresponders", "Unlimited landing pages", "Basic segmentation"] },
      { name: "Marketing Automation", price: "$59/mo", features: ["Event-based automation", "Webinars", "Advanced segmentation"] }
    ],
    verdict: "Great all-rounder for marketers who need webinars and email combined.",
    affiliateLink: "https://getresponse.com",
    bestFor: "Marketers & Educators"
  }
];