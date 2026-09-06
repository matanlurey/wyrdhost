import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { TestIcon } from "../../icons/TestIcon.tsx";
import { IconButton } from "./IconButton.tsx";

const meta = {
  title: "Primitives/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: {
    children: <TestIcon />,
    label: "Open army",
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>;

type Story = StoryObj<typeof meta>;

// CSF associates named stories with component metadata through the default export.
export default meta;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Open army" });

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    onClick: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Open army" });

    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const Small: Story = {
  args: { size: "small" },
};

export const Large: Story = {
  args: { size: "large" },
};

export const NarrowViewport: Story = {
  globals: {
    viewport: { value: "narrowPhone", isRotated: false },
  },
};
