# mk-redis-connect

## Installation
```
npm install mk-redis-connect --save
```

#### After installation, you can access the module like below

```
const {Redis} = require('mk-redis-connect');

const client = new Redis();

client.initConnection();

client.setValue('name','Mani');

client.getValue('name').then(val => console.log(val)).catch(err => console.error(err));
```


