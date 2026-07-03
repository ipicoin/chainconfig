# chainconfig — IPI Single Source of Truth (SSOT)

`config.json` jest **jedynym źródłem prawdy** parametrów sieci IPI.
Wszystkie konsumenty (`wallet-core.js`, `ipi-rpc`, portfele Keplr-kompatybilne i aplikacje)
powinny czytać wartości stąd, zamiast trzymać własne kopie chain-id / denom / endpointów.

## Użycie

```js
import config, { getEndpoints, getChainId, validateConfig } from "chain";

validateConfig();                 // rzuca wyjątek gdy brakuje wymaganych pól
const { rpc, rest, grpc } = getEndpoints();
const chainId = getChainId("testnet"); // "ipi-testnet-1"
```

Domyślny eksport to sparsowany obiekt `config.json` (import JSON).

## Schemat pól

| Pole | Typ | Opis |
| --- | --- | --- |
| `chainId` | string | Aktywny chain-id sieci głównej (`ipi-mainnet-2`). |
| `chainName` | string | Czytelna nazwa sieci. |
| `bip44.coinType` / `slip44` | number | SLIP-44 coin type (`118`, standard Cosmos). |
| `bech32Config` | object | Pełny zestaw prefiksów bech32 (Keplr). |
| `bech32Prefix` | string | Skrócony prefiks konta (`ipi`) — wygoda dla narzędzi. |
| `currencies[]` | array | Waluty wyświetlane: `coinDenom`, `coinMinimalDenom`, `coinDecimals`. |
| `feeCurrencies[]` | array | Jak wyżej + `gasPriceStep` (`low`/`average`/`high`). |
| `stakeCurrency` | object | Waluta stakingu. |
| `features[]` | array | Włączone moduły łańcucha (`stargate`, `cosmwasm`). |
| `endpoints` | object | `rpc` / `rest` (LCD) / `grpc`. |
| `blockTime` | number | Docelowy czas bloku (sekundy, wartość przybliżona). |
| `explorer` | string | URL eksploratora. |
| `networks` | object | Chain-id per sieć: `mainnet`, `testnet`. |

## Denominacja

Bazowy denom to `nipi` (nano-IPI), display `IPI`, `coinDecimals: 9`
(1 IPI = 1 000 000 000 nipi).

## Uwagi (DRAFT — do review po Fala 1 devnet)

- `endpoints.grpc` (`ipicoin.eu:9090`) oraz `networks.testnet.chainId` (`ipi-testnet-1`)
  to wartości robocze do potwierdzenia po uruchomieniu devnet.
- `gasPriceStep` i `blockTime` — wartości domyślne do kalibracji.

## Licencja

Apache 2.0 © IPI DAO 2026. Maintainership: Sett Sarverott.
