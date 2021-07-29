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

    async getValue(key: string) {
        try {
            let delta: any;
            let expiry: any = await this.getExpiry(key);
            this.client.get(key,(err: any, reply: any) => {
                if(err) return Promise.reject(err);
                if(!reply || this.xfetch(delta, new Date().getTime() + expiry)){
                    //TODO: Recompute
                } else {
                    return Promise.resolve(reply);
                }
            });
        } catch (error) {
            // console.error(error);   
        }
    }

    setValue(key: string, value: any, expiry?: number) {
        return new Promise((resolve, reject) => {
            if(!expiry) {
                this.client.set(key,value,(err: any, reply: any) => {
                    if(err) reject(err);
                    resolve(reply);
                });
            } else {
                this.client.setex(key,value, expiry, (err: any, reply: any) => {
                    if(err) reject(err);
                    resolve(reply);
                });
            }
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

    xfetch(delta: any, expiry: any, beta: number = 1.0) {
        return (new Date().getTime()) - (delta * beta * Math.log(Math.random())) >= expiry;
    }
}