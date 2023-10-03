import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "my api key", // defaults to process.env["OPENAI_API_KEY"]
});

export async function ai(
  content: string,
  instructions: string,
  model = "gpt-3.5-turbo"
) {
  let messages: OpenAI.Chat.ChatCompletionMessage[] = [
    { role: "user", content: content },
  ];
  if (instructions)
    messages = [{ role: "system", content: instructions }, ...messages];
  const chatCompletion = await openai.chat.completions.create({
    messages,
    model,
  });

  return chatCompletion.choices[0].message.content;
}
