# prisma/ guidance

`prisma/` owns PostgreSQL schema, migration history, and generated Prisma Client output.

## Current structure

- `schema/schema.prisma` defines the generator and PostgreSQL datasource.
- Models are split under `schema/models/`; Prisma's configured schema folder discovers them directly. Do not add fake import syntax.
- `schema/models/Stats.prisma` defines the current `Stats` model and `StatsType` values (`blog`, `snippet`).
- `generated/` is produced by Prisma and imported by `lib/services/prisma.ts`.
- `migrations/` is reviewed, versioned history.

## Rules

- Edit schema source, never generated client files by hand.
- Preserve existing database mappings and enum values unless the requested data change requires a migration.
- Review generated SQL before applying a migration, especially for drops, renames, nullability changes, and enum changes.
- Regenerating the client is a normal local validation step. Creating, applying, resolving, resetting, or deploying migrations requires an explicit database task and a known target environment.
- Never run `migrate reset`, destructive SQL, or production migration deployment as an inferred follow-up.
- Application queries use the singleton in `lib/services/prisma.ts`, which requires `POSTGRES_URL` and the PostgreSQL adapter.

## Validation

After schema edits, run:

1. `pnpm exec prisma format`
2. `pnpm exec prisma validate`
3. `pnpm prisma:generate`

If a migration is requested, create it for the intended development database, inspect its SQL, and report whether it was merely generated or also applied.
