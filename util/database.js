import * as SQLite from "expo-sqlite";

let db;

async function getDatabase() {
  if (!db) {
    db = await SQLite.openDatabaseAsync("places.db");
  }
  return db;
}

export async function init() {
  const database = await getDatabase();

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      long REAL NOT NULL
    );
  `);
}
