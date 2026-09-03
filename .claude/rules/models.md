# Data Models

- Schema: `compass/app/schema.prisma`; migrations in `compass/app/migrations/`.
  Wasp copies both into `.wasp/out/db/` — never edit the copies.
- Curriculum upload shape: `compass/app/src/compass/syllabusSchema.ts`
  (spec in `docs/structured-curriculum-schema.md`).
- Migrate with `DATABASE_URL=… npx prisma migrate dev --schema compass/app/.wasp/out/db/schema.prisma`;
  `wasp db migrate-dev` falsely reports a connection failure.
