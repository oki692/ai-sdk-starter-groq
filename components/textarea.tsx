import { modelID } from "@/ai/providers";
import { ModelPicker } from "./model-picker";
import { PromptBox } from "./prompt-box";

interface InputProps {
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
  status: string;
  selectedModel: modelID;
  setSelectedModel: (model: modelID) => void;
}

export const Textarea = ({
  input,
  handleInputChange,
  isLoading,
  selectedModel,
  setSelectedModel,
}: InputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      const form = e.currentTarget as HTMLFormElement;
      form.requestSubmit();
    }
  };

  return (
    <div className="relative w-full pt-4">
      <form className="contents" onSubmit={handleSubmit}>
        <PromptBox
          value={input}
          autoFocus
          placeholder={"Say something..."}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (input.trim() && !isLoading) {
                const form = e.currentTarget.closest("form");
                if (form) form.requestSubmit();
              }
            }
          }}
          disabled={isLoading}
        />
      </form>
      <ModelPicker
        setSelectedModel={setSelectedModel}
        selectedModel={selectedModel}
      />
    </div>
  );
};
