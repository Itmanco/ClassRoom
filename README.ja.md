# 📚 Classroom Manager

[English](README.md) | **日本語**

Classroom Manager は、学校データの管理と、説明可能で教師が最終判断を行える座席表作成を目的とした Vue 3 + Firebase の Web アプリケーションです。

学校・クラスの明確なコンテキスト、Firestore によるリアルタイムデータ、英語・日本語対応、説明可能な座席推薦、実際の教室運用を意識したワークフローを中心に設計しています。

実用的な学校管理アプリケーションとしてだけでなく、保守しやすいフロントエンド設計、ドメインモデリング、Firebase 連携、国際化、説明可能なプランニングロジックを学び実践するポートフォリオプロジェクトとして開発しています。

---

## 🌐 ライブデモ

GitHub Pages を使用してアプリケーションを公開しています。

> **Live application:** https://itmanco.github.io/ClassRoom/

デプロイにはプロジェクトの `gh-pages` 設定を使用しています。

---

## 🚀 現在の開発状況

Classroom Manager では現在、学校管理から座席表出力までの主要なワークフローを一通り実行できます。

```text
学校
  ↓
クラス
  ↓
在籍登録
  ↓
座席表
  ↓
座席推薦
  ↓
教室プレビュー
  ↓
印刷向け Excel 出力
```

現在実装されている主な機能：

- Firebase Authentication
- ログイン状態の保持
- Firestore によるユーザープロフィール管理
- 複数学校への対応
- 使用中学校の選択
- 学校未所属ユーザー専用画面
- 生徒管理
- コース管理
- 建物管理
- 教室管理
- クラス管理
- Class Workspace
- 生徒のクラス登録
- 座席表作成・履歴管理
- 手動座席割り当て
- 説明可能な座席推薦
- 教室形式の座席表表示
- 教室レイアウト設定
- 1列あたりの机数設定
- 教師用机位置の設定
- 教室レイアウトプレビュー
- 印刷向け Excel 座席表出力
- A4 横向き印刷設定
- 英語・日本語 UI
- レスポンシブナビゲーション
- GitHub Pages デプロイ

現在の構造上の次のマイルストーンは、旧 Classroom/Home ページを学校 Dashboard に置き換えることです。

---

## 🎯 プロダクト設計方針

このアプリケーションでは、以下の考え方を重視しています。

### 学校コンテキストを明確にする

学校に属するデータには常に `schoolId` を使用します。

これにより、異なる学校のデータが誤って混在することを防ぎます。

### クラスに関する処理はクラス内にまとめる

在籍登録や座席表はクラスに属する処理として扱い、Class Workspace にまとめています。

### 完全削除よりアーカイブを優先する

履歴から参照される可能性があるデータは、原則として完全削除ではなくアーカイブします。

### 推薦はするが、最終判断は教師が行う

座席エンジンは候補とその理由を提示します。

最終的な座席決定は教師が行います。

### ドメインロジックと表示を分離する

Firestore へのアクセスは service モジュールに分離しています。

座席エンジンは Vue に依存しない設計です。

### 国際化をアーキテクチャの一部として扱う

ユーザーに表示する新しいテキストは、原則としてコンポーネントに直接記述せず Vue I18n を使用します。

### 物理的な教室配置と座席割り当てを分けて考える

保存済み座席表は **誰がどこに座るか** を決定します。

現在の教室設定は **教室をどのように表示・印刷するか** を決定します。

この区別は、プレビューや Excel 出力で特に重要です。

---

## 🧭 主なアプリケーションフロー

```text
ログインユーザー
└── 使用中の学校
    ├── 生徒
    ├── コース
    ├── 建物
    ├── 教室
    └── クラス
        └── Class Workspace
            ├── 概要
            ├── 生徒 / 在籍登録
            └── 座席表
                ├── 手動割り当て
                ├── 順番割り当て
                ├── 座席推薦エンジン
                ├── 教室プレビュー
                └── Excel 出力
```

---

# ✨ 機能

## 認証・ユーザープロフィール

Firebase Authentication と Firestore のユーザープロフィールを使用しています。

現在の機能：

- Firebase メールアドレス・パスワード認証
- アプリ起動時の認証状態復元
- Firestore からのプロフィール取得
- プロフィール編集
- ログアウト
- 学校所属情報
- 使用中学校の保存
- 学校に所属していないログインユーザー専用画面

