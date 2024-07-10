# Fleek ABI Fetcher

This function fetches the ABI for a given contract address on any given chain supported by Sourcify and returns it in JSON format.

You can use the deployed function in:

```
https://abi.functions.on-fleek.app/v0/<chainId>/<contractAddress>/
```

Example:

```
https://abi.functions.on-fleek.app/v0/1/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2/
```

## Build and deploy

```sh
bun i
bun run build # create dist/main.js
bun fleek # login to fleek if needed
bun create-func myfunc # create function
bun deploy-func myfunc # deploy function
```
