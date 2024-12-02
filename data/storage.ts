import { default_care, default_prefix } from "./defaults.ts";

class Storage {
    private prefix: string;
    private is_test: boolean;

    constructor(prefix: string = default_prefix, is_test: boolean = false) {
        console.log("Storage.constructor", prefix, is_test);
        this.is_test = is_test;
        this.prefix = is_test ? "test_" + prefix : prefix;
    }

    private getKv(): Promise<Deno.Kv> {
        return Deno.openKv();
    }

    async store_value(key: string, value: string): Promise<void> {
        const kv = await this.getKv();
        try {
            await kv.set([this.prefix, key], value);
        } finally {
            kv.close();
        }
    }

    async retrieve_value(key: string): Promise<string | undefined> {
        const kv = await this.getKv();
        try {
            const result = await kv.get([this.prefix, key]);
            return result?.value as string | undefined;
        } finally {
            kv.close();
        }
    }

    async list_values(): Promise<string[]> {
        const kv = await this.getKv();
        try {
            const entries = [];
            for await (const entry of kv.list({ prefix: [this.prefix] })) {
                entries.push(entry);
            }
            return entries.map((entry) => entry.key[1] as string);
        } finally {
            kv.close();
        }
    }

    async ensure_game(username: string): Promise<object> {
        const kv = await this.getKv();
        try {
            const game = await kv.get([this.prefix, username]);
            let value = game?.value;
            if (!value) {
                value = default_care;
                await kv.set([this.prefix, username], value);
            }
            return value as object;
        } finally {
            kv.close();
        }
    }

    async dispose(): Promise<void> {
        console.log("Storage.dispose", this.prefix);
        if (this.is_test) {
            const kv = await this.getKv();
            try {
                for await (const entry of kv.list({ prefix: [this.prefix] })) {
                    await kv.delete(entry.key);
                }
            } finally {
                kv.close();
            }
        }
    }
}

export default Storage;
