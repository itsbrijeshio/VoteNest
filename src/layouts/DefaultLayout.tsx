import { Footer, Navbar } from "@/components";
import Modal from "@/components/modals/Modal";
import useStore from "@/store";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  const { modal } = useStore();
  return (
    <>
      <Navbar />
      <main className="mx-auto h-[calc(100vh-52px-30px)] my-10 py-10 bg-accent/50 px-5 overflow-y-scroll">
        <Outlet />
      </main>
      <Modal modal={modal} />
      <Footer />
    </>
  );
};

export default DefaultLayout;
