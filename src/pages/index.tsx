import { OrbitControls } from "@react-three/drei";
import Head from "next/head";
import { Canvas } from "@react-three/fiber";
import { Scene1 } from "~/Scene1";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />

        <title>Hilo Labs: Software Development</title>
        <meta
          name="description"
          content="Hilo Labs is a software consulting and development company that works to design, build and scale mobile, web and desktop apps."
        />

        <meta itemprop="name" content="Hilo Labs: Software Development" />
        <meta
          itemprop="description"
          content="Hilo Labs is a software consulting and development company that works to design, build and scale mobile, web and desktop apps."
        />
        <meta
          itemprop="image"
          content="http://hilolabs.com/wp-content/uploads/2022/12/cropped-logo-og.png"
        />

        <meta property="og:url" content="https://hilolabs.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Hilo Labs: Software Development" />
        <meta
          property="og:description"
          content="Hilo Labs is a software consulting and development company that works to design, build and scale mobile, web and desktop apps."
        />
        <meta
          property="og:image"
          content="http://hilolabs.com/wp-content/uploads/2022/12/cropped-logo-og.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hilo Labs: Software Development" />
        <meta
          name="twitter:description"
          content="Hilo Labs is a software consulting and development company that works to design, build and scale mobile, web and desktop apps."
        />
        <meta
          name="twitter:image"
          content="http://hilolabs.com/wp-content/uploads/2022/12/cropped-logo-og.png"
        />
      </Head>

      <div className="flex h-screen flex-col">
        <Canvas style={{ background: "#000000" }}>
          {/* <ambientLight intensity={Math.PI / 2} /> */}

          <Scene1 />
          <OrbitControls />
        </Canvas>
      </div>
    </>
  );
}
