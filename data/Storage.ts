import { default_care, default_prefix } from "./defaults.ts";

class Storage {
  private prefix: string;
  private is_test: boolean;

  constructor(prefix: string = default_prefix, is_test: boolean = false) {
    console.log("Storage.constructor", prefix, is_test);
    this.is_test = is_test;
    this.prefix = is_test ? "test_" + prefix : prefix;
  }

  private async withKv<T>(callback: (kv: Deno.Kv) => Promise<T>): Promise<T> {
    const kv = await this.getKv();
    try {
      return await callback(kv);
    } finally {
      kv.close();
    }
  }

  private getKv(): Promise<Deno.Kv> {
    return Deno.openKv();
  }

  async store_value(key: string, value: string): Promise<void> {
    await this.withKv(async (kv) => {
      await kv.set([this.prefix, key], value);
    });
  }

  retrieve_value(key: string): Promise<string | undefined> {
    return this.withKv(async (kv) => {
      const result = await kv.get([this.prefix, key]);
      return result?.value as string | undefined;
    });
  }

  list_values(): Promise<string[]> {
    return this.withKv(async (kv) => {
      const entries = [];
      for await (const entry of kv.list({ prefix: [this.prefix] })) {
        entries.push(entry);
      }
      return entries.map((entry) => entry.key[1] as string);
    });
  }

  ensure_game(username: string): Promise<object> {
    return this.withKv(async (kv) => {
      const game = await kv.get([this.prefix, username]);
      let value = game?.value;
      if (!value) {
        value = default_care;
        await kv.set([this.prefix, username], value);
      }
      return value as object;
    });
  }

  async dispose(): Promise<void> {
    console.log("Storage.dispose", this.prefix);
    if (this.is_test) {
      await this.withKv(async (kv) => {
        for await (const entry of kv.list({ prefix: [this.prefix] })) {
          await kv.delete(entry.key);
        }
      });
    }
  }
}

export default Storage;
