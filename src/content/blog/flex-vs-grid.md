---
title: Flex 还是 Grid？一张表说清楚
description: 一维排列用 Flex，二维布局用 Grid，以及一个经常被忽略的判断标准。
pubDate: 2026-10-18
tags: ['技术', 'CSS']
---

初学 CSS 布局最容易卡住的地方是：**这个需求到底该用 Flex 还是 Grid？**

我的判断标准只有一句话：**看你要控制的是一行/一列，还是行和列同时。**

## 一句话对比

| 场景 | 选择 | 原因 |
| --- | --- | --- |
| 导航栏横向排列 | Flex | 只有一条轴 |
| 按钮里的图标和文字 | Flex | 一维对齐 |
| 卡片内容上下分布 | Flex + `flex-direction: column` | 仍是一维 |
| 整个页面的主内容 + 侧栏 | Grid | 行和列同时要控制 |
| 图片瀑布式排布 | Grid | 自动填充需要二维 |
| 响应式卡片列表 | Grid + `auto-fit` | 一行代码搞定折行 |

## Flex：控制一条轴

```css
.nav {
  display: flex;
  align-items: center;
  gap: 16px;
}
```

`gap` 是现代写法里最值得记住的属性之一——它替代了以前给每个子元素加 `margin` 的做法，而且不会给最后一个元素留下多余的间距。

需要把某一项推到最右边时，不需要额外的容器：

```css
.nav__spacer {
  margin-left: auto;
}
```

## Grid：同时控制行列

```css
.post-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  gap: 56px;
}
```

这里有个细节值得单独说：`minmax(0, 1fr)` 而不是 `1fr`。

原因是 Grid 子项默认的 `min-width` 是 `auto`，如果里面有一个不换行的长内容（比如很长的代码块或 URL），它会把整列撑破，然后溢出到页面外面。写成 `minmax(0, 1fr)` 等于告诉浏览器"这一列最小可以缩到 0"，内容才会正常收缩。

## 响应式列表：Grid 的一行魔法

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}
```

这一行做的事：每列最小 220px，能塞几列就塞几列，剩下的空间均分。窗口变窄时自动减少列数，不需要写任何媒体查询。

`auto-fit` 和 `auto-fill` 的区别是：容器很宽、卡片很少时，`auto-fit` 会让现有卡片拉伸填满，`auto-fill` 会保留空列。做卡片列表大多想要 `auto-fit`。

## 小结

- 一维 → Flex
- 二维 → Grid
- 拿不准时先用 Grid 试，它的行列语义更明确
- 别忘了 `minmax(0, 1fr)` 这个坑
