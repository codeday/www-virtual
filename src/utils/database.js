import mysql from 'mysql';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const conn = mysql.createConnection({
  host: serverRuntimeConfig.mysql.host,
  user: serverRuntimeConfig.mysql.user,
  password: serverRuntimeConfig.mysql.password,
  database: serverRuntimeConfig.mysql.database,
});
conn.on('error', console.error);

export function addNotification(eventId, phone) {
  conn.query(
    `INSERT INTO \`www-virtual\`.\`subscriptions\` (eventId, sms)`
    + ` VALUES (${conn.escape(eventId)}, ${conn.escape(phone)})`
  );
}
