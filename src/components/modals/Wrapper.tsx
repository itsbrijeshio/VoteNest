import useStore from "@/store";
import type { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

interface WrapperProps {
  children: ReactNode;
  heading?: string;
}

const Wrapper = ({ heading = "unknown", children }: WrapperProps) => {
  const { setModal } = useStore();

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-accent/80 p-3">
        <div className="w-[500px] bg-background rounded-lg shadow-lg p-6 relative flex flex-col gap-4">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{heading}</h2>
            <button
              onClick={() => setModal(null)}
              className="text-xl hover:text-error"
            >
              <IoMdClose />
            </button>
          </div>

          {/* Content */}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Wrapper;
