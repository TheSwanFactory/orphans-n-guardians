import { PageProps } from "$fresh/server.ts";

export default function Game(props: PageProps) {
  return (
    <div>
      <head>
        <title>Game - Orphans & Guardians</title>
      </head>
      <div>Hello {props.params.name}</div>
    </div>
  );
}
