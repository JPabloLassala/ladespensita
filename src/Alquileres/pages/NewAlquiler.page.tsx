import { Modal } from "@/Shared";

export function NewAlquiler() {
  return (
    <Modal open={true} onClose={() => console.log("Closing modal")}>
      Formulario de nuevo alquiler
    </Modal>
  );
}
