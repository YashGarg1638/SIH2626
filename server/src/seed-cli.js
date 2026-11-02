// Node entry point for the demo-data generator: `npm run seed` recreates server/data/icms.db.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { openDb, DB_PATH, UPLOAD_DIR } from './db.js';
import { hashPassword } from './auth.js';
import { seedDatabase } from './seed.js';

export function seed() {
  for (const f of [DB_PATH, DB_PATH + '-wal', DB_PATH + '-shm']) fs.rmSync(f, { force: true });
  for (const f of fs.readdirSync(UPLOAD_DIR)) if (f !== '.gitkeep') fs.rmSync(path.join(UPLOAD_DIR, f), { force: true });
  const db = openDb();
  seedDatabase(db, {
    hashPassword,
    saveDocument: (name, bytes) => fs.writeFileSync(path.join(UPLOAD_DIR, name), bytes),
    log: console.log,
  });
  console.log(`  database: ${DB_PATH}`);
  db.close();
}

if (process.argv[1] && (path.resolve(process.argv[1]) === fileURLToPath(import.meta.url) || process.argv[1].endsWith('seed-cli.js'))) seed();
