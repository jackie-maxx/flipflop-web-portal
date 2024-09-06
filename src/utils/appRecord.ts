// type AppRecordParams = Partial<AppRecord>;

export enum AppRecordStatus {
  loading,
  loadingMore,
  noLoadMore,
  loaded,
}

export interface AppRecord {
  loadingStatus: AppRecordStatus;
  currentPage: number;
  currentIndex: number;
  nextPageUrl: string;
  totalRecord: number;
}

// export class AppRecord {
//   loadingStatus: AppRecordStatus;
//   currentPage: number;
//   currentIndex: number;
//   nextPageUrl: string;
//   totalRecord: number;

//   constructor({
//     currentPage = 1,
//     currentIndex = 0,
//     nextPageUrl = "",
//     totalRecord = 0,
//     loadingStatus: status = AppRecordStatus.loading,
//   }: AppRecordParams = {}) {
//     this.loadingStatus = status;
//     this.currentPage = currentPage;
//     this.currentIndex = currentIndex;
//     this.nextPageUrl = nextPageUrl;
//     this.totalRecord = totalRecord;
//   }
// }
