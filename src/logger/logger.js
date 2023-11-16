import fs from 'fs/promises';
import path from 'path';

const logFile = path.join(process.cwd(), 'logs.log');

async function log(message) {
  const timestamp = new Date().toLocaleString();
  const logMessage = `[${timestamp}] ${message}\n`;

  try {
    await fs.appendFile(logFile, logMessage);
  } catch (err) {
    console.error('Error al escribir en el archivo de registro:', err);
  }
}

function info(message) {
  log(`INFO: ${message}`);
}

function error(message) {
  log(`ERROR: ${message}`);
}

export { info, error };