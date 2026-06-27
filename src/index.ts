import { z } from "zod";

import MarketplaceSchema from "./generated/marketplace.schema.js";
export type MarketplaceJson = z.infer<typeof MarketplaceSchema>;
export { MarketplaceSchema };

import PluginSchema from './generated/plugin.schema.js';
export type PluginJson = z.infer<typeof PluginSchema>;
export { PluginSchema };