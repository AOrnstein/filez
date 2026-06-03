import db from "#db/client";
import { addFile } from "#db/queries/files";
import { addFolder } from "#db/queries/folders";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 0; i < 3; i++) {
    const folder = await addFolder({ name: `dir${i}` });
    for (let j = 0; j < 5; j++) {
      await addFile({
        name: `file${j}`,
        size: 50,
        folder: folder,
      });
    }
  }
}
