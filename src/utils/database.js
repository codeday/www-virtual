import mysql from 'mysql';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig()
const conn = mysql.createConnection({
  host: serverRuntimeConfig.mysql.host,
  user: serverRuntimeConfig.mysql.user,
  password: serverRuntimeConfig.mysql.password,
  database: serverRuntimeConfig.mysql.database,
});
conn.on('error', console.error);

export const addNotification = function(eventId, phone) {
<<<<<<< HEAD
  conn.query(`INSERT INTO \`www-virtual\`.\`subscriptions\` (eventId, sms) VALUES (${conn.escape(eventId)}, ${conn.escape(phone)})`);
}
=======
  conn.query(`INSERT INTO \`www-virtual\`.\`subscriptions\` (eventId, sms) VALUES (${conn.escape(eventId)}, ${conn.escape(phone)})`)
}
>>>>>>> 43a38ff260ed5ef9d476ae63a5f34689eb29af80
