import type { ReactNode } from "react";
import {
  Component,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Button } from "../ui/primitives/Button/Button.tsx";
import { ToastProvider } from "../ui/primitives/Toast/ToastProvider.tsx";
// biome-ignore lint/correctness/noUnresolvedImports: Vite resolves CSS Modules.
import styles from "./app.module.css";
import "./theme.css";
import "@fontsource-variable/alegreya";
import "@fontsource-variable/source-sans-3";

const destinations = [
  { id: "campaign", label: "Campaign", mark: "01", detail: "Your journey" },
  { id: "army", label: "Army", mark: "02", detail: "Your companies" },
  { id: "collection", label: "Collection", mark: "03", detail: "Your arsenal" },
  { id: "settings", label: "Settings", mark: "04", detail: "Make it yours" },
] as const;
type Screen = (typeof destinations)[number]["id"];
type Appearance = "night" | "contrast";

function subscribe(listener: () => void) {
  globalThis.addEventListener("hashchange", listener);
  return () => globalThis.removeEventListener("hashchange", listener);
}
function readRoute() {
  return globalThis.location.hash.slice(1) || "/campaign";
}
function readAppearance(): Appearance {
  try {
    return localStorage.getItem("wyrdhost.appearance") === "contrast"
      ? "contrast"
      : "night";
  } catch {
    return "night";
  }
}

function App() {
  const route = useSyncExternalStore(subscribe, readRoute, () => "/campaign");
  const screen =
    destinations.find((item) => route === `/${item.id}`)?.id ?? "missing";
  return (
    <AppBoundary>
      <ToastProvider>
        <AppShell screen={screen} persistAppearance={true} />
      </ToastProvider>
    </AppBoundary>
  );
}

interface ShellProps {
  screen?: Screen | "missing";
  /** Only the application opts into device preferences; stories stay isolated. */
  persistAppearance?: boolean;
  initialAppearance?: Appearance;
}

function AppShell({
  screen = "campaign",
  persistAppearance = false,
  initialAppearance = "night",
}: ShellProps) {
  const contentId = useId();
  const [appearance, setAppearance] = useState(() =>
    persistAppearance ? readAppearance() : initialAppearance,
  );
  const heading = useRef<HTMLHeadingElement>(null);
  const previousScreen = useRef(screen);
  const label =
    destinations.find((item) => item.id === screen)?.label ?? "Page not found";
  useEffect(() => {
    document.title = `${label} · Wyrdhost`;
    if (previousScreen.current !== screen) {
      heading.current?.focus();
      previousScreen.current = screen;
    }
  }, [screen, label]);
  function changeAppearance(value: Appearance) {
    setAppearance(value);
    if (!persistAppearance) return;
    try {
      localStorage.setItem("wyrdhost.appearance", value);
    } catch {
      // Appearance still works for this session when storage is unavailable.
    }
  }
  return (
    <div className={styles["shell"]} data-appearance={appearance}>
      <button
        type="button"
        className={styles["skip"]}
        onClick={(event) => {
          event.preventDefault();
          heading.current?.focus();
        }}
      >
        Skip to content
      </button>
      <aside className={styles["rail"]}>
        <a
          className={styles["brand"]}
          href="#/campaign"
          aria-label="Wyrdhost campaign"
        >
          <span className={styles["sigil"]} aria-hidden="true">
            W
          </span>
          <span>
            WYRDHOST<small>Field headquarters</small>
          </span>
        </a>
        <div className={styles["railNote"]}>FIELD HEADQUARTERS</div>
        <nav className={styles["navigation"]} aria-label="Main navigation">
          {destinations.map((item) => (
            <a
              key={item.id}
              href={`#/${item.id}`}
              aria-current={screen === item.id ? "page" : undefined}
            >
              <span className={styles["navMark"]} aria-hidden="true">
                {item.mark}
              </span>
              <span>
                {item.label}
                <small>{item.detail}</small>
              </span>
            </a>
          ))}
        </nav>
        <div className={styles["railFooter"]}>
          <span>FOUNDATION BUILD</span>
          <p>Campaign · Army · Orders</p>
        </div>
      </aside>
      <div className={styles["workspace"]}>
        <header className={styles["topbar"]}>
          <span>
            WYRDHOST <span className={styles["separator"]}>/</span> {label}
          </span>
          <span className={styles["badge"]}>EARLY PREVIEW</span>
        </header>
        <main id={contentId} className={styles["content"]}>
          <div className={styles["pageHeading"]}>
            <div>
              <p className={styles["eyebrow"]}>FIELD HEADQUARTERS</p>
              <h1 ref={heading} tabIndex={-1}>
                {label}
              </h1>
            </div>
            <span className={styles["chapter"]}>LAYOUT PREVIEW</span>
          </div>
          {screen === "campaign" && <Campaign />}
          {screen === "army" && <Army />}
          {screen === "collection" && <Placeholder kind="collection" />}
          {screen === "settings" && (
            <Settings appearance={appearance} onChange={changeAppearance} />
          )}
          {screen === "missing" && (
            <section className={styles["panel"]}>
              <h2>This path ends here.</h2>
              <p>Choose a destination from the navigation to continue.</p>
              <a href="#/campaign">Return to Campaign</a>
            </section>
          )}
          <footer className={styles["pageFooter"]}>
            <span>WYRDHOST</span>
            <span>Application shell preview · Gameplay is still to come.</span>
          </footer>
        </main>
      </div>
    </div>
  );
}

