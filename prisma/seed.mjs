import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany({});
  console.log("deletou tds produtos");
  const product = {
    imageUrl:
      "https://api.store.vivo.com.br/medias/515Wx515H-DGAP2126-1-.jpg?context=bWFzdGVyfHByb2R1Y3RpbWFnZXN8MTcxNDF8aW1hZ2UvanBlZ3xhR1prTDJnek5TODVNREkwTnpVd05UVXhNRGN3THpVeE5WZDROVEUxU0Y5RVIwRlFNakV5Tmw4Z0tERXBMbXB3Wnd8M2JkZDYyOGQ5ZmFmOTQ2OWJkNTBlOGE0ZWI4MDQ1NTQzYThlZDc3MDhiZGQwZjYzMTVmODY2NzAwZTcyN2ZmZA",
    name: "Product 1",
    description: "Description for Product 1",
    price: 19.99,
    stockQuantity: 100,
  };

  for (let i = 0; i < 15000; i++) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("Seeding completed");
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
