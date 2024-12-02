export async function store_value(key: string, value: string): Promise<void> {
  const kv = await Deno.openKv();
  await kv.set([key], value);
  kv.close();
}

export function retrieve_value(key: string): Promise<string | undefined> {
  return Deno.openKv().then(async (kv) => {
    try {
      const result = await kv.get([key]);
      return result?.value as string | undefined;
    } finally {
      kv.close();
    }
  });
}

