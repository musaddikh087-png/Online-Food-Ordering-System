// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Foodie server is running!' });
});

// Connect to the database before accepting requests.
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Foodie server is running on http://localhost:${PORT}`);
  });
};

startServer();