import { expect } from "chai";
import { ethers } from "hardhat";
import { DegenToken } from "../typechain-types";

describe("DegenToken Contract", () => {
    let degenContract: DegenToken;
    let owner: any;
    let addr1: any;
    let addr2: any;

    before(async () => {
        [owner, addr1, addr2] = await ethers.getSigners();
        const DegenToken = await ethers.getContractFactory("DegenToken");
        degenContract = await DegenToken.deploy();
        await degenContract.waitForDeployment();

        console.log("Contract address : ",await degenContract.getAddress());

    });

    afterEach(async ()=>{
        let ownerBalance = await degenContract.balance();
        if (ownerBalance > 0) {
            await degenContract.burnTokens(ownerBalance);
        }
    })

    function delay(ms?: number){
        return new Promise((resolve, reject) => setTimeout(() => { resolve(void 0) }, ms));
    }

    it("Mint Check", async function () {
        const mintAmount = 1000;
        await degenContract.mint(owner.address, mintAmount);
        
        await delay(5000);

        const balance = await degenContract.balance();
        expect(balance).to.equal(mintAmount);
    })

    it("Transfer Check", async function () {
        const mintAmount = 1000;

        await degenContract.mint(owner.address, mintAmount);
        await degenContract.transferTokens(addr1.address, mintAmount);

        await delay(5000);

        expect(await degenContract.balance()).to.equal(mintAmount);
        expect(await degenContract.connect(addr1).balance()).to.equal(0);
    })

    
    it("Redeem Rewards Check", async function () {
        const mintAmount = 1000;
        const redeemAmount = 500;
        const message = "Purchased items #001"

        degenContract.on(degenContract.getEvent("Purchase"), async (addr: string, amount: bigint, message: string) => {
            expect(addr).to.equal(owner.address);
            expect(amount).to.equal(redeemAmount);
            expect(message).to.equal(message);
        })

        await degenContract.mint(owner.address, mintAmount);

        await delay(5000);

        expect(await degenContract.balance()).to.equal(mintAmount);

        await degenContract.redeemAsset(redeemAmount, message);

        await delay(5000);

        expect(await degenContract.balance()).to.equal(mintAmount - redeemAmount);
    })

    it("Burn tokens Check", async function () {

        const mintAmount = 1000;
        const burnAmount = 500;

        await degenContract.mint(owner.address, mintAmount);

        await delay(5000);

        expect(await degenContract.balance()).to.equal(mintAmount);

        await degenContract.burnTokens(burnAmount);

        await delay(5000);

        expect(await degenContract.balance()).to.equal(mintAmount - burnAmount);

    })

})
