export default async function handler(req, res) {
  res.status(200).json({
    key_exists: process.env.GROQ_API_KEY ? "YES" : "NO",
    key_preview: process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.slice(0, 8) + "..." : "MISSING",
    node_version: process.version
  });
}