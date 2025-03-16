# 使用最新的官方 Node.js 镜像
FROM node:latest

# 安装 pnpm
RUN npm install -g pnpm

# 设置工作目录
WORKDIR /workspace

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install

# 复制项目文件
COPY . .

# 暴露端口（如果需要）
EXPOSE 3000

# 启动开发服务器
CMD ["pnpm", "run", "dev"]