function Price({ currency, price }) {
  return (
    <div className="price">
      <span>{currency}</span>
      <span>{price.toFixed(2)}</span>
    </div>
  );
}

export default Price;
