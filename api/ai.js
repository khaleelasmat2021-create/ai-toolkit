
export default async function handler(req, res) {
  const { prompt, systemPrompt } = req.body;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt + "\n\n" + prompt }] }]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Something went wrong");
    }

    res.status(200).json({ reply: data.candidates[0].content.parts[0].text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}