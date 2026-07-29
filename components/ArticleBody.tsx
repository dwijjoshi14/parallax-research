import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";

const mdxComponents = {
  img: (props: React.ComponentProps<"img">) => {
    const { src, alt } = props;
    if (!src || typeof src !== "string") return null;
    return (
      <span className="block my-8">
        <Image
          src={src}
          alt={alt ?? ""}
          width={1200}
          height={675}
          className="w-full h-auto border border-[var(--color-line)]"
        />
      </span>
    );
  },
};

export default function ArticleBody({ content }: { content: string }) {
  return (
    <div className="prose-parallax">
      <MDXRemote source={content} components={mdxComponents} />
    </div>
  );
}
