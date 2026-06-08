import cloudbase from '@cloudbase/js-sdk'

/**
 * 腾讯云 CloudBase 环境 ID
 * 请在 .env 中配置：VITE_TCB_ENV_ID=你的环境ID
 */
export const ENV_ID = import.meta.env.VITE_TCB_ENV_ID || 'your-env-id-here'

/** CloudBase 应用实例 */
const app = cloudbase.init({
  env: ENV_ID,
})

/** 认证模块（本地持久化登录态） */
const auth = app.auth({ persistence: 'local' })

/** 数据库实例 */
export const db = app.database()

/**
 * 云存储实例
 * 文件上传/下载等操作通过 app 提供的 storage API 调用
 */
export const storage = app

/**
 * 初始化 CloudBase
 * - 检测登录态，未登录则执行匿名登录
 * @returns {Promise<{ app: object, db: object, storage: object }>}
 */
export async function initCloudBase() {
  const loginState = await auth.getLoginState()

  if (!loginState) {
    await auth.signInAnonymously()
  }

  return { app, db, storage }
}

export default app
