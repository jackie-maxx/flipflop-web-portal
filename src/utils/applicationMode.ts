export enum ApplicationMode {
  RELEASE = "release",
  DEBUG = "debug",
}

// AppMode Class
export class AppMode {
  private appModeStatus: ApplicationMode;

  constructor(appModeStatus: ApplicationMode) {
    this.appModeStatus = appModeStatus;
  }

  isRelease(): boolean {
    return this.appModeStatus === ApplicationMode.RELEASE;
  }

  isDebug(): boolean {
    return this.appModeStatus === ApplicationMode.DEBUG;
  }
}
