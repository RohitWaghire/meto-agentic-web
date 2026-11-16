import type { APIRoute } from "astro";
import { CATALOG, searchCatalog } from "../../../lib/catalog";

export const prerender = false;

export const GET: APIRoute = ({ url }) => {
  const query = url.searchParams.get("q") || "";
  const items = query ? searchCatalog(query) : CATALOG;
  return new Response(JSON.stringify({ items }), {
    headers: { "Content-Type": "application/json" },
  });
};
