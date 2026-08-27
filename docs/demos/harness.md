# 演示 02｜跃点互动：两幕式 Harness 练习

<div class="doc-hero dark">
  <p class="section-kicker">CHAPTER 04 / HARNESS → LOOP</p>
  <h1>当新证据改变结论时，<br>你的 AI 规则如何升级？</h1>
  <p>你将扮演 50 人爆款小游戏公司“跃点互动”的负责人。所有数字都是课堂虚构的冻结数据。目标不是让 AI 自动经营，而是让它交出可追溯的证据、边界和待人工批准的经营草稿。</p>
  <div class="chapter-kpis"><span>两周冻结数据</span><span>两幕练习</span><span>两份 Prompt</span></div>
</div>

## 开始练习

<div class="decision-card">
  <span class="ops-label">STUDENT PRACTICE</span>
  <h3>使用学生练习页完成两幕任务</h3>
  <p><a href="/vibestar/harness-two-act/">打开两幕式 Harness 学生练习页</a>。页面提供 <code>week1.csv</code>、<code>week2.csv</code>、两份可复制 Prompt，以及由人工按钮推进的第二幕。</p>
</div>

## 演示合同

<table class="metric-table">
  <thead><tr><th>项目</th><th>课堂规定</th></tr></thead>
  <tbody>
    <tr><td>公司</td><td>50 人爆款小游戏公司“跃点互动”，游戏《翻翻羊》；全部为虚构课堂案例。</td></tr>
    <tr><td>输入</td><td>两周 AI 使用、账单、工程质量、审批状态和发布行动证据。</td></tr>
    <tr><td>输出</td><td>事实、信号、未知项、经营草稿、补证据动作与待人工批准项。</td></tr>
    <tr><td>硬边界</td><td>不自动修改预算、座席或项目状态；不执行付款、发布或其他外部动作。</td></tr>
  </tbody>
</table>

## 两幕、两份 Prompt

<div class="route-timeline">
  <article><strong>ACT 1</strong><div><h3>建立基础规则</h3><p>复制 Prompt 1，只读取 <code>week1.csv</code>。创建经营说明和 Harness v1.0，检查成本、完整度、返工次数与审批状态，形成待批准草稿。</p></div></article>
  <article><strong>ACT 2</strong><div><h3>新证据升级规则</h3><p>点击“Codex已完成，进入第二幕”后复制 Prompt 2。读取第二周数据，识别 Bug 重开率上升，将质量门槛加入 Harness v1.1，再重新检查。</p></div></article>
</div>

## 拆解：五层 Harness

<div class="ops-grid">
  <article class="ops-card"><span class="ops-label">DATA</span><h3>输入边界</h3><p>只允许指定 CSV 进入；缺失时明确标 unknown，不让模型补齐。</p></article>
  <article class="ops-card"><span class="ops-label">RULES</span><h3>业务规则</h3><p>成本、完整度、返工、质量和审批边界都要写清楚。</p></article>
  <article class="ops-card"><span class="ops-label">EVAL</span><h3>质量验收</h3><p>检查证据、口径、风险与待补信息，而不是只看结论是否漂亮。</p></article>
  <article class="ops-card"><span class="ops-label">GATE</span><h3>暂停与批准</h3><p>质量风险或证据不足时停在草稿，等待人工判断。</p></article>
  <article class="ops-card emphasis"><span class="ops-label">LOOP</span><h3>新数据回归</h3><p>保留旧规则与失败样本；新证据出现时更新规则并重新检查。</p></article>
</div>

## 复盘

第一幕通过基础门槛，不代表可以直接扩大 AI 投入。第二幕的质量风险提醒我们：Harness 的价值在于让系统在不确定时暂停、补证据、再交由人批准，而不是把经营决定自动化。
