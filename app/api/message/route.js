import { chatbotPrompt } from "@/app/helpers/constants/chatbot-prompt"

import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({ apiKey: "" })
const openai = new OpenAIApi(configuration)

export async function POST(req) {
  const { messages } = await req.json()
  console.log(messages)

  // Need to validate messages if all properties exist
  const parsedMessages = [...messages]

  const outboundMessages = parsedMessages.map((message) => ({
    role: message.isUserMessage ? "user" : "system",
    content: message.text,
  }))

  // Add additional context for the conversation at the top
  outboundMessages.unshift({
    role: "system",
    content: chatbotPrompt,
  })

  console.log(outboundMessages)

  const chatgpt = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: outboundMessages,
  })
  const chatgptResponse = chatgpt.data.choices[0].message

  return JSON(chatgptResponse)
}
