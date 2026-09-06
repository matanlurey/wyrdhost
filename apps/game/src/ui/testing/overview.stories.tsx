import type { Meta, StoryObj } from "@storybook/react-vite";

const heading = "Wyrdhost UI foundation";
const description =
  "Choose a component to explore its appearance and behavior.";

const meta = {
  title: "Foundation/Overview",
  parameters: { layout: "padded" },
  render: () => (
    <main>
      <h1>{heading}</h1>
      <p>{description}</p>
      <ul>
        {[
          ["Button", "primitives-button--default"],
          ["IconButton", "primitives-iconbutton--default"],
          ["Dialog", "primitives-dialog--basic"],
          ["AlertDialog", "primitives-alertdialog--basic"],
          ["Drawer", "primitives-drawer--basic-bottom-drawer"],
          ["Toast", "primitives-toast--feedback-tones"],
        ].map(([label, id]) => (
          <li key={id}>
            <a
              href={`/?path=/story/${id}`}
              target="_top"
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: "44px",
              }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </main>
  ),
} satisfies Meta;

type Story = StoryObj<typeof meta>;

export default meta;
export const Overview: Story = {};
