import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor, within } from "storybook/test";
import { DocumentClass } from "../../testing/DocumentClass.tsx";
import { ToastStory } from "./toast-story-fixtures.tsx";
// biome-ignore lint/correctness/noUnresolvedImports: Vite loads CSS Modules at build time.
import storyStyles from "./toast.stories.module.css";

const expectedLowPriorityToasts = 3;
const pauseAssertionDelayMs = 250;
const toastRemovalTimeoutMs = 1000;

const meta = {
  title: "Primitives/Toast",
  component: ToastStory,
  tags: ["autodocs"],
  args: {
    onAction: fn(),
    scenario: "tones",
  },
} satisfies Meta<typeof ToastStory>;

type Story = StoryObj<typeof meta>;

// CSF associates named stories with component metadata through the default export.
export default meta;

export const FeedbackTones: Story = {
  play: async ({ canvas, userEvent }) => {
    const page = within(globalThis.document.body);
    const viewport = page.getByRole("region", { name: "Notifications" });
    await expect(viewport).toHaveAttribute("aria-live", "polite");

    await userEvent.click(canvas.getByRole("button", { name: "Show neutral" }));
    await expect(
      page.getByRole("dialog", { name: "neutral feedback" }),
    ).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "Show danger" }));
    await expect(page.getByRole("alert")).toHaveTextContent("danger feedback");
  },
};

export const LongTextOnNarrowPhone: Story = {
  args: { scenario: "long" },
  globals: {
    viewport: { value: "narrowPhone", isRotated: false },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Show toast" }));
    const page = within(globalThis.document.body);
    await waitFor(() => {
      expect(page.getByText("Roster saved")).toBeVisible();
    });
    await expect(
      globalThis.document.documentElement.scrollWidth,
    ).toBeLessThanOrEqual(globalThis.innerWidth);
  },
};

export const MultipleToasts: Story = {
  args: { scenario: "multiple" },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Show four toasts" }),
    );
    const page = within(globalThis.document.body);
    await expect(page.getAllByRole("dialog")).toHaveLength(
      expectedLowPriorityToasts,
    );
    await expect(page.getByRole("alert")).toHaveTextContent("danger event");
  },
};

export const ActionAndClose: Story = {
  args: { scenario: "action" },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Show toast" }));
    const page = within(globalThis.document.body);
    await userEvent.keyboard("{F6}");
    await userEvent.click(page.getByRole("button", { name: "Undo" }));
    await expect(args.onAction).toHaveBeenCalledOnce();
    await userEvent.click(page.getByRole("button", { name: "Dismiss" }));
    await waitFor(() => {
      expect(page.queryByRole("dialog")).not.toBeInTheDocument();
    });
  },
};

export const DuplicatePrevention: Story = {
  args: { scenario: "deduplicate" },
  play: async ({ canvas, userEvent }) => {
    const repeat = canvas.getByRole("button", { name: "Repeat event" });
    await userEvent.click(repeat);
    await userEvent.click(repeat);
    const page = within(globalThis.document.body);
    await expect(page.getAllByRole("dialog")).toHaveLength(1);
  },
};

export const PausedTimeout: Story = {
  args: { scenario: "pause" },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "Show toast" });
    await userEvent.click(trigger);
    const page = within(globalThis.document.body);
    const notification = page.getByRole("dialog", { name: "Timed event" });

    await userEvent.hover(notification);
    await new Promise<void>((resolve) =>
      globalThis.setTimeout(resolve, pauseAssertionDelayMs),
    );
    await expect(notification).toBeInTheDocument();

    await userEvent.unhover(notification);
    await waitFor(
      () => {
        expect(notification).not.toBeInTheDocument();
      },
      { timeout: toastRemovalTimeoutMs },
    );

    await userEvent.click(trigger);
    const focusedNotification = page.getByRole("dialog", {
      name: "Timed event",
    });
    await userEvent.keyboard("{F6}");
    const viewport = page.getByRole("region", { name: "Notifications" });
    await expect(viewport).toHaveFocus();
    await new Promise<void>((resolve) =>
      globalThis.setTimeout(resolve, pauseAssertionDelayMs),
    );
    await expect(focusedNotification).toBeInTheDocument();

    trigger.focus();
    await waitFor(
      () => {
        expect(focusedNotification).not.toBeInTheDocument();
      },
      { timeout: toastRemovalTimeoutMs },
    );
  },
};

export const SafeAreaSimulation: Story = {
  args: { scenario: "long" },
  globals: {
    viewport: { value: "largePhone", isRotated: false },
  },
  decorators: [
    (Story) => (
      <DocumentClass className={storyStyles["safeArea"]}>
        <Story />
      </DocumentClass>
    ),
  ],
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Show toast" }));
    const page = within(globalThis.document.body);
    await waitFor(() => {
      expect(page.getByText("Roster saved")).toBeVisible();
    });
  },
};
