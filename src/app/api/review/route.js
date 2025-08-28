import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI,
});

export async function POST(req) {
  try {
    const { code } = await req.json();

    const prompt = `Analyze the following code and return a JSON object with the following keys:
        - description: A brief summary of what the code does.
        - complexity: A short evaluation of how complex the code is (e.g., Low, Medium, High).
        - accuracy: An estimate of how correct and efficient the code is.
        - styleSuggestions: Suggestions to improve code readability or style.
        - grammarIssues: Any issues in naming conventions or comments, if any.

Only return valid JSON. Here's the code:
\`\`\`
${code}
\`\`\`
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const aiMessage =
      data.choices?.[0]?.message?.content || "No response from AI.";

    let parsedReview;
    try {
      parsedReview = JSON.parse(aiMessage);
    } catch (e) {
      console.error("Failed to parse AI response:", aiMessage);
      return new Response(
        JSON.stringify({
          error: "AI response could not be parsed as JSON.",
          raw: aiMessage,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return Response.json({ review: parsedReview });
  } catch (error) {
    console.error("Error analyzing code:", error);
    return new Response(JSON.stringify({ review: "Failed to analyze code." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
