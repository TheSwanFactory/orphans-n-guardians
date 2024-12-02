import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import Joke from "../islands/Joke.tsx";
import Game from "../islands/Game.tsx";

export default function Home() {
  const count = useSignal(3);
  const joke = useSignal("Waiting for a joke...");
  return (
    <div>
      <head>
        <title>Home - Orphans & Guardians</title>
      </head>
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">Welcome to Orphans & Guardians</h1>
        <p class="my-2">
          Enter a username to begin your adventure!
        </p>
        <Game text={useSignal("Player")} />
        <Counter count={count} />
        <Joke text={joke} />
      </div>

      <div class="flex flex-col items-center">
        <h2 class="text-2xl font-bold">Check out our Kickstarter!</h2>
        <a
          href="https://ihack.us/2024/11/29/kickstarter-pitch-orphans-guardians-the-quest-for-your-true-self/"
          class="mt-4 w-1/2"
        >
          <img
            src="/kickstarter.jpg"
            alt="Check out our Kickstarter"
            class="w-full h-auto"
          />
        </a>
      </div>
    </div>
  );
}
