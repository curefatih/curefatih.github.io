import Head from "next/head";
import { getSortedPostsData } from "../lib/posts";
import ShadowBox from "@component/ShadowBox/ShadowBox";
import Link from "next/link";
import { GitHub, Linkedin, Mail } from "react-feather";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <div className="bg-slate-50 dark:bg-gray-800 p-7 h-screen overflow-auto">
      <Head>
        <title>Fatih Cüre</title>
      </Head>
      <div className="flex justify-center text-gray-800 dark:text-white">
        <div className="max-w-screen-xl	w-full md:w-3/4 sm:w-full">
          <div className="w-full flex justify-center items-center">
            <div>
              <ShadowBox>
                <h1 className="text-2xl font-black my-5">
                  Fatih <span className="text-red-900">Cüre</span>
                </h1>
                <p className="pt-5">
                  Currently student at Ege University, Computer Engineering
                  Department.
                </p>
              </ShadowBox>

              <ShadowBox className="flex flex-row justify-center gap-10">
                <div>
                  <a href="#interest">Interests/Sketch projects</a>
                </div>
                <div>
                  <Link href="/blog">
                    <a>Blog</a>
                  </Link>
                </div>
                <div>
                  <a target="_blank" href="/documents/Fatih_Cure_Resume.pdf">
                    Resume
                  </a>
                </div>
                <div>
                  <a href="#contact">Contact</a>
                </div>
              </ShadowBox>
            </div>
          </div>

          <div className="mt-20">
            <div className="col xl-1-1">
              <h1 className="px-5 py-1 italic">Technologies I met</h1>
            </div>
            <section id="interest">
              <div className="col">
                <ShadowBox className="interest-item" label="Node.js">
                  <p>
                    Loved it. Using for web apps mostly. Experienced Nest.js,
                    Express, Socket.io, Electron.js etc.
                  </p>
                </ShadowBox>
              </div>
              <div className="col">
                <ShadowBox className="interest-item" label="Go">
                  <p>Newbie. Currently learning web services.</p>
                  <a
                    target="_blank"
                    href="https://github.com/curefatih?tab=repositories&q=&type=source&language=go"
                  >
                    Sketchs
                  </a>
                </ShadowBox>
              </div>
              <div className="col">
                <ShadowBox className="interest-item" label="Java">
                  <p>Using only if necessary 🤷‍♂️</p>
                  <a
                    target="_blank"
                    href="https://github.com/curefatih?tab=repositories&q=&type=source&language=java"
                  >
                    Sketchs
                  </a>
                </ShadowBox>
              </div>
              <div className="col">
                <ShadowBox className="interest-item" label="SQL">
                  <p>
                    Used almost in every project. Mostly using PostgreSQL as
                    RDMS.
                  </p>
                  <a
                    target="_blank"
                    href="https://github.com/curefatih/airline-db"
                  >
                    Sketch
                  </a>
                </ShadowBox>
              </div>
              <div className="col">
                <ShadowBox className="interest-item" label="Python">
                  <p>
                    Generally using for AI/ML projects. Familier with sci-kit
                    learn, tensorflow, pandas, numpy, scikit image...
                  </p>
                  <a
                    target="_blank"
                    href="https://github.com/curefatih?tab=repositories&q=&type=source&language=python"
                  >
                    Sketchs
                  </a>
                </ShadowBox>
              </div>
              <div className="col">
                <ShadowBox className="interest-item" label="C/C++">
                  <p>
                    Exprienced basic lexer and compiler with C. Also tried C++ a
                    bit for learning what is different.
                  </p>
                  <a
                    target="_blank"
                    href="https://github.com/curefatih?tab=repositories&q=&type=source&language=c"
                  >
                    Sketchs
                  </a>
                </ShadowBox>
              </div>
              <div className="col">
                <ShadowBox className="interest-item" label="Jenkins">
                  <p>Exprienced automating deployments with freestyle job.</p>
                </ShadowBox>
              </div>
              <div className="col">
                <ShadowBox className="interest-item" label="Git">
                  <p>
                    Try to use on every project and learning new part of Git
                    almost every project.
                  </p>
                </ShadowBox>
              </div>
              <div className="col">
                <ShadowBox className="interest-item" label="SASS">
                  <p>
                    Using SASS if I can choice instead of CSS. Less CSS is
                    always okey for me 🐒
                  </p>
                </ShadowBox>
              </div>
              <div className="col">
                <ShadowBox className="interest-item" label="GNU Linux">
                  <p>
                    Using WSL on Windows when needed. Also using Ubuntu natively
                    as distribution.
                  </p>
                </ShadowBox>
              </div>
            </section>
          </div>

          <div
            id="contact"
            className="flex flex-row justify-center gap-10 p-5 mt-20"
          >
            <div className="col">
              <a target="_blank" href="https://www.linkedin.com/in/fatih-cure/">
                <Linkedin />
              </a>
            </div>
            <div className="col">
              <a target="_blank" href="https://github.com/curefatih">
                <GitHub />
              </a>
            </div>
            <div className="col">
              <a target="_blank" href="mailto:curefat@gmail.com">
                <Mail />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
