import type { Signal } from "@preact/signals";
import { useState } from "preact/hooks";
// import { default_care } from "../data/defaults.ts";

interface GameProps {
  text: Signal<string>;
}

export default function Game(props: GameProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    globalThis.location.href = `/game/${inputValue}`;
  };

  return (
    <div class="flex gap-8 py-6">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onInput={(e) => setInputValue((e.target as HTMLInputElement).value)}
          class="border p-2"
        />
        <button type="submit" class="ml-2 p-2 bg-blue-500 text-white">
          Submit
        </button>
      </form>
      <p class="text-3xl tabular-nums">Example: {props.text}</p>
    </div>
  );
}
