import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const quoteData: Prisma.QuoteCreateInput[] = [
  {
    name: "Luis",
    email: "luis@launchcode.com",
    adults: 1,
    departDate: new Date("03/10/2023"),
    returnDate: new Date("03/20/2023"),
    destination: "YYC - Calgary, Canada",
    origin: "CWB - Curitiba, Brazil",
  },
  {
    name: "Alice",
    email: "alice@launchcode.com",
    adults: 2,
    departDate: new Date("02/28/2023"),
    returnDate: new Date("02/28/2023"),
    destination: "DXB - Dubai, United Arab Emirates",
    origin: "LAX - Los Angeles, United States",
    transportation: "Rented Car",
  },
  {
    name: "John",
    email: "john@launchcode.com",
    adults: 1,
    departDate: new Date("05/28/2023"),
    returnDate: new Date("07/28/2023"),
    destination: "MIA - Miami, United States",
    origin: "KUL - Kuala Lumpur, Malaysia",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of quoteData) {
    const quote = await prisma.quote.create({
      data: u,
    });
    console.log(`Created quote with id: ${quote.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
