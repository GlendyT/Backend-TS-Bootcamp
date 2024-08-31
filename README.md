# Typescript Fullstack Project

This is the Bootcamp's Project Monorepo.

## Apps and Packages

- `server`: an [express](https://expressjs.com/) server app
- `client`: a react [vite](https://vitejs.dev) ts app
- `@repo/eslint-config`: shared `eslint` configurations
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

## Get Started

### Pre Requisites

1. Install [Docker Desktop](https://docs.docker.com/get-started/get-docker/) and pull [PostgreSQL Image](https://hub.docker.com/_/postgres).
2. Install [Volta](https://docs.volta.sh/guide/getting-started) and [enable PNPM support](https://docs.volta.sh/advanced/pnpm).

### Install Dependencies

In the root directory open a terminal and install Node.js and PNPM using volta:

```
volta install node
```

```
volta install pnpm
```

Install the project dependencies:

```
pnpm install
```

### Run Applications

This monorepo is configured with [Turborepo](https://turbo.build/repo/docs). You will find the available tasks in [turbo.json](./turbo.json) file. You can run a task like the following. Note that all commands are used with `pnpm exec`, the purpose is to use the local project's Turborepo dependency and not a global one.

```bash
pnpm exec turbo <task-name>

# Examples
pnpm exec turbo dev
pnpm exec turbo build
pnpm exec turbo start
```

> Please refer to the official [Turborepo documentation](https://turbo.build/repo/docs/crafting-your-repository/running-tasks) to learn more on running tasks.
