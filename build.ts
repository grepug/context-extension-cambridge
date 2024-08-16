import * as esbuild from "https://deno.land/x/esbuild@v0.20.1/mod.js";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader@0.9";
import * as path from "https://deno.land/std/path/mod.ts";

const entryPoint = "src/deno.ts";
const outDir = "build/";
const configPath = "deno.json";

const absoluteEntryPoint = path.resolve(Deno.cwd(), entryPoint);
const absoluteOutDir = path.resolve(Deno.cwd(), outDir);
const absoluteConfigPath = path.resolve(Deno.cwd(), configPath);

esbuild.build({
  plugins: [...denoPlugins({ configPath: absoluteConfigPath })],
  entryPoints: [absoluteEntryPoint],
  outdir: absoluteOutDir,
  bundle: true,
  platform: "browser",
  format: "esm",
  target: "esnext",
  minify: true,
  sourcemap: true,
  treeShaking: true,
});

console.log("Build done");

await esbuild.stop();
