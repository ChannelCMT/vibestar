import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vibe Star',
  description: 'AI course for business productivity, scenario practice, and agent engineering.',
  lang: 'zh-CN',
  cleanUrls: true,
  base: '/vibestar/',
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '学习地图', link: '/learning-map/' },
      { text: '工具跑通', link: '/vibe-coding-tools/' },
      { text: '课程介绍', link: '/guide/' },
      { text: '课程模块', link: '/curriculum/' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ChannelCMT/vibestar' }
    ],
    footer: {
      message: 'Built for AI creators.',
      copyright: 'Copyright © 2026 Vibe Star'
    }
  }
})
