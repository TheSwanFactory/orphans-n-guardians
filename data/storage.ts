import { default_prefix } from "./defaults.ts";

export async function store_value(key: string, value: string): Promise<void> {
  const kv = await Deno.openKv();
  await kv.set([default_prefix, key], value);
  kv.close();
}

export function retrieve_value(key: string): Promise<string | undefined> {
  return Deno.openKv().then(async (kv) => {
    try {
      const result = await kv.get([default_prefix, key]);
      return result?.value as string | undefined;
    } finally {
      kv.close();
    }
  });
}

export async function list_values(): Promise<string[]> {
  const kv = await Deno.openKv();
  const entries = [];
  for await (const entry of kv.list({ prefix: [default_prefix] })) {
    entries.push(entry);
  }
  const keys = entries.map((entry) => entry.key[1] as string);
  kv.close();
  return keys;
}
