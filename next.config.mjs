import createMDX from "@next/mdx";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    unoptimized: true
  },
  basePath: "/learn"
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      // Strip frontmatter from rendered content
      require.resolve("remark-frontmatter"),
      // Enable GitHub Flavored Markdown (tables, strikethrough, etc.)
      require.resolve("remark-gfm"),
      // Expose frontmatter as props
      require.resolve("remark-mdx-frontmatter"),
      // Transform code blocks with title metadata into CodeBlock components
      resolve(__dirname, "./lib/remark-code-title.mjs")
    ],
    rehypePlugins: []
  }
});

export default withMDX(nextConfig);
