import * as redis from 'redis';

export class Redis {
    
    public options: Object = {
        host : '127.0.0.1', 
        port : 6379
    };
    public client: any | redis.RedisClient;

    constructor() {}

    setConfigOptions({ host = '127.0.0.1', port = 6379}) {
        this.options = { host, port }
    }

    initConnection(): redis.RedisClient {
        this.client = redis.createClient(this.options);
        return this.client;
    }

    getValue(key: string) {
        return new Promise((resolve, reject) => {
            this.client.get(key,(err: any, reply: any) => {
                if(err) reject(err);
                resolve(reply);
            });
        })
    }

    setValue(key: string, value: any) {
        return new Promise((resolve, reject) => {
            this.client.set(key,value,(err: any, reply: any) => {
                if(err) reject(err);
                resolve(reply);
            })
        });
    }

    setExpiry(key: string, value: number) {
        return new Promise((resolve, reject) => {
            this.client.expire(key, value, (err: any, reply: any) => {
                if(err) reject(err);
                resolve(reply);
            });
        });
    }

    getExpiry(key: string) {
        return new Promise((resolve, reject) => {
            this.client.ttl(key, (err: any, reply: any) => {
                if(err) reject(err);
                resolve(reply);
            });
        });
    }
}