import { model, modelID } from "@/ai/providers";
import { weatherTool } from "@/ai/tools";
import { convertToModelMessages, streamText, UIMessage } from "ai";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

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
  });

  const response = result.toUIMessageStreamResponse();

  // Kompletnie usuń cache
  response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}
