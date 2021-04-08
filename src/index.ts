// import * as  redis from 'redis';
import Redis from './redis';

// export const options: any = {
//     host: '127.0.0.1',
//     port: 6379
// }

// const client = redis.createClient(options);

// client.set('name','Mani', (err, reply) => {
//     if(err) console.log(err);
//     console.log(reply);
// })

// client.get('name',(err, reply) => {
//     if(err) console.log(err);
//     console.log(reply);
// })

const redis = new Redis();

redis.setConfigOptions({
    host: '127.0.0.1',
    port: 6379
});

redis.initConnection();


redis.setValue('name','Mani');

redis.setExpiry('name',60);

redis.getValue('name').then(val => console.log(val)).catch(err => console.log(err));

redis.getExpiry('name').then(val => console.log(val)).catch(err => console.log(err));

