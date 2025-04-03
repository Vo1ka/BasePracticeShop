import { useForm } from 'react-hook-form';
import './productform.css';
import { Product } from '../../../types/type';

interface ProductFormValues extends Partial<Product> {
    id?: number; // Сделаем необязательным для новых товаров
    title: string; // Обязательное поле
    price: number; // Обязательное поле
  }
  
  interface Props {
    initialValues: Partial<Product>;
    onSubmit: (data: ProductFormValues) => void;
    onCancel: () => void;
  }

export const ProductForm = ({ initialValues, onSubmit, onCancel }: Props) => {
  const { register, handleSubmit, formState: {errors} } = useForm<ProductFormValues>({
    defaultValues: initialValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="product-form">
      <div className="form-group">
        <label>Название</label>
        <input {...register('title', { required: 'Обязательное поле' })} 
        className={errors.title ? 'error' : ''} />
      </div>
      
      <div className="form-group">
        <label>Цена</label>
        <input 
        type="number" 
        {...register('price', { 
            required: 'Обязательное поле',
            min: { value: 1, message: 'Минимум 1' }
          })} 
          className={errors.price ? 'error' : ''}
        />
        {errors.price && <span className="error-message">{errors.price.message}</span>}
      </div>
      
      <div className="form-actions">
        <button type="submit" className="save-btn">Сохранить</button>
        <button type="button" onClick={onCancel} className="cancel-btn">Отмена</button>
      </div>
    </form>
  );
};