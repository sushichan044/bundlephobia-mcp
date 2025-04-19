import type { ComponentPropsWithoutRef } from "react";

import { useCallback, useMemo, useState } from "react";
import Fa6SolidCheck from "~icons/fa6-solid/check";
import Fa6SolidCopy from "~icons/fa6-solid/copy";

import { cn } from "../utils/cn";

type CodeBlockProps = ComponentPropsWithoutRef<"div"> & {
  snippet: string;
};

export function CodeBlock({ className, snippet, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  }, [snippet]);

  const buttonLabel = useMemo(() => {
    if (copied) return "Copied to clipboard!";
    return "Copy to clipboard";
  }, [copied]);

  return (
    <div className={cn("relative", className)} {...props}>
      <pre className="bg-slate-800 text-slate-100 p-4 rounded-md overflow-x-auto">
        <code>{snippet}</code>
      </pre>
      <button
        className="absolute top-2 right-2 p-2 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors cursor-pointer"
        onClick={handleCopy}
        title={buttonLabel}
        type="button"
      >
        <div className="grid grid-cols-[auto_1fr] items-center gap-2 text-sm">
          {copied ? <Fa6SolidCheck /> : <Fa6SolidCopy />}
          <span>{buttonLabel}</span>
        </div>
      </button>
    </div>
  );
}
