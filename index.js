const { Client } = require('pg');

const dbConfig = {
  user: '',
  host: '',
  database: '',
  password: '',
  port: 5432, 
};

async function deleteOldEntries() {
  const client = new Client(dbConfig);

  try {
    await client.connect();

    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const result = await client.query(
      `DELETE FROM visitor_visitor WHERE startdate < $1`,
      [twelveMonthsAgo]
    );

    console.log(`${result.rowCount} entries deleted.`);
  } catch (err) {
    console.error('Error executing query', err);
  } finally {
    await client.end();
  }
}

deleteOldEntries();