import Storage from "./Storage.ts";
import { default_care } from "./defaults.ts";
import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";

describe("Storage", () => {
  it("store_value", async () => {
    const storage = new Storage("store_value", true);
    try {
      await storage.store_value("test", "value");
      const value = await storage.retrieve_value("test");
      assertEquals(value, "value", "Test failed: value should be 'value'");
    } finally {
      await storage.dispose();
    }
  });

  it("list_values", async () => {
    const storage = new Storage("list_values", true);
    try {
      await storage.store_value("test", "value");
      await storage.store_value("tests", "values");

      const values = await storage.list_values();
      assertEquals(values.length, 2, "Test failed: there should be 2 values");
      assertEquals(values[0], "test", "Test failed: value should be 'test'");
      assertEquals(values[1], "tests", "Test failed: value should be 'tests'");
    } finally {
      await storage.dispose();
    }
  });

  it("ensure_game", async () => {
    const storage = new Storage("ensure_game", true);
    try {
      const game = await storage.ensure_game("test_user");
      assertEquals(
        JSON.stringify(game),
        JSON.stringify(default_care),
        "Test failed: game should be default_care",
      );
    } finally {
      await storage.dispose();
    }
  });
});
