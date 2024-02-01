const express = require("express");
const app = express();
const cors = require("cors");
const OpenAI = require("openai");

const PORT = 3001;

app.use(cors());

app.get("/api/suggestions", async (req, res) => {
  const OPENAI_API_KEY = "your_openai_api_key";
  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
  const aiModel = "gpt-4-turbo-preview";
  const text = req.query.text;

  if (text && text.length) {
    const prompt = []
    prompt.push('You are an autocomplete assistant.')
    prompt.push('For the text content I provide as input, please give me a single text suggestion ranging from 2 to 8 words.')
    prompt.push('Start with a white space if needed.')
    prompt.push('Start with a new line if needed.')
    prompt.push('All the words should be complete.')
    prompt.push('DO NOT give more than one suggestion.')
    prompt.push('Do not add any names. Do Not add full stops in the end.')
    
    const messages = [
      {
        role: "system",
        content: prompt.join(' '),
      },
      {
        role: "user",
        content: text,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: aiModel,
      messages: messages,
    });

    const aiResponse = completion.choices[0].message.content;

    res.json({ aiResponse });
  } else {
    res.json({message: 'No input text provided.'})
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
