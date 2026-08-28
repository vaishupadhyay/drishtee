import type { ReactNode } from "react";
export function SurfaceCard({ children, active = false, className = "" }: { children: ReactNode; active?: boolean; className?: string }) { return <section className={`assist-card ${active ? "assist-card--active" : ""} ${className}`}>{children}</section>; }
