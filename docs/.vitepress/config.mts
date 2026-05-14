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
      { text: '行业场景', link: '/industries/' },
      { text: '课程介绍', link: '/guide/' },
      { text: '课程模块', link: '/curriculum/' }
    ],
    sidebar: {
      '/vibe-coding-tools/': [
        {
          text: '工具跑通',
          items: [
            { text: '安装教程', link: '/vibe-coding-tools/#_1-安装教程' },
            { text: '认知导入', link: '/vibe-coding-tools/#_2-认知导入-为什么-ai-学习必须学会环境和-cli' },
            { text: 'Windows 命令行入门', link: '/vibe-coding-tools/#_3-windows-命令行入门' },
            { text: 'Mac 命令行入门', link: '/vibe-coding-tools/#_4-mac-命令行入门' }
          ]
        }
      ],
      '/industries/': [
        {
          text: '行业场景',
          items: [
            { text: '总览', link: '/industries/' },
            { text: '学生', link: '/industries/student/' },
            { text: '产品经理', link: '/industries/product-manager/' },
            { text: '前端 / 后台开发', link: '/industries/developer/' },
            { text: '设计师', link: '/industries/designer/' },
            { text: '新媒体运营', link: '/industries/content-operations/' },
            { text: '营销策略', link: '/industries/marketing-strategy/' },
            { text: '企业客服', link: '/industries/customer-service/' },
            { text: '销售顾问', link: '/industries/sales-consultant/' },
            { text: '财务管理', link: '/industries/finance/' },
            { text: '企业咨询', link: '/industries/consulting/' },
            { text: '教育培训', link: '/industries/education/' },
            { text: '投资理财', link: '/industries/investment/' },
            { text: '中小企业主', link: '/industries/sme-owner/' },
            { text: '任何人', link: '/industries/everyone/' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ChannelCMT/vibestar' }
    ],
    footer: {
      message: 'Built for AI creators.',
      copyright: 'Copyright © 2026 Vibe Star'
    }
  }
})
