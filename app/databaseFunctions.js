import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

let db;

// ✅ Open DB (new API)
if (Platform.OS !== 'web') {
  db = SQLite.openDatabaseSync('plant.db');
}

// ✅ Create table
export const createTable = () => {
  if (Platform.OS === 'web') {
    console.log("SQLite not supported on web");
    return;
  }

  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        disease TEXT,
        confidence REAL,
        image TEXT,
        date TEXT
      );
    `);

    console.log("✅ Table created successfully");

  } catch (error) {
    console.log("❌ Error creating table:", error);
  }
};

// ✅ Insert data
export const insertHistory = (disease, confidence, image, date) => {
  if (Platform.OS === 'web') return;

  try {
    db.runSync(
      `INSERT INTO history (disease, confidence, image, date)
       VALUES (?, ?, ?, ?);`,
      [disease, confidence, image, date]
    );

    console.log("✅ Data inserted");

  } catch (error) {
    console.log("❌ Insert error:", error);
  }
};

// ✅ Fetch all history
export const getHistory = () => {
  if (Platform.OS === 'web') return [];

  try {
    const result = db.getAllSync(
      `SELECT * FROM history ORDER BY id DESC;`
    );

    return result;

  } catch (error) {
    console.log("❌ Fetch error:", error);
    return [];
  }
};

// ✅ Delete one item
export const deleteHistory = (id) => {
  if (Platform.OS === 'web') return;

  try {
    db.runSync(
      `DELETE FROM history WHERE id = ?;`,
      [id]
    );

    console.log("✅ Deleted");

  } catch (error) {
    console.log("❌ Delete error:", error);
  }
};