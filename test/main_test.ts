function add(a: number, b: number): number {
  return a + b;
}

Deno.test(function addTest() {
  if (add(2, 3) !== 5) {
    throw new Error("Test failed: 2 + 3 should equal 5");
  }
});

// Test DenoKv

import { list_values, retrieve_value, store_value } from "../data/storage.ts";

Deno.test("store_value", async () => {
  await store_value("test", "value");
  const value = await retrieve_value("test");
  if (value !== "value") {
    throw new Error("Test failed: value should be 'value'");
  }
});

Deno.test("list_values", async () => {
  await store_value("test", "value");
  await store_value("tests", "values");

  const values = await list_values();
  if (values.length !== 2) {
    throw new Error("Test failed: there should be 2 values");
  }
  if (values[0] !== "test") {
    throw new Error("Test failed: value should be 'test'");
  }
  if (values[1] !== "tests") {
    throw new Error("Test failed: value should be 'tests'");
  }
});
