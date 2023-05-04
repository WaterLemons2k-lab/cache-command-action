import { handleErr } from './err';
import { commandToScript, getScriptOutput } from './exec';
import { restoreOrSaveCache } from './cache';
import { getInput, setOutput, startGroup, endGroup } from '@actions/core';

async function run() {
  startGroup('Starting to run command');

  const command = getInput('run', { required: true });
  // Script path in which JS will write the command
  const script = './run.sh';

  // Write command to script
  commandToScript(command, script);

  // Get the output of script
  const output = await getScriptOutput('bash', script);
  setOutput('output', output);
  endGroup();

  // Write command output to cache
  await restoreOrSaveCache([script], output);
}

run().catch(err => handleErr(err));
