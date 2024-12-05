import { PageProps, RouteContext } from "$fresh/server.ts";
import Storage from "../../data/Storage.ts";
import { Handlers } from "$fresh/server.ts";

async function getGame(name: string): Promise<object> {
  const storage = new Storage("game", false);
  return await storage.ensure_game(name);
}

export const handler: Handlers<RouteContext> = {
  async GET(_req, ctx) {
    const name: string = ctx.params.name;
    const game: object = await getGame(name);
    ctx.params.name = name;
    ctx.params.game = JSON.stringify(game);
    const resp = await ctx.render();
    resp.headers.set("X-Custom-Header", "Hello");
    return resp;
  },
};

export default function GameForName(props: PageProps) {
  return (
    <div>
      <head>
        <title>Game - Orphans & Guardians</title>
      </head>
      <div>Hello {props.params.name}</div>
      <div>
        <h2>Display Game</h2>
        <pre>{props.params.game}</pre>
      </div>
    </div>
  );
}
