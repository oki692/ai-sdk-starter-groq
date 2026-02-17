import type { UIMessage } from "ai";
import { Message } from "./message";
import { StreamingIndicator } from "./streaming-indicator";
import { useScrollToBottom } from "@/lib/hooks/use-scroll-to-bottom";

export const Messages = ({
  messages,
  isLoading,
  status,
}: {
  messages: UIMessage[];
  isLoading: boolean;
  status: "error" | "submitted" | "streaming" | "ready";
}) => {
  const [containerRef, endRef] = useScrollToBottom();
  const isStreaming = status === "streaming";
  
  return (
    <div
      className="flex-1 h-full space-y-4 overflow-y-auto py-8"
      ref={containerRef}
    >
      <div className="max-w-xl mx-auto pt-8">
        {messages.map((m, i) => (
          <Message
            key={i}
            isLatestMessage={i === messages.length - 1}
            isLoading={isLoading}
            message={m}
            status={status}
          />
        ))}
        <div className="px-4 py-2">
          <StreamingIndicator isStreaming={isStreaming} />
        </div>
        <div className="h-1" ref={endRef} />
      </div>
    </div>
  );
};
