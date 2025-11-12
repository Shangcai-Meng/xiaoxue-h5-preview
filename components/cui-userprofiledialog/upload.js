
import { uploadUserAvatar } from '@/api/modules/upload';

export function uploadFile(res) {
	// 调用我们的API上传头像
	return uploadUserAvatar({
		file: res.tempFilePath
	}).then(result => {
		// 返回上传结果
		return {
			url: result.data.url
		};
	}).catch(error => {
		console.error('上传头像失败:', error);
		// 上传失败时，仍然返回临时路径（仅用于开发测试）
		return {
			url: res.tempFilePath
		};
	});
}