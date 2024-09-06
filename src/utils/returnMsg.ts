export class StatusMsg {
  private constructor(public readonly value: string) {}

  static readonly success = new StatusMsg("success");
  static readonly warning = new StatusMsg("warning");
  static readonly failed = new StatusMsg("failed");
  static readonly info = new StatusMsg("info");
  static readonly error = new StatusMsg("error");

  static getType(value: string): StatusMsg {
    switch (value) {
      case "success":
        return StatusMsg.success;
      case "warning":
        return StatusMsg.warning;
      case "failed":
        return StatusMsg.failed;
      case "info":
        return StatusMsg.info;
      case "error":
        return StatusMsg.error;
      default:
        return StatusMsg.info;
    }
  }
}

export class ReturnMsg {
  status: StatusMsg;
  message: string;
  object?: any;

  constructor({
    status,
    message,
    object,
  }: {
    status: StatusMsg;
    message: string;
    object?: any;
  }) {
    this.status = status;
    this.message = message;
    this.object = object;
  }

  static responses(resp: any): ReturnMsg {
    return new ReturnMsg({
      status: StatusMsg.getType(resp["status"]),
      message: resp["msg"].toString(),
      object: resp["object"], // Include this if you want to handle the `object` field
    });
  }
}
