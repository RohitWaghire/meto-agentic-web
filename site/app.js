/**
 * Shared page object. Human controls and website_* tools call the same methods.
 * Operations refuse with {ok:false, reason} and never move focus.
 */

export const CATALOG = [
  {
    id: "arc-sconce",
    name: "Arc Sconce",
    category: "lighting",
    priceCents: 17200,
    price: "$172.00",
    stock: 8,
    summary: "A brass wall sconce with a glass shade that throws a long arc of light.",
    materials: "brass, mouth-blown glass",
  },
  {
    id: "mill-pendant",
    name: "Mill Pendant",
    category: "lighting",
    priceCents: 24000,
    price: "$240.00",
    stock: 5,
    summary: "A spun-copper pendant for a table that needs a low, even pool of light.",
    materials: "oxidized copper, linen cord",
  },
  {
    id: "grove-floor",
    name: "Grove Floor Lamp",
    category: "lighting",
    priceCents: 41000,
    price: "$410.00",
    stock: 3,
    summary: "A tall oak and brass floor lamp with a linen drum.",
    materials: "oak, brass, linen",
  },
  {
    id: "linen-throw",
    name: "Linen Throw",
    category: "textiles",
    priceCents: 8600,
    price: "$86.00",
    stock: 12,
    summary: "A heavy stone-linen throw woven in a two-end herringbone.",
    materials: "stone linen",
  },
  {
    id: "kiln-bowl",
    name: "Kiln Bowl",
    category: "objects",
    priceCents: 5400,
    price: "$54.00",
    stock: 9,
    summary: "A small glazed bowl for keys, clips, or a single stem.",
    materials: "stoneware, copper glaze",
  },
  {
    id: "north-rug",
    name: "North Rug",
    category: "textiles",
    priceCents: 32000,
    price: "$320.00",
    stock: 4,
    summary: "A flatweave wool rug in verdigris and limestone stripes.",
    materials: "wool",
  },
];

export const PLANS = [
  { id: "starter", name: "Studio Starter", priceCents: 0, price: "$0.00 / month", summary: "Scene library for one room." },
  { id: "pro", name: "Studio Pro", priceCents: 2900, price: "$29.00 / month", summary: "API access, three rooms, usage logs." },
  { id: "atelier", name: "Studio Atelier", priceCents: 7900, price: "$79.00 / month", summary: "Unlimited rooms, webhooks, priority fixtures." },
];

export const DEMO_USERS = [
  {
    email: "maya@orra.example",
    password: "demo1234",
    name: "Maya Chen",
    role: "shopper",
    constraints: {
      mode: "always_ask",
      spendCapCents: 10000,
      approvalOverCents: 0,
      allowedTools: ["add_to_cart", "set_cart", "checkout_order", "undo_run", "rollback_step", "set_constraints"],
      allowedCategories: ["lighting", "textiles", "objects"],
    },
  },
  {
    email: "julian@orra.example",
    password: "studio1234",
    name: "Julian Vale",
    role: "studio",
    constraints: {
      mode: "auto_within_policy",
      spendCapCents: 50000,
      approvalOverCents: 20000,
      allowedTools: [
        "add_to_cart",
        "set_cart",
        "checkout_order",
        "subscribe_plan",
        "create_api_key",
        "undo_run",
        "rollback_step",
        "set_constraints",
      ],
      allowedCategories: ["lighting", "textiles", "objects"],
    },
  },
  {
    email: "ada@orra.example",
    password: "admin1234",
    name: "Ada Rohan",
    role: "admin",
    constraints: {
      mode: "always_ask",
      spendCapCents: 100000,
      approvalOverCents: 0,
      allowedTools: [
        "add_to_cart",
        "set_cart",
        "checkout_order",
        "subscribe_plan",
        "create_api_key",
        "undo_run",
        "rollback_step",
        "set_constraints",
      ],
      allowedCategories: ["lighting", "textiles", "objects"],
    },
  },
];

