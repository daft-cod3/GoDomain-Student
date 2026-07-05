This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Supabase Database

Copy `.env.example` to `.env.local`, then fill in your Supabase project values.

Use the Supabase Postgres connection string for `DATABASE_URL`. It is available in Supabase under Project Settings > Database > Connection string. Keep `?sslmode=require` on the URL.

After setting `.env.local`, apply the schema and seed lesson content:

```bash
npm run db:migrate
npm run db:seed
```

The project now uses Supabase CLI migrations for schema changes. New database changes should be created with `npm run db:new <name>` and stored under `supabase/migrations/`. The legacy SQL dump in `db/schema.sql` is kept only as a reference snapshot and should not be used as the long-term source of truth for incremental changes.

Useful commands:

```bash
npm install
npx supabase login
npx supabase link --project-ref <your-project-ref>
npm run db:new add_profile_indexes
npm run db:status
npm run db:migrate
npm run db:push
npm run db:reset
```

If you are using the existing Supabase connection string from `.env.local`, `npm run db:push` will use it directly. Replace the placeholder password in `.env.local` before running it.
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
