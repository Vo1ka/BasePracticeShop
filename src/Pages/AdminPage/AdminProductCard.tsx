import { Product } from '../../types/type';
import './adminproduct.css';

interface Props {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

export const AdminProductCard = ({ product, onEdit, onDelete }: Props) => {
  console.log('Rendering product:', product.id, product)
  return (
    <div className={`admin-product-card ${product.isLocal ? 'local' : ''} ${product.isModified ? 'modified' : ''}`}>
      <div className="product-image">
        <img 
          src={product.thumbnail || '/placeholder-product.jpg'} 
          alt={product.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
          }}
        />
      </div>
      
      <div className="product-info">
        <h3>{product.title}</h3>
        <div className="price-stock">
          <span className="price">{product.price} ₽</span>
        </div>
        <div className="badges">
          {product.isModified && !product.isLocal && (
            <span className="modified-badge">Изменён</span>
          )}
          {product.isLocal && (
            <span className="local-badge">Новый</span>
          )}
        </div>
      </div>

      <div className="product-actions">
        <button onClick={onEdit} className="edit-button" aria-label="Редактировать">
          <i className="icon-edit"></i> Редактировать
        </button>
        <button onClick={onDelete} className="delete-button" aria-label="Удалить">
          <i className="icon-delete"></i> Удалить
        </button>
      </div>
    </div>
  );
};