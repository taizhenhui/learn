import { createContext } from "react";

const ctx = createContext()
ctx.displayName = 'Router' // 在调试工具中显示的名字
export default ctx