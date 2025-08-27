/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/JoyRideController.tsx
import { useEffect, useMemo } from "react";
import ReactJoyride, { type CallBackProps } from "react-joyride";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { startTour, endTour } from "@/redux/joyrideSlice";
import { homeSteps, dashboardSteps } from "@/constants/joyRideSteps";
import { useNavigate } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

const JOYRIDE_SHOWN_KEY = "joyride_shown_v1";
const markJoyrideShown = () => localStorage.setItem(JOYRIDE_SHOWN_KEY, "1");
const clearJoyrideShown = () => localStorage.removeItem(JOYRIDE_SHOWN_KEY);
const shouldShowJoyrideOnce = () => !localStorage.getItem(JOYRIDE_SHOWN_KEY);

export default function JoyRideController() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: authData } = useUserInfoQuery(undefined); // change to your query hook
  const userRole = authData?.data?.role;

  const joyState = useAppSelector((s) => (s as any).joyRideSlice);
  const isActive = joyState?.isActive ?? false;
  const currentTour = joyState?.currentTour ?? null;

  useEffect(() => {
    console.log("[JoyRideController] mounted", { isActive, currentTour });
  }, []);

  const steps = useMemo(() => {
    if (currentTour === "home") return homeSteps;
    if (currentTour === "dashboard") return dashboardSteps;
    return [];
  }, [currentTour]);

  const run = Boolean(isActive && steps.length > 0 && shouldShowJoyrideOnce());

  useEffect(() => {
    console.log("[JoyRideController] run:", run, {
      isActive,
      currentTour,
      stepsLen: steps.length,
    });
  }, [run, isActive, currentTour, steps.length]);

  const handleCallback = (data: CallBackProps) => {
    // status: 'finished' | 'skipped' | 'running' | ...
    const status = (data as any).status as string;
    console.log("[Joyride callback]", { status, currentTour, data });

    // If step was skipped by user -> consider this as end (optional: mark)
    if (status === "skipped") {
      // mark as seen (optional)
      markJoyrideShown();
      dispatch(endTour());
      return;
    }

    // If tour finished:
    if (status === "finished") {
      // If we just finished the HOME tour -> navigate to dashboard and start dashboard tour
      if (currentTour === "home") {
        // navigate role-based
        if (userRole === "ADMIN") navigate("/admin");
        else if (userRole === "AGENT") navigate("/agent");
        else navigate("/user");

        // Start dashboard tour AFTER navigation (small delay to allow DOM mount)
        setTimeout(() => {
          dispatch(startTour("dashboard"));
        }, 350);

        // do NOT mark as seen or end the overall tour yet — wait until dashboard tour finishes
        return;
      }

      // If we just finished the DASHBOARD tour -> mark and end
      if (currentTour === "dashboard") {
        markJoyrideShown();
        dispatch(endTour());
        return;
      }

      // fallback: if finished but unknown tour, just end
      dispatch(endTour());
      return;
    }
  };

  // dev helper to force start
  useEffect(() => {
    // @ts-expect-error
    window.__startJoyride = (tour: "home" | "dashboard") => {
      dispatch(startTour(tour));
    };
    // @ts-expect-error
    window.__clearJoyride = () => {
      clearJoyrideShown();
    };
  }, [dispatch]);

  return (
    <ReactJoyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      showProgress
      scrollToFirstStep
      callback={handleCallback}
      styles={{ options: { zIndex: 10000 } }}
      locale={{
        back: "Back",
        close: "Close",
        last: "Last",
        next: "Next",
        skip: "Skip",
      }}
    />
  );
}
