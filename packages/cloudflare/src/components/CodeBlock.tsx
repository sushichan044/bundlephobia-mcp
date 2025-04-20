import type { ComponentPropsWithoutRef } from "react";

import { useCallback, useMemo, useState } from "react";
import Fa6SolidCheck from "~icons/fa6-solid/check";
import Fa6SolidCopy from "~icons/fa6-solid/copy";

import { cn } from "../utils/cn";

type CodeBlockProps = ComponentPropsWithoutRef<"div"> & {
  snippet: string;
  title?: string;
};

export function CodeBlock({
  className,
  snippet,
  title,
  ...props
}: CodeBlockProps) {
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
    <section className="grid grid-cols-1">
      <div className="bg-slate-700 px-4 py-1 text-slate-200 rounded-t-md flex justify-between items-center">
        <span className="font-medium">{title}</span>
        <button
          className="flex items-center gap-1.5 px-3 py-1 rounded hover:bg-slate-600 text-slate-200 transition-colors"
          onClick={handleCopy}
          title={buttonLabel}
          type="button"
        >
          {copied ? (
            <Fa6SolidCheck className="text-green-400" />
          ) : (
            <Fa6SolidCopy />
          )}
          <span className="text-sm">{buttonLabel}</span>
        </button>
      </div>
      <div className={cn("relative", className)} {...props}>
        <pre className="bg-slate-800 text-slate-100 p-4 rounded-b-md overflow-x-auto">
          <code>{snippet}</code>
        </pre>
      </div>
    </section>
  );
}
