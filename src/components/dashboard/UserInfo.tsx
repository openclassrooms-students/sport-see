import { FC } from "react";
import Header from "../layout/Header";

type UserInfo = {
  userInfos: {
    firstName: string;
    lastName: string;
    age: number;
  } | null;
};

export const UserInfo: FC<UserInfo> = ({ userInfos }) => {
  if (!userInfos) {
    return null;
  }

  return (
    <div>
      <Header firstName={userInfos.firstName} />
    </div>
  );
};
