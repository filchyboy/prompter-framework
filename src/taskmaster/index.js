import { spawn } from 'child_process';
import { devScriptPath, initProject } from 'claude-task-master';

export const runTaskMaster = (args = []) => {
  return new Promise((resolve, reject) => {
    const child = spawn('node', [devScriptPath, ...args], { stdio: 'inherit' });
    child.on('close', code => {
      if (code === 0) resolve();
      else reject(new Error(`task-master exited with code ${code}`));
    });
  });
};

export { initProject, devScriptPath };
