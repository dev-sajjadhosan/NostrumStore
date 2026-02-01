import { userService } from "@/services/user.service";
import ProfileCom from "@/components/modules/profile/profile-com";

export default async function ProfilePage() {
  const { data } = await userService.getSession();
  return (
    <div className="w-full mx-auto overflow-hidden p-2">
      <ProfileCom data={data} />
    </div>
  );
}
