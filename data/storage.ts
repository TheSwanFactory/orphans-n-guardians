import { default_care, default_prefix } from "./defaults.ts";

class Storage {
  private _kv: Deno.Kv | null = null;
  private prefix: string;
  private is_test: boolean;

  constructor(prefix: string = default_prefix, is_test: boolean = false) {
    this.prefix = prefix;
    this.is_test = is_test;
    if (is_test) {
      Deno.openKv(":memory:").then((kv) => {
        this._kv = kv;
      });
    }
  }

  private get kv(): Promise<Deno.Kv> {
    if (!this._kv) {
      return Deno.openKv().then((kv) => {
        this._kv = kv;
        return kv;
      });
    }
    return Promise.resolve(this._kv);
  }

  async store_value(key: string, value: string): Promise<void> {
    const kv = await this.kv;
    await kv.set([this.prefix, key], value);
  }

  async retrieve_value(key: string): Promise<string | undefined> {
    const kv = await this.kv;
    const result = await kv.get([this.prefix, key]);
    return result?.value as string | undefined;
  }

  async list_values(): Promise<string[]> {
    const kv = await this.kv;
    const entries = [];
    for await (const entry of kv.list({ prefix: [this.prefix] })) {
      entries.push(entry);
    }
    const keys = entries.map((entry) => entry.key[1] as string);
    return keys;
  }

  async ensure_game(username: string): Promise<object> {
    const kv = await this.kv;
    const game = await kv.get([this.prefix, username]);
    let value = game?.value;
    if (!value) {
      value = default_care;
      await kv.set([this.prefix, username], value);
    }
    return value as object;
  }

  async dispose(): Promise<void> {
    if (this.is_test) {
      // delete all keys
      const kv = await this.kv;
      for await (const entry of kv.list({ prefix: [this.prefix] })) {
        console.log("deleting", entry.key);
        await kv.delete(entry.key);
      }
    }
    if (this._kv) {
      await this._kv.close();
      this._kv = null;
    }
  }
}

export default Storage;
