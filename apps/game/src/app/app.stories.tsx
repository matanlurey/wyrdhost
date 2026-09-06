import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, spyOn } from "storybook/test";
import { AppShell } from "./App.tsx";

const meta = {
  title: "Application/Shell",
  component: AppShell,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AppShell>;
type Story = StoryObj<typeof meta>;
export default meta;
export const Campaign: Story = { args: { screen: "campaign" } };
export const Army: Story = {
  args: { screen: "army" },
  play: async ({ canvas, userEvent }) => {
    const company = canvas.getByRole("button", {
      name: /Wardens of the Northern Wood/,
    });
    await userEvent.click(company);
    await expect(company).toHaveAttribute("aria-pressed", "true");
    await expect(
      canvas.getByRole("heading", { name: "Wardens of the Northern Wood" }),
    ).toBeVisible();
  },
};
export const Phone: Story = {
  args: { screen: "army" },
  globals: { viewport: { value: "phone", isRotated: false } },
};
export const NarrowPhone: Story = {
  args: { screen: "army" },
  globals: { viewport: { value: "narrowPhone", isRotated: false } },
};
export const Collection: Story = { args: { screen: "collection" } };
export const Settings: Story = { args: { screen: "settings" } };
export const MissingPage: Story = { args: { screen: "missing" } };

export const Desktop: Story = {
  args: { screen: "army" },
  globals: { viewport: { value: "desktop", isRotated: false } },
};
export const HighContrast: Story = {
  args: { screen: "army", initialAppearance: "contrast" },
};
export const IsolatedSettings: Story = {
  args: { screen: "settings" },
  play: async ({ canvas, userEvent }) => {
    const writes = spyOn(Storage.prototype, "setItem");
    try {
      await expect(
        canvas.getByRole("radio", { name: /Blue-black ink/ }),
      ).toBeChecked();
      await userEvent.click(
        canvas.getByRole("radio", { name: /High contrast/ }),
      );
      await expect(
        canvas.getByRole("radio", { name: /High contrast/ }),
      ).toBeChecked();
      await expect(
        writes.mock.calls.filter(([key]) => key === "wyrdhost.appearance"),
      ).toEqual([]);
    } finally {
      writes.mockRestore();
    }
  },
};
