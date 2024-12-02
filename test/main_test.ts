function add(a: number, b: number): number {
  return a + b;
}

Deno.test(function addTest() {
  if (add(2, 3) !== 5) {
    throw new Error("Test failed: 2 + 3 should equal 5");
  }
});

// Test DenoKv

async function store_value(key: string, value: string): Promise<void> {
  const kv = await Deno.openKv();
  await kv.set([key], value);
  kv.close();
}

function retrieve_value(key: string): Promise<string | undefined> {
  return Deno.openKv().then(async (kv) => {
    try {
      const result = await kv.get([key]);
      return result?.value as string | undefined;
    } finally {
      kv.close();
    }
  });
}

Deno.test("store_value", async () => {
  await store_value("test", "value");
  const value = await retrieve_value("test");
  if (value !== "value") {
    throw new Error("Test failed: value should be 'value'");
  }
});
