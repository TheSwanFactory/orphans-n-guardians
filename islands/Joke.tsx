import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";

interface JokeProps {
    text: Signal<string>;
}

export default function Joke(props: JokeProps) {
  return (
    <div class="flex gap-8 py-6">
        <Button onClick={() => props.text.value = "Why did the chicken cross the road?"}>Tell me a joke</Button>
        <p class="text-3xl tabular-nums">{props.text}</p>
    </div>
  );
}
