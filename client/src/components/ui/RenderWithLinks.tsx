import React from "react";

interface RenderWithLinksProps {
  text: string;
}

export default function RenderWithLinks({ text }: RenderWithLinksProps) {
  const parts = text.split(/<link>(.*?)<\/link>/g);

  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 1) {
          return (
            <a
              key={index}
              href="https://ognisko.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-heritage-burgundy hover:underline"
            >
              {part}
            </a>
          );
        }
        return part;
      })}
    </>
  );
}
