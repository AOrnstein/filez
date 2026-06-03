import db from "#db/client";
import { createFile } from "#db/queries/files";
import { createFolder } from "#db/queries/folders";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 0; i < 3; i++) {
    const folder = await createFolder({ name: `dir${i}` });
    for (let j = 0; j < 5; j++) {
      await createFile({
        name: `file${j}`,
        size: 50,
        folder: folder,
      });
    }
  }
}
