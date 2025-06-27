---
# https://vitepress.dev/zh/reference/default-theme-home-page
layout: home

# hero:
#   image:
#     src: /logo.png
#     alt: VitePress

hero:
  name: "CSharpGuide"
  text: ""
  # image:
  #   src: /logo.png
  
  actions:
  
    - theme: alt
      text: Deepseek使用
      link: /tools/deepseek/deepseek
    - theme: alt
      text: 常用工具
      link: /tools/common_tools/common_tools/
    - theme: alt
      text: Office工具
      link: /tools/office/office_tools/

features:
  - title: C#基础
    details: 类型系统、语句、方法、委托与事件、类与接口、面向对象、LINQ、异步编程等。
    link: /c-sharp/basic/0.概述
    linkText: 更多
      
  - title: web后端
    details: Host、DI、中间件、路由、EF Core、授权、部署等。
    link: /c-sharp/web/0.引言
    linkText: 更多
 
  - title: 数据库 
    details: 数据库的分类，原理及使用。
    link: /database/1.数据库概述及运行原理
    linkText: 更多
  
  - title: 前端 
    details: HTML、CSS、JS、Vue及打包部署等。
    link: /frontend/1.前端知识结构
    linkText: 更多
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
}
</style>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  changeGridClass();
});

const changeGridClass = () => {
    // 选择 .Items 容器
    const itemsContainer = document.querySelector(".VPHomeFeatures .container .items");

    if (itemsContainer) {
        const itemElements = itemsContainer.querySelectorAll(".item");

        if (itemElements.length >= 4) {
            for (let i = 0; i < 3; i++) {
                if (itemElements[i].classList.contains("grid-4")) {
                    itemElements[i].classList.replace("grid-4", "grid-3");
                }
            }

            for (let i = 3; i < 4; i++) {
                if (itemElements[i].classList.contains("grid-4")) {
                    itemElements[i].classList.replace("grid-4", "grid-1");
                }
            }
        }
    }
}

</script>