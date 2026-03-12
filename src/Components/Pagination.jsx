const Pagination = ({ totalProducts, productsPerPage, setCurrentPage }) => {

  const pages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="pagination">

      {[...Array(pages)].map((_, i) => (
        <button key={i} onClick={() => setCurrentPage(i + 1)}>
          {i + 1}
        </button>
      ))}

    </div>
  );
};

export default Pagination;