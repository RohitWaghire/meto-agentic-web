import {
  CATALOG,
  CANNOT_DO,
  MCP_SPEND_CAP_CENTS,
  placeTwinOrder,
  placeTwinSubscription,
  publicCatalog,
  searchCatalog,
  tenantFromAuth,
  twinOrdersFor,
  twinSubscriptionFor,
} from "./catalog";

type Rpc = { jsonrpc?: string; id?: string | number | null; method?: string; params?: Record<string, unknown> };

const publicTools = [
  {
    name: "search_catalog",
    description: "Search the dummy Orra catalog by name, category, or material. Token-less.",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string" } },
      required: ["query"],
    },
  },
  {
    name: "get_public_state",
    description: "Read the public catalog and the list of things this site cannot do. Token-less. No carts, keys, or PAN.",
    inputSchema: { type: "object", properties: {} },
  },
];

const bearerTools = [
  {
    name: "checkout_agent",
    description: "Create a dummy order for a catalog product. Requires a bearer key from POST /api/v1/agents/register. Returns HTTP 402 without PAYMENT-SIGNATURE: demo-usdc. Never accepts a card number.",
    inputSchema: {
      type: "object",
      properties: {
        productId: { type: "string" },
        quantity: { type: "integer" },
      },
      required: ["productId"],
    },
  },
  {
    name: "subscribe_plan",
    description: "Start a dummy Studio plan under the server spend cap. Requires a bearer key. Does not take a card.",
    inputSchema: {
      type: "object",
      properties: {
        planId: { type: "string", enum: ["starter", "pro", "atelier"] },
      },
      required: ["planId"],
    },
  },
];

function result(id: Rpc["id"], payload: unknown) {
  return { jsonrpc: "2.0", id: id ?? null, result: payload };
}

function error(id: Rpc["id"], code: number, message: string) {
  return { jsonrpc: "2.0", id: id ?? null, error: { code, message } };
}

function textResult(id: Rpc["id"], payload: unknown) {
  return result(id, { content: [{ type: "text", text: JSON.stringify(payload) }] });
}

export type McpHttp = { status: number; json: unknown };

export function handleMcp(body: Rpc, authHeader: string | null, paymentSignature: string | null): McpHttp {
  const method = body.method || "";
  if (method === "initialize") {
    return {
      status: 200,
      json: result(body.id, {
        protocolVersion: "2025-03-26",
        serverInfo: { name: "orra", version: "1.0.0" },
        capabilities: { tools: {} },
      }),
    };
  }
  if (method === "tools/list" || method === "list_tools") {
    const tenant = tenantFromAuth(authHeader);
    return {
      status: 200,
      json: result(body.id, { tools: tenant ? [...publicTools, ...bearerTools] : publicTools }),
    };
  }
  if (method === "tools/call" || method === "call_tool") {
    const params = body.params || {};
    const name = String(params.name || "");
    const args = (params.arguments || params) as Record<string, unknown>;
    if (name === "search_catalog") {
      return { status: 200, json: textResult(body.id, searchCatalog(String(args.query || ""))) };
    }
    if (name === "get_public_state") {
      return {
        status: 200,
        json: textResult(body.id, {
          catalog: publicCatalog(),
          cannotDo: CANNOT_DO,
          plans: [
            { id: "starter", price: "$29.00 / month" },
            { id: "pro", price: "$79.00 / month" },
            { id: "atelier", price: "$190.00 / month" },
          ],
        }),
      };
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
      if (paymentSignature !== "demo-usdc") {
        return { status: 200, json: error(body.id, -32002, "Unknown PAYMENT-SIGNATURE. Use demo-usdc on this dummy rail.") };
      }
      const order = placeTwinOrder(tenant, product.id, Number(args.quantity) || 1);
      return {
        status: 200,
        json: textResult(body.id, {
          ok: true,
          order,
          tenant: tenant.agentName,
          rail: "x402-shaped",
        }),
      };
    }
    if (name === "subscribe_plan") {
      const tenant = tenantFromAuth(authHeader);
      if (!tenant) {
        return { status: 200, json: error(body.id, -32001, "Register at POST /api/v1/agents/register and send Authorization: Bearer.") };
      }
      const placed = placeTwinSubscription(tenant, String(args.planId || ""));
      if ("ok" in placed && placed.ok === false) {
        return { status: 200, json: textResult(body.id, placed) };
      }
      return { status: 200, json: textResult(body.id, { ok: true, subscription: placed }) };
    }
    return { status: 200, json: error(body.id, -32601, `Unknown tool ${name}`) };
  }
  if (method === "resources/list") {
    const tenant = tenantFromAuth(authHeader);
    return {
      status: 200,
      json: result(body.id, {
        resources: tenant
          ? [
              { uri: "orra://orders", name: "Server twin orders" },
              { uri: "orra://subscription", name: "Server twin subscription" },
            ]
          : [],
      }),
    };
  }
  if (method === "resources/read") {
    const tenant = tenantFromAuth(authHeader);
    if (!tenant) {
      return { status: 200, json: error(body.id, -32001, "Bearer required to read twin resources.") };
    }
    const uri = String((body.params || {}).uri || "");
    if (uri === "orra://orders") {
      return { status: 200, json: textResult(body.id, twinOrdersFor(tenant.tenantId)) };
    }
    if (uri === "orra://subscription") {
      return { status: 200, json: textResult(body.id, twinSubscriptionFor(tenant.tenantId)) };
    }
    return { status: 200, json: error(body.id, -32602, "Unknown resource") };
  }
  return { status: 200, json: error(body.id, -32601, `Unknown method ${method}`) };
}

export { MCP_SPEND_CAP_CENTS };
