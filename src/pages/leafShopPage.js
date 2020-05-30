import React from 'react';

import LeafShopTable from '../components/leafShopTable';

export default function LeafShopPage({ searchText }) {

  return (
    <LeafShopTable
      searchText={searchText}
   />
  );

}