Firebase のパスワードを変更しても、すでに認証済みのクライアントセッションが自動的に無効になるわけではありません。通常の Firebase Authentication のセッション動作が適用されます。

---

## 複数学校への対応

ユーザープロフィールには、所属学校と現在使用している学校を保存できます。

例：

```js
{
  activeSchool: "school_japan",
  schools: ["school_japan"],
  role: "admin"
}
```

ログインユーザーが利用可能な学校を読み込み、使用する学校を選択できます。

学校を変更した場合、学校・クラス固有の UI 状態をリセットし、異なる学校のデータが混在しないようにしています。

現在の学校所属管理はプロフィールベースです。

より強力なサーバー側の権限・ロール制御は今後の課題です。

---

## 生徒管理

現在の生徒管理機能：

- 生徒作成
- 生徒編集
- 生徒検索
- 生徒アーカイブ
- Firestore リアルタイム更新
- 固定された生徒 ID
- 学校単位のデータ保存

生徒 ID を安定させることで、過去の座席表から同じ生徒を継続して参照できます。

---

## コース管理

コース管理では以下に対応しています。

- コース作成
- コース編集
- コースアーカイブ
- 固定されたコースコード
- 学校単位のデータ保存

コースはクラスの学習内容・学術的コンテキストとして使用されます。

---

## 建物・教室管理

建物は学校の施設を表します。

教室データは、実際の教室レイアウトを定義します。

教室には以下の情報があります。

- 教室コード
- 教室名
- 建物
- 階
- 教室番号
- 机数
- 1机あたりの座席数
- 1列あたりの机数
- 自動計算された定員
- 教師用机の位置
- 有効 / アーカイブ状態

教師用机の位置：

```text
front-left
front-right
back-left
back-right
```

Room Management には教室レイアウトのプレビュー機能もあり、座席表や Excel 出力で使用する前に物理配置を確認できます。

`desksPerRow` は、同じ机数でも異なる教室レイアウトを表現するための重要な設定です。

例：

```text
机数: 9
1机あたり: 2席
1列あたり: 3机
定員: 18
```

---

## クラス管理

クラスは学習内容と物理的な教室情報を結びつけます。

現在のクラス情報：

- コース
- 教室
- 年度
- 学期
- 有効 / アーカイブ状態

**Manage Class** から Class Workspace を開きます。

---

## Class Workspace

Class Workspace では、クラスに属する処理を1か所にまとめています。

```text
Class Workspace
├── Overview
├── Students
│   └── EnrollmentManager
└── Seating Plans
    └── SeatingPlanManager
```

これにより、在籍登録や座席表の操作を対象クラスのコンテキスト内で行えます。

EnrollmentManager と SeatingPlanManager は任意の `classId` を受け取ることができ、Class Workspace 内の埋め込みワークフローとして動作できます。

---

# 🪑 座席表

現在の座席表機能：

- 手動座席割り当て
- 順番による割り当て
- 保存済み座席表履歴
- 編集
- アーカイブ
- 教室形式の表示
- 実際の机単位でのグループ化
- 1机あたりの座席数設定
- 1列あたりの机数設定
- ホワイトボード / 教室前方の表示
- 教室設定から取得する教師用机位置
- 複数の推薦候補生成
- 保存済み座席表の Excel 出力

座席表では、生徒の座席割り当てと現在の教室レイアウトを別々に扱います。

そのため、一部の教室設定を変更した後でも、既存の座席表を新しいレイアウトで再出力できます。

---

## 座席推薦エンジン

座席エンジンは Vue に依存せず、過去の座席表を評価して新しい推薦を生成します。

現在の目的優先順位：

1. 同じ机のパートナーの繰り返しを避ける
2. 同じ机の繰り返しを避ける
3. 同じ座席位置の繰り返しを避ける
4. 上位条件が同じ場合はランダムに決定する

エンジンは翻訳済みの UI テキストではなく、構造化された推薦候補を返します。

結果には以下を含めることができます。

- 座席割り当て候補
- 目的別の評価値
- 制約違反
- 品質情報
- 探索統計

翻訳と表示は UI レイヤーで行います。

これにより、座席エンジンを Vue や Vue I18n から独立させています。

---

# 📄 印刷向け Excel 座席表

保存済み座席表は **ExcelJS** を使用して `.xlsx` ファイルとして出力できます。

