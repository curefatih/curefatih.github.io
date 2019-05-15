import Head from "next/head";
import Link from "next/link";

export default function BlogLayout(props) {
  return (
    <div className="bg-slate-50 dark:bg-gray-800 flex justify-center h-screen overflow-auto">
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>
      <div className="max-w-screen-xl w-full md:w-3/4 sm:w-full">
        <div>
          <div className="flex flex-row justify-center mt-10 mb-10">
            <h1 className="text-2xl text-center text-black dark:text-white">
              Fatih Cüre | <span className="font-black text-red-900">Blog</span>
            </h1>
          </div>

          <nav className="my-5">
            <ul className="flex flex-row justify-center gap-10 text-gray-800 dark:text-white">
              <li>
                <Link href="/blog">
                  <a>Posts</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a>Portfolio</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div>{props.children}</div>
      </div>
    </div>
  );
}
