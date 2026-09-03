const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.emiPlan.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();

  const iphone = await prisma.product.create({
    data: {
      slug: "iphone-17-pro",
      name: "iPhone 17 Pro",
      brand: "Apple",
      description: "Premium Apple smartphone with advanced performance.",
      variants: {
        create: [
          {
            color: "Silver",
            storage: "256GB",
            mrp: 139999,
            price: 129999,
            imageUrl:
              "https://placehold.co/600x600?text=iPhone+17+Pro+Silver",
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
            imageUrl:
              "https://placehold.co/600x600?text=iPhone+17+Pro+Black",
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

  const samsung = await prisma.product.create({
    data: {
      slug: "samsung-galaxy-s24-ultra",
      name: "Samsung Galaxy S24 Ultra",
      brand: "Samsung",
      description:
        "Flagship Samsung smartphone with powerful camera and display.",
      variants: {
        create: [
          {
            color: "Titanium Black",
            storage: "256GB",
            mrp: 134999,
            price: 119999,
            imageUrl:
              "https://placehold.co/600x600?text=Galaxy+S24+Ultra+Black",
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
            imageUrl:
              "https://placehold.co/600x600?text=Galaxy+S24+Ultra+Gray",
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

  const pixel = await prisma.product.create({
    data: {
      slug: "google-pixel-9-pro",
      name: "Google Pixel 9 Pro",
      brand: "Google",
      description:
        "Google flagship smartphone with advanced AI-powered features.",
      variants: {
        create: [
          {
            color: "Obsidian",
            storage: "128GB",
            mrp: 109999,
            price: 94999,
            imageUrl:
              "https://placehold.co/600x600?text=Pixel+9+Pro+Obsidian",
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
            imageUrl:
              "https://placehold.co/600x600?text=Pixel+9+Pro+Porcelain",
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

  console.log("Seed completed successfully!");

  console.log("Products created:");
  console.log("-", iphone.name);
  console.log("-", samsung.name);
  console.log("-", pixel.name);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
