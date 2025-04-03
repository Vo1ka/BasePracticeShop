import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// selectors.ts
const selectDisplayProducts = createSelector(
    (state: RootState) => state.products.items, // Основные товары
    (state: RootState) => state.admin.modifiedProducts, // Изменения
    (state: RootState) => state.admin.newProducts, // Новые товары
    (products, modified, newProducts) => {
      return [
        ...newProducts,
        ...products.map(p => ({
          ...p,
          ...modified[p.id],
          isDeleted: modified[p.id]?.isDeleted || false
        })).filter(p => !p.isDeleted)
      ];
    }
  );

  export default selectDisplayProducts;