// on Apache license 2.0 @ IPI DAO 2026
// maintainership by Sett Sarverott

import chainConfiguration from "./config.json" with { type: "json" };

/**
 * Single Source of Truth (SSOT) for IPI network parameters.
 * Consumed by wallet-core.js, ipi-rpc and downstream apps.
 */
export default chainConfiguration;

export const config = chainConfiguration;

/** Returns the network endpoints (rpc / rest / grpc). */
export function getEndpoints() {
	return chainConfiguration.endpoints;
}

/** Returns the chain-id for a given network ("mainnet" | "testnet"). */
export function getChainId(network = "mainnet") {
	return chainConfiguration.networks?.[network]?.chainId ?? chainConfiguration.chainId;
}

/** Minimal shape validation — throws on missing required SSOT fields. */
export function validateConfig(cfg = chainConfiguration) {
	const required = [
		"chainId",
		"chainName",
		"bech32Prefix",
		"currencies",
		"feeCurrencies",
		"stakeCurrency",
		"endpoints",
	];
	const missing = required.filter((key) => cfg[key] === undefined);
	if (missing.length > 0) {
		throw new Error(`chainconfig: missing required fields: ${missing.join(", ")}`);
	}
	return true;
}
