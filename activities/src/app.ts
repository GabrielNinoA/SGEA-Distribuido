import express from 'express';

const app = express();

app.use(express.json());

// Endpoint de prueba
app.get('/ping', (req, res) => {
  res.json({ message: 'App funcionando' });
});

export default app;
