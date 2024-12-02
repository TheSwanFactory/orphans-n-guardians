function add(a: number, b: number): number {
  return a + b;
}

Deno.test(function addTest() {
  if (add(2, 3) !== 5) {
    throw new Error("Test failed: 2 + 3 should equal 5");
  }
});

// Test DenoKv

import { store_value, retrieve_value } from "../data/storage.ts";

Deno.test("store_value", async () => {
  await store_value("test", "value");
  const value = await retrieve_value("test");
  if (value !== "value") {
    throw new Error("Test failed: value should be 'value'");
  }
});
