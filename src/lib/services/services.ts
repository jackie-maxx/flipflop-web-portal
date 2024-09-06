import { ApplicationMode, AppMode } from "@/utils/applicationMode";

export class Service {
  static applicationMode: AppMode = new AppMode(
    process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
      ? ApplicationMode.RELEASE
      : ApplicationMode.DEBUG
  );
}