単なるデータ出力ではなく、実際に印刷して使用できる教室座席表として設計しています。

生成されるファイルには以下が含まれます。

- クラスコード
- クラス名
- 建物
- 教室コード
- 現在の教室レイアウト
- 1列あたりの机数
- 実際の机グループ
- 各座席の生徒名
- 教師用机の位置
- ホワイトボード
- 座席表名
- 年度
- 学期
- 印刷日時
- 机配置の概要
- 教室定員
- クラス識別子と出力日時を使用したファイル名

### 印刷設定

生成される Excel ファイルには以下の印刷設定を適用しています。

- A4
- 横向き
- Fit to Page
- 1ページ幅
- 1ページ高さ
- 印刷範囲指定
- 水平方向中央配置
- 垂直方向中央配置
- コンパクトな印刷余白

実装ファイル：

```text
src/services/seatingPlanExportService.js
```

ExcelJS を使用しています。

---

## 現在の教室設定と保存済み座席割り当て

Excel 出力では、教室の物理設定と生徒の座席割り当てを意図的に分離しています。

```text
保存済み座席表
        ↓
誰がどこに座るか

現在の教室設定
        ↓
教室をどのように描画するか
```

現在の教室から使用する情報：

- `deskCount`
- `seatsPerDesk`
- `desksPerRow`
- `teacherPosition`

保存済み座席表から使用する情報：

- 生徒の座席割り当て

そのため、例えば：

```text
desksPerRow: 2 → 3
teacherPosition: front-left → back-right
```

と変更した場合でも、座席表そのものを作り直さずに、新しく生成する Excel ファイルへ最新の教室設定を反映できます。

ただし、机数や1机あたりの座席数を変更した場合、過去の座席割り当てが存在しない座席を参照する可能性があるため、追加の注意が必要です。

---

# 🌐 国際化

Classroom Manager は現在以下の言語に対応しています。

- 英語 (`en`)
- 日本語 (`ja`)

初期言語の決定方法：

1. 保存済みのアプリ言語があれば使用
2. なければブラウザ言語を確認
3. ブラウザ言語が `ja` の場合は日本語
4. その他の未対応言語では英語

アプリ内で言語を変更できます。

選択した言語はローカルに保存されます。

新しいユーザー向けテキストは Vue I18n を使用する方針です。

詳細：

```text
docs/INTERNATIONALIZATION.md
```

---

# 🔥 Firestore データモデル

主要な Firestore 構造：

```text
users/{uid}

schools/{schoolId}
├── students/{studentId}
├── buildings/{buildingId}
├── rooms/{roomId}
├── courses/{courseId}
└── classes/{classId}
    ├── enrollments/{studentId}
    └── seatingPlans/{seatingPlanId}
```

学校に属するデータは学校ドキュメント配下に保存します。

クラスに属するデータは対象クラス配下に保存します。

詳細：

```text
docs/FIRESTORE_SCHEMA.md
```

---

# 🏗️ アーキテクチャ

全体構成：

```text
App.vue
│
├── Firebase 認証 / セッション
├── ユーザープロフィール
├── 利用可能な学校
├── 使用中学校
├── トップレベルナビゲーション
└── 選択中クラス
        │
        ▼
Vue pages / components
        │
        ├── 各管理ページ
        ├── Class Workspace
        ├── 教室プレビュー
        └── 座席表 UI
        │
        ▼
Service layer
        │
        ├── Firestore services
        └── Excel export service
                │
                └── ExcelJS
        │
        ▼
Firebase

SeatingPlanManager
        │
        ▼
Vue 非依存 Seating Engine
```

以下を意図的に分離しています。

- Vue による表示
- Firestore 永続化
- 学校 / クラスのドメインワークフロー
- 座席推薦ロジック
- Excel ドキュメント生成

詳細：

```text
docs/ARCHITECTURE.md
```

---

# 🧰 技術スタック

## フロントエンド

- Vue 3.2
- Vue CLI 5
- JavaScript
- CSS
- Vue I18n 11

## バックエンド / サービス

- Firebase Authentication
- Cloud Firestore
- ローカル管理・移行スクリプト用 Firebase Admin SDK

## 座席表 Excel 出力

- ExcelJS

## 開発・デプロイ

- ESLint
- Babel
- npm
- Git
- GitHub
- GitHub Pages
- `gh-pages`

