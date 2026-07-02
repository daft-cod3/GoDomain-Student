import { withSupabase } from '@supabase/server'

export const GET = withSupabase(
  { auth: 'publishable' },
  async (_request, ctx) => {
    const { data, error } = await ctx.supabaseAdmin
      .from('activities')
      .select('id')
      .limit(1)

    return Response.json({
      ok: true,
      authMode: ctx.authMode,
      connected: !error,
      sample: data?.[0] ?? null,
      error: error?.message ?? null,
    })
  }
)
