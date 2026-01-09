import React, { useMemo } from 'react';

import './withSearchFilter.css';
function withSearchFilter(WrappedComponent, title) {
  return function WithSearchFilter({items}) {
    const [search, setSearch] = React.useState('');
 const safeItems = Array.isArray(items) ? items : items?.data ?? [];
 console.log(safeItems);
    const filteredItems = useMemo(() => {
      const q=search.toLowerCase();
       if (!q) return safeItems;
      return safeItems.filter((i) =>
        String(i?.name ?? "").toLowerCase().includes(q)
      );
    }, [safeItems, search]);
    return (
      <WrappedComponent
        title={title}
        items={filteredItems}
        search={search}
        setSearch={setSearch}
      />
    );

  }



}



export default withSearchFilter;
