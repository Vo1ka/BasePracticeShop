import { useAppSelector } from '../../hooks/useTypedRedux';

const OrderHistory = () => {
  const { orders } = useAppSelector((state) => state.profile);

  if (!orders || orders.length === 0) {
    return <div className="no-orders">У вас пока нет заказов</div>;
  }

  return (
    <div className="orders-list">
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <h3>Заказ #{order.id}</h3>
          <p><strong>Дата:</strong> {new Date(order.date).toLocaleDateString()}</p>
          <p><strong>Сумма:</strong> {order.total} ₽</p>
          <p><strong>Статус:</strong> {order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;