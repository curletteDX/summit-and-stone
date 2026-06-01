import type { RootComponentInstance } from "@uniformdev/canvas";
import { UniformComposition } from "@uniformdev/canvas-react";
import {
  Context,
  ManifestV2,
  ContextPlugin,
  enableDebugConsoleLogDrain,
  enableContextDevTools,
} from "@uniformdev/context";

import { UniformContext } from "@uniformdev/context-react";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NavBar } from "../components/NavBar";
import { Geist, Geist_Mono } from "next/font/google";
import "../uniform/components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const context = new Context({
  defaultConsent: true,
  manifest: {
    project: {},
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UniformContext context={context}>
      <div
        className={`${geistSans.className} min-h-screen bg-zinc-50 font-sans dark:bg-black`}
      >
        <NavBar />
        <Component {...pageProps} />
      </div>
    </UniformContext>
  );
}
