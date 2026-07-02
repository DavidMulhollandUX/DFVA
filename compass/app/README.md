# <YOUR_APP_NAME>

Built with [Wasp](https://wasp.sh), based on the [Open Saas](https://opensaas.sh) template.

## Development

### Running locally

- Make sure you have the `.env.client` and `.env.server` files with correct dev values in the root of the project. `.env.server` includes `DATABASE_URL` (Wasp runs in custom-db mode).
- Start the database (Apple `container`, not Docker) and leave it running: `../../scripts/dev-db.sh start` (first time: `container system start`).
- Run `wasp start` and leave it running. (Do **not** use `wasp start db` — it refuses when `DATABASE_URL` is set.)
- [OPTIONAL]: First run, or after entity/prisma schema changes: `DATABASE_URL=… npx prisma migrate dev --schema .wasp/out/db/schema.prisma`.
