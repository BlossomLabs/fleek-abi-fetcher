# Fleek ABI Fetcher

This function fetches the ABI for a given contract address on any given chain supported by Sourcify and returns it in JSON format.

You can use the deployed function in abi.function.on-fleek.network

## Build and deploy

```sh
bun i
bun compile # create wasm/dist/*
bun run build # create dist/main.js
bun fleek # login to fleek if needed
bun create-func myfunc # create function
bun deploy-func myfunc # deploy function
```
