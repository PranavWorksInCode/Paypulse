// PayPulse AI - Indian FinTech Market Mock Datasets & Knowledge Base

export const INITIAL_TRANSACTIONS = [
  {
    id: "TXN-984210",
    merchant: "Zerodha Broking Ltd",
    merchantCategory: "Investment & Trading",
    amount: 145000,
    currency: "INR",
    method: "UPI (GPay)",
    upiHandle: "investor99@okaxis",
    status: "HIGH_RISK",
    riskScore: 94,
    city: "Bengaluru",
    ipAddress: "103.217.12.89 (Tor Exit Node)",
    device: "iPhone 15 Pro (Jailbroken)",
    timestamp: "10 seconds ago",
    flaggedReason: "High-value UPI transfer + TOR IP + Jailbroken device signature",
    triggeredRules: ["RULE-204", "RULE-101"],
    customerName: "Rahul Sharma",
    velocityAlert: "4 transactions in past 60s"
  },
  {
    id: "TXN-984209",
    merchant: "Swiggy Instamart",
    merchantCategory: "Quick Commerce",
    amount: 840,
    currency: "INR",
    method: "UPI (PhonePe)",
    upiHandle: "ananya.v@ybl",
    status: "SAFE",
    riskScore: 4,
    city: "Mumbai",
    ipAddress: "157.34.201.12",
    device: "OnePlus 11 (Android 14)",
    timestamp: "22 seconds ago",
    flaggedReason: "Normal user behavior",
    triggeredRules: [],
    customerName: "Ananya Verma",
    velocityAlert: "Normal"
  },
  {
    id: "TXN-984208",
    merchant: "CRED Pay",
    merchantCategory: "Credit Card Settlement",
    amount: 52000,
    currency: "INR",
    method: "HDFC Regalia CC",
    upiHandle: "N/A",
    status: "SUSPICIOUS",
    riskScore: 68,
    city: "Delhi NCR",
    ipAddress: "49.36.88.102 (Proxy Detected)",
    device: "MacBook Air M2 (Chrome)",
    timestamp: "45 seconds ago",
    flaggedReason: "Unusual geo-location jump (Mumbai -> Delhi in 3 mins)",
    triggeredRules: ["RULE-309"],
    customerName: "Karan Mehta",
    velocityAlert: "Location Anomaly"
  },
  {
    id: "TXN-984207",
    merchant: "Flipkart Internet Pvt Ltd",
    merchantCategory: "E-Commerce",
    amount: 34999,
    currency: "INR",
    method: "Simpl BNPL",
    upiHandle: "N/A",
    status: "SAFE",
    riskScore: 12,
    city: "Hyderabad",
    ipAddress: "106.51.72.44",
    device: "Samsung Galaxy S23",
    timestamp: "1 minute ago",
    flaggedReason: "Normal user behavior",
    triggeredRules: [],
    customerName: "Priya Nair",
    velocityAlert: "Normal"
  },
  {
    id: "TXN-984206",
    merchant: "Zomato Gold",
    merchantCategory: "Food Delivery",
    amount: 1420,
    currency: "INR",
    method: "UPI (Paytm)",
    upiHandle: "rohit88@paytm",
    status: "SAFE",
    riskScore: 2,
    city: "Pune",
    ipAddress: "115.98.12.3",
    device: "Pixel 8 Pro",
    timestamp: "2 minutes ago",
    flaggedReason: "Verified biometrics",
    triggeredRules: [],
    customerName: "Rohit Deshmukh",
    velocityAlert: "Normal"
  },
  {
    id: "TXN-984205",
    merchant: "Razorpay Sandbox Store",
    merchantCategory: "Digital Goods",
    amount: 89000,
    currency: "INR",
    method: "ICICI NetBanking",
    upiHandle: "N/A",
    status: "HIGH_RISK",
    riskScore: 91,
    city: "Kolkata",
    ipAddress: "185.220.101.5 (Known Botnet)",
    device: "Automated Selenium Script",
    timestamp: "3 minutes ago",
    flaggedReason: "Botnet IP + Headless browser headless execution pattern",
    triggeredRules: ["RULE-412", "RULE-101"],
    customerName: "Unknown User",
    velocityAlert: "12 rapid retries"
  }
];

