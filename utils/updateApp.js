import env from "../config/env";

/**
 * 应用程序更新模块
 * 支持APP（Android/iOS）和微信小程序的更新
 *
 * @module updateApp
 */

/**
 * 检查并处理微信小程序更新
 */
function checkMiniProgramUpdate() {
  // #ifdef MP-WEIXIN
  if (uni.canIUse("getUpdateManager")) {
    const updateManager = uni.getUpdateManager();

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log("微信小程序是否有新版本：", res.hasUpdate);
    });

    updateManager.onUpdateReady(function () {
      uni.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        },
      });
    });

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
      uni.showModal({
        title: "更新提示",
        content: "新版本下载失败，请检查网络后重试",
        showCancel: false,
      });
    });
  } else {
    uni.showModal({
      title: "提示",
      content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
      showCancel: false,
    });
  }
  // #endif
}

/**
 * 下载并更新APP（适用于Android平台）
 * @param {string} appUrl - 新版本下载地址
 * @param {boolean} showDownloadHint - 是否显示下载提示
 * @param {boolean} forceUpdate - 是否强制更新
 * @param {string} serverVersion - 服务器版本号，用于保存到本地
 */
const downloadAndUpdateApp = (appUrl, showDownloadHint = false, forceUpdate = false, serverVersion = null) => {
  // #ifdef APP-PLUS
  if (showDownloadHint) {
    var waitingDialog = plus.nativeUI.showWaiting("正在下载…");
  }

  const updateProgress = (progress) => {
    if (showDownloadHint) {
      waitingDialog.setTitle(`正在下载 - ${progress}%`);
    }
  };

  const downloadTask = uni.downloadFile({
    url: appUrl,
    success: (fileResult) => {
      if (showDownloadHint) {
        waitingDialog.close();
      }
      uni.hideLoading();
      if (forceUpdate) {
        // 强制更新，直接安装并重启
        plus.runtime.install(
          fileResult.tempFilePath,
          {},
          () => {
            // 保存服务器版本号到本地存储
            if (serverVersion) {
              console.log("APK更新成功，保存新版本号：", serverVersion);
              uni.setStorageSync("currentAppVersion", serverVersion);
            }
            plus.runtime.restart();
          },
          (error) => {
            uni.showModal({
              content: `安装失败: ${error.message}`,
              showCancel: false,
            });
          }
        );
      } else {
        uni.showModal({
          content: "下载成功，是否现在重启 APP 并安装？",
          confirmText: "重启",
          success: (modalResult) => {
            if (modalResult.confirm) {
              plus.runtime.install(
                fileResult.tempFilePath,
                {},
                () => {
                  // 保存服务器版本号到本地存储
                  if (serverVersion) {
                    console.log("APK更新成功，保存新版本号：", serverVersion);
                    uni.setStorageSync("currentAppVersion", serverVersion);
                  }
                  plus.runtime.restart();
                },
                (error) => {
                  uni.showModal({
                    content: `安装失败: ${error.message}`,
                    showCancel: false,
                  });
                }
              );
            }
          },
        });
      }
    },
    fail: () => {
      if (showDownloadHint) {
        waitingDialog.close();
      }
      uni.showToast({
        title: "下载失败，请稍后重试",
        icon: "none",
      });
    },
  });

  downloadTask.onProgressUpdate((res) => {
    updateProgress(res.progress);
  });
  // #endif
};

/**
 * 下载并更新wgt热更新包
 * @param {string} wgtUrl - 热更新包下载地址
 * @param {boolean} showDownloadHint - 是否显示下载提示
 * @param {boolean} forceUpdate - 是否强制更新
 * @param {string} serverVersion - 服务器版本号，用于保存到本地
 */
const downloadAndUpdateWgt = (
  wgtUrl,
  showDownloadHint = false,
  forceUpdate = false,
  serverVersion = null
) => {
  // #ifdef APP-PLUS
  if (showDownloadHint) {
    var waitingDialog = plus.nativeUI.showWaiting("正在下载更新包…");
  }

  const updateProgress = (progress) => {
    if (showDownloadHint) {
      waitingDialog.setTitle(`正在下载更新包 - ${progress}%`);
    }
  };

  const downloadTask = uni.downloadFile({
    url: wgtUrl,
    success: (fileResult) => {
      if (showDownloadHint) {
        waitingDialog.close();
      }
      uni.hideLoading();
      plus.runtime.install(
        fileResult.tempFilePath,
        {},
        () => {
          // 保存新版本号到本地存储
          if (serverVersion) {
            console.log("热更新成功，保存新版本号：", serverVersion);
            uni.setStorageSync("currentAppVersion", serverVersion);
          }

          if (forceUpdate) {
            plus.runtime.restart();
          } else {
            uni.showModal({
              title: "提示",
              content: "应用资源更新完成！",
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  plus.runtime.restart();
                }
              },
            });
          }
        },
        (error) => {
          uni.showModal({
            content: `安装失败: ${error.message}`,
            showCancel: false,
          });
        }
      );
    },
    fail: () => {
      if (showDownloadHint) {
        waitingDialog.close();
      }
      uni.showToast({
        title: "下载失败，请稍后重试",
        icon: "none",
      });
    },
  });

  downloadTask.onProgressUpdate((res) => {
    updateProgress(res.progress);
  });
  // #endif
};

/**
 * 获取当前应用版本号
 * 优先使用本地存储的版本号（热更新后的版本），其次使用APK包版本号
 * @returns {string} 当前版本号
 */
