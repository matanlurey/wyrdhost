import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Button } from "../Button/Button.tsx";
import { ControlledDialogStory } from "./dialog-story-fixtures.tsx";
import { Dialog } from "./Dialog.tsx";
// biome-ignore lint/correctness/noUnresolvedImports: Vite loads CSS Modules at build time.
import storyStyles from "./dialog.stories.module.css";

const triggerLabel = "Open dialog";
const basicContent = "The northern road remains closed.";

const longSections = [
  "The first company crossed the pass before the weather turned.",
  "Scouts reported movement beyond the northern ridge before dawn.",
  "Supplies must be counted before the company leaves the settlement.",
  "Every damaged shield needs repair before the next engagement.",
  "The western trail remains blocked by fallen trees and loose stone.",
  "Messengers should travel in pairs while the roads remain unsafe.",
  "The reserve company will hold the crossing until relieved.",
  "Any change to the marching order must reach every squad leader.",
  "Camp must be struck before the valley fog begins to lift.",
  "The final watch should wake the company without sounding a horn.",
  "Rations are limited, so the return route must remain direct.",
  "The commander will review these orders again at first light.",
] as const;

const meta = {
  title: "Primitives/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  args: {
    trigger: <Button>{triggerLabel}</Button>,
    title: "Company orders",
    description: "Review the orders before returning to the campaign.",
    children: <p>{basicContent}</p>,
    closeLabel: "Close dialog",
  },
} satisfies Meta<typeof Dialog>;

type Story = StoryObj<typeof meta>;

// CSF associates named stories with component metadata through the default export.
export default meta;

export const Basic: Story = {
  args: { defaultOpen: true },
};

export const FocusAndKeyboard: Story = {
  args: {
    children: <input aria-label="Company name" defaultValue="Ash Guard" />,
  },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "Open dialog" });
    await userEvent.click(trigger);

    const page = within(globalThis.document.body);
    const dialog = page.getByRole("dialog", { name: "Company orders" });
    const input = page.getByRole("textbox", { name: "Company name" });
    const close = page.getByRole("button", { name: "Close dialog" });

    await expect(dialog).toHaveAccessibleDescription(
      "Review the orders before returning to the campaign.",
    );
    await waitFor(() => {
      expect(dialog.contains(globalThis.document.activeElement)).toBe(true);
    });

    input.focus();
    await userEvent.tab({ shift: true });
    await waitFor(() => {
      expect(close).toHaveFocus();
    });
    await userEvent.tab();
    await expect(input).toHaveFocus();

    await userEvent.keyboard("{Escape}");
    await waitFor(() => {
      expect(page.queryByRole("dialog")).not.toBeInTheDocument();
    });
    await expect(trigger).toHaveFocus();
  },
};

export const BackdropDismissal: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "Open dialog" });
    await userEvent.click(trigger);

    const page = within(globalThis.document.body);
    await userEvent.click(page.getByTestId("dialog-backdrop"));
    await waitFor(() => {
      expect(page.queryByRole("dialog")).not.toBeInTheDocument();
    });
    await expect(trigger).toHaveFocus();
  },
};

export const LongTitle: Story = {
  args: {
    defaultOpen: true,
    title:
      "Confirm the revised marching order for every company assigned to the northern pass",
    description:
      "This deliberately long heading and description verify wrapping at increased content lengths.",
  },
};

export const ScrollableContent: Story = {
  globals: {
    viewport: { value: "narrowPhone", isRotated: false },
  },
  args: {
    defaultOpen: true,
    children: longSections.map((section) => <p key={section}>{section}</p>),
  },
  play: async () => {
    const page = within(globalThis.document.body);
    const firstSection = page.getByText(longSections[0]);
    const content = firstSection.parentElement;

    if (!(content instanceof HTMLElement)) {
      throw new Error("Missing scrollable dialog content");
    }

    await expect(content.scrollHeight).toBeGreaterThan(content.clientHeight);
    content.scrollTop = content.scrollHeight;
    await expect(content.scrollTop).toBeGreaterThan(0);
  },
};

export const ControlledState: Story = {
  render: () => <ControlledDialogStory />,
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", {
      name: "Open controlled dialog",
    });
    await userEvent.click(trigger);

    const page = within(globalThis.document.body);
    await expect(
      page.getByRole("dialog", { name: "Controlled dialog" }),
    ).toBeInTheDocument();
    await userEvent.click(page.getByRole("button", { name: "Close" }));
    await waitFor(() => {
      expect(page.queryByRole("dialog")).not.toBeInTheDocument();
    });
  },
};

export const InitialFocus: Story = {
  args: {
    children: <input data-initial-focus={true} aria-label="Order name" />,
    initialFocus: () =>
      globalThis.document.querySelector<HTMLInputElement>(
        "[data-initial-focus]",
      ),
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Open dialog" }));
    const input = within(globalThis.document.body).getByRole("textbox", {
      name: "Order name",
    });
    await waitFor(() => {
      expect(input).toHaveFocus();
    });
  },
};

export const IncreasedTextSize: Story = {
  args: { defaultOpen: true },
  decorators: [
    (Story) => (
      <div className={storyStyles["largeText"]}>
        <Story />
      </div>
    ),
  ],
};
