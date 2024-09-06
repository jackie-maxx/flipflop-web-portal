import { ApplicationMode } from "@/utils/applicationMode";
import { Service } from "./services";

export class Routes {
  // private static mainUrl: string = Service.applicationMode.isRelease()
  //   ? process.env.NEXT_PUBLIC_MAIN_URL || ""
  //   : "http://192.168.100.105";

  private static mainUrl: string = process.env.NEXT_PUBLIC_MAIN_URL || "";

  static url: string = "/api-mobile-flipflop/v1";

  // Store
  static getHomeMarketplaceQrMenu = `${Routes.mainUrl}${Routes.url}/get-home-marketplace-qr-menu?`;
  static getHomeMarketPlaceQrMenuMore = `${Routes.mainUrl}${Routes.url}/get-home-marketplace-qr-menu-more?`;
}
