import Storage from "./Storage.ts";
import { default_care } from "./defaults.ts";
import { afterEach, describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";

describe("Storage", () => {
  let storage: Storage | null = null;

  afterEach(async () => {
    if (storage) {
      await storage.dispose();
    }
  });

  it("store_value", async () => {
    storage = new Storage("store_value", true);
    await storage.store_value("test", "value");
    const value = await storage.retrieve_value("test");
    assertEquals(value, "value", "Test failed: value should be 'value'");
  });

  it("list_values", async () => {
    storage = new Storage("list_values", true);
    await storage.store_value("test", "value");
    await storage.store_value("tests", "values");

    const values = await storage.list_values();
    assertEquals(values.length, 2, "Test failed: there should be 2 values");
    assertEquals(values[0], "test", "Test failed: value should be 'test'");
    assertEquals(values[1], "tests", "Test failed: value should be 'tests'");
  });

  it("ensure_game", async () => {
    storage = new Storage("ensure_game", true);
    const game = await storage.ensure_game("test_user");
    assertEquals(
      JSON.stringify(game),
      JSON.stringify(default_care),
      "Test failed: game should be default_care",
    );
  });
});
