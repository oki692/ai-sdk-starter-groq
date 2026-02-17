import { modelID } from "@/ai/providers";
import { ModelPicker } from "./model-picker";
import { PromptBox } from "./prompt-box";
import React from "react";

interface InputProps {
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
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
  return (
    <div className="relative w-full pt-4">
      <PromptBox
        isLoading={isLoading}
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
      <ModelPicker
        setSelectedModel={setSelectedModel}
        selectedModel={selectedModel}
      />
    </div>
  );
};
