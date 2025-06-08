import { create } from "zustand"

interface ModalState {
  isEarlyAccessOpen: boolean
  isBookSetupOpen: boolean
  openEarlyAccess: () => void
  closeEarlyAccess: () => void
  openBookSetup: () => void
  closeBookSetup: () => void
}

export const useModalStore = create<ModalState>((set) => ({
  isEarlyAccessOpen: false,
  isBookSetupOpen: false,
  openEarlyAccess: () => set({ isEarlyAccessOpen: true }),
  closeEarlyAccess: () => set({ isEarlyAccessOpen: false }),
  openBookSetup: () => set({ isBookSetupOpen: true }),
  closeBookSetup: () => set({ isBookSetupOpen: false }),
}))
