import { create } from "zustand";

export type ModalType = "UpdatePoll" | "";

interface StoreType {
  modal: ModalType;
  setModal: (modal: ModalType) => void;
  activePollId: string | null;
  setActivePollId: (id: string | null) => void;
}

const useStore = create<StoreType>((set) => ({
  modal: "",
  setModal: (modal) => set({ modal }),
  activePollId: null,
  setActivePollId: (id) => set({ activePollId: id }),
}));

export default useStore;
