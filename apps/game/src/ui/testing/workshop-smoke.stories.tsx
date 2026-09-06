import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";

interface WorkshopSmokeArgs {
  label: string;
  onClick: () => void;
}

const meta = {
  title: "Foundation/Workshop smoke",
  tags: ["autodocs"],
  args: {
    label: "Workshop ready",
    onClick: fn(),
  },
  render: (args) => (
    <button type="button" onClick={args.onClick}>
      {args.label}
    </button>
  ),
} satisfies Meta<WorkshopSmokeArgs>;

type Story = StoryObj<typeof meta>;

// CSF associates named stories with component metadata through the default export.
export default meta;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: args.label }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
