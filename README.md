# Fin-Target-Assignment

This project is a Node.js API with clustering and Redis-based task queueing to handle tasks with per-user rate limiting. Each user is allowed:

1 task per second
20 tasks per minute
Requests exceeding these limits are queued and processed based on the rate limit.

Features
Clustered API Server: Uses Node.js cluster to create worker processes for handling concurrent requests.
Redis Task Queue: Uses Redis and Bull to manage task queueing and rate limiting.
Logging: Task completions are logged with timestamps using winston.
