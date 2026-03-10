"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const useResponsivePageSize = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)");
    const tablet = window.matchMedia("(max-width: 1024px)");

    const update = () => {
      let size = 9;

      if (mobile.matches) size = 1;
      else if (tablet.matches) size = 6;

      const params = new URLSearchParams(searchParams.toString());

      if (params.get("pageSize") !== String(size)) {
        params.set("pageSize", String(size));
        params.set("page", "1");

        router.replace(`?${params.toString()}`);
      }
    };

    update();

    mobile.addEventListener("change", update);
    tablet.addEventListener("change", update);

    return () => {
      mobile.removeEventListener("change", update);
      tablet.removeEventListener("change", update);
    };
  }, [router, searchParams]);
};