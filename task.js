const logger = require('./logger');

async function task(user_id) {
    console.log(`${user_id} - task completed at - ${Date.now()}`);
    logger.info(`${user_id} - task completed at - ${new Date().toISOString()}`);
}

module.exports = task;
