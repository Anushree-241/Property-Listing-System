const redis = require('redis');

const client = redis.createClient(
    {url: 'redis://default:DRthblgluGgZ7uvgP97QR5ztj8grrOwf@redis-19984.c264.ap-south-1-1.ec2.redns.redis-cloud.com:19984',}
);
client.on('error', (err) => {
  console.error('Redis connection error:', err);
});

client.connect(); 

module.exports = client;