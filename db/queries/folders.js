import db from "#db/client";

/** @returns added folder */
export async function createFolder({ name }) {
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

/** @returns list of all folders  */
export async function getFolders() {
  const sql = `
    SELECT *
    FROM folders
    `;
  const { rows: folders } = await db.query(sql);
  return folders;
}

/** @returns the folder specified by id with its files attached */
export async function getFolder(id) {
  const sql = `
    SELECT
        *,
        (
        SELECT json_agg(files)
        FROM files
        WHERE files.folder_id = folders.id
        ) AS files
    FROM folders
    WHERE
        id = $1
  `;
  const {
    rows: [folder],
  } = await db.query(sql, [id]);
  return folder;
}
