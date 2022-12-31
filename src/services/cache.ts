import { createClient } from 'redis';
import type { RedisClientType } from 'redis';

export interface ICacheService {
    set(key: string, value: any): Promise<void>;
    setExpire(key: string, value: any, ttl: number): Promise<void>;
    get<T>(key: string): Promise<T | undefined>;
}

const defaultExpiration = process.env.REDIS_DEFAULT_EXPIRATION
    ? Number(process.env.REDIS_DEFAULT_EXPIRATION)
    : 60;

const cachedEnabled = process.env.CACHE_ENABLED
    ? !!process.env.CACHE_ENABLED
    : false;

export class RedisCacheService implements ICacheService {
    private readonly client: RedisClientType | undefined;

    constructor() {
        if (cachedEnabled) {
            this.client = createClient();
        }
    }

    async set(key: string, value: any): Promise<void> {
        this.setExpire(key, value, defaultExpiration);
    }

    async setExpire(key: string, value: any, ttl: number): Promise<void> {
        if (!this.client) {
            console.log('Cache is disabled');
            return;
        }

        console.log(`Setting ${key} into cache`);
        await this.client.connect();

        const valueAsString = JSON.stringify(value);
        await this.client.set(key, valueAsString, {
            EX: ttl
        });
        await this.client.disconnect();
    }

    async get<T>(key: string): Promise<T | undefined> {
        if (!this.client) {
            console.log('Cache is disabled');
            return;
        }

        console.log(`Getting ${key} from cache`);
        await this.client.connect();
        const value = await this.client.get(key);
        await this.client.disconnect();
        return value ? JSON.parse(value) : undefined;
    }
}
