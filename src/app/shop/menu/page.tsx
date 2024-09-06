"use client";

import { AppLog } from "@/components/app-log/appLog";
import { Snackbar } from "@/components/snackbar/snackbar";
import { useAppSelector } from "@/lib/features/store/store";
import { RequestApi } from "@/lib/requestApi";
import { Routes } from "@/lib/services/routes";
import { StatusMsg } from "@/utils/returnMsg";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  setLoading,
  setShopMenu,
  setSelectedProductGroupCode,
  setShopMenu2,
  setUserShop,
} from "@/lib/features/menu/menuSlice";
import { useDispatch } from "react-redux";
import { AppRecord, AppRecordStatus } from "@/utils/appRecord";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { LoaderCircle, X } from "lucide-react";

import ImageUrl from "@/components/image-url/ImageUrl";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { detectOS } from "@/utils/detectOS";
import { getQueryParam } from "@/utils/getQueryParam";
// import { useSearchParams } from "next/navigation";

export default function MenuPage() {
  const dispatch = useDispatch();
  const [displayGrid, setDisplayGrid] = useState<string>("grid-cols-2");
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState(true);
  const [time, setTime] = useState(10);
  const [os, setOs] = useState<string>("Unknown");
  // const searchParams = useSearchParams();
  // const shopID = searchParams.get("shop_id") || "";

  // Access query parameters

  const {
    menuState,
    userShop,
    userShopProductGroups,
    selectedProductGroupCode,
  } = useAppSelector((state) => state.menu);

  const fetchShopMenu = async ({
    isRefresh = false,
    shopId = "",
  }: { isRefresh?: boolean; shopId?: string } = {}) => {
    try {
      let url: string = "";

      if (isRefresh) {
        url = Routes.getHomeMarketplaceQrMenu;
        url += `shop_id=${shopId}`;
        // url += `shop_id=705837610283360`;
      }

      await RequestApi(url)
        .then((responses) => {
          if (responses.status === "success") {
            dispatch(setUserShop(responses["user_shop"]));
            const groups = [...responses["user_shop_product_groups"]];

            const updatedGroups = groups.map((group) => {
              const stateProductOfGroup: AppRecord = {
                currentPage: 1,
                currentIndex: 0,
                nextPageUrl: group["user_shop_products"]["next_page_url"] ?? "",
                totalRecord: 0,
                loadingStatus:
                  group["user_shop_products"]["next_page_url"] != null
                    ? AppRecordStatus.loaded
                    : AppRecordStatus.noLoadMore,
              };

              return { ...group, product_state: stateProductOfGroup };
            });
            dispatch(setShopMenu(updatedGroups));
          } else {
            Snackbar({
              message: responses["msg"],
              status: StatusMsg.getType(responses["status"]),
            });
          }
        })
        .catch((err) => {
          Snackbar({
            message: err.toString(),
            status: StatusMsg.failed,
          });
        });
      dispatch(
        setLoading({ ...menuState, loadingStatus: AppRecordStatus.loaded })
      );
    } catch (ex: any) {
      dispatch(
        setLoading({ ...menuState, loadingStatus: AppRecordStatus.loaded })
      );
      AppLog({ message: ex.toString(), status: StatusMsg.error });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  const fetchMoreProduct = async (group: any) => {
    try {
      let url: string = (group["product_state"] as AppRecord).nextPageUrl;
      if (url !== "") {
        await RequestApi(url)
          .then((responses) => {
            if (responses.status === "success") {
              const stateProductOfGroup: AppRecord = {
                currentPage: 1,
                currentIndex: 0,
                nextPageUrl:
                  responses["user_shop_product_groups"][0][
                    "user_shop_products"
                  ]["next_page_url"] ?? "",
                totalRecord: 0,
                loadingStatus:
                  responses["user_shop_product_groups"][0][
                    "user_shop_products"
                  ]["next_page_url"] != null
                    ? AppRecordStatus.loaded
                    : AppRecordStatus.noLoadMore,
              };

              // console.log("stateProductOfGroup : ", stateProductOfGroup);

              const tmpProductGroups = userShopProductGroups.map((group) =>
                group.id === group["id"]
                  ? {
                      ...group,
                      user_shop_products: {
                        ...group.user_shop_products,
                        data: [
                          ...group.user_shop_products.data,
                          ...responses["user_shop_product_groups"][0][
                            "user_shop_products"
                          ]["data"],
                        ],
                      },
                      product_state: stateProductOfGroup,
                    }
                  : group
              );

              dispatch(setShopMenu2(tmpProductGroups));
            } else {
              Snackbar({
                message: responses["msg"],
                status: StatusMsg.getType(responses["status"]),
              });
            }
          })
          .catch((err) => {
            Snackbar({
              message: err.toString(),
              status: StatusMsg.failed,
            });
          });
      }
    } catch (ex: any) {
      dispatch(
        setLoading({ ...menuState, loadingStatus: AppRecordStatus.loaded })
      );
      AppLog({ message: ex.toString(), status: StatusMsg.error });
    }

    setTimeout(() => {
      setLoadMore(false);
    }, 3000);
  };

  const productsContain = () => {
    const group = userShopProductGroups.find(
      (group) =>
        group["product_group_id"].toString() === selectedProductGroupCode
    );

    if (group != null) {
      return (
        <>
          <div>
            <InfiniteScroll
              className={`relative grid pb-11 ${displayGrid} gap-2`}
              dataLength={group["user_shop_products"]["data"].length}
              next={() => fetchMoreProduct(group)}
              hasMore={
                (group["product_state"] as AppRecord).nextPageUrl === ""
                  ? false
                  : true
              }
              loader={
                <div className="absolute bottom-2 left-0 w-full flex justify-center">
                  <LoaderCircle className="animate-spin" />
                </div>
              }
              endMessage={
                <p className="absolute bottom-0 left-0 w-full text-center">
                  <b>Yay! you have seen all items.</b>
                </p>
              }
            >
              {group["user_shop_products"]["data"].map((product: any) => (
                <Card key={product["id"]}>
                  <div className="relative">
                    <ImageUrl
                      src={product["thumbnail"]}
                      className="bg-slate-400 w-full object-cover rounded-lg"
                    />
                    {/* <div className="absolute bottom-3 bg-yellow-400 p-1 right-3 rounded-full cursor-pointer">
                      <Plus className="text-white" />
                    </div> */}
                  </div>
                  <div className="p-2 h-[80px] flex flex-col justify-between">
                    <p className="font-semibold leading-4 line-clamp-2 text-sm">
                      {product["local_description"]}
                    </p>
                    <p className="font-bold text-red-600">
                      USD {product["unit_price"]}
                    </p>
                  </div>
                </Card>
              ))}
            </InfiniteScroll>
          </div>
        </>
      );
    } else return <></>;
  };

  useEffect(() => {
    const shopId = getQueryParam("shop_id");
    console.log("shopId : ", shopId);
    if (shopId) {
      fetchShopMenu({ isRefresh: true, shopId });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Set a timer to hide the alert after 10 seconds
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 10000); // 10000ms = 10s

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setOs(detectOS());
  }, []);

  const qrDetecting = () => {
    // IOS
    if (os === "iOS") {
      return (
        <div className="mt-2">
          <div className="flex justify-center mb-2">
            <ImageUrl
              width={100}
              height={100}
              src="/assets/qr-code/qr-code-flipflop-apple-store.png"
            />
          </div>
          <Button className="font-semibold text-sm">
            <a href="https://apps.apple.com/us/app/flipflop-social-network/id6465576581">
              Yes, I want to download!
            </a>
          </Button>
        </div>
      );
    }
    // ANDROID
    else if (os === "Android") {
      return (
        <div className="mt-2">
          <div className="flex justify-center mb-2">
            <ImageUrl
              width={100}
              height={100}
              src="/assets/qr-code/qr-code-flipflop-google-play.png"
            />
          </div>
          <Button className="font-semibold text-sm">
            <a href="https://play.google.com/store/apps/details?id=com.maxx4business.flip_flop&hl=en">
              Yes, I want to download!
            </a>
          </Button>
        </div>
      );
    }
    // Other Device
    else {
      return (
        <div className="mt-2 w-full">
          <div className="flex justify-evenly w-full mb-2">
            <div>
              <p className="font-semibold text-sm">App Store</p>
              <ImageUrl
                width={100}
                height={100}
                src="/assets/qr-code/qr-code-flipflop-apple-store.png"
              />
            </div>
            <div>
              <p className="font-semibold text-sm">Google Play</p>
              <ImageUrl
                width={100}
                height={100}
                src="/assets/qr-code/qr-code-flipflop-google-play.png"
              />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {/* <div>
        {menuState.loadingStatus == AppRecordStatus.loading
          ? "loading..."
          : "Loaded"}
      </div> */}

      <div className="relative p-4 flex flex-col justify-between min-h-screen ">
        <AlertDialog open={showAlert}>
          <AlertDialogContent>
            <AlertDialogHeader className="relative">
              <X
                onClick={() => setShowAlert(false)}
                className="absolute -top-2 -right-2"
              />
              <AlertDialogTitle className="text-center font-moullight">
                សូមស្វាគមន៍
              </AlertDialogTitle>
              <AlertDialogTitle className="text-center">
                Welcome
              </AlertDialogTitle>
              <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full flex justify-center">
                  <ImageUrl
                    width={80}
                    height={80}
                    src="/assets/logo/flipflop_logo.png"
                  />
                </div>
                <p className="font-semibold text-2xl">
                  {userShop["shop_name"]}
                </p>
                <AlertDialogDescription className="line-clamp-3">
                  {userShop["description"]}
                </AlertDialogDescription>

                <Separator className="my-1" />

                <div className="mt-2 text-center">
                  <p className="">សូមទាញយកកមម្មវិធីបណ្តាញសង្គម FlipFlop</p>
                  <p>ដើម្បីទទួលប្រូម៉ូសិនថ្មីពីហាងរបស់យើងខ្ញុំ!</p>
                  <p className="mt-1">
                    Download FlipFlop Social Media and follow us to receive new
                    promotions!
                  </p>

                  <AlertDialogDescription className="mt-1">
                    Scan QR code below to download
                  </AlertDialogDescription>

                  <div className="">{qrDetecting()}</div>
                </div>
              </div>
              <AlertDialogDescription>
                {showAlert && (
                  <div className="alert z-50 mt-6 text-center">
                    This screen will disappear in{" "}
                    {`${time % 60}`.padStart(2, "0")} seconds.
                  </div>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
        <div className="fixed top-0 left-0 bg-[url('/assets/backgrounds/bg_4.jpg')] bg-cover h-full w-full" />

        {/* Header */}
        <div className="h-[60px] w-full fixed top-0 left-0 z-10 px-4 overflow-hidden">
          <ScrollArea className="whitespace-nowrap rounded-md grid grid-cols-1 py-3">
            <div className="flex">
              {userShopProductGroups.length > 0 &&
                userShopProductGroups.map((group) => (
                  <div
                    onClick={() => {
                      dispatch(
                        setSelectedProductGroupCode(group["product_group_id"])
                      );
                      scrollToTop();
                    }}
                    key={group["id"]}
                    className={`me-2 py-1 px-2 rounded-lg cursor-pointer ${
                      group["product_group_id"].toString() ===
                      selectedProductGroupCode
                        ? "bg-yellow-400 text-white"
                        : "bg-white text-black"
                    }`}
                  >{`${group["local_description"]}`}</div>
                ))}
              <ScrollBar orientation="horizontal" />
            </div>
          </ScrollArea>
        </div>

        {/* Product Contain*/}
        <div className="h-full overflow-auto mt-12 mb-2">
          <div className="h-full">{productsContain()}</div>
        </div>

        {/* Footer */}
        <div className="h-[40px]">
          <div className="fixed bottom-0 left-0 z-10 flex justify-between items-center w-full pb-4 pt-2 bg-background px-4">
            <div className="flex">
              <div className="">
                <Button
                  onClick={() => setDisplayGrid("grid-cols-1")}
                  className={`rounded-r-none border-r-0 ${
                    displayGrid === "grid-cols-1" ? "bg-yellow-400" : ""
                  }`}
                  variant="outline"
                >
                  1
                </Button>
                <Button
                  onClick={() => setDisplayGrid("grid-cols-2")}
                  className={`rounded-none ${
                    displayGrid === "grid-cols-2" ? "bg-yellow-400" : ""
                  }`}
                  variant="outline"
                >
                  4
                </Button>
                <Button
                  onClick={() => setDisplayGrid("grid-cols-3")}
                  className={`rounded-l-none border-l-0 ${
                    displayGrid === "grid-cols-3" ? "bg-yellow-400" : ""
                  }`}
                  variant="outline"
                >
                  9
                </Button>
              </div>
              {/* <Button className="ms-2" variant="outline">
                1/3
              </Button> */}
            </div>
            {/* <Button className="">
              <ShoppingCart />
            </Button> */}
          </div>
        </div>
      </div>
    </>
  );
}
