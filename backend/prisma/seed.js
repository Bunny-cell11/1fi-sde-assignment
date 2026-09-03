const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Clearing existing data...");

  await prisma.emiPlan.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();

  console.log("Creating products...");

  // ==================================================
  // 1. iPhone 17 Pro
  // ==================================================

  const iphone = await prisma.product.create({
    data: {
      slug: "iphone-17-pro",
      name: "iPhone 17 Pro",
      brand: "Apple",
      description:
        "Premium Apple smartphone with advanced performance and a professional camera system.",

      variants: {
        create: [
          {
            color: "Silver",
            storage: "256GB",
            mrp: 139999,
            price: 129999,
            imageUrl: "/images/iphone-17-pro-silver.jpg",

            emiPlans: {
              create: [
                {
                  monthlyAmount: 10833,
                  tenure: 12,
                  interestRate: 0,
                  cashback: 3000,
                },
                {
                  monthlyAmount: 5417,
                  tenure: 24,
                  interestRate: 8.99,
                  cashback: 5000,
                },
              ],
            },
          },

          {
            color: "Black",
            storage: "256GB",
            mrp: 139999,
            price: 129999,
            imageUrl: "/images/iphone-17-pro-black.png",

            emiPlans: {
              create: [
                {
                  monthlyAmount: 10833,
                  tenure: 12,
                  interestRate: 0,
                  cashback: 3000,
                },
                {
                  monthlyAmount: 5417,
                  tenure: 24,
                  interestRate: 8.99,
                  cashback: 5000,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // ==================================================
  // 2. Samsung Galaxy S24 Ultra
  // ==================================================

  const samsung = await prisma.product.create({
    data: {
      slug: "samsung-galaxy-s24-ultra",
      name: "Samsung Galaxy S24 Ultra",
      brand: "Samsung",
      description:
        "Flagship Samsung smartphone with a powerful camera, titanium design and immersive display.",

      variants: {
        create: [
          {
            color: "Titanium Black",
            storage: "256GB",
            mrp: 134999,
            price: 119999,
            imageUrl: "/images/galaxy-s24-ultra-black.jpg",

            emiPlans: {
              create: [
                {
                  monthlyAmount: 10000,
                  tenure: 12,
                  interestRate: 0,
                  cashback: 2500,
                },
                {
                  monthlyAmount: 5000,
                  tenure: 24,
                  interestRate: 9.99,
                  cashback: 4000,
                },
              ],
            },
          },

          {
            color: "Titanium Gray",
            storage: "512GB",
            mrp: 149999,
            price: 134999,
            imageUrl: "/images/galaxy-s24-ultra-gray.jpg",

            emiPlans: {
              create: [
                {
                  monthlyAmount: 11250,
                  tenure: 12,
                  interestRate: 0,
                  cashback: 3000,
                },
                {
                  monthlyAmount: 5625,
                  tenure: 24,
                  interestRate: 9.99,
                  cashback: 4500,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // ==================================================
  // 3. Google Pixel 9 Pro
  // ==================================================

  const pixel = await prisma.product.create({
    data: {
      slug: "google-pixel-9-pro",
      name: "Google Pixel 9 Pro",
      brand: "Google",
      description:
        "Google flagship smartphone with advanced AI-powered features and an innovative camera system.",

      variants: {
        create: [
          {
            color: "Obsidian",
            storage: "128GB",
            mrp: 109999,
            price: 94999,
            imageUrl: "/images/pixel-9-pro-obsidian.jpg",

            emiPlans: {
              create: [
                {
                  monthlyAmount: 7917,
                  tenure: 12,
                  interestRate: 0,
                  cashback: 2000,
                },
                {
                  monthlyAmount: 3958,
                  tenure: 24,
                  interestRate: 8.99,
                  cashback: 3000,
                },
              ],
            },
          },

          {
            color: "Porcelain",
            storage: "256GB",
            mrp: 119999,
            price: 104999,
            imageUrl: "/images/pixel-9-pro-porcelain.svg",

            emiPlans: {
              create: [
                {
                  monthlyAmount: 8750,
                  tenure: 12,
                  interestRate: 0,
                  cashback: 2000,
                },
                {
                  monthlyAmount: 4375,
                  tenure: 24,
                  interestRate: 8.99,
                  cashback: 3000,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // ==================================================
  // Seed Summary
  // ==================================================

  console.log("");
  console.log("=================================");
  console.log("Seed completed successfully!");
  console.log("=================================");
  console.log("");

  console.log("Products created:");
  console.log(`1. ${iphone.name} - 2 variants`);
  console.log(`2. ${samsung.name} - 2 variants`);
  console.log(`3. ${pixel.name} - 2 variants`);

  console.log("");
  console.log("Total:");
  console.log("- 3 products");
  console.log("- 6 variants");
  console.log("- 12 EMI plans");
  console.log("- Local product images");
}

main()
  .catch((error) => {
    console.error("");
    console.error("Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });