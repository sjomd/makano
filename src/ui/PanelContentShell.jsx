export default function PanelContentShell({ children }) {
  return (
    <main className="lg:col-span-9 w-full min-w-0">
      <div className="bg-card border border-border rounded-[28px] p-4 sm:p-6 lg:p-7 shadow-2xl min-h-[calc(100vh-3rem)] relative overflow-hidden">
        {/* درخشش نوری بسیار ملایم در پس‌زمینه کانتینر */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">{children}</div>
      </div>
    </main>
  );
}
