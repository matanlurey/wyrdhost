import { useState } from "react";
import { Button } from "../Button/Button.tsx";
import { Drawer } from "./Drawer.tsx";

const triggerLabel = "Open controlled drawer";
const content = "Controlled drawer content";

export function ControlledDrawerStory() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      trigger={<Button>{triggerLabel}</Button>}
      title="Controlled drawer"
      description="Its open state is owned by the story component."
    >
      {content}
    </Drawer>
  );
}
