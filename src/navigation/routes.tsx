import type { ComponentType, JSX } from "react";

import { AboutPage } from "@/page/About/AboutPage";
import ProblemOne from "@/page/Problem1/Problem1Page";
import { ProblemTwo } from "@/page/Problem2/Problem2Page";
import { ProblemThree } from "@/page/Problem3/Problem3Page";
interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: "/about", Component: AboutPage, title: "Welcome" },
  { path: "/problem-1", Component: ProblemOne, title: "Problem 1" },
  { path: "/problem-2", Component: ProblemTwo, title: "Problem 2" },
  { path: "/problem-3", Component: ProblemThree, title: "Problem 3" },
];
