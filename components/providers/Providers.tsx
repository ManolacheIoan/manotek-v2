"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";
import { ScrollStepper } from "../layout/ScrollStepper";
import { Cursor } from "./Cursor";
import { SmoothScroll } from "./SmoothScroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.9, ease: EASE }}>
        {children}
        <SmoothScroll />
        <Cursor />
        <ScrollStepper />
      </MotionConfig>
    </LazyMotion>
  );
}
