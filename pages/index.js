import Head from 'next/head'
import utilStyles from '../styles/Home.module.css'
import { getSortedPostsData } from '../lib/posts'
import ShadowBox from '@component/shadow-box/shadow-box'
import Link from 'next/link'
import { GitHub, Linkedin, Mail } from 'react-feather'


export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {

  return (
    <div className={utilStyles.container}>
      <Head>
        <title>Fatih Cüre</title>
      </Head>


      <div className={`${utilStyles.top} wrap xl-flexbox xl-center xl-gutter-0`}>
        <div className="col">
          <ShadowBox className="s-box xl-left">
            <h1>Fatih <span className="color-red">Cüre</span></h1>
            <p>Currently student at Ege University, Computer Engineering Department.</p>
          </ShadowBox>

          <ShadowBox className={`${utilStyles.nav} s-box wrap xl-center xl-gutter-16`}>
            <div className="col">
              <a href="#interest">Interests/Sketch projects</a>
            </div>
            <div className="col">
              <Link href="/blog">
                <a>Blog</a>
              </Link>
            </div>
            <div className="col">
              <a target="_blank" href="/documents/Fatih_Cure_Resume.pdf">Resume</a>
            </div>
            <div className="col">
              <a href="#contact">Contact</a>
            </div>
          </ShadowBox>
        </div>
      </div>

      <div className={utilStyles.main}>

        <section id="interest" className={`${utilStyles.interest} wrap xl-flexbox xl-top xl-center xl-gutter-16`}>
          <div className="col xl-1-1">
            <h1 className="volatile">Technologies I met</h1>
            <p>
              <span className="color-red">Languages|alike</span>
              <span className="color-blue">Tool</span>
            </p>
          </div>
          <div className="col">
            <ShadowBox className="interest-item">
              <h4 className="color-red">Node.js</h4>
              <p>Loved it. Using for web apps mostly. Experienced Nest.js, Express, Socket.io, Electron.js etc.
            </p>
            </ShadowBox>
          </div>
          <div className="col">
            <ShadowBox className="interest-item">
              <h4 className="color-red">Go</h4>
              <p>Newbie. Currently learning web services.</p>
              <a target="_blank"
                href="https://github.com/curefatih?tab=repositories&q=&type=source&language=go">Sketchs</a>
            </ShadowBox>
          </div>
          <div className="col">
            <ShadowBox className="interest-item">
              <h4 className="color-red">Java</h4>
              <p>Using only if necessary 🤷‍♂️</p>
              <a target="_blank"
                href="https://github.com/curefatih?tab=repositories&q=&type=source&language=java">Sketchs</a>
            </ShadowBox>
          </div>
          <div className="col">
            <ShadowBox className="interest-item">
              <h4 className="color-red">SQL</h4>
              <p>Used almost in every project. Mostly using PostgreSQL as RDMS.</p>
              <a target="_blank" href="https://github.com/curefatih/airline-db">Sketch</a>
            </ShadowBox>
          </div>
          <div className="col">
            <ShadowBox className="interest-item">
              <h4 className="color-red">Python</h4>
              <p>Generally using for AI/ML projects. Familier with sci-kit learn, tensorflow, pandas, numpy,
                scikit image...</p>
              <a target="_blank"
                href="https://github.com/curefatih?tab=repositories&q=&type=source&language=python">Sketchs</a>
            </ShadowBox>
          </div>
          <div className="col">
            <ShadowBox className="interest-item">
              <h4 className="color-red">C/C++</h4>
              <p>Exprienced basic lexer and compiler with C. Also tried C++ a bit for learning what is different.
            </p>
              <a target="_blank"
                href="https://github.com/curefatih?tab=repositories&q=&type=source&language=c">Sketchs</a>
            </ShadowBox>
          </div>
          <div className="col">
            <ShadowBox className="interest-item">
              <h4 className="color-blue">Jenkins</h4>
              <p>Exprienced automating deployments with freestyle job.</p>
            </ShadowBox>
          </div>
          <div className="col">
            <ShadowBox className="interest-item">
              <h4 className="color-blue">Git</h4>
              <p>Try to use on every project and learning new part of Git almost every project.</p>
            </ShadowBox>
          </div>
          <div className="col">
            <ShadowBox className="interest-item">
              <h4 className="color-red">SASS</h4>
              <p>Using SASS if I can choice instead of CSS. Less CSS is always okey for me 🐒</p>
            </ShadowBox>
          </div>
          <div className="col">
            <ShadowBox className="interest-item">
              <h4 className="color-blue">GNU Linux</h4>
              <p>Using WSL on Windows when needed. Also using Ubuntu natively as distribution.</p>
            </ShadowBox>
          </div>
        </section>

      </div>

      <div id="contact" className={`${utilStyles.contact} wrap xl-flexbox xl-center xl-gutter-24`}>
        <div className="col">
          <div className="icon">
            <a target="_blank" href="https://www.linkedin.com/in/fatih-cure/">
              <Linkedin />
            </a>
          </div>
        </div>
        <div className="col">
          <div className="icon">
            <a target="_blank" href="https://github.com/curefatih">
              <GitHub />
            </a>
          </div>
        </div>
        <div className="col">
          <div className="icon">
            <a target="_blank" href="mailto:curefat@gmail.com">
              <Mail />
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}
