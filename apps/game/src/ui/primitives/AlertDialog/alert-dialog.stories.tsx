import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor, within } from "storybook/test";
import { Button } from "../Button/Button.tsx";
import { AlertDialog } from "./AlertDialog.tsx";

const triggerLabel = "Delete company";
const consequence = "Units assigned to it will become unassigned.";

const meta = {
  title: "Primitives/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
  args: {
    trigger: <Button variant="danger">{triggerLabel}</Button>,
    title: "Delete this company?",
    description: "This removes the company from the current campaign.",
    children: <p>{consequence}</p>,
    cancelLabel: "Keep company",
    confirmLabel: "Delete company",
    onConfirm: fn(),
  },
} satisfies Meta<typeof AlertDialog>;

type Story = StoryObj<typeof meta>;

// CSF associates named stories with component metadata through the default export.
export default meta;

export const Basic: Story = {
  args: { defaultOpen: true },
  play: async () => {
    const page = within(globalThis.document.body);
    const alert = page.getByRole("alertdialog", {
      name: "Delete this company?",
    });
    const cancel = page.getByRole("button", { name: "Keep company" });

    await expect(alert).toHaveAccessibleDescription(
      "This removes the company from the current campaign.",
    );
    await expect(cancel).toHaveFocus();
  },
};

export const SafeDismissal: Story = {
  args: { onConfirm: fn() },
  play: async ({ args, canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "Delete company" });
    await userEvent.click(trigger);

    const page = within(globalThis.document.body);
    const cancel = page.getByRole("button", { name: "Keep company" });
    const confirm = page.getByRole("button", { name: "Delete company" });

    await waitFor(() => {
      expect(cancel).toHaveFocus();
    });
    await userEvent.tab();
    await expect(confirm).toHaveFocus();
    await userEvent.tab({ shift: true });
    await expect(cancel).toHaveFocus();

    await userEvent.click(page.getByTestId("dialog-backdrop"));
    await expect(page.getByRole("alertdialog")).toBeInTheDocument();
    await expect(args.onConfirm).not.toHaveBeenCalled();

    await userEvent.keyboard("{Escape}");
    await waitFor(() => {
      expect(page.queryByRole("alertdialog")).not.toBeInTheDocument();
    });
    await expect(args.onConfirm).not.toHaveBeenCalled();
    await expect(trigger).toHaveFocus();
  },
};

export const DestructiveConfirmation: Story = {
  args: { onConfirm: fn() },
  play: async ({ args, canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "Delete company" });
    await userEvent.click(trigger);

    const page = within(globalThis.document.body);
    await userEvent.click(page.getByRole("button", { name: "Delete company" }));
    await expect(args.onConfirm).toHaveBeenCalledOnce();
    await waitFor(() => {
      expect(page.queryByRole("alertdialog")).not.toBeInTheDocument();
    });
    await expect(trigger).toHaveFocus();
  },
};

export const NarrowPhone: Story = {
  globals: {
    viewport: { value: "narrowPhone", isRotated: false },
  },
  args: {
    defaultOpen: true,
    title: "Delete the northern expedition company and release its units?",
  },
};
