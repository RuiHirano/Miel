import { DatabaseEntity } from '../../core/database/interfaces';

export interface AIFeedback extends DatabaseEntity {
  type: 'insight' | 'warning' | 'suggestion' | 'achievement';
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  actionable?: boolean;
  category: 'spending' | 'saving' | 'income' | 'budget' | 'goal';
}

export const mockAIFeedbacks: AIFeedback[] = [
  {
    id: '1',
    type: 'warning',
    title: '食費の支出が増加傾向',
    message: `今月の食費が**前月比で15%増加**しています。

### 主な要因
- 外食回数: 12回 → 18回 (+50%)
- 平均単価: ¥2,800 → ¥3,200 (+14%)

### 改善提案
1. **週3回以下**に外食を制限
2. **お弁当作り**で昼食代を節約
3. **特売日の活用**で食材費を削減

> 📊 これらの実行で月**¥20,000**の節約が可能です`,
    priority: 'high',
    createdAt: new Date('2024-10-06'),
    updatedAt: new Date('2024-10-06'),
    actionable: true,
    category: 'spending'
  },
  {
    id: '2',
    type: 'achievement',
    title: '貯蓄目標を達成',
    message: `🎉 **おめでとうございます！**

今月の貯蓄額が目標の**¥100,000**を上回り、**¥125,000**を達成しました。

### 達成要因
- 支出管理の改善: **15%削減**
- 副収入の増加: **¥25,000**
- 固定費見直し: **¥8,000削減**

この調子で年間貯蓄目標の**¥1,200,000**達成が見込めます。`,
    priority: 'medium',
    createdAt: new Date('2024-10-05'),
    updatedAt: new Date('2024-10-05'),
    actionable: false,
    category: 'saving'
  },
  {
    id: '3',
    type: 'suggestion',
    title: '投資機会の提案',
    message: `現在の貯蓄残高から、**月¥30,000**の積立投資を始めることをお勧めします。

### 投資シミュレーション
| 期間 | 積立額 | 想定年利 | 予想資産額 |
|------|--------|----------|------------|
| 5年  | ¥1,800,000 | 3% | ¥1,950,000 |
| 10年 | ¥3,600,000 | 3% | ¥4,200,000 |

### おすすめ商品
- **つみたてNISA**: 年¥400,000まで非課税
- **インデックスファンド**: 低コストで分散投資
- **バランスファンド**: リスク分散型

> 💡 早期開始で**複利効果**を最大化できます`,
    priority: 'medium',
    createdAt: new Date('2024-10-04'),
    updatedAt: new Date('2024-10-04'),
    actionable: true,
    category: 'goal'
  },
  {
    id: '4',
    type: 'insight',
    title: '収入の安定性が向上',
    message: `📈 **収入パターン分析結果**

過去6ヶ月間の収入が安定しており、予算計画の精度が**85%**に向上しています。

### 収入の安定指標
- 変動係数: **0.12** (0.20以下で安定)
- 予算達成率: **94.2%**
- 月次ばらつき: **±3.5%**

### 次のステップ
この安定期を活用して**固定費の見直し**を行うタイミングです。

- [ ] 保険の見直し
- [ ] 通信費の最適化  
- [ ] 住宅ローンの借り換え検討`,
    priority: 'low',
    createdAt: new Date('2024-10-03'),
    updatedAt: new Date('2024-10-03'),
    actionable: true,
    category: 'income'
  },
  {
    id: '5',
    type: 'warning',
    title: 'サブスクリプション費用の見直し',
    message: `⚠️ **未使用サービスを検出**

利用頻度の低いサブスクリプションサービスが**3つ**検出されました。

### 対象サービス
| サービス | 月額費用 | 利用頻度 | 推奨 |
|----------|----------|----------|------|
| 動画配信A | ¥1,980 | 月1回未満 | 🔴 解約 |
| 音楽配信B | ¥980 | 週1回未満 | 🔴 解約 |
| フィットネスC | ¥2,980 | 月2回未満 | 🟡 プラン変更 |

### 節約効果
- **即座解約**: 月¥5,940の節約
- **年間効果**: ¥71,280の節約

> 💰 本当に必要なサービスだけを残しましょう`,
    priority: 'medium',
    createdAt: new Date('2024-10-02'),
    updatedAt: new Date('2024-10-02'),
    actionable: true,
    category: 'spending'
  }
];

export const getFeedbacksByPriority = (priority: 'high' | 'medium' | 'low') => {
  return mockAIFeedbacks.filter(feedback => feedback.priority === priority);
};

export const getFeedbacksByType = (type: 'insight' | 'warning' | 'suggestion' | 'achievement') => {
  return mockAIFeedbacks.filter(feedback => feedback.type === type);
};

export const getActionableFeedbacks = () => {
  return mockAIFeedbacks.filter(feedback => feedback.actionable);
};

export const getFeedbacksByCategory = (category: 'spending' | 'saving' | 'income' | 'budget' | 'goal') => {
  return mockAIFeedbacks.filter(feedback => feedback.category === category);
};