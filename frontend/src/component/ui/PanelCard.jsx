export default function PanelCard({ children, className = "", as: Component = "section" }) {
  return (
    <Component
      className={[
        "rounded-3xl border border-white/10 bg-white/8 shadow-2xl shadow-black/20 backdrop-blur-xl",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Component>
  );
}
