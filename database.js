const Database = require('better-sqlite3');
const db = new Database('bot.db');
const shopDb = new Database('shop.db');


// Enabling WAL mode for better performance
db.pragma('journal_mode = WAL');

shopDb.pragma('journal_mode = WAL');

db.exec(
    `
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        coins INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ); 
`);


shopDb.exec(
    `
    CREATE TABLE IF NOT EXISTS shop (
        ItemID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price INTEGER DEFAULT 0
    );

`);
// Prepared statements
db.upsertUser = db.prepare(`
  INSERT INTO users (id, username)
  VALUES (@id, @username)
  ON CONFLICT(id) DO UPDATE SET username = excluded.username
`);

db.getUser    = db.prepare(`SELECT * FROM users WHERE id = ?`);
db.addCoins   = db.prepare(`UPDATE users SET coins = coins + ? WHERE id = ?`);

// Prepared statements
shopDb.updateShop = shopDb.prepare(`
    INSERT INTO shop (name, price)
    VALUES (@name, @price)
`);

module.exports = {
    db,
    shop: shopDb
};