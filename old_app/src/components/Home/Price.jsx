function Price({ currency, price }) {
  return (
    <div className="flex items-baseline gap-0.5 mt-2">
      <span className="text-sm font-semibold text-violet-500">{currency}</span>
      <span className="text-2xl font-extrabold text-slate-800 tracking-tight">{price.toFixed(2)}</span>
    </div>
  );
}

export default Price;
