import { Button, Card, CardBody, CardHeader, Input, Textarea } from "@heroui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { removeAuthToken } from "../../lib/auth-token.util";
import { getUserProfile } from "../../service/auth.service";

export function UserProfileCard() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const { data: user } = useSuspenseQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });

  const handleLogout = () => {
    removeAuthToken();
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <Card>
      <CardHeader className="justify-center">
        <h1 className="text-lg font-medium sm:text-2xl">Profile Information</h1>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-4">
            <Input label="Name" value={user?.name} readOnly />
            <Input label="Email" value={user?.email} readOnly />
            <Input label="Phone" value={user?.phone_number} readOnly />
          </div>
          {user.addresses.length ? (
            user.addresses.map((address, index) => (
              <Textarea key={index} label={`Address ${index + 1}`} value={address} readOnly />
            ))
          ) : (
            <Textarea label="Address" value="No addresses available" readOnly />
          )}
        </div>
        <div>
          <Button color="danger" radius="sm" onPress={handleLogout} className="mt-5">
            <LuLogOut className="size-4" />
            Logout
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
