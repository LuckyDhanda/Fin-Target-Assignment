const cluster = require('cluster');
const express = require('express');
const taskQueue = require('./taskQueue');
const os = require('os');

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });
} else {

    const app = express();
    app.use(express.json());

    app.post('/process-task', async (req, res) => {
        const { user_id } = req.body;
        if (!user_id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Add the task to the queue
        await taskQueue.addTask(user_id);
        res.status(202).json({ message: `Task queued for user ${user_id}` });
    });

    app.listen(3000, () => {
        console.log(`Worker ${process.pid} started`);
    });
}
