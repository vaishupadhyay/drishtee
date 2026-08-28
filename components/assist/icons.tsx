import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { name: "mic" | "scan" | "type" | "upload" | "accessibility" | "back" | "edit" | "volume" | "check" | "close" | "clock" | "file" };

export function AssistIcon({ name, ...props }: IconProps) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, ...props };
  const paths = {
    mic: <><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M8.5 21h7"/></>,
    scan: <><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M7 12h10M9 9h6M9 15h6"/></>,
    type: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h.01M10 9h.01M13 9h.01M16 9h.01M7 13h.01M10 13h.01M13 13h4M7 16h8"/></>,
    upload: <><path d="M12 16V4M8 8l4-4 4 4M5 14v5h14v-5"/></>,
    accessibility: <><circle cx="12" cy="4.5" r="2"/><path d="M5 9h14M12 7v13M8.5 20 12 14l3.5 6"/></>,
    back: <path d="m15 18-6-6 6-6"/>, edit: <><path d="M12 20h8"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"/></>,
    volume: <><path d="M11 5 6 9H3v6h3l5 4Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></>,
    check: <path d="m5 12 4 4L19 6"/>, close: <><path d="m6 6 12 12M18 6 6 18"/></>, clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>, file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}
