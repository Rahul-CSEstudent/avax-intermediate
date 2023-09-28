import { ethers } from "hardhat";
import { writeFileSync } from "fs"

const OUTPUT_FILE = "./frontend/src/components/interface.json"

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const Storage = await ethers.deployContract("Points");

  const storageInstance = await Storage.waitForDeployment();

  const data = {
    address: await storageInstance.getAddress(),
    abi: JSON.parse(storageInstance.interface.formatJson())
  }

  writeFileSync(OUTPUT_FILE, JSON.stringify(data));

  console.log(
    `Lock with ETH and unlock timestamp ${unlockTime} deployed to ${Storage.target}`
  );
  console.log(`the address and the abi is stored in: \n\t${OUTPUT_FILE}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
