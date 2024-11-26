"use client";
import { SetStateAction, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { SketchPicker } from "react-color";

interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export default function Home() {
  const [color, setColor] = useState({ r: 255, g: 255, b: 255, a: 0.4 });
  const [loading, setLoading] = useState(false);
  const effects = ["flow", "fill", "pulse", "rainbow", "walk"];
  const baseEffects = ["on", "off", "reset"];

  const updateLights = async (
    endpoint: string,
    delay?: number,
    color?: Color,
    brightness?: number
  ) => {
    setLoading(true);

    console.log(endpoint, delay, color, brightness);
    return await axios
      .post(`http://192.168.1.75:3000/${endpoint}`)
      .then((res) => {
        console.log("Success:", res);
        return res;
      })
      .catch((err) => {
        alert(`Failed to update lights. Please try again: ${err}`);
        return err;
      })
      .then(() => {
        setLoading(false);
      });
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {effects.map((effect) => (
            <button
              key={effect} // Ensure each button has a unique `key` when rendering lists in React
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              onClick={() =>
                updateLights(`effect/${effect}`, 16, color, color.a)
              }
              disabled={loading}
            >
              {loading ? "Loading..." : effect}
            </button>
          ))}
        </div>
        <div
          className="flex gap-4 items-center flex-col sm:flex-row"
          style={{
            backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          }}
        >
          {baseEffects.map((effect) => (
            <button
              key={effect} // Ensure each button has a unique `key` when rendering lists in React
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              onClick={() => updateLights(effect)}
              disabled={loading}
            >
              {loading ? "Loading..." : effect}
            </button>
          ))}
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <p>{JSON.stringify(color)}</p>
          <SketchPicker
            color={color}
            onChange={(col: any) => {
              return setColor(col);
            }}
          />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
