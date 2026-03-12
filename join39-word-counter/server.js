const express = require("express");
const app = express();

app.use(express.json());

app.post("/word-count", (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "text field is required" });
    }

    const words = text.trim().split(/\s+/).filter(Boolean);

    res.json({
      word_count: words.length
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
