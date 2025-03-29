
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Square, Volume2 } from "lucide-react";

interface TextToSpeechProps {
  text: string;
  buttonSize?: "sm" | "default" | "lg" | "icon";
  variant?: "default" | "outline" | "ghost";
  className?: string;
}

const TextToSpeech = ({
  text,
  buttonSize = "default",
  variant = "outline",
  className,
}: TextToSpeechProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesisUtterance | null>(null);

  const speak = () => {
    if (!text || isPlaying) return;

    // Stop any existing speech
    window.speechSynthesis.cancel();

    // Create a new speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(text);
    setSpeechSynthesis(utterance);

    // Set up event handlers
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    // Start speaking
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <Button
      variant={variant}
      size={buttonSize}
      onClick={isPlaying ? stop : speak}
      className={className}
      title={isPlaying ? "Stop speaking" : "Speak text"}
    >
      {buttonSize === "icon" ? (
        isPlaying ? (
          <Square className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )
      ) : (
        <>
          {isPlaying ? (
            <>
              <Square className="mr-2 h-4 w-4" /> Stop
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" /> Listen
            </>
          )}
        </>
      )}
    </Button>
  );
};

export default TextToSpeech;