const CANNOT_DO = [
  "live shipping quotes from a carrier",
  "real card charges or bank transfers",
  "coupon codes",
  "gift wrap",
  "order tracking after the demo refund",
];

const DEFAULT_CONSTRAINTS = {
  mode: "always_ask",
  spendCapCents: 50000,
  approvalOverCents: 0,
  allowedTools: [
    "add_to_cart",
    "set_cart",
    "checkout_order",
    "subscribe_plan",
    "create_api_key",
    "undo_run",
    "rollback_step",
    "set_constraints",
  ],
  allowedCategories: ["lighting", "textiles", "objects"],
};

function money(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

function todayInfo() {
  const now = new Date();
  const iso = now.toISOString().slice(0, 10);
  const weekday = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return { iso, weekday };
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function memoryStorage() {
  const data = new Map();
  return {
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    },
    setItem(key, value) {
      data.set(key, String(value));
    },
    removeItem(key) {
      data.delete(key);
    },
  };
}

export class StorePage {
  constructor() {
    this.storage = typeof localStorage === "undefined" ? memoryStorage() : localStorage;
    this.catalog = clone(CATALOG);
    this.plans = clone(PLANS);
    this.state = this.blankState();
    this.hydrate();
  }

  blankState() {
    return {
      user: null,
      constraints: clone(DEFAULT_CONSTRAINTS),
      frozenConstraints: null,
      cart: { items: [], version: 0 },
      orders: [],
      subscription: null,
      keys: [],
      lastKeySecret: null,
      ledger: [],
      events: [],
    };
  }

  hydrate() {
    const raw = this.storage.getItem("orra.v1");
    if (!raw) {
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      this.state = { ...this.blankState(), ...parsed };
    } catch {
      this.state = this.blankState();
    }
  }

  persist() {
    this.storage.setItem("orra.v1", JSON.stringify(this.state));
  }

  catalogIds() {
    return this.catalog.map((item) => item.id);
  }

  planIds() {
    return this.plans.map((plan) => plan.id);
  }

  cartTotalCents() {
    let total = 0;
    for (const line of this.state.cart.items) {
      const product = this.catalog.find((item) => item.id === line.id);
      if (product) {
        total += product.priceCents * line.quantity;
      }
    }
    return total;
  }

  productLine(id, quantity) {
    const product = this.catalog.find((item) => item.id === id);
    if (!product) {
      return null;
    }
    return {
      id: product.id,
      name: product.name,
      quantity,
      unitPrice: product.price,
      lineTotalCents: product.priceCents * quantity,
      lineTotal: money(product.priceCents * quantity),
      category: product.category,
    };
  }

  bumpCart() {
    this.state.cart.version += 1;
  }

  recordEvent(kind, detail) {
    this.state.events.unshift({
      id: `evt_${this.state.events.length + 1}_${Date.now()}`,
      at: new Date().toISOString(),
      kind,
      detail,
    });
    this.state.events = this.state.events.slice(0, 40);
  }

  pushLedger(entry) {
    this.state.ledger.push(entry);
    this.recordEvent("step", {
      tool: entry.tool,
      status: "succeeded",
      rollback: entry.rollback,
    });
  }

  activeConstraints() {
    return this.state.frozenConstraints || this.state.constraints;
  }

  freezeConstraints() {
    if (!this.state.frozenConstraints) {
      this.state.frozenConstraints = clone(this.state.constraints);
      this.recordEvent("policy_frozen", {
        mode: this.state.frozenConstraints.mode,
        spendCap: money(this.state.frozenConstraints.spendCapCents),
      });
    }
    return this.state.frozenConstraints;
  }

  policy(tool, amountCents, category) {
    const constraints = this.activeConstraints();
    if (tool !== "get_store_state" && !constraints.allowedTools.includes(tool)) {
      return { ok: false, reason: `Your permissions do not allow ${tool}.` };
    }
    if (category && !constraints.allowedCategories.includes(category)) {
      return { ok: false, reason: `Category ${category} is outside the allowed catalog.` };
    }
    const spendTools = ["checkout_order", "subscribe_plan"];
    if (spendTools.includes(tool) && typeof amountCents === "number" && amountCents > constraints.spendCapCents) {
      return {
        ok: false,
        reason: `This ${money(amountCents)} step is over your ${money(constraints.spendCapCents)} spend cap.`,
      };
    }
    return { ok: true };
  }

  note(text) {
    const el = document.getElementById("action-note") || document.getElementById("checkout-note");
    if (el) {
      el.textContent = text || "";
    }
  }

  getState() {
    const today = todayInfo();
    const items = this.state.cart.items
      .map((line) => this.productLine(line.id, line.quantity))
      .filter(Boolean);
    const totalCents = this.cartTotalCents();
    const latestOrder = this.state.orders[0] || null;
    const latestKey = this.state.keys[0]
      ? {
          id: this.state.keys[0].id,
          name: this.state.keys[0].name,
          prefix: this.state.keys[0].prefix,
          createdAt: this.state.keys[0].createdAt,
        }
      : null;
    return {
      ok: true,
      today: today.iso,
      todayLabel: today.weekday,
      version: this.state.cart.version,
      user: this.state.user
        ? { email: this.state.user.email, name: this.state.user.name, role: this.state.user.role }
        : null,
      constraints: clone(this.activeConstraints()),
      liveConstraints: clone(this.state.constraints),
      frozenConstraints: this.state.frozenConstraints ? clone(this.state.frozenConstraints) : null,
      catalog: this.catalog.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        priceCents: item.priceCents,
        stock: item.stock,
        summary: item.summary,
        materials: item.materials,
      })),
      plans: this.plans,
      cart: {
        items,
        version: this.state.cart.version,
        totalCents,
        total: money(totalCents),
      },
      latestOrder,
      subscription: this.state.subscription,
      latestKey,
      ledger: clone(this.state.ledger),
      events: clone(this.state.events).slice(0, 12),
      cannotDo: CANNOT_DO.slice(),
      freight: {
        name: "Orra Freight",
        page: "http://127.0.0.1:8081/",
        network: "http://127.0.0.1:8081/freight_guide",
      },
      pageFacts: {
        returns: "Demo orders can be undone from this page. There is no carrier.",
        tender: "Agents check out with the saved demo tender. Card numbers stay in the page form.",
      },
    };
  }

  addToCart(id, quantity) {
    const product = this.catalog.find((item) => item.id === id);
    if (!product) {
      return { ok: false, reason: "That item is not in the catalog.", field: "id" };
    }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      return { ok: false, reason: "Quantity must be an integer from 1 to 20.", field: "quantity" };
    }
    const existing = this.state.cart.items.find((line) => line.id === id);
    const nextQty = (existing ? existing.quantity : 0) + quantity;
    if (nextQty > product.stock) {
      return { ok: false, reason: `Only ${product.stock} of ${product.name} are in stock.`, field: "quantity" };
    }
    const gated = this.policy("add_to_cart", undefined, product.category);
    if (!gated.ok) {
      return gated;
    }
    if (existing) {
      existing.quantity = nextQty;
    } else {
      this.state.cart.items.push({ id, quantity });
    }
    this.bumpCart();
    const line = this.productLine(id, quantity);
    this.pushLedger({
      id: `led_${this.state.ledger.length + 1}`,
      tool: "add_to_cart",
      args: { id, quantity },
      rollback: { action: "remove_from_cart", args: { id, quantity }, label: `Remove ${quantity} × ${product.name}` },
    });
    this.persist();
    this.render();
    return this.getState();
  }

  setCart(items) {
    if (!Array.isArray(items) || items.length > 12) {
      return { ok: false, reason: "Cart must be a list of at most 12 lines.", field: "items" };
    }
    const next = [];
    for (const line of items) {
      const product = this.catalog.find((item) => item.id === line.id);
      if (!product) {
        return { ok: false, reason: `Unknown item ${line.id}.`, field: "items" };
      }
      if (!Number.isInteger(line.quantity) || line.quantity < 0 || line.quantity > 20) {
        return { ok: false, reason: "Each quantity must be 0 to 20.", field: "items" };
      }
      if (line.quantity > 0) {
        next.push({ id: line.id, quantity: line.quantity });
      }
    }
    const gated = this.policy("set_cart", 0);
    if (!gated.ok) {
      return gated;
    }
    this.state.cart.items = next;
    this.bumpCart();
    this.persist();
    this.render();
    return this.getState();
  }

  removeFromCart(id, quantity) {
    const line = this.state.cart.items.find((item) => item.id === id);
    if (!line) {
      return { ok: false, reason: "That item is not in the cart.", field: "id" };
    }
    if (quantity >= line.quantity) {
      this.state.cart.items = this.state.cart.items.filter((item) => item.id !== id);
    } else {
      line.quantity -= quantity;
    }
    this.bumpCart();
    this.persist();
    this.render();
    return this.getState();
  }

  checkCheckout(args) {
    const name = typeof args.customerName === "string" ? args.customerName.trim() : "";
    if (!name || name.length > 80) {
      return { ok: false, reason: "Enter a name of 1 to 80 characters.", field: "customerName" };
    }
    const fulfillment = args.fulfillment === "delivery" ? "delivery" : "pickup";
    if (this.state.cart.items.length === 0) {
      return { ok: false, reason: "The cart is empty.", field: "cart" };
    }
    if (args.expectedVersion !== this.state.cart.version) {
      return {
        ok: false,
        reason: "The cart changed since this checkout was prepared. Read the cart again.",
        field: "expectedVersion",
      };
    }
    const totalCents = this.cartTotalCents();
    if (typeof args.expectedTotalCents === "number" && args.expectedTotalCents !== totalCents) {
      return {
        ok: false,
        reason: `The total is ${money(totalCents)}, not the amount that was prepared.`,
        field: "expectedTotalCents",
      };
    }
    for (const line of this.state.cart.items) {
      const product = this.catalog.find((item) => item.id === line.id);
      const gated = this.policy("checkout_order", totalCents, product ? product.category : undefined);
      if (!gated.ok) {
        return gated;
      }
    }
    const items = this.state.cart.items.map((line) => this.productLine(line.id, line.quantity));
    return {
      ok: true,
      customerName: name,
      fulfillment,
      items,
      itemSummary: items.map((line) => `${line.quantity} × ${line.name}`).join(", "),
      totalCents,
      total: money(totalCents),
      rollback: "Refund the order and put the cart back as it is now.",
      expectedVersion: this.state.cart.version,
    };
  }

  checkout(args) {
    const check = this.checkCheckout(args);
    if (!check.ok) {
      if (!check.field) {
        this.recordEvent("denied", { tool: "checkout_order", reason: check.reason });
        this.persist();
        this.render();
      }
      return check;
    }
    this.freezeConstraints();
    const order = {
      id: `ord_${String(this.state.orders.length + 1).padStart(3, "0")}`,
      customerName: check.customerName,
      fulfillment: check.fulfillment,
      items: check.items,
      total: check.total,
      totalCents: check.totalCents,
      status: "received",
      tender: "demo",
      createdAt: new Date().toISOString(),
    };
    const snapshot = clone(this.state.cart.items);
    this.state.orders.unshift(order);
    this.state.cart.items = [];
    this.bumpCart();
    this.pushLedger({
      id: `led_${this.state.ledger.length + 1}`,
      tool: "checkout_order",
      args: { orderId: order.id },
      rollback: {
        action: "refund_and_cancel_order",
        args: { orderId: order.id, cartItems: snapshot },
        label: `Refund ${order.id} (${order.total})`,
      },
    });
    this.persist();
    this.render();
    return { ok: true, order, rollback: order.id };
  }

  checkSubscribe(args) {
    const plan = this.plans.find((item) => item.id === args.planId);
    if (!plan) {
      return { ok: false, reason: "Unknown Studio plan.", field: "planId" };
    }
    const gated = this.policy("subscribe_plan", plan.priceCents);
    if (!gated.ok) {
      return gated;
    }
    return {
      ok: true,
      planId: plan.id,
      planName: plan.name,
      total: plan.price,
      totalCents: plan.priceCents,
      rollback: `Cancel ${plan.name} at the end of this demo period.`,
    };
  }

  subscribe(args) {
    const check = this.checkSubscribe(args);
    if (!check.ok) {
      if (!check.field) {
        this.recordEvent("denied", { tool: "subscribe_plan", reason: check.reason });
        this.persist();
        this.render();
      }
      return check;
    }
    this.freezeConstraints();
    const previous = this.state.subscription;
    this.state.subscription = {
      planId: check.planId,
      planName: check.planName,
      price: check.total,
      status: "active",
      startedAt: new Date().toISOString(),
    };
    this.pushLedger({
      id: `led_${this.state.ledger.length + 1}`,
      tool: "subscribe_plan",
      args: { planId: check.planId },
      rollback: {
        action: "cancel_subscription",
        args: { previous },
        label: `Cancel ${check.planName}`,
      },
    });
    this.persist();
    this.render();
    return { ok: true, subscription: clone(this.state.subscription) };
  }

  checkCreateKey(args) {
    const name = typeof args.name === "string" ? args.name.trim() : "";
    if (!name || name.length > 40) {
      return { ok: false, reason: "Key name must be 1 to 40 characters.", field: "name" };
    }
    if (!this.state.subscription) {
      return { ok: false, reason: "Start a Studio plan before minting an API key.", field: "name" };
    }
    const gated = this.policy("create_api_key", 0);
    if (!gated.ok) {
      return gated;
    }
    return { ok: true, name, rollback: `Revoke the key named ${name}.` };
  }

  createApiKey(args) {
    const check = this.checkCreateKey(args);
    if (!check.ok) {
      if (!check.field) {
        this.recordEvent("denied", { tool: "create_api_key", reason: check.reason });
        this.persist();
        this.render();
      }
      return check;
    }
    this.freezeConstraints();
    const secret = `orra_live_${Math.random().toString(36).slice(2, 12)}`;
    const record = {
      id: `key_${this.state.keys.length + 1}`,
      name: check.name,
      prefix: `${secret.slice(0, 14)}…`,
      secret,
      createdAt: new Date().toISOString(),
    };
    this.state.keys.unshift(record);
    this.state.lastKeySecret = secret;
    this.pushLedger({
      id: `led_${this.state.ledger.length + 1}`,
      tool: "create_api_key",
      args: { keyId: record.id },
      rollback: { action: "revoke_api_key", args: { keyId: record.id }, label: `Revoke ${record.name}` },
    });
    this.persist();
    this.render();
    return {
      ok: true,
      key: { id: record.id, name: record.name, prefix: record.prefix },
      secretOnce: secret,
    };
  }

  checkUndoRun() {
    if (this.state.ledger.length === 0) {
      return { ok: false, reason: "There is nothing to undo." };
    }
    const gated = this.policy("undo_run", 0);
    if (!gated.ok) {
      return gated;
    }
    return {
      ok: true,
      steps: this.state.ledger.map((entry) => entry.rollback.label).reverse().join(" → "),
      count: this.state.ledger.length,
    };
  }

  undoRun() {
    const check = this.checkUndoRun();
    if (!check.ok) {
      return check;
    }
    const reversed = this.state.ledger.slice().reverse();
    for (const entry of reversed) {
      this.applyRollback(entry.rollback);
      this.recordEvent("rolled_back", { tool: entry.tool, rollback: entry.rollback.label });
    }
    this.state.ledger = [];
    this.state.frozenConstraints = null;
    this.persist();
    this.render();
    return { ok: true, undone: check.steps };
  }

  applyRollback(rollback) {
    if (rollback.action === "remove_from_cart") {
      this.removeFromCart(rollback.args.id, rollback.args.quantity);
      return;
    }
    if (rollback.action === "refund_and_cancel_order") {
      this.state.orders = this.state.orders.filter((order) => order.id !== rollback.args.orderId);
      this.state.cart.items = clone(rollback.args.cartItems);
      this.bumpCart();
      return;
    }
    if (rollback.action === "cancel_subscription") {
      this.state.subscription = rollback.args.previous;
      return;
    }
    if (rollback.action === "revoke_api_key") {
      this.state.keys = this.state.keys.filter((key) => key.id !== rollback.args.keyId);
      this.state.lastKeySecret = null;
    }
  }

  setConstraints(next) {
    const gated = this.policy("set_constraints", 0);
    if (!gated.ok) {
      return gated;
    }
    const mode = next.mode === "auto_within_policy" ? "auto_within_policy" : "always_ask";
    const spendCapCents = Number(next.spendCapCents);
    if (!Number.isFinite(spendCapCents) || spendCapCents < 0 || spendCapCents > 1000000) {
      return { ok: false, reason: "Spend cap must be between $0 and $10,000.", field: "spendCapCents" };
    }
    this.state.constraints = {
      ...this.state.constraints,
      mode,
      spendCapCents: Math.round(spendCapCents),
      allowedTools: Array.isArray(next.allowedTools)
        ? next.allowedTools
        : this.state.constraints.allowedTools,
    };
    this.persist();
    this.render();
    return this.getState();
  }

  login(email, password) {
    const user = DEMO_USERS.find((entry) => entry.email === email && entry.password === password);
    if (!user) {
      return { ok: false, reason: "Unknown demo account.", field: "email" };
    }
    this.state.user = { email: user.email, name: user.name, role: user.role };
    this.state.constraints = clone(user.constraints);
    this.persist();
    this.render();
    return { ok: true, user: this.state.user };
  }

  logout() {
    this.state.user = null;
    this.state.constraints = clone(DEFAULT_CONSTRAINTS);
    this.persist();
    this.render();
    return { ok: true };
  }

  fillCheckoutForm(args) {
    const name = document.getElementById("checkout-name");
    const fulfillment = document.getElementById("checkout-fulfillment");
    if (name) {
      name.value = args.customerName || "";
    }
    if (fulfillment) {
      fulfillment.value = args.fulfillment || "pickup";
    }
  }

  bind() {
    const addButtons = document.querySelectorAll("[data-add]");
    for (const button of addButtons) {
      button.addEventListener("click", () => {
        const result = this.addToCart(button.getAttribute("data-add"), 1);
        this.note(result.ok ? "" : result.reason);
      });
    }
    const checkout = document.getElementById("checkout-form");
    if (checkout) {
      checkout.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(checkout);
        const result = this.checkout({
          customerName: String(data.get("customerName") || ""),
          fulfillment: String(data.get("fulfillment") || "pickup"),
          expectedVersion: this.state.cart.version,
          expectedTotalCents: this.cartTotalCents(),
        });
        const note = document.getElementById("checkout-note");
        this.note(result.ok ? `Order ${result.order.id} received.` : result.reason);
        if (note) {
          note.textContent = result.ok ? `Order ${result.order.id} received.` : result.reason;
        }
      });
    }
    const login = document.getElementById("login-form");
    if (login) {
      login.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(login);
        const result = this.login(String(data.get("email") || ""), String(data.get("password") || ""));
        const note = document.getElementById("login-note");
        if (note) {
          note.textContent = result.ok ? `Signed in as ${result.user.name}.` : result.reason;
        }
      });
    }
    const logout = document.getElementById("logout-button");
    if (logout) {
      logout.addEventListener("click", () => this.logout());
    }
    const constraints = document.getElementById("constraints-form");
    if (constraints) {
      constraints.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(constraints);
        const dollars = Number(data.get("spendCap"));
        this.setConstraints({
          mode: String(data.get("mode") || "always_ask"),
          spendCapCents: Math.round(dollars * 100),
        });
      });
    }
    const undo = document.getElementById("undo-run");
    if (undo) {
      undo.addEventListener("click", () => this.undoRun());
    }
    const subscribe = document.querySelectorAll("[data-subscribe]");
    for (const button of subscribe) {
      button.addEventListener("click", () => {
        const result = this.subscribe({ planId: button.getAttribute("data-subscribe") });
        const note = document.getElementById("studio-note");
        if (note) {
          note.textContent = result.ok ? `Subscribed to ${result.subscription.planName}.` : result.reason;
        }
      });
    }
    const mint = document.getElementById("mint-key-form");
    if (mint) {
      mint.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(mint);
        const result = this.createApiKey({ name: String(data.get("name") || "") });
        const note = document.getElementById("key-note");
        if (note) {
          note.textContent = result.ok ? `Key ${result.secretOnce} shown once.` : result.reason;
        }
      });
    }
    this.render();
  }

  render() {
    if (typeof document === "undefined") {
      return;
    }
    const state = this.getState();
    const count = document.getElementById("cart-count");
    if (count) {
      const qty = state.cart.items.reduce((sum, line) => sum + line.quantity, 0);
      count.textContent = String(qty);
    }
    const cartBox = document.getElementById("cart-lines");
    if (cartBox) {
      cartBox.replaceChildren();
      if (state.cart.items.length === 0) {
        const empty = document.createElement("p");
        empty.textContent = "Cart is empty.";
        cartBox.append(empty);
      } else {
        for (const line of state.cart.items) {
          const row = document.createElement("p");
          row.textContent = `${line.quantity} × ${line.name} — ${line.lineTotal}`;
          cartBox.append(row);
        }
      }
    }
    const total = document.getElementById("cart-total");
    if (total) {
      total.textContent = state.cart.total;
    }
    const cap = document.getElementById("constraint-summary");
    if (cap) {
      cap.textContent = `${state.constraints.mode.replaceAll("_", " ")}, cap ${money(state.constraints.spendCapCents)}`;
    }
    const spendInput = document.getElementById("spend-cap");
    if (spendInput && document.activeElement !== spendInput) {
      spendInput.value = String(state.constraints.spendCapCents / 100);
    }
    const modeInput = document.getElementById("constraint-mode");
    if (modeInput && document.activeElement !== modeInput) {
      modeInput.value = state.constraints.mode;
    }
    const who = document.getElementById("signed-in");
    if (who) {
      who.textContent = state.user ? state.user.name : "Guest";
    }
    const orderBox = document.getElementById("latest-order");
    if (orderBox) {
      orderBox.textContent = state.latestOrder
        ? `${state.latestOrder.id} · ${state.latestOrder.status} · ${state.latestOrder.total}`
        : "No orders yet.";
    }
    const timeline = document.getElementById("run-timeline");
    if (timeline) {
      timeline.replaceChildren();
      if (state.events.length === 0) {
        const empty = document.createElement("p");
        empty.textContent = "No agent steps yet.";
        timeline.append(empty);
      } else {
        for (const event of state.events) {
          const row = document.createElement("li");
          const rollback = event.detail && event.detail.rollback ? ` · undo: ${event.detail.rollback.label || event.detail.rollback}` : "";
          row.textContent = `${event.kind}: ${event.detail && event.detail.tool ? event.detail.tool : ""} ${rollback}`;
          timeline.append(row);
        }
      }
    }
    const secretBox = document.getElementById("key-note");
    if (secretBox && this.state.lastKeySecret && !secretBox.textContent) {
      secretBox.textContent = `Key ${this.state.lastKeySecret} shown once.`;
    }
    const sub = document.getElementById("subscription-status");
    if (sub) {
      sub.textContent = state.subscription
        ? `${state.subscription.planName} (${state.subscription.status})`
        : "No Studio plan.";
    }
  }
}

export class App {
  static page = new StorePage();
}

if (typeof window !== "undefined") {
  App.page.bind();
}
