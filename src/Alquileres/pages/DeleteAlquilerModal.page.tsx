import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "@/Shared";
import { Button } from "@mantine/core";

export function DeleteAlquilerModal({
  isModalOpen,
  onCloseModal,
  onAccept,
  title,
}: {
  isModalOpen: boolean;
  onCloseModal: () => void;
  onAccept: () => void;
  title: string;
}) {
  return (
    <Modal open={isModalOpen} onClose={onCloseModal}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row gap-2">
          <div className="flex-grow flex-col end">
            <p className="text-xl font-bold">¿Estás segur@ de que querés borrar este alquiler?</p>
            <p className="text-lg">{title}</p>
            <p className="text-sm">Esta acción no se puede deshacer.</p>
          </div>
          <FontAwesomeIcon
            icon={faXmark}
            className="font-bold text-4xl cursor-pointer block"
            onClick={onCloseModal}
          />
        </div>
        <div className="self-end flex flex-row gap-2">
          <Button onClick={onAccept}>Acepter</Button>
          <Button onClick={onCloseModal}>Cancelar</Button>
        </div>
      </div>
    </Modal>
  );
}
