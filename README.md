# mk-redis-connect

## Installation
```
npm install mk-redis-connect --save
```

#### After installation, you can access the module like below

```
const {Redis} = require('mk-redis-connect');

const client = new Redis();

client.setConfigOptions({
    host: '127.0.0.1',
    port: 6379
});

client.initConnection();

client.setValue('name','Mani');

client.getValue('name').then(val => console.log(val)).catch(err => console.error(err));

client.setExpiry('name');

client.getExpiry('name').then(val => console.log(val)).catch(err => console.error(err));
```