export const INITIAL_RULES = [
  {
    id: "RULE-101",
    name: "Multi-Device Velocity Spike",
    category: "Velocity Engine",
    threshold: "> 3 devices within 5 minutes",
    severity: "HIGH",
    enabled: true,
    action: "BLOCK_IMMEDIATE",
    triggeredToday: 142
  },
  {
    id: "RULE-204",
    name: "High-Value Night UPI Transfer",
    category: "Amount & Time Window",
    threshold: "> ₹1,00,000 between 1:00 AM - 5:00 AM IST",
    severity: "HIGH",
    enabled: true,
    action: "REQUIRE_2FA_BIOMETRIC",
    triggeredToday: 89
  },
  {
    id: "RULE-309",
    name: "Impossible Travel Geo-Jump",
    category: "Geolocation Intelligence",
    threshold: "Velocity > 800 km/hr between consecutive logins",
    severity: "MEDIUM",
    enabled: true,
    action: "FLAG_SUSPICIOUS",
    triggeredToday: 310
  },
  {
    id: "RULE-412",
    name: "Card CVV Rapid Retry Attack",
    category: "Credential Stuffing",
    threshold: "> 4 failed CVV attempts in 60 seconds",
    severity: "CRITICAL",
    enabled: true,
    action: "BLOCK_AND_ALERT",
    triggeredToday: 67
  }
];

export const CITY_RISK_METRICS = [
  { city: "Bengaluru", totalVolume: "₹ 1.84 Cr", fraudRate: "0.14%", riskLevel: "Low", flagCount: 28 },
  { city: "Mumbai", totalVolume: "₹ 1.52 Cr", fraudRate: "0.18%", riskLevel: "Low", flagCount: 34 },
  { city: "Delhi NCR", totalVolume: "₹ 1.10 Cr", fraudRate: "0.42%", riskLevel: "Medium", flagCount: 78 },
  { city: "Hyderabad", totalVolume: "₹ 78 Lakhs", fraudRate: "0.09%", riskLevel: "Low", flagCount: 12 },
  { city: "Kolkata", totalVolume: "₹ 45 Lakhs", fraudRate: "0.68%", riskLevel: "High", flagCount: 94 },
  { city: "Pune", totalVolume: "₹ 62 Lakhs", fraudRate: "0.11%", riskLevel: "Low", flagCount: 16 }
];

export const SUGGESTED_AI_PROMPTS = [
  "🔍 Analyze suspicious UPI transactions over ₹50,000 in Bengaluru",
  "🛡️ Generate Merchant Audit Report for Zerodha Broking",
  "⚡ Why was transaction TXN-984210 flagged as HIGH RISK?",
  "📈 Predict risk velocity trends for upcoming IPL / Festive Sale peak",
  "💡 Recommend optimal 2FA policy for high-value netbanking"
];

export const SYSTEM_DESIGN_INFO = {
  architectureComponents: [
    { title: "React / Vite Frontend", desc: "Glassmorphic UI, real-time WebSocket state streaming, optimistic UI updates." },
    { title: "API Gateway (Kong / NGINX)", desc: "Handles rate-limiting (100k req/min), JWT auth, and DDoS protection." },
    { title: "Kafka Event Pipeline", desc: "Pub/Sub queue processing transaction topics at 15,000 events/second." },
    { title: "Redis In-Memory Velocity Cache", desc: "Evaluates sliding-window velocity rules (e.g. 5 txns in 60s) in < 2ms latency." },
    { title: "Python FastAPI + XGBoost / GenAI", desc: "Machine Learning model calculating 0-100 risk score + LLM RAG explanation engine." },
    { title: "PostgreSQL & ClickHouse", desc: "ClickHouse OLAP for real-time analytics dashboards + Postgres OLTP for settled ledgers." }
  ],
  resumeBulletPoints: [
    "Architected PayPulse AI, a high-throughput FinTech fraud analytics platform processing simulated 15,000+ TPS with <15ms end-to-end latency.",
    "Engineered real-time rule engine & velocity cache using Redis sliding-window algorithm to detect multi-device attacks & impossible travel anomalies.",
    "Integrated an LLM-powered Financial Copilot providing natural-language fraud investigations, instant audit summaries, and automated risk scoring.",
    "Designed responsive dark glassmorphism dashboard with interactive UPI payment gateway simulator and merchant risk analytics."
  ]
};
