import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>To-Do App</title>
        <meta
          name="description"
          content="A simple to-do app using Axios and Next.js"
        />
        <Link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-5">
        <h1 className="text-center">To-Do App</h1>
        <p className="text-center">
          A simple to-do app using Axios and Next.js
        </p>
        <Link href="/todos">
          {/*<a className="btn btn-primary d-block mx-auto">Go to To-Dos</a>*/}
        </Link>
      </main>
    </div>
  );
}
