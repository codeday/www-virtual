import mysql from 'mysql';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig()
const conn = mysql.createConnection({
  host: serverRuntimeConfig.mysql.host,
  user: serverRuntimeConfig.mysql.user,
  password: serverRuntimeConfig.mysql.password,
  database: serverRuntimeConfig.mysql.database,
})

export const addNotification = function(eventId, phone) {
  conn.connect()
  conn.query(`create table IF NOT EXISTS ${eventId} (sms text null);`)
  conn.query(`INSERT INTO \`www-virtual\`.\`${eventId}\` () VALUES ('${phone}')`)
  conn.end();
}