function Campaign() {
  const [location, setLocation] = useState("Greyford");
  const locations = [
    "Greyford",
    "The Old Watch",
    "River Crossing",
    "Northwood",
  ];
  return (
    <>
      <div className={styles["previewNote"]}>
        Sample campaign · Locations and values are layout fixtures.
      </div>
      <div className={styles["campaignLayout"]}>
        <section
          className={styles["map"]}
          aria-label="Campaign map placeholder"
        >
          <header>
            <span>THE GREY MARCHES</span>
            <span>Day 03 · Early autumn</span>
          </header>
          <div className={styles["mapInterior"]}>
            <p className={styles["eyebrow"]}>WORLD ART PLACEHOLDER</p>
            <h2>The Grey Marches</h2>
            <p>A schematic route until original world art is ready.</p>
            <div className={styles["route"]}>
              {locations.map((name, index) => (
                <button
                  type="button"
                  key={name}
                  aria-pressed={location === name}
                  onClick={() => setLocation(name)}
                >
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{name}</strong>
                  <small>{index === 0 ? "Current camp" : "Unexplored"}</small>
                </button>
              ))}
            </div>
          </div>
          <footer>
            <span>4 known locations</span>
            <span>Routes are illustrative</span>
          </footer>
        </section>
        <section className={styles["location"]} aria-live="polite">
          <p className={styles["eyebrow"]}>
            {location === "Greyford" ? "YOUR CURRENT CAMP" : "LOCATION PREVIEW"}
          </p>
          <h2>{location}</h2>
          <p>
            {location === "Greyford"
              ? "A weathered river settlement. Your company gathers beneath its old stone walls."
              : "Beyond the settlement, an unexplored route leads deeper into the marches."}
          </p>
          <dl>
            <div>
              <dt>Purpose</dt>
              <dd>
                {location === "Greyford" ? "Rest & preparation" : "Exploration"}
              </dd>
            </div>
            <div>
              <dt>Travel</dt>
              <dd>
                {location === "Greyford" ? "Already here" : "Not yet available"}
              </dd>
            </div>
          </dl>
          <Button disabled={true} size="large">
            {location === "Greyford" ? "Enter settlement" : "Travel here"}
          </Button>
          <small>Campaign actions arrive in a later phase.</small>
          <a href="#/army" className={styles["returnLink"]}>
            Inspect the sample army
          </a>
        </section>
      </div>
    </>
  );
}

const companies = [
  {
    name: "Greyford Men-at-Arms",
    faction: "Highcourt",
    pigment: "highcourt",
    troops: "8 / 10",
    losses: 2,
    state: "Ordered",
    mark: "H",
    equipment: "Broad shields · Maintained blue standard",
    note: "Two casualties shown to test persistent troop information.",
  },
  {
    name: "Redlands Ash Riders",
    faction: "Redlands",
    pigment: "redlands",
    troops: "6 / 6",
    losses: 0,
    state: "Ready",
    mark: "R",
    equipment: "Riding gear · Split vermilion pennant",
    note: "An intact company, ready to receive a command.",
  },
  {
    name: "Wardens of the Northern Wood",
    faction: "Oldwood",
    pigment: "oldwood",
    troops: "5 / 8",
    losses: 3,
    state: "Spent",
    mark: "O",
    equipment: "Heavy cloaks · Rounded shields",
    note: "A spent state retains readable troop and equipment details.",
  },
  {
    name: "The Oathbound of the Barrows",
    faction: "The Barrows",
    pigment: "barrows",
    troops: "7 / 9",
    losses: 2,
    state: "Ready",
    mark: "B",
    equipment: "Cold iron · Faded funerary cloth",
    note: "Old military equipment and heraldry mark this company.",
  },
] as const;

