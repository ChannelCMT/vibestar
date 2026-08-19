# 2｜选择合适架构：先给任务打分，再升级

<div class="doc-hero">
  <p class="section-kicker">CHAPTER 02 / TASK ARCHITECTURE</p>
  <h1>不是所有任务都值得做成 Agent。<br>先评分，再决定怎么做。</h1>
  <p>做一张 PPT，可能只是一次分享，也可能是每周 20 页、需要统一风格的系列课件；做一张图，可能是一张海报，也可能是 100 张品牌资产。重复次数、复杂度、风险与验证难度，决定架构而不是模型名称。</p>
  <div class="chapter-kpis"><span>学习目标：任务评分</span><span>演示：7 种架构选择</span><span>产出：数字员工岗位卡</span></div>
</div>

## 本章学完能做什么

你能把“我想做个 AI 员工”变成一个可讨论的任务合同，并知道什么时候只需要强模型对话，什么时候需要 Plan & Execute、路由、并行或评估循环。

## 痛点：把所有任务都交给一个聊天框

低频、低风险任务，强模型直接处理通常最快。高频、跨材料、有外部动作或需要稳定复用的任务，如果仍然靠同一个聊天框临时描述，结果会越来越不可控。

## 讲师演示：7 种架构不是菜单，而是升级阶梯

从 Anthropic 的有效 Agent 工作流出发，按复杂度逐步理解：

<table class="metric-table">
  <thead><tr><th>架构</th><th>适用信号</th><th>此课的关键判断</th></tr></thead>
  <tbody>
    <tr><td>Augmented LLM</td><td>单次任务，需要资料、工具或记忆辅助</td><td>先把输入与输出说清楚。</td></tr>
    <tr><td>Prompt Chaining</td><td>步骤有固定先后</td><td>上一步输出必须能被下一步检查。</td></tr>
    <tr><td>Routing</td><td>不同类型任务应走不同路径</td><td>分类规则要明确，不让模型随意猜路由。</td></tr>
    <tr><td>Parallelization</td><td>多份独立证据可并行</td><td>并行不是答案变多，而是证据覆盖变广。</td></tr>
    <tr><td>Orchestrator-workers</td><td>任务可拆角色、再汇总</td><td>协调者必须知道何时停止拆分。</td></tr>
    <tr><td>Evaluator-optimizer</td><td>质量能被标准化验收</td><td>先写评分标准，再让系统迭代。</td></tr>
    <tr><td>Autonomous Agent</td><td>长期、多步、可观察的执行</td><td>只有在权限、成本与停机点明确后才进入。</td></tr>
  </tbody>
</table>

## 拆解：先用四个维度给任务打分

<div class="ops-grid">
  <article class="ops-card"><span class="ops-label">REPEAT</span><h3>重复次数</h3><p>一次性的工作，通常不需要搭系统；每周、每天、批量发生，才有升级价值。</p></article>
  <article class="ops-card"><span class="ops-label">COMPLEXITY</span><h3>复杂度</h3><p>是否需要多资料、多步骤、多角色或不同专业视角？</p></article>
  <article class="ops-card emphasis"><span class="ops-label">RISK</span><h3>风险与可验证性</h3><p>错了会怎样？谁能验收？没有验收标准的任务，不要先自动化。</p></article>
</div>

## 学员实操：将任务升级成 AI 数字员工

使用 Codex 创建一张岗位卡，而不是直接要求它“帮我自动完成”：

<div class="prompt-card"><strong>课堂 Prompt</strong>

~~~text
你是我的 AI 组织设计顾问。请把我下面的工作任务整理成一张“AI 数字员工岗位卡”。
必须输出：岗位名称、业务目标、输入材料、输出物、每周重复次数、复杂度、风险、必须由人批准的动作、AI 还需要学习的知识、第一版最小任务。
如果信息不足，先问我不超过 5 个关键问题，不要直接假设。

我的任务是：［粘贴你的真实任务］
~~~

</div>

## 复盘与延伸

架构不是一次性选对，而是随着任务重复、证据和风险逐步升级。下一章我们让 Agent 真正获得能力：通过 GUI、CLI、API 与 MCP 使用工具。
