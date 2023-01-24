import { createClient, RedisClient, RetryStrategyOptions } from 'redis';
import Bluebird from 'bluebird';
const { env } = process;

declare module 'redis' {
  export interface RedisClient extends NodeJS.EventEmitter {
    setAsync(key: string, value: string): Promise<void>;
    setexAsync(key: string, exp: number, value: string): Promise<void>;
    getAsync(key: string): Promise<string>;
    scanAsync(...args: any[]): Promise<[string, string[]]>;
    delAsync(...args: string[]): Promise<boolean>;
    ttlAsync(key: string): Promise<number>;
  }
}

function set(key: string, id: string) {
  return env.REDIS_PREFIX + ':' + key + ':' + id;
}

class Redis {
  client: RedisClient;

  constructor() {
    this.client = createClient({
      url: env.REDIS_URL,
      retry_strategy: function (
        options: RetryStrategyOptions
      ): number | Error | undefined {
        if (options.error && options.error.code === 'ECONNREFUSED') {
          // End reconnecting on a specific error and flush all commands with
          // a individual error
          return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
          // End reconnecting after a specific timeout and flush all commands
          // with a individual error
          return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
          // End reconnecting with built in error
          return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
      },
    });
    Bluebird.promisifyAll(this.client);
  }

  setKey(key: string, id: string, val: any): void {
    this.client.setAsync(set(key, id), val as string);
  }

  setKeyWithExpiry(key: string, id: string, val: any, exp: number): void {
    this.client.setexAsync(set(key, id), exp, val as string);
  }

  getKey(key: string, id: string): Promise<string | null> {
    return this.client.getAsync(set(key, id));
  }

  delKey(key: string, id: string): Promise<boolean> {
    return this.client.delAsync(set(key, id));
  }
}

const client = new Redis();

export default client;
