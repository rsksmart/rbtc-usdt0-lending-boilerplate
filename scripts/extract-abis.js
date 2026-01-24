const fs = require('fs');
const path = require('path');

const artifactsDir = path.join(__dirname, '../artifacts/contracts');
const outDir = path.join(__dirname, '../frontend/src/abis');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function extractAbi(contractPath, contractName) {
  const artifactPath = path.join(artifactsDir, contractPath, `${contractName}.json`);
  const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
  const abiPath = path.join(outDir, `${contractName}.json`);
  fs.writeFileSync(abiPath, JSON.stringify(artifact.abi, null, 2));
  console.log(`Extracted ABI for ${contractName} to ${abiPath}`);
}

extractAbi('LendingPool.sol', 'LendingPool');
extractAbi('tokens/MockUSDT0.sol', 'MockUSDT0');
