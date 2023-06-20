import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>
        Voici seb les 2 chatBots que je t'ai cré avec OpenAi
      </h1>
      <div>
        <div>
          <Link href="/chatgpt2">
          <h2>
            chatbot avec gpt 2
          </h2>
          </Link>
        </div>
        <div>
          <h2>
            chatbot avec gpt 3.5
          </h2>
        </div>
      </div>
    </main >
  )
}