---

# 📁 プロジェクト構成

```text
src/
├── App.vue
├── assets/
│   └── logo.png
├── components/
│   ├── LanguageSelector.vue
│   ├── LoginModal.vue
│   ├── NavigationMenu.vue
│   ├── SchoolSelector.vue
│   └── UserProfileCard.vue
├── engine/
│   └── seating/
│       ├── SeatingEngine.js
│       └── constraints/
│           ├── AvoidPreviousDesks.js
│           ├── AvoidPreviousPartners.js
│           ├── AvoidPreviousSeat.js
│           └── history.js
├── i18n/
│   ├── index.js
│   └── locales/
│       ├── en.json
│       └── ja.json
├── pages/
│   ├── BuildingManager.vue
│   ├── ClassManager.vue
│   ├── ClassroomPage.vue
│   ├── ClassWorkspace.vue
│   ├── CourseManager.vue
│   ├── EnrollmentManager.vue
│   ├── NoSchoolPage.vue
│   ├── ProfilePage.vue
│   ├── RoomManager.vue
│   ├── SeatingPlanManager.vue
│   ├── SettingsPage.vue
│   └── StudentManager.vue
└── services/
    ├── buildingService.js
    ├── classroomService.js
    ├── classService.js
    ├── courseService.js
    ├── enrollmentService.js
    ├── roomService.js
    ├── schoolService.js
    ├── seatingPlanExportService.js
    ├── seatingPlanService.js
    ├── studentService.js
    └── userService.js

scripts/
├── createTestSchool.js
├── exportSchoolStructure.js
└── migrateStudents.js

docs/
├── AI_CONTEXT.md
├── ARCHITECTURE.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── DECISIONS.md
├── DEVELOPER_PROFILE.md
├── DOCUMENTATION_INDEX.md
├── FIRESTORE_SCHEMA.md
├── INTERNATIONALIZATION.md
├── MIGRATION_PROGRESS.md
├── PLANNING_ENGINE.md
├── PLANNING_ENGINE_ROADMAP.md
├── PROJECT_CONTEXT.md
├── ROADMAP.md
├── SEATING_ENGINE.md
├── START_NEW_CHAT.md
└── TODO.md
```

以下は新しいアーキテクチャへの移行中に残っている旧コードです。

```text
src/pages/ClassroomPage.vue
src/components/MyClassroom.vue
src/components/StudentDesk.vue
src/services/classroomService.js
```

Dashboard が旧ホーム画面を置き換えた後に、確認の上で整理・削除する予定です。

---

# 💻 ローカル開発

## 必要環境

- Node.js
- npm
- Firebase プロジェクト
- Firebase Web 設定
- ローカル管理スクリプトを使用する場合は Firebase Admin のサービスアカウント認証情報

依存関係をインストール：

```bash
npm install
```

開発サーバーを起動：

```bash
npm run serve
```

ESLint：

```bash
npm run lint
```

本番ビルド：

```bash
npm run build
```

---

# 🔐 Firebase 設定と機密情報

フロントエンドの Firebase 設定：

```text
src/firebase-init.js
```

管理スクリプトではローカルのサービスアカウントファイルを使用します。

```text
serviceAccountKey.json
```

このファイルは **絶対に Git にコミットしないでください**。

`.gitignore` では以下も除外しています。

```text
serviceAccountKey.json
school-structure.json
```

管理スクリプトをコミットする前に、認証情報が無視対象のローカルファイルから読み込まれており、ソースコードへ直接記述されていないことを確認してください。

コミット前の確認：

```bash
git status
```

必要に応じて：

```bash
git check-ignore -v serviceAccountKey.json school-structure.json
```

---

# 🛠️ 管理スクリプト

## 生徒データ移行

```bash
npm run migrate:students
```

旧生徒データを現在の学校単位データ構造へ移行するためのスクリプトです。

---

## 学校構造エクスポート

```bash
node scripts/exportSchoolStructure.js
```

Firestore の学校・ユーザー構造をローカルで確認・文書化するためのユーティリティです。

生成される：

```text
school-structure.json
```

は Git の管理対象外です。

---

## テスト学校作成

```bash
node scripts/createTestSchool.js
```

複数学校機能をテストするための開発用ユーティリティです。

管理スクリプトを実行する前に、対象 ID と Firebase 環境を必ず確認してください。

