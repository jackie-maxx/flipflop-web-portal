import { StatusMsg } from "@/utils/returnMsg";

export const AppLog = ({
  message = "Information",
  status = StatusMsg.info,
}: {
  message: string;
  status?: StatusMsg;
}) => {
  console.log(`status : ${message} , message : ${message}`);
};
