import Wrapper from "./Wrapper";
import UpdatePoll from "./UpdatePoll";
import type { ModalType } from "@/store";
import React from "react";

// Define the modal components map with proper types
const modals: Record<string, React.FC & { heading?: string }> = {
  UpdatePoll,
};

const Modal = ({ modal }: { modal: ModalType }) => {
  const Component = modals[modal];

  if (!Component) return null;

  const heading = Component.heading;

  return (
    <Wrapper heading={heading}>
      <Component />
    </Wrapper>
  );
};

export default Modal;
