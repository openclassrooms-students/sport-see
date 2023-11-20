import { FC, useEffect, useState } from "react";
import { User as UserType } from "../../schema/User";
import { Resource } from "../../hooks/useResource";
import Header from "../layout/Header";

type UserInfo = {
  userResource: Resource<UserType>;
};

export const UserInfo: FC<UserInfo> = ({ userResource }) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    userResource.read().then(setUser);
  }, [userResource]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <Header firstName={user.userInfos.firstName} />
    </div>
  );
};
