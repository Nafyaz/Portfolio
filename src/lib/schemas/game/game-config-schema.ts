import { z } from "zod";

export const gameConfigSchema = z
  .object({
    totalCoins: z.int().min(1).max(200).default(20),
    coinsPerTurn: z.int().min(2).default(2),
    goFirst: z.boolean().default(false),
  })
  .refine((data) => data.coinsPerTurn <= data.totalCoins / 2, {
    message:
      "Plese keep the coins per turn less than or equal to half of the total coins. It's not fun if one can take too many coins at once.",
    path: ["coinsPerTurn"],
  });

export type GameConfigSchema = typeof gameConfigSchema;
