import { useSuspenseQueries } from "@tanstack/react-query";
import { UserOrdersCard } from "../components/profile/UserOrdersCard";
import { UserProfileCard } from "../components/profile/UserProfileCard";
import { getUserProfile } from "../service/auth.service";
import { getUserOrders } from "../service/order.service";

export default function ProfilePage() {
  const [{ data: user }, { data: orderData }] = useSuspenseQueries({
    queries: [
      { queryKey: ["userProfile"], queryFn: getUserProfile },
      { queryKey: ["userOrders"], queryFn: getUserOrders },
    ],
  });

  const orders = orderData?.orders || [];

  return (
    <div className="container my-5 space-y-5">
      <UserProfileCard user={user} />
      <UserOrdersCard orders={orders} />
    </div>
  );
}
