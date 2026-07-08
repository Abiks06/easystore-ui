function PageTitle({ title }) {
  return (
    <div className="anim-fade-up flex flex-col items-center py-10">
      <h1 className="group relative text-5xl font-extrabold tracking-tight text-center bg-linear-to-r from-violet-700 via-indigo-600 to-violet-500 bg-clip-text text-transparent pb-3 transition-all duration-500 ease-out hover:scale-110 hover:-translate-y-1 cursor-default">
        {title}
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-16 rounded-full bg-linear-to-r from-violet-500 to-indigo-400 animate-[slide-up_0.8s_0.3s_both] transition-all duration-500 ease-out group-hover:w-4/5 group-hover:h-1.5 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.6)]"></span>
      </h1>
    </div>
  );
}

export default PageTitle;

