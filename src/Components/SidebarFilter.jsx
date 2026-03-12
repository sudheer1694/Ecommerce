const priceRanges = [
  [1,100],
  [100,200],
  [200,300],
  [300,500],
  [500,1000],
  [1000,2000],
  [2000,3000],
  [3000,10000]
];

const SidebarFilter = ({ priceRange, setPriceRange }) => {

  return (
    <div className="price-filter">

      <h3>Price Filter</h3>

      {priceRanges.map((range,index)=>(
        <label key={index} className="price-option">

          <input
            type="radio"
            name="priceRange"
            checked={priceRange?.[0] === range[0] && priceRange?.[1] === range[1]}
            onChange={()=>setPriceRange(range)}
          />

          {range[0]} - {range[1]}

        </label>
      ))}

      <button
        type="button"
        className="clear-filter-btn"
        onClick={() => setPriceRange(null)}
      >
        Clear Filters
      </button>

    </div>
  );
};

export default SidebarFilter;
