'use client'

import { AddUser } from "/firebase/AddUser.js"
import { ReadUser } from "/firebase/ReadUser.js"
import { useCompletion } from "ai/react"

export default function Quiz() {
  const { completion, input, handleInputChange, handleSubmit } = useCompletion();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
          <form onSubmit={handleSubmit}>
            <input
              className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2 dark:text-black"
              value={input}
              placeholder="Describe your business..."
              onChange={handleInputChange}
            />
          </form>
          {completion ? (
            <div className="whitespace-pre-wrap my-4">{completion}</div>
          ) : (
            <div>Enter a business description and click enter to generate slogans.</div>
          )}
        </div>
      </div>
    </main>
  )
}
