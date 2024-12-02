import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import Joke from "../islands/Joke.tsx";
import Greet from "../islands/Greet.tsx";

export default function Home() {
  const count = useSignal(3);
  const joke = useSignal("Waiting for a joke...");
  return (
    <div>
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">Welcome to Orphans & Guardians</h1>
        <p class="my-2">
          Coming Soon!
        </p>
        <Counter count={count} />
        <Joke text={joke} />
        <Greet text={useSignal("Hello, world!")} />
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
