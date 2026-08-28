"use client";

import { useEffect, useState } from "react";

export function MobileViewToggle() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => { document.body.dataset.mobilePreview = mobile ? "true" : "false"; }, [mobile]);
  return <button onClick={() => setMobile((value) => !value)} className="hidden min-h-10 rounded-full border border-assist-line bg-white px-3 text-xs font-extrabold text-navy xl:block" aria-pressed={mobile}>{mobile ? "Desktop view" : "Mobile view"}</button>;
}
