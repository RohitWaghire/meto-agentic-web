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
    lead: "2 weeks",
    dimensions: "12 in × 6 in × 8 in",
    mark: "sconce",
    image: "images/products/arc-sconce.jpg",
    summary: "A brass wall sconce with a glass shade that throws a long arc of light.",
    materials: "brass, mouth-blown glass",
    reviews: [
      { by: "N. Patel", rating: 5, text: "Hung two in a dark corridor. The shade is quieter than the photo." },
      { by: "L. Chen", rating: 4, text: "Brass arrived with a fingerprint. Wiped clean. Warm throw." },
    ],
  },
  {
    id: "mill-pendant",
    name: "Mill Pendant",
    category: "lighting",
    priceCents: 24000,
    price: "$240.00",
    stock: 5,
    lead: "3 weeks",
    dimensions: "16 in × 16 in × 14 in",
    mark: "pendant",
    image: "images/products/mill-pendant.jpg",
    summary: "A spun-copper pendant for a table that needs a low, even pool of light.",
    materials: "oxidized copper, linen cord",
    reviews: [
      { by: "A. Ruiz", rating: 5, text: "The pool on the table is even. Cord is the right dull green." },
    ],
  },
  {
    id: "grove-floor",
    name: "Grove Floor Lamp",
    category: "lighting",
    priceCents: 41000,
    price: "$410.00",
    stock: 3,
    lead: "5 weeks",
    dimensions: "18 in × 18 in × 62 in",
    mark: "floor",
    image: "images/products/grove-floor.jpg",
    summary: "A tall oak and brass floor lamp with a linen drum.",
    materials: "oak, brass, linen",
    reviews: [
      { by: "M. Cole", rating: 5, text: "Heavy base. Does not wander on oak floors." },
      { by: "S. Iyer", rating: 4, text: "Drum is larger than I expected. Good." },
    ],
  },
  {
    id: "linen-throw",
    name: "Linen Throw",
    category: "textiles",
    priceCents: 8600,
    price: "$86.00",
    stock: 12,
    lead: "ships tomorrow",
    dimensions: "50 in × 70 in",
    mark: "throw",
    image: "images/products/linen-throw.jpg",
    summary: "A heavy stone-linen throw woven in a two-end herringbone.",
    materials: "stone linen",
    reviews: [
      { by: "K. Bose", rating: 5, text: "Looks used on day one, which is the point." },
    ],
  },
  {
    id: "kiln-bowl",
    name: "Kiln Bowl",
    category: "objects",
    priceCents: 5400,
    price: "$54.00",
    stock: 9,
    lead: "in the shop",
    dimensions: "6 in × 6 in × 3 in",
    mark: "bowl",
    image: "images/products/kiln-bowl.jpg",
    summary: "A small glazed bowl for keys, clips, or a single stem.",
    materials: "stoneware, kiln glaze",
    reviews: [
      { by: "J. Hart", rating: 5, text: "Holds a handful of keys without looking like a dish." },
    ],
  },
  {
    id: "north-rug",
    name: "North Rug",
    category: "textiles",
    priceCents: 32000,
    price: "$320.00",
    stock: 4,
    lead: "4 weeks",
    dimensions: "60 in × 96 in",
    mark: "rug",
    image: "images/products/north-rug.jpg",
    summary: "A flatweave wool rug in verdigris and limestone stripes.",
    materials: "wool",
    reviews: [
      { by: "P. Ng", rating: 4, text: "Stripe is quieter in person. Sheds once, then sits." },
      { by: "R. Adeyemi", rating: 5, text: "The verdigris matches the sconce brass after a week." },
    ],
  },
];

export const PLANS = [
  { id: "starter", name: "Starter", priceCents: 2900, price: "$29.00 / month", sceneCap: 12, rooms: 1, summary: "One room, twelve scenes a month, one API key." },
  { id: "pro", name: "Pro", priceCents: 7900, price: "$79.00 / month", sceneCap: 80, rooms: 4, summary: "Four rooms, eighty scenes, three keys, dummy webhook." },
  { id: "atelier", name: "Atelier", priceCents: 19000, price: "$190.00 / month", sceneCap: 400, rooms: 12, summary: "The whole floor. Four hundred scenes, ten keys, a named desk." },
];

