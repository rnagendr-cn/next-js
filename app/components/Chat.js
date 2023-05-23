"use client"
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { nanoid } from "nanoid"
import TextareaAutosize from "react-textarea-autosize"
import styles from "./chat.module.css"

export default function Home() {
  const [input, setInput] = useState("")

  // For API calling, like Axios
  const { mutate: sendMessage, isLoading } = useMutation({
    mutationFn: async (message) => {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [message] }),
      })
      console.log(response.body)
      return response.body
    },
    onSuccess: () => {
      console.log("success")
    },
  })

  const handleKeyDown = (e) => {
    // Don't trigger for Shift + Enter key combo
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const message = {
        id: nanoid(),
        isUserMessage: true,
        text: input,
      }
      sendMessage(message)
    }
  }

  return (
    <aside className={styles.container}>
      <h1>Chat</h1>
      <TextareaAutosize
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
        rows={2}
        maxRows={4}
        autoFocus
        placeholder="Write a message..."
        className={styles.textArea}
      />
    </aside>
  )
}
