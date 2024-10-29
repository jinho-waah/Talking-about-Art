import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ModalProps {
  isModalOpen: boolean;
  toggleModal: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
}

export default function Modal({
  isModalOpen,
  toggleModal,
  handleEdit,
  handleDelete,
}: ModalProps) {
  return (
    <Dialog open={isModalOpen} onOpenChange={toggleModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 옵션</DialogTitle>
          <DialogDescription>
            게시물을 수정하거나 삭제할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-2">
          <Button variant="outline" onClick={handleEdit}>
            수정하기
          </Button>
          <Button variant="outline" onClick={handleDelete}>
            삭제하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
