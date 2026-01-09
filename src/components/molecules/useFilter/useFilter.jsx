import React, { use } from 'react';
import { useState,useMemo } from 'react';
import './useFilter.css';

function useFilter(title,itemsData) {
  const[search,setSearch]=useState('');
  const fileteredItems=useMemo(() => {
   const q=search.trim().toLowerCase();
    if(!q) return itemsData;

    return itemsData.filter((item) => {
      const name = (item?.name ?? '').toString().toLowerCase();
      const category = (item?.category ?? '').toString().toLowerCase();
      return name.includes(q) || category.includes(q);
    });
   
  }, [itemsData, search]);
  return{
    title,
    search,
    setSearch,
    items:fileteredItems
   }

}



export default useFilter;
