import wasm from '../wasm/dist/greet.wasm'
import { instantiate } from '../wasm/dist/greet.js'

export async function main() {
  const { greet } = await instantiate(await wasm(), { env: {}})
  return greet("world");
}
