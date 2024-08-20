import { ScheduleForType, ScheduleStatus } from "@/types/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  scheduleForType: ScheduleForType;
  setScheduleForType: (scheduleForType: ScheduleForType) => void;
  scheduleFor: string;
  setScheduleFor: (scheduleFor: string) => void;
  scheduleStatus: ScheduleStatus;
  setScheduleStatus: (scheduleStatus: ScheduleStatus) => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      scheduleForType: "doctors",
      setScheduleForType: (scheduleForType) => set({ scheduleForType }),
      scheduleFor: "",
      setScheduleFor: (scheduleFor) => set({ scheduleFor }),
      scheduleStatus: "all",
      setScheduleStatus: (scheduleStatus) => set({ scheduleStatus }),
    }),
    { name: "hab-ms" }
  )
);

export const useScheduleForType = () =>
  useStore((state) => state.scheduleForType);
export const useSetScheduleForType = () =>
  useStore((state) => state.setScheduleForType);

export const useScheduleFor = () => useStore((state) => state.scheduleFor);
export const useSetScheduleFor = () =>
  useStore((state) => state.setScheduleFor);

export const useScheduleStatus = () =>
  useStore((state) => state.scheduleStatus);
export const useSetScheduleStatus = () =>
  useStore((state) => state.setScheduleStatus);
