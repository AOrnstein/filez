import db from "#db/client";

/**
 * @param {{name:string, size:number, folder:number|{id:number,name:string}}}
 * @returns added file
 * */
export async function createFile({ name, size, folder }) {
  const sql = `
    INSERT INTO files
        (name, size, folder_id)
    VALUES
        ($1, $2, $3)
    RETURNING *
    `;
  const {
    rows: [file],
  } = await db.query(sql, [name, size, folder?.id ?? folder]);
  return file;
}

/** @returns list of all files  */
export async function getFiles() {
  const sql = `
    SELECT
        files.*,
        folders.name AS folder_name
    FROM 
        files
        JOIN folders ON folders.id = files.folder_id
    `;
  const { rows: files } = await db.query(sql);
  return files;
}
