// Helper script to show your environment variables for Vercel deployment
// Run this in Replit to get the values you need for Vercel

console.log("=== ENVIRONMENT VARIABLES FOR VERCEL ===\n");

console.log("Copy these values to Vercel Environment Variables:\n");

console.log("DATABASE_URL:");
console.log(process.env.DATABASE_URL || "Not found");
console.log("");

console.log("PGDATABASE:");
console.log(process.env.PGDATABASE || "Not found");
console.log("");

console.log("PGHOST:");
console.log(process.env.PGHOST || "Not found");
console.log("");

console.log("PGPASSWORD:");
console.log(process.env.PGPASSWORD || "Not found");
console.log("");

console.log("PGPORT:");
console.log(process.env.PGPORT || "Not found");
console.log("");

console.log("PGUSER:");
console.log(process.env.PGUSER || "Not found");
console.log("");

console.log("=== END OF ENVIRONMENT VARIABLES ===");
console.log("\nCopy each value above and add them to Vercel Environment Variables");