export default function Footer() {
  return (
    <footer className="w-full bg-brand-void py-8 border-t border-brand-slate/10 flex flex-col items-center justify-center relative z-20">
      <div className="text-[10px] text-brand-slate/40 font-heading font-black tracking-[0.3em] uppercase select-none">
        © {new Date().getFullYear()} YEEZUS. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
