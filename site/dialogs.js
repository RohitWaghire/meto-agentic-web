import { App } from "./app.js";

export const DIALOGS = {
  checkout_order: {
    title: "Place this demo order?",
    sentence: "We will charge the saved demo tender for the items below. Undo run can refund it.",
    confirm: "Place the order",
    decline: "Keep browsing",
  },
  subscribe_plan: {
    title: "Start this Studio plan?",
    sentence: "We will start a dummy Studio subscription you can cancel from this page.",
    confirm: "Start the plan",
    decline: "Keep the current plan",
  },
  create_api_key: {
    title: "Mint this API key?",
    sentence: "We will create a dummy key and show the secret once on the page. Undo run will revoke it.",
    confirm: "Mint the key",
    decline: "Do not mint",
  },
  undo_run: {
    title: "Undo this run?",
    sentence: "We will reverse every mutating step already taken, in reverse order.",
    confirm: "Undo the run",
    decline: "Keep the run",
  },
  rollback_step: {
    title: "Undo the last step?",
    sentence: "We will reverse only the most recent mutating step and leave the rest of the run.",
    confirm: "Undo that step",
    decline: "Leave it",
  },
};

export function reviewDetails(action, args) {
  if (action === "checkout_order") {
    const check = App.page.checkCheckout(args);
    if (!check.ok) {
      return { refusal: check.reason };
    }
    return {
      Items: check.itemSummary,
      Total: check.total,
      Name: check.customerName,
      Fulfillment: check.fulfillment,
      Rollback: check.rollback,
    };
  }
  if (action === "subscribe_plan") {
    const check = App.page.checkSubscribe(args);
    if (!check.ok) {
      return { refusal: check.reason };
    }
    return {
      Plan: check.planName,
      Price: check.total,
      Rollback: check.rollback,
    };
  }
  if (action === "create_api_key") {
    const check = App.page.checkCreateKey(args);
    if (!check.ok) {
      return { refusal: check.reason };
    }
    return {
      Name: check.name,
      Rollback: check.rollback,
    };
  }
  if (action === "undo_run") {
    const check = App.page.checkUndoRun();
    if (!check.ok) {
      return { refusal: check.reason };
    }
    return {
      Steps: check.steps,
    };
  }
  if (action === "rollback_step") {
    const check = App.page.checkRollbackStep();
    if (!check.ok) {
      return { refusal: check.reason };
    }
    return {
      Step: check.step,
      Rollback: check.rollback,
    };
  }
  return {};
}

export function dialogContent(item) {
  let details = {};
  try {
    details = reviewDetails(item.action, item.arguments) || {};
  } catch (error) {
    console.error("Could not add details to the confirmation dialog", error);
  }
  return {
    ...DIALOGS[item.action],
    details,
    refusal: details.refusal,
    exact: `${item.action} on ${item.origin} (${item.effect})\n${JSON.stringify(item.arguments, null, 2)}`,
  };
}

export function openDialog(content, resolve) {
  const dialog = document.createElement("dialog");
  dialog.className = "assistant-review";
  dialog.setAttribute("aria-labelledby", "assistant-review-title");
  const heading = document.createElement("h2");
  heading.id = "assistant-review-title";
  heading.textContent = content.title;
  heading.tabIndex = -1;
  heading.autofocus = true;
  const sentence = document.createElement("p");
  sentence.textContent = content.sentence;
  dialog.append(heading, sentence);
  const exact = document.createElement("details");
  const exactLabel = document.createElement("summary");
  exactLabel.textContent = "Technical details";
  const exactText = document.createElement("pre");
  exactText.textContent = content.exact;
  exact.append(exactLabel, exactText);
  const entries = Object.entries(content.details || {}).filter(([label]) => label !== "refusal");
  if (entries.length) {
    const list = document.createElement("dl");
    for (const [label, value] of entries) {
      const term = document.createElement("dt");
      term.textContent = label;
      const description = document.createElement("dd");
      description.textContent = String(value);
      list.append(term, description);
    }
    dialog.append(list);
  } else {
    exact.open = true;
  }
  const confirmButton = document.createElement("button");
  confirmButton.textContent = content.confirm;
  confirmButton.addEventListener("click", dialog.close.bind(dialog, "confirm"));
  const declineButton = document.createElement("button");
  declineButton.className = "assistant-decline";
  declineButton.textContent = content.decline;
  declineButton.addEventListener("click", dialog.close.bind(dialog, "decline"));
  dialog.addEventListener("close", () => {
    dialog.remove();
    resolve(dialog.returnValue === "confirm");
  });
  dialog.append(exact, confirmButton, declineButton);
  document.body.append(dialog);
  dialog.showModal();
}

export async function confirmHuman(action, args) {
  const origin = typeof location !== "undefined" ? location.origin : "http://localhost:8080";
  const content = dialogContent({
    action,
    origin,
    effect: "irreversible",
    arguments: args,
  });
  if (content.refusal) {
    return { ok: false, reason: content.refusal };
  }
  const confirmed = await new Promise((resolve) => openDialog(content, resolve));
  if (!confirmed) {
    return { ok: false, reason: "You kept the page as it was.", declined: true };
  }
  return { ok: true };
}
