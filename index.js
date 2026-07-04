// on Apache license 2.0 @ IPI DAO 2026
// maintainership by Sett Sarverott

import chainConfiguration from "./config.json" with { type: "json" };

/**
 * Single Source of Truth (SSOT) for IPI network parameters.
 * Consumed by wallet-core.js, ipi-rpc and downstream apps.
 */
export default chainConfiguration;

export const config = chainConfiguration;

/** Returns the network endpoints (rpc / rest / grpc) from the top-level SSOT fields. */
export function getEndpoints(cfg = chainConfiguration) {
	return {
		rpc: cfg.rpc,
		rest: cfg.rest,
		grpc: cfg.grpc,
	};
}

/** Returns the chain-id for a given network ("mainnet" | "testnet"). */
export function getChainId(network = "mainnet") {
	return chainConfiguration.networks?.[network]?.chainId ?? chainConfiguration.chainId;
}

/** Shape + value validation — throws on missing required fields or non-canonical values. */
export function validateConfig(cfg = chainConfiguration) {
	const required = [
		"chainId",
		"chainName",
		"bech32Prefix",
		"rpc",
		"rest",
		"grpc",
		"currencies",
		"feeCurrencies",
		"stakeCurrency",
	];
	const missing = required.filter((key) => cfg[key] === undefined);
	if (missing.length > 0) {
		throw new Error(`chainconfig: missing required fields: ${missing.join(", ")}`);
	}

	// Value validation — enforce canonical IPI network parameters (SSOT invariants).
	const errors = [];

	if (typeof cfg.chainId !== "string" || cfg.chainId.trim() === "") {
		errors.push("chainId must be a non-empty string");
	}
	if (cfg.bech32Prefix !== "ipi") {
		errors.push(`bech32Prefix must be "ipi" (got ${JSON.stringify(cfg.bech32Prefix)})`);
	}
	if (cfg.bip44?.coinType !== 118) {
		errors.push(`bip44.coinType must be 118 (got ${JSON.stringify(cfg.bip44?.coinType)})`);
	}

	// Every currency list entry must carry the canonical base denom + decimals.
	const currencyGroups = {
		currencies: cfg.currencies,
		feeCurrencies: cfg.feeCurrencies,
		stakeCurrency: cfg.stakeCurrency,
	};
	for (const [name, group] of Object.entries(currencyGroups)) {
		const entries = Array.isArray(group) ? group : [group];
		for (const entry of entries) {
			if (entry?.coinMinimalDenom !== "nipi") {
				errors.push(`${name}: coinMinimalDenom must be "nipi" (got ${JSON.stringify(entry?.coinMinimalDenom)})`);
			}
			if (entry?.coinDecimals !== 9) {
				errors.push(`${name}: coinDecimals must be 9 (got ${JSON.stringify(entry?.coinDecimals)})`);
			}
		}
	}

	if (errors.length > 0) {
		throw new Error(`chainconfig: invalid values: ${errors.join("; ")}`);
	}
	return true;
}
