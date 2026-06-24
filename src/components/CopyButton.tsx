"use client";

interface CopyButtonProps {
  text: string;
  label?: string;
}

export default function CopyButton({ text, label = "Copy to clipboard" }: CopyButtonProps) {
  return (
    <button
      onClick={() => navigator.clipboard?.writeText(text)}
      className="mt-4 text-[10px] tracking-[0.14em] uppercase text-primary font-body font-bold hover:underline"
    >
      {label}
    </button>
  );
}
