import { z } from "zod";

import MarketplaceSchema from "./marketplace.schema.js";
export type MarketplaceJson = z.infer<typeof MarketplaceSchema>;
export type MarketplacePluginJson = MarketplaceJson['plugins'][number];
export { MarketplaceSchema };

import PluginSchema from './plugin.schema.js';
export type PluginJson = z.infer<typeof PluginSchema>;
export { PluginSchema };