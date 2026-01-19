import * as SQLite from "expo-sqlite";

let db;

async function getDatabase() {
  if (!db) {
    db = await SQLite.openDatabaseAsync("places.db");
  }
  return db;
}

export function init() {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await getDatabase();

      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        );
      `);

      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

export async function insertPlace(place) {
    const database = await getDatabase();

    const result = await database.runAsync(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
            place.title,
            place.imageUri,
            place.address,
            place.location.lat,
            place.location.lng
        ]
    );

    return result;
}

export async function fetchPlaces() {
    const database = await getDatabase();
    const result = await database.getAllAsync('SELECT * FROM places');
    console.log('SQLResultSet:', result);
    return result;
}

export async function fetchPlaceDetail(id) {
    const database = await getDatabase();
    const place = await database.getFirstAsync('SELECT * FROM places WHERE id = ?', [id]);
    return place;
}