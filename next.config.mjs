import createMDX from "@next/mdx";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
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
    ],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
