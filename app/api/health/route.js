import { withSupabase } from '@supabase/server'

export const GET = withSupabase(
  { auth: 'publishable' },
  async (_request, ctx) => {
    const { data, error } = await ctx.supabaseAdmin
      .from('learning_units')
      .select('unit_id', { count: 'exact', head: true })

    if (error) {
      return Response.json({ ok: false, error: error.message }, { status: 500 })
    }

    return Response.json({ ok: true, backend: 'supabase', authMode: ctx.authMode })
  }
)