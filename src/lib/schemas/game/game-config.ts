import { z } from "zod";

export const gameConfigSchema = z
  .object({
    totalCoins: z.int().min(1).max(200),
    coinsPerTurn: z.int().min(1),
    goFirst: z.boolean(),
  })
  .refine(
    (data) => {
      return data.coinsPerTurn <= data.totalCoins / 2;
    },
    {
      message: "Coins per turn cannot be greater than half of total coins",
      path: ["coinsPerTurn"],
    },
  );

export type GameConfigSchema = typeof gameConfigSchema;
