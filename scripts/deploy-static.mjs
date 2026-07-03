import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const root = process.env.YOUTUBE_SITE_ROOT || process.cwd();
const target = process.env.YOUTUBE_DEPLOY_TARGET || "myvps:/www/wwwroot/youtube.qiaomu.ai";
const match = target.match(/^([^:]+):(.+)$/);
if (!match) {
  throw new Error("YOUTUBE_DEPLOY_TARGET must use host:/absolute/path format.");
}

const [, host, remoteDir] = match;
const podcastIds = JSON.parse(fs.readFileSync(path.join(root, "data", "podcasts.json"), "utf8")).podcasts.map((podcast) => podcast.id);
const strayDirs = ["articles", "transcripts", "summaries", "qiaomu", ...podcastIds];
const sensitivePaths = [
  "scripts",
  "package.json",
  "package-lock.json",
  "README.md",
  "data/getnote-sync.json",
  "data/getnote-autofill-state.json"
];

await run("rsync", [
  "-az",
  "--delete",
  path.join(root, "index.html"),
  path.join(root, "app.js"),
  path.join(root, "styles.css"),
  path.join(root, "favicon.svg"),
  path.join(root, "public"),
  path.join(root, "content"),
  path.join(root, "podcasts"),
  `${target}/`
]);
await run("rsync", ["-az", "--delete", `${path.join(root, "data", "episodes")}/`, `${target}/data/episodes/`]);
await run("rsync", ["-az", path.join(root, "data", "podcasts.json"), path.join(root, "data", "episodes-index.json"), `${target}/data/`]);
await run("ssh", [
  host,
  `cd ${shellQuote(remoteDir)} && rm -rf ${[...strayDirs, ...sensitivePaths].map(shellQuote).join(" ")}`
]);

console.log(`Deployed static site to ${target}`);

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} exited with ${code}`));
    });
    child.on("error", reject);
  });
}

function shellQuote(value) {
  return `'${String(value).replace(/'/g, "'\\''")}'`;
}
