import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Button } from "../Button/Button.tsx";
import { ControlledDrawerStory } from "./drawer-story-fixtures.tsx";
import { Drawer } from "./Drawer.tsx";
// biome-ignore lint/correctness/noUnresolvedImports: Vite loads CSS Modules at build time.
import storyStyles from "./drawer.stories.module.css";

const triggerLabel = "Open drawer";
const basicContent = "Future mobile game-sheet content belongs here.";
const longSections = [
  "Review the company roster before leaving the settlement.",
  "Assign available units to squads before confirming the march.",
  "Damaged equipment remains unavailable until repairs are complete.",
  "The quartermaster has marked supplies reserved for the next battle.",
  "Unassigned units will remain at the current settlement.",
  "Scouts recommend avoiding the flooded eastern road.",
  "The rear guard needs another squad before the company departs.",
  "Orders can be changed again before the first movement phase.",
  "Any wounded leaders should be replaced before confirmation.",
  "The company will depart when these preparations are complete.",
] as const;

const meta = {
  title: "Primitives/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  args: {
    trigger: <Button>{triggerLabel}</Button>,
    title: "Prepare company",
    description: "Review the roster before returning to the campaign.",
    children: <p>{basicContent}</p>,
    closeLabel: "Close drawer",
  },
} satisfies Meta<typeof Drawer>;

type Story = StoryObj<typeof meta>;

// CSF associates named stories with component metadata through the default export.
export default meta;

export const BasicBottomDrawer: Story = {
  args: { defaultOpen: true },
};

export const KeyboardDismissal: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: triggerLabel });
    await userEvent.click(trigger);

    const page = within(globalThis.document.body);
    const drawer = page.getByRole("dialog", { name: "Prepare company" });
    await expect(drawer).toHaveAccessibleDescription(
      "Review the roster before returning to the campaign.",
    );
    await waitFor(() => {
      expect(drawer.contains(globalThis.document.activeElement)).toBe(true);
    });

    const content = page.getByText(basicContent).parentElement;
    const close = page.getByRole("button", { name: "Close drawer" });
    if (!(content instanceof HTMLElement)) {
      throw new Error("Missing drawer content");
    }

    content.focus();
    await userEvent.tab({ shift: true });
    await waitFor(() => {
      expect(close).toHaveFocus();
    });
    await userEvent.tab();
    await expect(content).toHaveFocus();

    await userEvent.keyboard("{Escape}");
    await waitFor(() => {
      expect(page.queryByRole("dialog")).not.toBeInTheDocument();
    });
    await expect(trigger).toHaveFocus();
  },
};

export const BackdropDismissal: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: triggerLabel });
    await userEvent.click(trigger);

    const page = within(globalThis.document.body);
    await userEvent.click(page.getByTestId("drawer-backdrop"));
    await waitFor(() => {
      expect(page.queryByRole("dialog")).not.toBeInTheDocument();
    });
    await expect(trigger).toHaveFocus();
  },
};

export const LongScrollableContent: Story = {
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
      throw new Error("Missing scrollable drawer content");
    }

    await expect(content.scrollHeight).toBeGreaterThan(content.clientHeight);
    content.scrollTop = content.scrollHeight;
    await expect(content.scrollTop).toBeGreaterThan(0);
  },
};

export const LargePhone: Story = {
  globals: {
    viewport: { value: "largePhone", isRotated: false },
  },
  args: { defaultOpen: true },
};

export const SafeAreaSimulation: Story = {
  args: { defaultOpen: true },
  decorators: [
    (Story) => (
      <div className={storyStyles["safeArea"]}>
        <Story />
      </div>
    ),
  ],
};

export const ControlledState: Story = {
  render: () => <ControlledDrawerStory />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Open controlled drawer" }),
    );
    const page = within(globalThis.document.body);
    await expect(
      page.getByRole("dialog", { name: "Controlled drawer" }),
    ).toBeInTheDocument();
    await userEvent.click(page.getByRole("button", { name: "Close" }));
    await waitFor(() => {
      expect(page.queryByRole("dialog")).not.toBeInTheDocument();
    });
  },
};

export const ReducedMotion: Story = {
  args: { defaultOpen: true },
  play: async () => {
    await expect(
      globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches,
    ).toBe(true);
  },
};
