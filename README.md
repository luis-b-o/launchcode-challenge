# Wet Bat - Quotation MVP

This is a **fullstack MVP project** made in **TypeScript** with **[Next.js](https://nextjs.org/)**. The main objective is create a **quotation feature** to a travel agency with a dashboard layout using **[Material UI](https://mui.com/)**.

## Technology decisions

This section will briefly explain the reasons why i chose some technologies.

### [Typescript](https://www.typescriptlang.org/)

Superset of javascript that provide code typing and integrate with most code editors, preventing early errors, improving speed and security of all features.

- Auto-complete;
- Code editor check;
- Security;
- Widely used;

### [Next.js](https://nextjs.org/)

This framework is most recognized for its server-side rendering and its advantages with SEO, but those are not the main features that interest me.

I chose because it is very efficient for making a quick app (both to development and for the end user to use).

Strong points on this decision:

- Nested pages routing, based on the file-system;
- API routes -> easy to build API's for fullstack apps;
- Fast and easy deployment on vercel;
- Active community;
- Good documentation;

### [Material UI](https://mui.com/)

UI library that provide multiple styled React components.

- Ready for use components;
- Customization;
- Good documentation;
- Responsivity;

### [Prisma](https://www.prisma.io/)

Node.js ORM library that streamlines database administration inside the typescript code.

- Fast databasec creation;
- Automated migrations;
- Intuitive database tables schema
- Type-safety;
- Auto completion;

## Getting Started

### 1. Download and install dependencies

Clone this repository:

```
git clone https://github.com/luis-b-o/launchcode-challenge.git
```

Install dependencies:

```
cd launchcode-challenge
yarn install
```

### 2. Configure .env

For local development you can use the `.env.example`. Run the following command to make a copy of it and name to `.env`:

```
cp .env.example .env
```

### 3. Create and seed the database

If you're using Docker on your computer, the following script to set up PostgreSQL database using the `docker-compose.yml` file at the root of your project:

```
yarn db:up
```

Run the following command to create your PostgreSQL database. This also creates the `Quote` table that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.

### 4. Start the app

```
yarn dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.
