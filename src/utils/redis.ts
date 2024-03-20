import { createClient, RedisClientType } from 'redis';
const { env } = process;

function set(key: string, id: string): string {
  return env.REDIS_PREFIX + ':' + key + ':' + id;
}

class Client {
  client: RedisClientType;

  constructor() {
    this.client = createClient({ url: env.REDIS_URL });
  }

  getKey(key: string, id: string): Promise<string | null> {
    return this.client.get(set(key, id));
  }

  delKey(key: string, id: string): Promise<number | null> {
    return this.client.del(set(key, id));
  }

  setKey(key: string, id: string, val: any): Promise<string | null> {
    return this.client.set(set(key, id), val as string);
  }

  setKeyWithExpiry(key: string, id: string, val: any, exp: number): Promise<string | null> {
    return this.client.setEx(set(key, id), exp, val as string);
  }

  async scanPattern(key: string, cursor = 0): Promise<string[]> {
    const res = [];
    const pattern = env.REDIS_PREFIX + ':' + key + '*';
    // https://redis.io/commands/scan
    // SCAN cursor [MATCH pattern] [COUNT count] [TYPE type]
    const scanResult = await this.client.scan(cursor, { MATCH: pattern, COUNT: 100 });
    res.push(...scanResult.keys);

    if (scanResult.cursor !== 0) {
      res.push(...(await this.scanPattern(key, scanResult.cursor)));
    }

    return res;
  }
}

const RedisClient = new Client();

export { RedisClient };