function getCurrentAppVersion() {
  // #ifdef APP-PLUS
  // 先尝试从本地存储获取（可能是热更新后的版本号）
  let savedVersion = uni.getStorageSync("currentAppVersion");

  if (savedVersion) {
    console.log("使用本地保存的版本号:", savedVersion);
    return savedVersion;
  }

  // 如果本地没有保存，则使用APK包版本号（首次安装）
  const apkVersion = plus.runtime.version;
  console.log("首次获取APK版本号:", apkVersion);
  uni.setStorageSync("currentAppVersion", apkVersion);
  return apkVersion;
  // #endif

  return "";
}

/**
 * 检查应用更新
 * @param {string} [currentVersion] - 当前应用版本号（仅APP需要）
 */
const checkForUpdates = (currentVersion) => {
  // 微信小程序平台处理
  // #ifdef MP-WEIXIN
  checkMiniProgramUpdate();
  return;
  // #endif

  // APP平台处理
  // #ifdef APP-PLUS
  // 如果没有传入版本号，获取当前应用版本号
  if (!currentVersion) {
    currentVersion = getCurrentAppVersion();
  }

  fetchUpdateInfo()
    .then((res) => {
      console.log(res, "updateInfo");
      const serverVersion = res.version;
      const updateType = res.updatetype === 1 ? "APK" : "WGT"; // 1=APK, 2=WGT
      const appUrl = res.url;
      const forceUpdate = res.status === 1; // 0=非强制, 1=强制

      if (isNewerVersion(serverVersion, currentVersion)) {
        // 显示更新提示
        uni.showModal({
          title: "发现新版本",
          content: `当前版本: ${currentVersion}\n最新版本: ${serverVersion}\n是否立即更新？`,
          confirmText: "立即更新",
          cancelText: "稍后再说",
          success: (res) => {
            if (res.confirm || forceUpdate) {
              if (isAndroid()) {
                if (updateType === "APK") {
                  downloadAndUpdateApp(appUrl, true, forceUpdate, serverVersion);
                } else if (updateType === "WGT") {
                  // 传递serverVersion参数
                  downloadAndUpdateWgt(appUrl, true, forceUpdate, serverVersion);
                }
              } else if (isIOS()) {
                if (updateType === "APK") {
                  redirectToAppStore(appUrl);
                } else if (updateType === "WGT") {
                  // 传递serverVersion参数
                  downloadAndUpdateWgt(appUrl, true, forceUpdate, serverVersion);
                }
              }
            }
          },
          // 强制更新时不允许取消
          showCancel: !forceUpdate,
        });
      }
    })
    .catch((error) => {
      console.error("更新检查失败", error);
    });
  // #endif
}

/**
 * 比较版本号
 * @param {string} serverVersion - 服务器版本号
 * @param {string} currentVersion - 当前版本号
 * @returns {boolean} 如果服务器版本更新则返回true
 */
function isNewerVersion(serverVersion, currentVersion) {
  if (!serverVersion || !currentVersion) {
    return false;
  }

  const sv = serverVersion.split(".");
  const cv = currentVersion.split(".");
  const maxLength = Math.max(sv.length, cv.length);

  for (let i = 0; i < maxLength; i++) {
    const sNum = parseInt(sv[i] || "0", 10);
    const cNum = parseInt(cv[i] || "0", 10);
    if (sNum > cNum) {
      return true;
    } else if (sNum < cNum) {
      return false;
    }
  }
  return false;
}

/**
 * 判断是否为Android平台
 */
function isAndroid() {
  // #ifdef APP-PLUS
  const platform = uni.getSystemInfoSync().platform;
  return platform === "android";
  // #endif
  return false;
}

/**
 * 判断是否为iOS平台
 */
function isIOS() {
  // #ifdef APP-PLUS
  const platform = uni.getSystemInfoSync().platform;
  return platform === "ios";
  // #endif
  return false;
}

/**
 * 跳转到App Store
 */
function redirectToAppStore(appUrl) {
  // #ifdef APP-PLUS
  plus.runtime.openURL(appUrl, (error) => {
    uni.showModal({
      content: `无法打开App Store: ${error.message}`,
      showCancel: false,
    });
  });
  // #endif
}

/**
 * 获取更新信息
 * @returns {Promise<Object>}
 */
function fetchUpdateInfo() {
  return new Promise((resolve, reject) => {
    let currentVersion = "";
    // #ifdef APP-PLUS
    currentVersion = getCurrentAppVersion();
    // #endif
    // #ifdef MP-WEIXIN
    currentVersion = ""; // 小程序不需要版本号
    // #endif

    uni.request({
      url: env.baseUrl + "/addons/shopro/index/get_version",
      method: "POST",
      data: {
        platform: uni.getSystemInfoSync().platform,
        version: currentVersion,
      },
      success: (res) => {
        if (res.statusCode === 200 && res.data && res.data.code === 1) {
          resolve(res.data.data);
        } else {
          reject(new Error("获取更新信息失败"));
        }
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
}

export { checkForUpdates, downloadAndUpdateApp, downloadAndUpdateWgt, checkMiniProgramUpdate, getCurrentAppVersion };

/**
 * 使用示例：
 *
 * import { checkForUpdates } from '@/utils/updateApp';
 *
 * export default {
 *   onLaunch: function() {
 *     // #ifdef APP-PLUS
 *     // 不需要传入版本号，会自动获取正确的版本号（支持热更新）
 *     checkForUpdates();
 *     // #endif
 *
 *     // #ifdef MP-WEIXIN
 *     checkForUpdates();  // 小程序不需要传入版本号
 *     // #endif
 *   }
 * }
 *
 * // 如果需要手动获取当前版本号：
 * // import { getCurrentAppVersion } from '@/utils/updateApp';
 * // const version = getCurrentAppVersion();
 * // console.log('当前应用版本:', version);
 */
