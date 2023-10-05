import React from 'react';

const CatComponents = ({ result, currentPage, renderPaginationLinks }) => {
  return (
    <div className="container max-w-6xl mx-auto px-2 pb-36 relative z-10 pt-4">
      <div className="row">
        <div className="col-12 p-2 text-justify">
          <p className="text-2xl text-black pb-4">Cat Facts</p>
          <p>Collections of some of the cat facts</p>
          {result.map(function (facts) {
            return (
              <div key={facts.id}>
                <div className="hs-accordion-group py-2">
                  <div
                    className="shadow-md hs-accordion hs-accordion-active:bg-gray-100 rounded-xl p-6  active"
                    id={`hs-basic-with-title-and-arrow-stretched-heading-${facts.id}`}
                  >
                    <div
                      id={`hs-basic-with-title-and-arrow-stretched-collapse-${facts.id}`}
                      className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                      aria-labelledby={`hs-basic-with-title-and-arrow-stretched-heading-${facts.id}`}
                    >
                      <p className="text-gray-500">{facts.fact}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <nav aria-label="Pagination" className="flex justify-center items-center text-gray-600 mt-8 lg:mt-0 font-poppins">
        {renderPaginationLinks()}
      </nav>
      </div>
    </div>
  );
};

export default CatComponents;