function Army() {
  const [selected, setSelected] = useState(0);
  const company = companies[selected] ?? companies[0];
  return (
    <>
      <div className={styles["previewNote"]}>
        Sample muster · Troop counts and states are display fixtures, not
        finalized rules.
      </div>
      <div className={styles["armySummary"]}>
        <div>
          <p className={styles["eyebrow"]}>COMMANDER</p>
          <h2>Knight-Captain Ysabet</h2>
        </div>
        <span>
          4 companies <b>26 / 33 troops</b>
        </span>
      </div>
      <div className={styles["armyLayout"]}>
        <section
          aria-label="Sample company roster"
          className={styles["roster"]}
        >
          {companies.map((item, index) => (
            <button
              key={item.name}
              type="button"
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
              className={styles["company"]}
            >
              <span
                className={styles["crest"]}
                data-faction={item.pigment}
                aria-hidden="true"
              >
                {item.mark}
              </span>
              <span className={styles["companyName"]}>
                <small>{item.faction}</small>
                <strong>{item.name}</strong>
                <span>
                  {item.troops} troops{" "}
                  {item.losses > 0 && (
                    <span className={styles["losses"]}>
                      {" "}
                      · {item.losses} casualties
                    </span>
                  )}
                </span>
              </span>
              <span className={styles["state"]} data-state={item.state}>
                {item.state === "Ordered"
                  ? "◇ "
                  : item.state === "Spent"
                    ? "✓ "
                    : ""}
                {item.state}
              </span>
            </button>
          ))}
        </section>
        <section
          className={styles["detail"]}
          aria-live="polite"
          aria-label="Selected company details"
        >
          <p className={styles["eyebrow"]}>{company.faction} · Company</p>
          <h2>{company.name}</h2>
          <div className={styles["artPlaceholder"]}>
            <span
              className={styles["crest"]}
              data-faction={company.pigment}
              aria-hidden="true"
            >
              {company.mark}
            </span>
            <span>Company art placeholder</span>
          </div>
          <dl>
            <div>
              <dt>Troops</dt>
              <dd>{company.troops}</dd>
            </div>
            <div>
              <dt>Activation</dt>
              <dd>{company.state}</dd>
            </div>
          </dl>
          <p>{company.equipment}</p>
          <p>{company.note}</p>
          <p className={styles["detailNote"]}>
            Inspection preview. Customization and combat are not active.
          </p>
        </section>
      </div>
    </>
  );
}

function Placeholder({ kind }: { kind: "army" | "collection" }) {
  const army = kind === "army";
  return (
    <section className={styles["empty"]}>
      <span className={styles["emptyMark"]} aria-hidden="true">
        {army ? "I" : "II"}
      </span>
      <p className={styles["eyebrow"]}>
        {army ? "THE COMPANY" : "THE ARSENAL"}
      </p>
      <h2>
        {army ? "Your ranks are yet to be filled." : "Every card has a place."}
      </h2>
      <p>
        {army
          ? "Your commander, companies, and their upgrades will live here. Army construction arrives with the playable game."
          : "Browse and inspect the companies, equipment, training, and orders you discover. The collection will grow with the game."}
      </p>
      <div className={styles["emptyTags"]}>
        {(army
          ? ["Commander", "Companies", "Upgrades"]
          : ["Companies", "Equipment", "Training", "Orders"]
        ).map((name) => (
          <span key={name}>{name}</span>
        ))}
      </div>
      <a href="#/campaign" className={styles["returnLink"]}>
        Return to Campaign
      </a>
    </section>
  );
}

function Settings({
  appearance,
  onChange,
}: {
  appearance: Appearance;
  onChange: (value: Appearance) => void;
}) {
  return (
    <section className={styles["panel"]}>
      <p className={styles["eyebrow"]}>MAKE IT YOURS</p>
      <h2>Appearance</h2>
      <p>
        Choose the display that feels most comfortable. Your preference is
        remembered on this device when storage is available.
      </p>
      <fieldset className={styles["choices"]}>
        <legend>Color theme</legend>
        {(
          [
            {
              value: "night",
              name: "Blue-black ink",
              description: "Blue-black panels and warm ivory text.",
            },
            {
              value: "contrast",
              name: "High contrast",
              description: "Darker surfaces and brighter text and borders.",
            },
          ] as const
        ).map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              name="appearance"
              value={option.value}
              checked={appearance === option.value}
              onChange={() => onChange(option.value)}
            />
            <span>
              <strong>{option.name}</strong>
              <small>{option.description}</small>
            </span>
          </label>
        ))}
      </fieldset>
      <div className={styles["notice"]}>
        <p>
          Reduced motion follows your device preference. Text respects your
          browser font size.
        </p>
      </div>
    </section>
  );
}

class AppBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override render() {
    if (this.state.failed) {
      return (
        <main className={styles["fallback"]}>
          <h1>Something interrupted the journey.</h1>
          <p>Reload to try again.</p>
          <Button onClick={() => globalThis.location.reload()}>
            Reload Wyrdhost
          </Button>
        </main>
      );
    }
    return this.props.children;
  }
}

export { App, AppShell };
