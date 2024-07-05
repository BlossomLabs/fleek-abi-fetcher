# Fleek WebAssembly Starter Kit

This is a starter kit for anyone who wants to code webassembly and deploy into a fleek function.

## Build

```sh
bun i
bun compile # create wasm/dist/*
bun run build # create dist/main.js
bun fleek # login to fleek if needed
bun create-func # create function
bun deploy-func # deploy function
```
