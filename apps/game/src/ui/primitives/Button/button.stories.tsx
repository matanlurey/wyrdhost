import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Button } from "./Button.tsx";

const meta = {
  title: "Primitives/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Continue",
    onClick: fn(),
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger"],
    },
  },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

const minimumTouchTargetCssPixels = 44;
const enabledLabel = "Enabled";
const disabledLabel = "Disabled";

// CSF associates named stories with component metadata through the default export.
export default meta;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Continue" });

    await expect(button).toHaveAttribute("type", "button");
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Danger: Story = {
  args: { variant: "danger" },
};

export const Small: Story = {
  args: { size: "small" },
};

export const Medium: Story = {
  args: { size: "medium" },
};

export const Large: Story = {
  args: { size: "large" },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    onClick: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Continue" });

    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const LongText: Story = {
  args: {
    children: "Fortfahren und die ausgewählte Kompanie bereitstellen",
  },
};

export const KeyboardFocus: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Continue" });

    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
};

export const KeyboardActivation: Story = {
  args: { onClick: fn() },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Continue" });

    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

export const CoarsePointerSizing: Story = {
  globals: {
    viewport: { value: "phone", isRotated: false },
  },
  args: {
    children: "Go",
    size: "small",
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Go" });
    const bounds = button.getBoundingClientRect();

    await expect(globalThis.matchMedia("(pointer: coarse)").matches).toBe(true);
    await expect(bounds.width).toBeGreaterThanOrEqual(
      minimumTouchTargetCssPixels,
    );
    await expect(bounds.height).toBeGreaterThanOrEqual(
      minimumTouchTargetCssPixels,
    );
  },
};

export const NarrowViewport: Story = {
  globals: {
    viewport: { value: "narrowPhone", isRotated: false },
  },
  args: {
    children: "A narrow viewport action",
  },
};

export const ForcedColors: Story = {
  args: { variant: "secondary" },
  render: (args) => (
    <>
      <Button {...args}>{enabledLabel}</Button>
      <Button {...args} disabled={true}>
        {disabledLabel}
      </Button>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: "Use browser forced-colors emulation to inspect system colors.",
      },
    },
  },
};
