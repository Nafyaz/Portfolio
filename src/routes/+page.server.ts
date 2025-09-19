import type { Actions, PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { gameConfigSchema } from "$lib/schemas/game/game-config";
import { fail } from "@sveltejs/kit";
import { zod4 } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async () => {
  return { form: await superValidate(zod4(gameConfigSchema)) };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod4(gameConfigSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    return { form };
  },
};
