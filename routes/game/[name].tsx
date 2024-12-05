import { PageProps, RouteContext } from "$fresh/server.ts";
import Storage from "../../data/Storage.ts";
import { Handlers } from "$fresh/server.ts";

async function getGame(name: string): Promise<object> {
  const storage = new Storage("game", false);
  return await storage.ensure_game(name);
}

export const handler: Handlers<RouteContext> = {
  async GET(_req, ctx) {
    const game: object = await getGame(ctx.params.name);
    ctx.params.game = JSON.stringify(game);
    const resp = await ctx.render();
    resp.headers.set("X-Custom-Header", "Hello");
    return resp;
  },
};

export default function GameForName(props: PageProps) {
  const game = JSON.parse(props.params.game);
  return (
    <div>
      <head>
        <title>Game - Orphans & Guardians</title>
      </head>
      <div>Hello {props.params.name}</div>
      <div>
        <h2>Display Game</h2>
        <ul>
          {Object.entries(game).map(([key, value]) => (
            <li key={key}>
              {key}: {String(value)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
