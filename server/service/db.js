import sqlite3 from 'sqlite3'
import {open} from 'sqlite'

sqlite3.verbose()
let dbInstance = null;

export async function getDb() {
    if (dbInstance) return dbInstance;
    const db = await open({
        filename: './db.sql',
        driver: sqlite3.Database
    })
    dbInstance = db;
    console.log(`Initializing DB!`)
    await db.run(`
            CREATE TABLE IF NOT EXISTS device (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name varchar(255) NOT NULL,
                token text,
                UNIQUE(token)
            )`)
    await db.run(`
            CREATE TABLE IF NOT EXISTS subscription (
                device_id INTEGER,
                topic varchar(255),
                PRIMARY KEY (device_id, topic)
                FOREIGN KEY (device_id) REFERENCES device(id)
            )`);
    return db;
}


export const SQL = {
    GET_DEVICE_BY_TOKEN: `SELECT * FROM device WHERE token=?`,
    GET_ALL_DEVICES: `SELECT * FROM device`,
    ADD_DEVICE: `INSERT INTO device (name, token) VALUES (?, ?)`,
    ADD_SUBSCRIPTION: `INSERT INTO subscription (device_id, topic) VALUES (?, ?)`,
    GET_SUBSCRIPTIONS_BY_DEVICE: `SELECT * FROM subscription WHERE device_id=?`,
    GET_SUBSCRIPTIONS: `SELECT * FROM subscription`,
    GET_TOKENS_BY_SUBSCRIPTION: `SELECT d.token FROM device d JOIN subscription s ON s.device_id = d.id WHERE s.topic = ?`,
}
