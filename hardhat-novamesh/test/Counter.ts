import { ignition } from "hardhat";
import CounterModule from "../ignition/modules/Counter";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

describe("counter", () => {
  const setup = async () => {
    return ignition.deploy(CounterModule);
  };

  it("counter initialized to 0", async () => {
    const { counter } = await loadFixture(setup);
    expect(await counter.s_counter()).to.equal(0);
  });

  it("counter incremented", async () => {
    const { counter } = await loadFixture(setup);
    await counter.increment();
    expect(await counter.s_counter()).to.equal(1);
  });
});
