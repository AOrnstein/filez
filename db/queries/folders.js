import db from "#db/client";

/** @returns added folder */
export async function addFolder({ name }) {
  const sql = `
    INSERT INTO folders
        (name)
    VALUES
        ($1)
    RETURNING *
    `;
  const {
    rows: [folder],
  } = await db.query(sql, [name]);
  return folder;
}
