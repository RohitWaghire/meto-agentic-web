import { CATALOG, searchCatalog, tenantFromAuth } from "./catalog";

type Rpc = { jsonrpc?: string; id?: string | number | null; method?: string; params?: Record<string, unknown> };

const tools = [
  {
    name: "search_catalog",
    description: "Search the dummy Orra catalog by name or category.",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string" } },
      required: ["query"],
    },
  },
  {
    name: "list_runs",
    description: "List that browser runs live on the page. This facade only reports server checkouts.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "checkout_agent",
    description: "Create a dummy ACP-shaped checkout for a product id. Requires a bearer key. May return HTTP 402 if PAYMENT-SIGNATURE is missing.",
    inputSchema: {
      type: "object",
      properties: {
        productId: { type: "string" },
        quantity: { type: "integer" },
      },
      required: ["productId"],
    },
  },
];

function result(id: Rpc["id"], payload: unknown) {
  return { jsonrpc: "2.0", id: id ?? null, result: payload };
}

function error(id: Rpc["id"], code: number, message: string) {
  return { jsonrpc: "2.0", id: id ?? null, error: { code, message } };
}

export type McpHttp = { status: number; json: unknown };

export function handleMcp(body: Rpc, authHeader: string | null, paymentSignature: string | null): McpHttp {
  const method = body.method || "";
  if (method === "initialize") {
    return { status: 200, json: result(body.id, {
      protocolVersion: "2025-03-26",
      serverInfo: { name: "orra", version: "1.0.0" },
      capabilities: { tools: {} },
    }) };
  }
  if (method === "tools/list" || method === "list_tools") {
    return { status: 200, json: result(body.id, { tools }) };
  }
  if (method === "tools/call" || method === "call_tool") {
    const params = body.params || {};
    const name = String(params.name || "");
    const args = (params.arguments || params) as Record<string, unknown>;
    if (name === "search_catalog") {
      return { status: 200, json: result(body.id, {
        content: [{ type: "text", text: JSON.stringify(searchCatalog(String(args.query || ""))) }],
      }) };
    }
    if (name === "list_runs") {
      return { status: 200, json: result(body.id, {
        content: [{ type: "text", text: "Browser runs live on /index.html. Server checkouts appear after checkout_agent." }],
      }) };
    }
    if (name === "checkout_agent") {
      const tenant = tenantFromAuth(authHeader);
      if (!tenant) {
        return { status: 200, json: error(body.id, -32001, "Register at POST /api/v1/agents/register and send Authorization: Bearer.") };
      }
      const product = CATALOG.find((item) => item.id === args.productId);
      if (!product) {
        return { status: 200, json: error(body.id, -32602, "Unknown productId") };
      }
      if (!paymentSignature) {
        return {
          status: 402,
          json: {
            jsonrpc: "2.0",
            id: body.id ?? null,
            error: {
              code: 402,
              message: "Payment Required",
              data: {
                rail: "x402-shaped",
                amount: product.price,
                payTo: "orra-demo",
                hint: "Retry with header PAYMENT-SIGNATURE: demo-usdc",
              },
            },
          },
        };
      }
      return { status: 200, json: result(body.id, {
        content: [{
          type: "text",
          text: JSON.stringify({
            ok: true,
            orderId: `mcp_${product.id}`,
            total: product.price,
            tenant: tenant.agentName,
            rail: "x402-shaped",
          }),
        }],
      }) };
    }
    return { status: 200, json: error(body.id, -32601, `Unknown tool ${name}`) };
  }
  return { status: 200, json: error(body.id, -32601, `Unknown method ${method}`) };
}
