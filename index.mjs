import { streamText } from 'ai'

const result = streamText({
  model: 'google/gemini-3.6-flash',
  prompt: 'Why is the sky blue?'
})

for await (const chunk of result.textStream) {
  process.stdout.write(chunk)
}
