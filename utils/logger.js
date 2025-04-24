// emergency (0), alert, critical, error, warning, notice, info, debug (7)

export function logger(content, type = 'log', severity = 'info') {
  try {
    // get numeric value of current LOG_LEVEL
    const LOG_LEVEL_VALUE = global.LOG_LEVELS[global.LOG_LEVEL] || global.LOG_LEVELS['INFO'];
    // get numeric value of the given 'severity'
    const SEVERITY_LEVEL = global.LOG_LEVELS[severity.trim().toUpperCase()] || global.LOG_LEVELS['INFO'];

    // only log if LOG_LEVEL should show it
    if (LOG_LEVEL_VALUE >= SEVERITY_LEVEL) {
      switch(type) {
        case 'log':
          console.log(content);
          break;
        case 'info':
          console.info(content);
          break;
        case 'debug':
          console.debug(content);
          break;
        case 'error':
          console.error(content);
          break;
        default:
          console.log(content);
          break;
      }
    }
  } catch (error) {
    console.error(`Failed to run logger: ${error}`);
    throw new Error('Failed to run logger');
  }
}

