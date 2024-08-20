import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  scheduleForType: string;
  setScheduleForType: (scheduleForType: string) => void;
  scheduleFor: string;
  setScheduleFor: (scheduleFor: string) => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      scheduleForType: "",
      setScheduleForType: (scheduleForType) => set({ scheduleForType }),
      scheduleFor: "",
      setScheduleFor: (scheduleFor) => set({ scheduleFor }),
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
