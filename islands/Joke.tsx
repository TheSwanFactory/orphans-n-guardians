import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";

interface JokeProps {
  text: Signal<string>;
}

export default function Joke(props: JokeProps) {
  return (
    <div class="flex gap-8 py-6">
    <Button
      onClick={async () => {
          const response = await fetch('/api/joke');
          console.log(response);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const pending_data = response.text();
          console.log(pending_data);
          const data = await pending_data;
          console.log(data)
          props.text.value = data;
      }}
    >
      Tell me a joke
    </Button>
    <p class="text-3xl tabular-nums">{props.text}</p>
    </div>
  );
}
