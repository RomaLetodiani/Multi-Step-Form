import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Mount userRoutes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
