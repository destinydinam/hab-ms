import { doctorTypes } from "@/app/admin/doctors/data";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  doctorSpecialty: string;
  setDoctorSpecialty: (doctorSpecialty: string) => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      doctorSpecialty: doctorTypes[0],
      setDoctorSpecialty: (doctorSpecialty) => set({ doctorSpecialty }),
    }),
    { name: "hab-ms-public" }
  )
);

export const useDoctorSpecialty = () =>
  useStore((state) => state.doctorSpecialty);
export const useSetDoctorSpecialty = () =>
  useStore((state) => state.setDoctorSpecialty);
