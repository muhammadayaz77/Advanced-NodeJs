import express from 'express';
import { con, connectDB } from './db.mjs';

const app = express();
app.use(express.json());

// Connect to DB first
connectDB().then(() => {
  app.post('/post-data', async (req, res) => {
    try {
      const { id, fname, lname, email, dept, salary } = req.body;
      
      // Validate required fields
      if (!id || !fname || !lname || !email || !dept || !salary) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const currentDate = new Date().toISOString();
      const query = `
        INSERT INTO employees (emp_id, fname, lname, dept, salary, email, hire_date) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`;
      
      const result = await con.query(query, [
        id, fname, lname, dept, salary, email, currentDate
      ]);

      res.status(201).json({ 
        message: 'Data posted successfully',
        data: result.rows[0]
      });
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ 
        error: 'Failed to post data',
        details: err.message // Send only the message in production
      });
    }
  });

  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
}).catch(err => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});