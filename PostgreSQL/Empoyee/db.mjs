import { Client } from 'pg';

const con = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'roniayaz22757',
  database: 'employee',
});

const connectDB = async () => {
  try {
    await con.connect();
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export { con, connectDB };