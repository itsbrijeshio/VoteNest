import Wrapper from "./Wrapper";
import UpdatePoll from "./UpdatePoll";
import type { ModalType } from "@/store";

const Modal = ({ modal }: { modal: ModalType }) => {
  const modals = { UpdatePoll };

  const heading = modals?.[modal]?.heading;

  return modals?.[modal] ? (
    <Wrapper heading={heading}>{modals?.[modal]?.()}</Wrapper>
  ) : (
    ""
  );
};

export default Modal;
