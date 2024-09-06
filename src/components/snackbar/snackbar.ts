import { StatusMsg } from "@/utils/returnMsg";
import { toast } from "react-toastify";

export const Snackbar = ({
  message = "Information",
  status = StatusMsg.info,
}: {
  message: string;
  status?: StatusMsg;
}) => {
  if (status === StatusMsg.info) {
    toast.info(message);
    console.log(`\x1b[34m status : ${message} , message : ${message} \x1b[0m`);
  } else if (status === StatusMsg.success) {
    toast.success(message, { className: "success" });
    console.log(`\x1b[32m status : ${message} , message : ${message} \x1b[0m`);
  } else if (status === StatusMsg.warning) {
    toast.warn(message, { className: "warning" });
    console.log(`\x1b[33m status : ${message} , message : ${message} \x1b[0m`);
  } else if (status === StatusMsg.error) {
    toast.error(message, { className: "danger" });
    console.log(`\x1b[31m status : ${message} , message : ${message} \x1b[0m`);
  } else if (status === StatusMsg.failed) {
    toast.error(message, { className: "danger" });
    console.log(`\x1b[31m status : ${message} , message : ${message} \x1b[0m`);
  } else {
    toast(message);
  }
};
