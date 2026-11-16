import { App } from "./app.js";

class SiteActions {
  static registerActions(actions) {
    actions.register(SiteActions.readStateAction());
    actions.register(SiteActions.addToCartAction());
    actions.register(SiteActions.setCartAction());
    actions.register(SiteActions.setConstraintsAction());
    actions.register(SiteActions.checkoutAction());
    actions.register(SiteActions.subscribeAction());
    actions.register(SiteActions.createKeyAction());
    actions.register(SiteActions.undoRunAction());
  }

  static readStateAction() {
    return {
      name: "get_store_state",
      description:
        "Read this page's catalog, cart, cart version, permission constraints, latest demo order, Studio plan, key prefixes, undo ledger, and what the site cannot do. Changes nothing.",
      effect: "read",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      execute: SiteActions.readState,
    };
  }

  static readState() {
    return App.page.getState();
  }

  static addToCartAction() {
    return {
      name: "add_to_cart",
      description:
        "Add a quantity of one catalog item to the visible cart, keeping existing lines. Returns the updated state with a new version, or ok false with a reason. Does not place an order. The visitor can remove the line on the page.",
      effect: "write",
      inputSchema: {
        type: "object",
        additionalProperties: false,
        required: ["id", "quantity"],
        properties: {
          id: {
            type: "string",
            enum: App.page.catalogIds(),
            description: "Product id from website_get_store_state.",
          },
          quantity: {
            type: "integer",
            minimum: 1,
            maximum: 20,
            description: "How many to add, from 1 to 20.",
          },
        },
      },
      execute: SiteActions.addToCart,
    };
  }

  static addToCart(args) {
    return App.page.addToCart(args.id, args.quantity);
  }

  static setCartAction() {
    return {
      name: "set_cart",
      description:
        "Replace the visible cart with the given lines. Quantity 0 removes a line. Returns the updated state. Does not place an order.",
      effect: "write",
      inputSchema: {
        type: "object",
        additionalProperties: false,
        required: ["items"],
        properties: {
          items: {
            type: "array",
            minItems: 0,
            maxItems: 12,
            description: "Cart lines from website_get_store_state or the visitor.",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["id", "quantity"],
              properties: {
                id: {
                  type: "string",
                  enum: App.page.catalogIds(),
                  description: "Product id.",
                },
                quantity: {
                  type: "integer",
                  minimum: 0,
                  maximum: 20,
                  description: "Units to keep in the cart.",
                },
              },
            },
          },
        },
      },
      execute: SiteActions.setCart,
    };
  }

  static setCart(args) {
    return App.page.setCart(args.items);
  }

  static setConstraintsAction() {
    return {
      name: "set_constraints",
      description:
        "Update this visitor's spend cap and ask-mode. Does not raise tools the visitor has not allowed. Returns the updated state.",
      effect: "write",
      inputSchema: {
        type: "object",
        additionalProperties: false,
        required: ["mode", "spendCapCents"],
        properties: {
          mode: {
            type: "string",
            enum: ["always_ask", "auto_within_policy"],
            description: "always_ask shows a confirmation on every payment. auto_within_policy still confirms irreversible tools but the copy says the step is inside the cap.",
          },
          spendCapCents: {
            type: "integer",
            minimum: 0,
            maximum: 1000000,
            description: "Spend cap in cents, from website_get_store_state or the visitor.",
          },
        },
      },
      execute: SiteActions.setConstraints,
    };
  }

  static setConstraints(args) {
    return App.page.setConstraints(args);
  }

  static checkoutAction() {
    return {
      name: "checkout_order",
      description:
        "Place a demo order for the current cart using the saved demo tender. The browser asks the visitor to confirm first and shows the rollback path. The site refuses a stale expectedVersion or a total over the spend cap. Returns the order receipt. Does not take card numbers.",
      effect: "irreversible",
      inputSchema: {
        type: "object",
        additionalProperties: false,
        required: ["customerName", "fulfillment", "expectedVersion", "expectedTotalCents"],
        properties: {
          customerName: {
            type: "string",
            minLength: 1,
            maxLength: 80,
            description: "The name the visitor gave.",
          },
          fulfillment: {
            type: "string",
            enum: ["pickup", "delivery"],
            description: "Pickup at the studio or dummy delivery via Orra Freight.",
          },
          expectedVersion: {
            type: "integer",
            minimum: 0,
            description: "The latest cart version in this turn: from website_get_store_state, or from a cart change made after that read.",
          },
          expectedTotalCents: {
            type: "integer",
            minimum: 0,
            description: "Cart totalCents from the same website_get_store_state (or later write) in this turn.",
          },
        },
      },
      execute: SiteActions.checkout,
    };
  }

  static checkout(args) {
    return App.page.checkout(args);
  }

  static subscribeAction() {
    return {
      name: "subscribe_plan",
      description:
        "Start a dummy Orra Studio plan. The browser asks the visitor to confirm first and names how to cancel. Returns the subscription receipt.",
      effect: "irreversible",
      inputSchema: {
        type: "object",
        additionalProperties: false,
        required: ["planId"],
        properties: {
          planId: {
            type: "string",
            enum: App.page.planIds(),
            description: "Plan id from website_get_store_state.",
          },
        },
      },
      execute: SiteActions.subscribe,
    };
  }

  static subscribe(args) {
    return App.page.subscribe(args);
  }

  static createKeyAction() {
    return {
      name: "create_api_key",
      description:
        "Mint a dummy Studio API key. The browser asks first. The secret is shown once on the page, not as a lasting catalog fact. Requires an active Studio plan.",
      effect: "irreversible",
      inputSchema: {
        type: "object",
        additionalProperties: false,
        required: ["name"],
        properties: {
          name: {
            type: "string",
            minLength: 1,
            maxLength: 40,
            description: "A short name the visitor chose, such as demo.",
          },
        },
      },
      execute: SiteActions.createKey,
    };
  }

  static createKey(args) {
    return App.page.createApiKey(args);
  }

  static undoRunAction() {
    return {
      name: "undo_run",
      description:
        "Roll back every mutating step in this visit, in reverse, using the compensating actions already named on each receipt. The browser asks first. Returns what was undone.",
      effect: "irreversible",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      execute: SiteActions.undoRun,
    };
  }

  static undoRun() {
    return App.page.undoRun();
  }
}

export const registerActions = SiteActions.registerActions;
