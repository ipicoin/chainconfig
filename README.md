# IPI Chain Configuration

JavaScript export of a legacy IPI Cosmos-wallet chain configuration.

> **Status: unverified legacy configuration.** The values in `config.json`
> identify `ipi-mainnet-2` and historical public endpoints. They are not yet a
> canonical network release record. Verify the chain ID, genesis hash, binary
> version, endpoints, denomination metadata, and operator ownership before
> integrating this package or sending assets.

## Exported fields

The default export contains:

- Cosmos chain ID and display name;
- RPC and REST endpoints;
- BIP-44 coin type and Bech32 prefixes;
- native, fee, and staking denominations; and
- declared wallet features.

```js
import chainConfiguration from "./index.js";
```

## Canonicalization work

For a production-quality registry entry, a tagged release must bind this data
to a reviewed genesis file, reproducible node binary, documented network
environment, working health checks, and independently operated endpoints. A
change to network identity must use review and an explicit migration path; it
must never silently reuse a chain ID.

Contributions should add schema validation and automated endpoint checks that
do not require secrets. Protocol-wide changes belong in an
[IPI Improvement Proposal](https://github.com/ipicoin/.github/tree/main/ipi).

## License

Licensed under the [ISC License](LICENSE).
