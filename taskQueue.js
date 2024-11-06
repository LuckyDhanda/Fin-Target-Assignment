const Queue = require('bull');
const task = require('./task');
const rateLimit = 1000; // 1 task per second for each user

// Creating a queue instance
const taskQueue = new Queue('tasks', { redis: { port: 6379, host: '127.0.0.1' } });

taskQueue.process(async (job) => {
    await task(job.data.user_id);
});

module.exports.addTask = async (user_id) => {
    await taskQueue.add({ user_id }, { delay: rateLimit });
};
