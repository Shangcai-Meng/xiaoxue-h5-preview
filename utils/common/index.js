/**
 * 通用工具函数统一导出入口
 * 将所有分类的工具函数统一导出，便于使用
 *
 * 从全局入口导入（不推荐，包体积大）
 * import { showToast, throttle } from "@/utils";
 * 从common导入（推荐，可减小包体积）
 * import { showToast, throttle } from "@/utils/common";
 * 或者直接从特定功能模块导入（最推荐，可减小包体积）
 * import { showToast } from "@/utils/common/ui";
 * import { throttle } from "@/utils/common/helper";
 *
 * @module common
 */

// 导出 UI 交互相关函数
export * from "./ui";

// 导出设备操作相关函数
export * from "./device";

// 导出文件操作相关函数
export * from "./file";

// 导出格式化相关函数
export * from "./format";

// 导出辅助工具函数
export * from "./helper";

// 导出导航相关函数
export * from "./navigation";
