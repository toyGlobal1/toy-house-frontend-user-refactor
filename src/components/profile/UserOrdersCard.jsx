import { Card, CardBody, CardHeader } from "@heroui/react";

export function UserOrdersCard({ orders }) {
  return (
    <Card>
      <CardHeader className="justify-center">
        <h1 className="text-lg font-medium sm:text-2xl">My Orders</h1>
      </CardHeader>
      <CardBody>
        {orders.length ? (
          orders.map((order) => (
            <div key={order.order_id} className="rounded-lg p-1 shadow-small">
              <div className="flex items-center justify-between px-2">
                <p className="font-semibold">Order Items:</p>
                <p className="font-medium">Status: {order.order_status}</p>
              </div>
              <div className="flex flex-col divide-y-1">
                {order.order_items.map((item) => (
                  <div key={item.order_item_id} className="flex gap-2 py-2">
                    <img
                      src={item.image_url}
                      alt={item.product_name}
                      className="size-20 rounded-md border"
                    />
                    <div className="flex-1">
                      <p className="line-clamp-2 font-medium">{item.product_name}</p>
                      <p className="text-xs font-medium">{item.sku}</p>
                      <p className="text-sm">Color: {item.color_name}</p>
                      <div className="flex items-center justify-between">
                        <p>Quantity: {item.quantity}</p>
                        <p className="font-semibold">Price: BDT {item.selling_price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </CardBody>
    </Card>
  );
}
