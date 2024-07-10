import { isAddress } from "viem";
import type { Abi, Address } from "viem";
import { getAbiEntriesFromSourcify } from "./sourcify";
import { getAbiEntriesFromEtherscan } from "./etherscan";

type RequestObject = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";
  headers?: {
    [key: string]: string;
  } | null;
  path: string;
  query?: {
    [key: string]: string | string[];
  } | null;
  body?: string | null;
};

type ResponseObject =
  | {
      status: number;
      headers?: {
        [key: string]: string;
      } | null;
      body?: string;
    }
  | string
  | ArrayBuffer;

export async function main(params: RequestObject): Promise<ResponseObject> {
  try {
    const { chainId, contractAddress } = processParams(params);
    const abi = await getAbiEntries(contractAddress, chainId);
    return {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(abi),
    };
  } catch (error) {
    if (isErrorWithStatusAndBody(error)) {
      return error;
    }
    return {
      status: 500,
      body: `Internal Server Error: ${error}`,
    };
  }
}

// main({
//   method: "GET",
//   path: "/v0/1/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
// }).then((res) => {
//   console.log(res);
// });

function isErrorWithStatusAndBody(
  error: unknown,
): error is { status: number; body: string } {
  const err = error as { [key: string]: unknown };
  return (
    err &&
    typeof err === "object" &&
    typeof err.status === "number" &&
    typeof err.body === "string"
  );
}

function processParams(params: RequestObject): {
  chainId: number;
  contractAddress: Address;
} {
  const { method, path } = params;

  if (method !== "GET") {
    throw {
      status: 405,
      body: "Method Not Allowed",
    };
  }

  if (!path.startsWith("/v0/")) {
    throw {
      status: 400,
      body: "Invalid URL",
    };
  }
  const [, , chainId, contractAddress] = path.split("/");

  if (!Number(chainId)) {
    throw {
      status: 400,
      body: "Invalid chainId",
    };
  }

  if (!isAddress(contractAddress)) {
    throw {
      status: 400,
      body: "Invalid contract address",
    };
  }

  return {
    chainId: Number(chainId),
    contractAddress,
  };
}

async function getAbiEntries(address: string, chainId: number): Promise<Abi> {
  try {
    const abi = await getAbiEntriesFromSourcify(address, chainId);
    return abi;
  } catch (error) {
    const abi = await getAbiEntriesFromEtherscan(address, chainId);
    return abi;
  }
}
