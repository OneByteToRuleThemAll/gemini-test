This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Purpose

* This project is a blog built using Next.js, with a focus on modern web development practices.
* It demonstrates how to build a simple yet effective blog with features like Server Components, Server Actions, and Static Site Generation with dynamic routes.
* The blog is designed to be stylish and user-friendly, with a focus on performance and accessibility.

## Tech Stack

* **Next.js**: The primary framework used for building the blog.
* **React**: Used for building the user interface components.
* **TypeScript**: Provides static typing for the project.
* **Tailwind CSS**: Used for styling the blog with utility-first CSS classes.
* **ESLint**: Ensures code quality and consistency.
* **React Query**: Manages server state and data fetching.
* **Zod**: Used for schema validation.
* **Feed**: Generates RSS feeds for the blog.
* **Gray-matter**: Parses front matter from markdown files.
* **Remark**: Processes markdown content.
* **Vercel**: The platform used for deploying the blog.

## Dependencies

The project has the following dependencies listed in `package.json`:

* @tailwindcss/typography: ^0.5.16
* @tanstack/react-query: ^5.71.3
* @tanstack/react-query-devtools: ^5.71.3
* feed: ^4.2.2
* gray-matter: ^4.0.3
* next: 15.2.4
* react: ^19.0.0
* react-dom: ^19.0.0
* remark: ^15.0.1
* remark-html: ^16.0.1
* zod: ^3.24.2

## Project Structure

The project has the following structure:

* `src/app/layout.tsx`: Defines the layout for the application.
* `src/app/page.tsx`: The main page of the application.
* `src/app/api/log-error/route.ts`: Handles error logging.

## Custom Configurations

The project has custom configurations in the following files:

* `next.config.ts`: Contains custom Next.js configuration options.
* `eslint.config.mjs`: Contains custom ESLint configuration options.

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
