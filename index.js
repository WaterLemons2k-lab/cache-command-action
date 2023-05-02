const cache = require("@actions/cache")
const core = require("@actions/core")
const exec = require('@actions/exec');
const fs = require('fs')

async function run() {
  try {
    const path = core.getInput('path');
    const command = core.getInput('run', { required: true });

  let output;
  const options = {};
  options.listeners = {
    stdout: (data) => {
      output = data.toString();
    }
  };

  await exec.exec(command, [], options);

  core.setOutput('output', output)

  await fs.writeFile(path, output, err => {
    if (err) {
      console.error(err);
    }
  });

  const cacheId = await cache.restoreCache([path], output)
  if (!cacheId) {
    // Cache not restored
    await cache.saveCache([path], output)
    core.setOutput("cache-hit", false)
    return;
  }

  core.setOutput("cache-hit", true)
  } catch (error) {
      core.setFailed(error.message)
  }
}

run()
