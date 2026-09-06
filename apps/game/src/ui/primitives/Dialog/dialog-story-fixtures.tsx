import { useState } from "react";
import { Button } from "../Button/Button.tsx";
import { Dialog } from "./Dialog.tsx";

const triggerLabel = "Open controlled dialog";
const content = "Controlled content";

export function ControlledDialogStory() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      contentLabel="Controlled dialog details"
      open={open}
      onOpenChange={setOpen}
      trigger={<Button>{triggerLabel}</Button>}
      title="Controlled dialog"
      description="Its open state is owned by the story component."
    >
      {content}
    </Dialog>
  );
}
