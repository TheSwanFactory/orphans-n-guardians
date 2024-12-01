import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  const count = useSignal(3);
  return (
    <div class="px-4 py-8 mx-auto bg-[#86d6ef]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/ong-logo.jpg"
          width="128"
          height="128"
          alt="the Orphans & Guardians logo: gold+steel winged shield"
        />
        <h1 class="text-4xl font-bold">Welcome to Orphans & Guardians</h1>
        <p class="my-4">
          Try updating this message in the
          <code class="mx-2">./routes/index.tsx</code> file, and refresh.
        </p>
        <Counter count={count} />
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
