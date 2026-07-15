import assert from "node:assert/strict";
import test from "node:test";

import chainConfiguration from "../index.js";

test("exports a coherent Cosmos wallet configuration", () => {
	assert.match(chainConfiguration.chainId, /^[a-z0-9-]+$/);
	assert.equal(chainConfiguration.bip44.coinType, 118);
	assert.equal(chainConfiguration.currencies.length, 1);
	assert.equal(chainConfiguration.currencies[0].coinMinimalDenom, "nipi");
	assert.equal(chainConfiguration.currencies[0].coinDecimals, 9);
	assert.equal(
		chainConfiguration.stakeCurrency.coinMinimalDenom,
		chainConfiguration.currencies[0].coinMinimalDenom,
	);
	assert.equal(
		chainConfiguration.feeCurrencies[0].coinMinimalDenom,
		chainConfiguration.currencies[0].coinMinimalDenom,
	);
	assert.match(chainConfiguration.rpc, /^https:\/\//);
	assert.match(chainConfiguration.rest, /^https:\/\//);
});
