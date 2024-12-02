import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Orphans & Guardians</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="bg-[#86d6ef]">
        <div class="flex flex-col items-center">
          <img
            class="my-6"
            src="/ong-logo.jpg"
            width="128"
            height="128"
            alt="the Orphans & Guardians logo: gold+steel winged shield"
          />
        </div>
        <div class="px-4 py-8 mx-auto">
            <Component />
        </div>
      </body>
    </html>
  );
}
