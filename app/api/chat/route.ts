import { model, modelID } from "@/ai/providers";
import { weatherTool } from "@/ai/tools";
import { convertToModelMessages, streamText, UIMessage } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: Request) {
  const {
    messages,
    selectedModel,
  }: { messages: UIMessage[]; selectedModel: modelID } = await req.json();

  const result = streamText({
    model: model.languageModel(selectedModel),
    system: "You are a helpful assistant.",
    messages: await convertToModelMessages(messages),
    tools: {
      getWeather: weatherTool,
    },
    experimental_telemetry: {
      isEnabled: false,
    },
  });

  const response = result.toUIMessageStreamResponse({
    sendReasoning: true,
    onError: (error) => {
      if (error instanceof Error) {
        if (error.message.includes("Rate limit")) {
          return "Rate limit exceeded. Please try again later.";
        }
      }
      console.error(error);
      return "An error occurred.";
    },
  });

  // Usun wszelkie buforowanie - streaming musi byc natychmiast
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  response.headers.set("Surrogate-Control", "no-store");
  
  return response;
}
