# 非遗中国 · 国家级非遗代表性项目卫星交互地图

一个纯静态的单文件作品集页面：以卫星影像地图为载体，展示中国国家级非物质文化遗产代表性项目。

## 在线预览

在线访问：https://hank1234-c.github.io/feiyi-china-site/

仓库地址：https://github.com/hank1234-c/feiyi-china-site

## 技术说明

- 单文件架构：`index.html` 内联了 Leaflet 库、样式与全部图片（base64 data URI），无需外部 CSS/JS/图片资源
- 地图底图使用 Esri World Imagery 卫星瓦片（需联网加载）
- 响应式布局，支持桌面与移动端浏览

## 本地运行

直接双击打开 `index.html` 即可，或启动一个静态服务器：

```bash
npx serve .
```

## 目录

```
feiyi-china-site/
└── index.html    # 全部页面内容（HTML + CSS + JS + 图片）
```
