import { Products } from "@prisma/client";
import { create } from "zustand";

type ModalType = "form-action" | "product-edit" | "product-delete";

interface ModalData {
  role: "admin" | "moderator";
  id: string;
  product?: Products;
}

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData | null;
  onOpen: (type: ModalType, data: ModalData) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalStore>(set => ({
  type: null,
  data: null,
  isOpen: false,
  onOpen: (type, data) => set({ type, data, isOpen: true }),
  onClose: () => set({ type: null, data: null, isOpen: false }),
}));
