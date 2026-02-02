import createMDX from "@next/mdx";

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
      "remark-frontmatter",
      // Enable GitHub Flavored Markdown (tables, strikethrough, etc.)
      "remark-gfm",
    ],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
