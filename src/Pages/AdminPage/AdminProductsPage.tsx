import { useState, useMemo } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { Modal } from "../../components/Modal/Modal";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedRedux";
import { useGetProductsQuery } from "../../store/slices/apiSlice";
import { AdminProduct, Product } from "../../types/type";
import { ProductForm } from "./AdminComponents/ProductForm";
import { AdminProductCard } from "./AdminProductCard";
import { markAsDeleted, updateProduct } from "../../store/slices/adminSlice";

const AdminProductsPage = () => {
  const dispatch = useAppDispatch();
  
   // Состояния для модальных окон
   const [editingProduct, setEditingProduct] = useState<Product | null>(null);
   const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
 
   const { 
    data: apiResponse, 
    isLoading: isApiLoading,
  } = useGetProductsQuery({ limit: 180, skip: 0 });
  
  // Получаем локальные изменения
  const { modifiedProducts, newProducts, status } = useAppSelector(state => state.admin);
  
  // Формируем полные продукты
  const displayProducts = useMemo(() => {
    const apiProducts = apiResponse?.products || [];
    
    return [
      ...newProducts,
      ...apiProducts.map(apiProduct => {
        const modified = modifiedProducts[apiProduct.id];
        return modified ? { ...apiProduct, ...modified } : apiProduct;
      })
    ] as AdminProduct[]; // Явное приведение типа
  }, [apiResponse, modifiedProducts, newProducts]);
  
  if (isApiLoading || status === 'loading') {
    return <LoadingSpinner />;
  }
   const handleUpdate = (formData: Partial<Product>) => {
     if (!editingProduct) return;
     
     const updatedProduct: Product = {
       ...editingProduct,
       ...formData,
       isModified: true,
       thumbnail: formData.thumbnail || editingProduct.thumbnail,
       images: formData.images || editingProduct.images || []
     };
     
     dispatch(updateProduct(updatedProduct));
     setEditingProduct(null);
   };
 
   const handleDelete = (id: number) => {
     dispatch(markAsDeleted(id));
     setDeletingProduct(null);
   };
 
   return (
     <div className="admin-products-container">
       <h1>Управление товарами</h1>
       
       <div className="products-grid">
         { displayProducts.map((product) => (
           <AdminProductCard
             key={product.id}
             product={product}
             onEdit={() => setEditingProduct(product)}
             onDelete={() => setDeletingProduct(product)}
           />
         ))}
       </div>
 
       {/* Модалка редактирования */}
       <Modal
         isOpen={!!editingProduct}
         onClose={() => setEditingProduct(null)}
         title={editingProduct ? `Редактирование: ${editingProduct.title}` : ''}
       >
         {editingProduct && (
           <ProductForm
             initialValues={editingProduct}
             onSubmit={handleUpdate}
             onCancel={() => setEditingProduct(null)}
           />
         )}
       </Modal>
 
       {/* Модалка удаления */}
       <Modal
         isOpen={!!deletingProduct}
         onClose={() => setDeletingProduct(null)}
         title="Подтверждение удаления"
       >
         {deletingProduct && (
           <div className="delete-confirmation">
             <p>Вы уверены, что хотите удалить товар <strong>{deletingProduct.title}</strong>?</p>
             <div className="confirmation-actions">
               <button 
                 onClick={() => handleDelete(deletingProduct.id)}
                 className="confirm-delete-button"
               >
                 Удалить
               </button>
               <button
                 onClick={() => setDeletingProduct(null)}
                 className="cancel-button"
               >
                 Отмена
               </button>
             </div>
           </div>
         )}
       </Modal>
     </div>
   );
 };

 export default AdminProductsPage;