---

# 🚀 デプロイ

GitHub Pages へのデプロイには `gh-pages` を使用しています。

npm コマンド：

```json
"deploy": "npm run build && gh-pages -d dist"
```

一般的なデプロイ手順：

```bash
npm run lint
npm run build
npm run deploy
```

デプロイ後は以下を確認します。

- アプリケーション起動
- Firebase Authentication
- Firestore 接続
- ナビゲーション
- 使用中学校の復元
- 英語 / 日本語切り替え
- Class Workspace
- 座席表生成
- Excel 出力

---

# ⚠️ 現在の技術的課題

このプロジェクトは現在も継続して改善しています。

主な今後の改善点：

- 旧 `ClassroomPage.vue` と関連コンポーネント / service
- Dashboard/Home への置き換え
- より強力なサーバー側権限制御
- 自動テスト
- 本番向けログ / エラーハンドリングの見直し
- 一部の service / ブラウザ検証メッセージの国際化
- Vue CLI の vendor bundle サイズ
- 将来的な Vite など新しいツールチェーンへの移行

これらは隠れた問題としてではなく、プロジェクトドキュメント内で継続的に管理します。

---

# 🗺️ ロードマップ

## 次のマイルストーン — Dashboard

次の構造的マイルストーンは学校 Dashboard です。

最初のバージョンで予定している内容：

- 旧 Classroom/Home ページの置き換え
- 使用中学校の表示
- 有効な生徒数
- クラス数
- 教室数
- コース数
- 最近のクラス / 座席表アクティビティ領域
- 将来のメッセージ / お知らせ領域

最初の Dashboard は意図的にシンプルにします。

アクティビティ履歴やメッセージ機能は、Dashboard の基本構造を作成した後に段階的に追加します。

---

## 教師管理

教師情報は Excel 専用の文字列ではなく、正式なドメインデータとして実装する予定です。

予定している機能：

- 教師一覧
- 教師レコード管理
- 1つのクラスに複数教師を割り当て
- メイン教師の指定
- Class Workspace で担当教師を表示
- クラス詳細でメイン教師を表示
- 将来の Dashboard で教師情報を利用
- Excel 座席表にメイン教師名を出力

想定しているクラスとの関連：

```js
{
  teacherIds: [
    "teacher_001",
    "teacher_002"
  ],
  mainTeacherId: "teacher_001"
}
```

Excel 出力設定に教師名を直接保存するのではなく、アプリケーションの教師データからメイン教師を取得する設計を予定しています。

---

## 将来の座席プランニング機能

座席エンジンは、将来的に新しい制約を追加できる構造を意識しています。

候補：

- 生徒ごとの座席希望
- 前方 / 後方の座席条件
- アクセシビリティ要件
- より高度な履歴制約
- 教師が設定する座席ルール
- より詳細な推薦理由
- 推薦候補の比較機能

---

# 📖 ドキュメント

詳細なドキュメントは `/docs` にあります。

最初に確認するファイル：

```text
docs/DOCUMENTATION_INDEX.md
```

主なドキュメント：

- `ARCHITECTURE.md`
- `FIRESTORE_SCHEMA.md`
- `DECISIONS.md`
- `SEATING_ENGINE.md`
- `PLANNING_ENGINE.md`
- `INTERNATIONALIZATION.md`
- `ROADMAP.md`
- `TODO.md`
- `CHANGELOG.md`
- `PROJECT_CONTEXT.md`

README は GitHub 上でプロジェクト全体を理解するための概要です。

より詳細な技術情報・設計判断は `/docs` にまとめています。

---

# 👤 Author

実用的なアプリケーション設計と学校・教室の実際のワークフローを学び実践するための、ポートフォリオ兼学習プロジェクトとして開発しています。

このプロジェクトで扱っている主な技術・設計テーマ：

- Vue アプリケーション設計
- Firebase Authentication
- Cloud Firestore データモデリング
- 複数学校コンテキスト
- ドメイン指向の service 設計
- 国際化
- 説明可能な推薦アルゴリズム
- 過去の座席履歴を利用した制約
- Excel ドキュメント生成
- 印刷レイアウト設定
- レスポンシブ UI
- 旧アーキテクチャからの段階的移行

Classroom Manager は、実用的な学校・クラス管理と教室プランニングのためのアプリケーションを目指して、継続的に開発しています。