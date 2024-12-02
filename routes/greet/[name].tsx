import { PageProps } from "$fresh/server.ts";

export default function Greet(props: PageProps) {
  return (
    <div>
      <head>
        <title>Greet - Orphans & Guardians</title>
      </head>
      <div>Hello {props.params.name}</div>
    </div>
  );
}