export const DEMO_USERS = [
  {
    email: "maya@meto.example",
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
    email: "julian@meto.example",
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
    email: "ada@meto.example",
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

export const CANNOT_DO = [
  "live shipping quotes from a carrier",
  "real card charges or bank transfers",
  "coupon codes",
  "gift wrap",
  "order tracking after the demo refund",
  "call a live webhook",
  "issue a production API secret that talks to the internet",
  "change another visitor's cart",
  "bypass the spend cap or the allowed-tools list",
  "store a PAN or CVV on the page or in a tool argument",
];

const NAV = [
  { href: "index.html", label: "Floor" },
  { href: "shop.html", label: "Shop" },
  { href: "studio.html", label: "Studio" },
  { href: "account.html", label: "Account" },
  { href: "docs.html", label: "Docs" },
  { href: "index.html#assistant", label: "Ask meto" },
];

const SEED_CHIPS = [
  { prompt: "Buy a wall sconce under $180" },
  { prompt: "Start Studio Pro and mint a key named demo" },
  { prompt: "Reorder my last throw if in stock" },
];

const MARK_PATHS = {
  sconce: '<path class="lamp-arc" d="M20 100 C20 30 140 30 140 100"/><circle class="lamp-fill" cx="140" cy="100" r="8"/>',
  pendant: '<rect class="lamp-arc" x="70" y="10" width="20" height="70"/><ellipse class="lamp-fill" cx="80" cy="95" rx="36" ry="12"/>',
  floor: '<path class="lamp-arc" d="M80 10 V70"/><circle class="lamp-fill" cx="80" cy="88" r="22"/>',
  throw: '<path class="lamp-arc" d="M20 40 H140 V90 H20 Z"/>',
  bowl: '<ellipse class="lamp-arc" cx="80" cy="70" rx="40" ry="18"/>',
  rug: '<rect class="lamp-arc" x="25" y="40" width="110" height="50"/>',
};

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

function brandFromDigits(digits) {
  if (digits.startsWith("4")) return "Visa";
  if (digits.startsWith("5")) return "Mastercard";
  if (digits.startsWith("3")) return "Amex";
  return "Card";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function markSvg(kind) {
  return `<svg viewBox="0 0 160 120" aria-hidden="true">${MARK_PATHS[kind] || MARK_PATHS.bowl}</svg>`;
}

export function pieceImageUrl(path) {
  if (!path || typeof path !== "string") return "";
  if (path.includes("://") && !/^https?:/i.test(path)) return "";
  try {
    const url = new URL(path, import.meta.url);
    if (url.protocol !== "http:" && url.protocol !== "https:" && url.protocol !== "file:") {
      return "";
    }
    return url.href;
  } catch {
    return "";
  }
}

export function pieceFallback(img) {
  if (!img || img.dataset?.fallbackApplied === "1") return;
  if (img.dataset) img.dataset.fallbackApplied = "1";
  const mark = typeof img.getAttribute === "function" ? img.getAttribute("data-mark") : img.dataset?.mark;
  if (typeof document !== "undefined" && typeof img.replaceWith === "function") {
    const wrap = document.createElement("div");
    wrap.innerHTML = markSvg(mark);
    const svg = wrap.firstElementChild || wrap.children?.[0];
    if (svg) {
      img.replaceWith(svg);
      return;
    }
  }
  if (typeof img.removeAttribute === "function") img.removeAttribute("src");
}

export function pieceMedia(item, extraClass = "") {
  const resolved = pieceImageUrl(item?.image);
  if (!resolved) return markSvg(item?.mark);
  const cls = ["piece-photo"];
  if (extraClass && /^[a-z0-9-]+$/i.test(extraClass)) cls.push(extraClass);
  const src = escapeHtml(resolved);
  const alt = escapeHtml(item.name || "");
  const mark = escapeHtml(item.mark || "bowl");
  const lazy = extraClass === "hero-photo" ? "" : " loading=\"lazy\"";
  return `<img class="${cls.join(" ")}" src="${src}" alt="${alt}" width="1400" height="933" decoding="async"${lazy} data-mark="${mark}" onerror="globalThis.metoPieceFallback&&globalThis.metoPieceFallback(this)">`;
}

function currentFile() {
  if (typeof location === "undefined") return "index.html";
  return location.pathname.split("/").pop() || "index.html";
}

function routerHost() {
  if (typeof location === "undefined") return "localhost";
  return location.host;
}

function el(id) {
  if (typeof document === "undefined") return null;
  try {
    return document.getElementById(id);
  } catch {
    return null;
  }
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
  static humanConfirm = null;

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
      tender: { brand: "Demo", last4: "4242", tender: "demo" },
      mandate: null,
      invoices: [],
      rooms: [],
      scenesUsed: 0,
      webhookUrl: "",
    };
  }

  hydrate() {
    const raw = this.storage.getItem("meto.v1");
    if (!raw) {
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        this.state = this.blankState();
        return;
      }
      this.state = this.sanitizeState({ ...this.blankState(), ...parsed });
      this.persist();
    } catch {
      this.state = this.blankState();
    }
  }

  sanitizeState(state) {
    const blank = this.blankState();
    const next = { ...blank, ...(state && typeof state === "object" ? state : {}) };
    const cart = next.cart && typeof next.cart === "object" ? next.cart : blank.cart;
    const seen = new Set();
    const items = [];
    for (const line of Array.isArray(cart.items) ? cart.items : []) {
      if (!line || typeof line.id !== "string") continue;
      const product = this.catalogItem(line.id);
      if (!product || seen.has(line.id)) continue;
      const qty = Number(line.quantity);
      if (!Number.isInteger(qty) || qty < 1) continue;
      const clamped = Math.min(qty, product.stock, 20);
      if (clamped < 1) continue;
      items.push({ id: line.id, quantity: clamped });
      seen.add(line.id);
    }
    const version = Number(cart.version);
    next.cart = {
      items,
      version: Number.isInteger(version) && version >= 0 ? version : 0,
    };

    const constraints = next.constraints && typeof next.constraints === "object" ? next.constraints : blank.constraints;
    const cap = Number(constraints.spendCapCents);
    next.constraints = {
      ...blank.constraints,
      ...constraints,
      mode: constraints.mode === "auto_within_policy" ? "auto_within_policy" : "always_ask",
      spendCapCents: Number.isFinite(cap) && cap >= 0 ? Math.round(cap) : blank.constraints.spendCapCents,
      allowedTools: Array.isArray(constraints.allowedTools) ? constraints.allowedTools : blank.constraints.allowedTools,
      allowedCategories: Array.isArray(constraints.allowedCategories)
        ? constraints.allowedCategories
        : blank.constraints.allowedCategories,
    };
    if (next.frozenConstraints && typeof next.frozenConstraints !== "object") {
      next.frozenConstraints = null;
    }

    if (!Array.isArray(next.orders)) next.orders = [];
    if (!Array.isArray(next.events)) next.events = [];
    if (!Array.isArray(next.ledger)) next.ledger = [];
    if (!Array.isArray(next.keys)) next.keys = [];
    if (!Array.isArray(next.invoices)) next.invoices = [];
    if (!Array.isArray(next.rooms)) next.rooms = [];
    if (typeof next.scenesUsed !== "number" || !Number.isFinite(next.scenesUsed) || next.scenesUsed < 0) {
      next.scenesUsed = 0;
    }
    if (typeof next.webhookUrl !== "string") next.webhookUrl = "";

    const tender = next.tender && typeof next.tender === "object" ? next.tender : blank.tender;
    next.tender = {
      brand: typeof tender.brand === "string" && tender.brand ? tender.brand : "Demo",
      last4: typeof tender.last4 === "string" && /^\d{4}$/.test(tender.last4) ? tender.last4 : "4242",
      tender: "demo",
    };
    return next;
  }

  persist() {
    this.storage.setItem("meto.v1", JSON.stringify(this.state));
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
    const safe = { ...(detail || {}) };
    delete safe.secret;
    delete safe.secretOnce;
    delete safe.number;
    delete safe.cvv;
    delete safe.pan;
    this.state.events.unshift({
      id: `evt_${this.state.events.length + 1}_${Date.now()}`,
      at: new Date().toISOString(),
      kind,
      host: routerHost(),
      detail: safe,
    });
    this.state.events = this.state.events.slice(0, 40);
  }

  catalogItem(id) {
    return this.catalog.find((item) => item.id === id) || null;
  }

  relatedItems(id) {
    const item = this.catalogItem(id);
    if (!item) return this.catalog.slice(0, 3);
    return this.catalog
      .filter((other) => other.id !== id && other.category === item.category)
      .concat(this.catalog.filter((other) => other.id !== id && other.category !== item.category))
      .slice(0, 3);
  }

  roomsForPlan(plan) {
    const names = ["Dawn room", "Hall", "Study", "North gallery", "Office", "Terrace", "Loft", "Court", "Annex", "Yard", "Well", "Desk"];
    return names.slice(0, plan.rooms).map((name, index) => ({
      id: `room_${index + 1}`,
      name,
      scenes: index === 0 ? ["Dawn", "Dusk"] : ["Idle"],
    }));
  }

  productCard(item) {
    const id = encodeURIComponent(item.id);
    const name = escapeHtml(item.name);
    const inStock = item.stock > 0;
    return `<article class="piece" id="piece-${escapeHtml(item.id)}">
      <a class="piece-link" href="./product.html?id=${id}">${pieceMedia(item)}</a>
      <h3><a href="./product.html?id=${id}">${name}</a></h3>
      <p class="price">${escapeHtml(item.price)}</p>
      <p>${escapeHtml(item.materials)}</p>
      <button type="button" data-add="${escapeHtml(item.id)}"${inStock ? "" : " disabled"}>${inStock ? `Add ${name}` : "Out of stock"}</button>
    </article>`;
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
    const box = el("action-note") || el("checkout-note") || el("cart-note");
    if (box) {
      box.textContent = text || "";
    }
    try {
      const extra = document.querySelector("[data-checkout-note]");
      if (extra) extra.textContent = text || "";
    } catch {
      // StubDocument cannot search.
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
      orders: clone(this.state.orders),
      subscription: this.state.subscription,
      latestKey,
      keys: this.state.keys.map((key) => ({
        id: key.id,
        name: key.name,
        prefix: key.prefix,
        createdAt: key.createdAt,
      })),
      invoices: clone(this.state.invoices),
      rooms: clone(this.state.rooms),
      scenesUsed: this.state.scenesUsed,
      sceneCap: this.state.subscription?.sceneCap || 0,
      webhookUrl: this.state.webhookUrl,
      tender: this.state.tender
        ? { brand: this.state.tender.brand, last4: this.state.tender.last4, tender: "demo" }
        : null,
      mandate: this.state.mandate ? { kind: "demo-jwt" } : null,
      ledger: clone(this.state.ledger),
      events: clone(this.state.events).slice(0, 12),
      cannotDo: CANNOT_DO.slice(),
      freight: {
        name: "meto Freight",
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
      if (line.quantity > product.stock) {
        return { ok: false, reason: `Only ${product.stock} of ${product.name} are in stock.`, field: "items" };
      }
      if (line.quantity > 0) {
        if (next.some((row) => row.id === line.id)) {
          return { ok: false, reason: `Cart already has a line for ${product.name}.`, field: "items" };
        }
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
    if (!Number.isInteger(quantity) || quantity < 1) {
      return { ok: false, reason: "Quantity must be an integer of at least 1.", field: "quantity" };
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
      if (!product) {
        return { ok: false, reason: "The cart holds a piece that is no longer on the floor.", field: "cart" };
      }
      if (!Number.isInteger(line.quantity) || line.quantity < 1) {
        return { ok: false, reason: "A cart line has an invalid quantity.", field: "cart" };
      }
      if (line.quantity > product.stock) {
        return { ok: false, reason: `Only ${product.stock} of ${product.name} are in stock.`, field: "quantity" };
      }
      const gated = this.policy("checkout_order", totalCents, product.category);
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
      tender: clone(this.state.tender || { brand: "Demo", last4: "4242", tender: "demo" }),
      mandate: this.state.mandate ? { kind: "demo-jwt" } : null,
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
    const previousRooms = clone(this.state.rooms);
    const previousInvoices = clone(this.state.invoices);
    const previousUsed = this.state.scenesUsed;
    const plan = this.plans.find((item) => item.id === check.planId);
    const invoice = {
      id: `inv_${String(this.state.invoices.length + 1).padStart(3, "0")}`,
      planName: check.planName,
      total: check.total,
      totalCents: check.totalCents,
      status: "paid",
      at: new Date().toISOString(),
    };
    this.state.subscription = {
      planId: check.planId,
      planName: check.planName,
      price: check.total,
      sceneCap: plan.sceneCap,
      rooms: plan.rooms,
      status: "active",
      startedAt: new Date().toISOString(),
    };
    this.state.rooms = this.roomsForPlan(plan);
    this.state.scenesUsed = Math.min(this.state.scenesUsed, plan.sceneCap);
    this.state.invoices.unshift(invoice);
    this.pushLedger({
      id: `led_${this.state.ledger.length + 1}`,
      tool: "subscribe_plan",
      args: { planId: check.planId },
      rollback: {
        action: "cancel_subscription",
        args: { previous, rooms: previousRooms, invoices: previousInvoices, scenesUsed: previousUsed },
        label: `Cancel ${check.planName}`,
      },
    });
    this.persist();
    this.render();
    return { ok: true, subscription: clone(this.state.subscription), invoice };
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
    const secret = `meto_live_${Math.random().toString(36).slice(2, 12)}`;
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

  checkRollbackStep() {
    const entry = this.state.ledger[this.state.ledger.length - 1];
    if (!entry) {
      return { ok: false, reason: "There is no last step to reverse." };
    }
    const gated = this.policy("rollback_step", 0);
    if (!gated.ok) {
      return gated;
    }
    return {
      ok: true,
      step: entry.rollback.label,
      rollback: entry.rollback.label,
    };
  }

  rollbackStep() {
    const check = this.checkRollbackStep();
    if (!check.ok) {
      if (!check.field) {
        this.recordEvent("denied", { tool: "rollback_step", reason: check.reason });
        this.persist();
        this.render();
      }
      return check;
    }
    const entry = this.state.ledger.pop();
    this.applyRollback(entry.rollback);
    if (!this.state.ledger.length) {
      this.state.frozenConstraints = null;
    }
    this.recordEvent("rollback_step", { tool: entry.tool, rollback: entry.rollback.label });
    this.persist();
    this.render();
    return { ok: true, reversed: entry.rollback.label };
  }

  saveHumanTender({ number, expiry, cvv } = {}) {
    const digits = String(number || "").replace(/\D/g, "");
    if (digits.length < 13 || digits.length > 19) {
      return { ok: false, reason: "Enter a dummy card number between 13 and 19 digits. Nothing is charged." };
    }
    if (!String(expiry || "").match(/^\d{2}\s*\/\s*\d{2}$/)) {
      return { ok: false, reason: "Expiry should look like MM/YY." };
    }
    if (!String(cvv || "").match(/^\d{3,4}$/)) {
      return { ok: false, reason: "CVV is three or four dummy digits. It is not stored." };
    }
    this.state.tender = {
      brand: brandFromDigits(digits),
      last4: digits.slice(-4),
      tender: "demo",
    };
    this.persist();
    return { ok: true, tender: clone(this.state.tender) };
  }

  saveMandate({ token } = {}) {
    const value = String(token || "").trim();
    this.state.mandate = value ? { kind: "demo-jwt", token: value.slice(0, 48) } : null;
    this.persist();
    return { ok: true, mandate: this.state.mandate ? { kind: "demo-jwt" } : null };
  }

  saveWebhook({ url } = {}) {
    this.state.webhookUrl = String(url || "").trim();
    this.persist();
    this.render();
    return { ok: true, webhookUrl: this.state.webhookUrl };
  }

  async confirmIfHuman(action, args) {
    if (typeof StorePage.humanConfirm !== "function") {
      return { ok: true };
    }
    return StorePage.humanConfirm(action, args);
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
      if ("rooms" in (rollback.args || {})) this.state.rooms = clone(rollback.args.rooms || []);
      if ("invoices" in (rollback.args || {})) this.state.invoices = clone(rollback.args.invoices || []);
      if ("scenesUsed" in (rollback.args || {})) this.state.scenesUsed = rollback.args.scenesUsed;
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

  bindChrome() {
    const headerHost = el("site-header");
    if (headerHost && !headerHost.dataset?.bound) {
      headerHost.dataset.bound = "1";
      const path = currentFile();
      const hash = typeof location !== "undefined" ? location.hash : "";
      const links = NAV.map((item) => {
        const file = item.href.split("#")[0];
        const itemHash = item.href.includes("#") ? `#${item.href.split("#")[1]}` : "";
        const current = itemHash ? file === path && hash === itemHash : file === path;
        return `<a href="${item.href}"${current ? ' aria-current="page"' : ""}>${item.label}</a>`;
      });
      headerHost.innerHTML = `
        <nav class="nav-start">${links.slice(0, 3).join("")}</nav>
        <a class="mark" href="index.html">meto</a>
        <nav class="nav-end">
          ${links.slice(3).join("")}
          <a href="cart.html">Cart <span id="cart-count">0</span></a>
        </nav>
      `;
    }
    const footerHost = el("site-footer");
    if (footerHost && !footerHost.dataset?.bound) {
      footerHost.dataset.bound = "1";
      footerHost.innerHTML = `
        <p>meto · dummy limestone shop for the Open Agentic Web Challenge. No real charges.</p>
        <nav>
          <a href="about.html">About</a>
          <a href="blog.html">Notes</a>
          <a href="legal.html">Terms</a>
          <a href="permissions.html">Permissions</a>
          <a href="pricing.html">Pricing</a>
          <a href="docs.html">Docs</a>
          <a href="llms.txt">llms.txt</a>
        </nav>
      `;
    }
    const chipHost = el("seed-chips");
    if (chipHost && !chipHost.dataset?.bound) {
      chipHost.dataset.bound = "1";
      chipHost.innerHTML = SEED_CHIPS.map(
        (chip) => `<button type="button" class="chip" data-prompt="${chip.prompt}">${chip.prompt}</button>`,
      ).join("");
      chipHost.addEventListener("click", (event) => {
        const button = event.target.closest("[data-prompt]");
        if (!button) return;
        this.fillAssistantPrompt(button.dataset.prompt);
      });
    }
  }

  fillAssistantPrompt(prompt) {
    const tryFill = () => {
      const input = document.querySelector("#ns-input");
      if (!input) return false;
      input.value = prompt;
      input.focus();
      document.getElementById("assistant")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    };
    if (tryFill()) return;
    if (typeof location !== "undefined" && !location.pathname.endsWith("index.html") && location.pathname !== "/") {
      location.href = `index.html#assistant`;
      sessionStorage.setItem("meto.prompt", prompt);
      return;
    }
    const started = Date.now();
    const timer = setInterval(() => {
      if (tryFill() || Date.now() - started > 6000) clearInterval(timer);
    }, 200);
  }

  bind() {
    if (typeof document === "undefined") return;
    if (typeof sessionStorage !== "undefined") {
      const queued = sessionStorage.getItem("meto.prompt");
      if (queued) {
        sessionStorage.removeItem("meto.prompt");
        this.fillAssistantPrompt(queued);
      }
    }
    this.bindChrome();
    this.bindShop();
    this.bindProduct();
    this.bindCartPage();
    this.bindDocs();
    if (!document.body.dataset.addBound) {
      document.body.dataset.addBound = "1";
      document.body.addEventListener("click", (event) => {
        const button = event.target.closest("[data-add]");
        if (!button || button.disabled) return;
        const result = this.addToCart(button.getAttribute("data-add"), 1);
        this.note(result.ok ? "" : result.reason);
        const cartNote = el("cart-note");
        if (cartNote) cartNote.textContent = result.ok ? `In the cart · ${this.getState().cart.total}` : result.reason;
      });
    }
    this.bindCheckoutForm(document.getElementById("checkout-form"));
    const login = document.getElementById("login-form");
    if (login && !login.dataset.bound) {
      login.dataset.bound = "1";
      login.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(login);
        const result = this.login(String(data.get("email") || ""), String(data.get("password") || ""));
        const note = document.getElementById("login-note");
        if (note) note.textContent = result.ok ? `Signed in as ${result.user.name}.` : result.reason;
      });
    }
    const logout = document.getElementById("logout-button");
    if (logout && !logout.dataset.bound) {
      logout.dataset.bound = "1";
      logout.addEventListener("click", () => this.logout());
    }
    const constraints = document.getElementById("constraints-form");
    if (constraints && !constraints.dataset.bound) {
      constraints.dataset.bound = "1";
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
    if (undo && !undo.dataset.bound) {
      undo.dataset.bound = "1";
      undo.addEventListener("click", async () => {
        const confirmed = await this.confirmIfHuman("undo_run", {});
        const note = document.getElementById("undo-note") || document.getElementById("action-note");
        if (!confirmed.ok) {
          if (note) note.textContent = confirmed.reason;
          return;
        }
        const result = this.undoRun();
        if (note) note.textContent = result.ok ? `Reversed: ${result.undone}` : result.reason;
      });
    }
    const rollback = document.getElementById("rollback-step");
    if (rollback && !rollback.dataset.bound) {
      rollback.dataset.bound = "1";
      rollback.addEventListener("click", async () => {
        const confirmed = await this.confirmIfHuman("rollback_step", {});
        const note = document.getElementById("undo-note") || document.getElementById("action-note");
        if (!confirmed.ok) {
          if (note) note.textContent = confirmed.reason;
          return;
        }
        const result = this.rollbackStep();
        if (note) note.textContent = result.ok ? `Reversed ${result.reversed}.` : result.reason;
      });
    }
    for (const button of document.querySelectorAll("[data-subscribe]")) {
      if (button.dataset.bound) continue;
      button.dataset.bound = "1";
      button.addEventListener("click", async () => {
        const args = { planId: button.getAttribute("data-subscribe") };
        const confirmed = await this.confirmIfHuman("subscribe_plan", args);
        const note = document.getElementById("studio-note") || document.getElementById("subscription-status");
        if (!confirmed.ok) {
          if (note) note.textContent = confirmed.reason;
          return;
        }
        const result = this.subscribe(args);
        if (note) note.textContent = result.ok ? `Subscribed to ${result.subscription.planName}.` : result.reason;
      });
    }
    const mint = document.getElementById("mint-key-form");
    if (mint && !mint.dataset.bound) {
      mint.dataset.bound = "1";
      mint.addEventListener("submit", async (event) => {
        event.preventDefault();
        const data = new FormData(mint);
        const args = { name: String(data.get("name") || "") };
        const confirmed = await this.confirmIfHuman("create_api_key", args);
        const note = document.getElementById("key-note");
        if (!confirmed.ok) {
          if (note) note.textContent = confirmed.reason;
          return;
        }
        const result = this.createApiKey(args);
        if (note) note.textContent = result.ok ? `Key ${result.secretOnce} shown once.` : result.reason;
      });
    }
    const webhook = document.getElementById("webhook-form");
    if (webhook && !webhook.dataset.bound) {
      webhook.dataset.bound = "1";
      webhook.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(webhook);
        this.saveWebhook({ url: data.get("url") });
      });
    }
    this.render();
  }

  bindCheckoutForm(form) {
    if (!form || form.dataset.bound) return;
    form.dataset.bound = "1";
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const note = form.querySelector("[data-checkout-note]") || document.getElementById("checkout-note");
      if (form.querySelector("[name=card]")) {
        const tender = this.saveHumanTender({
          number: data.get("card"),
          expiry: data.get("expiry"),
          cvv: data.get("cvv"),
        });
        if (!tender.ok) {
          if (note) note.textContent = tender.reason;
          return;
        }
      }
      this.saveMandate({ token: data.get("mandate") });
      const args = {
        customerName: String(data.get("customerName") || data.get("name") || ""),
        fulfillment: String(data.get("fulfillment") || "pickup"),
        expectedVersion: this.state.cart.version,
        expectedTotalCents: this.cartTotalCents(),
      };
      const confirmed = await this.confirmIfHuman("checkout_order", args);
      if (!confirmed.ok) {
        if (note) note.textContent = confirmed.reason;
        return;
      }
      const result = this.checkout(args);
      const message = result.ok
        ? `Order ${result.order.id} received on ${result.order.tender.brand} ···· ${result.order.tender.last4}.`
        : result.reason;
      this.note(message);
      if (note) note.textContent = message;
    });
  }

  bindShop() {
    const grid = el("shop-grid");
    if (!grid) return;
    const draw = () => {
      const category = el("shop-category")?.value || "";
      const maxRaw = (el("shop-max")?.value || "").trim();
      const max = Number(maxRaw);
      const hasMax = maxRaw !== "" && Number.isFinite(max) && max >= 0;
      const q = (el("shop-q")?.value || "").toLowerCase();
      const items = this.catalog.filter((item) => {
        if (category && item.category !== category) return false;
        if (hasMax && item.priceCents > max * 100) return false;
        if (q && !`${item.name} ${item.summary} ${item.category} ${item.materials}`.toLowerCase().includes(q)) {
          return false;
        }
        return true;
      });
      grid.innerHTML = items.length
        ? items.map((item) => this.productCard(item)).join("")
        : `<p class="empty">Nothing in that cut of the floor.</p>`;
      this.bindPieceMedia(grid);
    };
    const filters = el("shop-filters");
    if (filters && !filters.dataset.bound) {
      filters.dataset.bound = "1";
      filters.addEventListener("input", draw);
      filters.addEventListener("change", draw);
    }
    draw();
  }

  bindProduct() {
    const root = el("product-root");
    if (!root || root.dataset.bound) return;
    root.dataset.bound = "1";
    const params = new URLSearchParams(typeof location !== "undefined" ? location.search : "");
    const item = this.catalogItem(params.get("id"));
    if (!item) {
      root.innerHTML = `<p class="empty">That piece is not on the floor. <a href="./shop.html">Back to the shop.</a></p>`;
      return;
    }
    const related = this.relatedItems(item.id);
    const inStock = item.stock > 0;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: item.name,
      description: item.summary,
      sku: item.id,
      image: pieceImageUrl(item.image),
      material: item.materials,
      offers: {
        "@type": "Offer",
        price: (item.priceCents / 100).toFixed(2),
        priceCurrency: "USD",
        availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      },
    };
    if (document.head) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.append(script);
    }
    try {
      document.title = `${item.name} · meto`;
    } catch {
      // The Node test document has no title.
    }
    root.innerHTML = `
      <div class="product-hero">
        ${pieceMedia(item, "hero-photo")}
        <div>
          <p class="kicker">${escapeHtml(item.category)}</p>
          <h1>${escapeHtml(item.name)}</h1>
          <p class="lede">${escapeHtml(item.summary)}</p>
          <p class="meta">${escapeHtml(item.price)} · ${escapeHtml(item.materials)} · ${escapeHtml(item.dimensions)} · ${item.stock} in dummy stock · ${escapeHtml(item.lead)}</p>
          <button type="button" data-add="${escapeHtml(item.id)}"${inStock ? "" : " disabled"}>${inStock ? "Add to cart" : "Out of stock"}</button>
          <p class="note" id="cart-note"></p>
        </div>
      </div>
      <section>
        <h2>Notes from the floor</h2>
        <ul class="reviews">${item.reviews.map((review) => `<li><strong>${escapeHtml(review.by)}</strong> · ${escapeHtml(review.rating)}/5<p>${escapeHtml(review.text)}</p></li>`).join("")}</ul>
      </section>
      <section>
        <h2>Nearby</h2>
        <div class="grid">${related.map((other) => this.productCard(other)).join("")}</div>
      </section>
    `;
    this.bindPieceMedia(root);
  }

  bindCartPage() {
    const root = el("cart-root");
    if (!root || root.dataset.bound) return;
    root.dataset.bound = "1";
    root.addEventListener("click", (event) => {
      const remove = event.target.closest("[data-remove]");
      if (remove) this.removeFromCart(remove.dataset.remove, 99);
    });
    root.addEventListener("change", (event) => {
      const qty = event.target.closest("[data-qty]");
      if (!qty) return;
      const id = qty.dataset.qty;
      const product = this.catalogItem(id);
      const raw = Number(qty.value);
      if (!product) {
        this.removeFromCart(id, 99);
        this.note("That piece is no longer on the floor.");
        return;
      }
      if (!Number.isFinite(raw)) {
        const line = this.state.cart.items.find((item) => item.id === id);
        qty.value = String(line ? line.quantity : 0);
        this.note("Quantity must be a number.");
        return;
      }
      const wanted = Math.max(0, Math.min(20, Math.trunc(raw)));
      const next = Math.min(wanted, product.stock);
      if (wanted > product.stock) {
        this.note(`Only ${product.stock} of ${product.name} are in stock.`);
      } else {
        this.note("");
      }
      qty.value = String(next);
      const items = this.state.cart.items.map((line) =>
        line.id === id ? { id: line.id, quantity: next } : line,
      );
      const result = this.setCart(items);
      if (!result.ok) {
        this.note(result.reason);
        const line = this.state.cart.items.find((item) => item.id === id);
        qty.value = String(line ? line.quantity : 0);
      }
    });
    this.bindCheckoutForm(el("cart-checkout"));
  }

  bindPieceMedia(root) {
    if (typeof document === "undefined") return;
    try {
      const scope = root && typeof root.querySelectorAll === "function" ? root : document;
      const images = scope.querySelectorAll("img.piece-photo");
      for (const img of images) {
        if (!img || img.dataset.fallbackApplied === "1") continue;
        if (typeof img.addEventListener === "function" && img.dataset.mediaBound !== "1") {
          img.dataset.mediaBound = "1";
          img.addEventListener("error", () => pieceFallback(img));
        }
        if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) {
          pieceFallback(img);
        }
      }
    } catch {
      // StubDocument cannot search the page.
    }
  }

  bindDocs() {
    const list = el("cannot-do");
    if (list && !list.dataset.bound) {
      list.dataset.bound = "1";
      list.innerHTML = CANNOT_DO.map((item) => `<li>${item}</li>`).join("");
    }
  }

  render() {
    if (typeof document === "undefined") {
      return;
    }
    try {
      this.bindChrome();
    } catch {
      // The Node test document cannot search; chrome is a no-op there.
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
          const remove = document.createElement("button");
          remove.type = "button";
          remove.className = "ghost";
          remove.dataset.remove = line.id;
          remove.textContent = "Remove";
          remove.addEventListener("click", () => this.removeFromCart(line.id, line.quantity));
          row.append(" ", remove);
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
    this.renderTimeline(state);
    this.renderCartPage(state);
    this.renderStudio(state);
    this.renderAccount(state);
    this.renderPermissions(state);
    this.bindPieceMedia();
    const secretBox = document.getElementById("key-note");
    if (secretBox) {
      if (this.state.lastKeySecret && !secretBox.textContent) {
        secretBox.textContent = `Key ${this.state.lastKeySecret} shown once.`;
      } else if (!this.state.lastKeySecret && /shown once/.test(secretBox.textContent)) {
        secretBox.textContent = "Key revoked.";
      }
    }
    const sub = document.getElementById("subscription-status");
    if (sub) {
      sub.textContent = state.subscription
        ? `${state.subscription.planName} (${state.subscription.status}) · ${state.scenesUsed}/${state.sceneCap} scenes`
        : "No Studio plan.";
    }
  }

  renderTimeline(state) {
    const timeline = document.getElementById("run-timeline");
    if (!timeline) return;
    timeline.replaceChildren();
    if (!state.events.length) {
      const empty = document.createElement("p");
      empty.textContent = "No agent steps yet.";
      timeline.append(empty);
      return;
    }
    for (const event of state.events) {
      const row = document.createElement("li");
      const tool = event.detail && event.detail.tool ? event.detail.tool : "";
      const reason = event.detail && event.detail.reason ? ` · ${event.detail.reason}` : "";
      const rollback = event.detail && event.detail.rollback
        ? ` · undo: ${event.detail.rollback.label || event.detail.rollback}`
        : "";
      const peer = event.detail && event.detail.peerOrigin ? ` · peer ${event.detail.peerOrigin}` : "";
      const frozen = event.kind === "policy_frozen" && event.detail
        ? ` · ${event.detail.mode || ""} cap ${event.detail.spendCap || ""}`
        : "";
      row.textContent = `${event.kind}: ${tool}${reason}${frozen}${rollback} · router ${event.host || routerHost()}${peer}`;
      timeline.append(row);
    }
  }

  renderCartPage(state) {
    const root = el("cart-root");
    if (!root) return;
    if (!state.cart.items.length) {
      root.innerHTML = `<p class="empty">The cart is empty. <a href="shop.html">Walk the shop.</a></p>`;
      return;
    }
    root.innerHTML = `<ul class="cart-lines">${state.cart.items
      .map((line) => {
        const item = this.catalogItem(line.id);
        if (!item) {
          const id = escapeHtml(line.id);
          return `<li class="cart-unknown">
            <div>
              <p>That piece is no longer on the floor.</p>
              <p class="meta">${id}</p>
            </div>
            <button type="button" data-remove="${id}">Remove</button>
          </li>`;
        }
        return `<li>
          ${pieceMedia(item, "line-photo")}
          <div>
            <a href="./product.html?id=${encodeURIComponent(item.id)}">${escapeHtml(item.name)}</a>
            <p class="meta">${escapeHtml(item.price)}</p>
          </div>
          <label>Qty <input data-qty="${escapeHtml(item.id)}" type="number" min="0" max="${item.stock}" step="1" inputmode="numeric" value="${line.quantity}"></label>
          <button type="button" data-remove="${escapeHtml(item.id)}">Remove</button>
        </li>`;
      })
      .join("")}</ul>
      <p class="total">Total ${escapeHtml(state.cart.total)}</p>`;
    this.bindPieceMedia(root);
  }

  renderStudio(state) {
    const meter = el("usage-meter");
    if (meter) {
      const cap = state.sceneCap || 0;
      const used = state.scenesUsed || 0;
      const pct = cap ? Math.round((used / cap) * 100) : 0;
      meter.innerHTML = state.subscription
        ? `<div class="meter" role="meter" aria-valuenow="${used}" aria-valuemin="0" aria-valuemax="${cap}"><span style="width:${pct}%"></span></div><p>${used} of ${cap} dummy scenes this month.</p>`
        : `<p>No plan yet.</p>`;
    }
    const invoices = el("invoice-list");
    if (invoices) {
      invoices.innerHTML = state.invoices.length
        ? state.invoices.map((inv) => `<li>${inv.id} · ${inv.planName} · ${inv.total} · ${inv.status}</li>`).join("")
        : `<li>No dummy invoices yet.</li>`;
    }
    const keys = el("key-list");
    if (keys) {
      keys.innerHTML = state.keys.length
        ? state.keys.map((key) => `<li>${key.name} · ${key.prefix}</li>`).join("")
        : `<li>No keys.</li>`;
    }
    const rooms = el("room-list");
    if (rooms) {
      rooms.innerHTML = state.rooms.length
        ? state.rooms.map((room) => `<li>${room.name} · ${room.scenes.join(", ")}</li>`).join("")
        : `<li>Rooms appear after a plan starts.</li>`;
    }
    const hook = el("webhook-url");
    if (hook && document.activeElement !== hook) hook.value = state.webhookUrl || "";
    const hookNote = el("webhook-note");
    if (hookNote) {
      hookNote.textContent = state.webhookUrl
        ? `Stored locally. meto will not POST to ${state.webhookUrl}.`
        : "No webhook stored.";
    }
  }

  renderAccount(state) {
    const history = el("order-history");
    if (history) {
      history.innerHTML = state.orders.length
        ? state.orders
            .map((order) => {
              const lines = (order.items || [])
                .map((line) => `${line.quantity} × ${line.name || line.id}`)
                .join(", ");
              const last4 = order.tender && order.tender.last4 ? `${order.tender.brand} ···· ${order.tender.last4}` : "demo tender";
              return `<li><strong>${order.id}</strong> · ${order.total} · ${order.fulfillment}<p>${lines}</p><p class="meta">${last4} · ${order.status}</p></li>`;
            })
            .join("")
        : `<li>No orders yet.</li>`;
    }
    const tender = el("saved-tender");
    if (tender) {
      tender.textContent = state.tender
        ? `${state.tender.brand} ···· ${state.tender.last4} (demo)`
        : "No dummy tender saved.";
    }
  }

  renderPermissions(state) {
    const root = el("permissions-root");
    if (!root) return;
    const live = state.liveConstraints;
    const frozen = state.frozenConstraints;
    root.innerHTML = `
      <dl class="facts">
        <dt>Visitor</dt><dd>${state.user ? state.user.name : "signed out"}</dd>
        <dt>Mode</dt><dd>${live.mode}</dd>
        <dt>Spend cap</dt><dd>${money(live.spendCapCents)}</dd>
        <dt>Allowed tools</dt><dd>${live.allowedTools.join(", ")}</dd>
        <dt>Frozen snapshot</dt><dd>${frozen ? `${frozen.mode} · cap ${money(frozen.spendCapCents)} (a run has started)` : "None — constraints freeze on the first mutating spend or key."}</dd>
      </dl>
    `;
  }
}

export class App {
  static page = new StorePage();
}

if (typeof window !== "undefined") {
  globalThis.metoPieceFallback = pieceFallback;
  import("./dialogs.js")
    .then(({ confirmHuman }) => {
      StorePage.humanConfirm = confirmHuman;
      App.page.bind();
    })
    .catch(() => App.page.bind());
}
