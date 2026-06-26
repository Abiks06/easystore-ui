import PageTitle from "./PageTitle";

function PageHeading({ title, children }) {
  return (
    <section className="anim-fade-up relative bg-gradient-to-b from-violet-50/60 to-white overflow-hidden">
      {/* Decorative animated blob */}
      <div className="anim-blob absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-6 text-center group">
        <PageTitle title={title} />
        {children && (
          <p className="anim-fade-up [animation-delay:200ms] text-slate-500 text-base leading-relaxed max-w-2xl mx-auto -mt-4 pb-10">
            {children}
          </p>
        )}
      </div>
    </section>
  );
}

export default PageHeading;
