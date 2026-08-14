# 📚 Classroom Manager

[English](README.md) | **日本語**

Classroom Manager は、学校データの管理と、説明可能な座席表の作成を目的とした Vue 3 + Firebase のWebアプリケーションです。

学校・クラスのコンテキストを明確に管理し、Firestore によるリアルタイムデータ更新、英語・日本語の多言語UI、そして教師が最終判断を行える座席推薦機能を備えています。

## デモ

GitHub Pages へのデプロイに対応しています。現在のドキュメント更新後、公開版を更新する予定です。

## 現在の実装状況

現在、以下の機能を実装しています。

- Firebase Authentication による認証とセッション維持
- Firestore によるユーザープロフィール管理
- 複数学校への対応とアクティブな学校の切り替え
- 学校が割り当てられていないユーザー専用画面
- 生徒、コース、建物、教室、クラスの管理
- Class Workspace によるクラス単位の管理
- クラスへの生徒登録
- 説明可能な座席推薦エンジン
- 教室をイメージした座席表表示
- 教室ごとの教師用机の位置設定
- Excel（`.xlsx`）形式での座席表出力
- 英語・日本語UI
- ブラウザ言語に応じた初期言語設定
- 小さい画面に対応したレスポンシブナビゲーション
- GitHub Pages へのデプロイ機能

現在、旧 `ClassroomPage.vue` は移行期間のため残しています。

旧ページにあった必要な機能は新しいワークフローへ移行しており、今後はこのページを削除し、Dashboard/Home ページへ置き換える予定です。

## プロジェクトの設計方針

Classroom Manager では、以下の原則を重視しています。

1. **学校のコンテキストを明確にする。**  
   学校に属するデータには必ず `schoolId` を使用します。

2. **クラスに関する操作はクラス内で行う。**  
   生徒登録や座席表は Class Workspace にまとめています。

3. **削除よりアーカイブを優先する。**  
   過去の座席表や登録情報との関連を保持します。

4. **システムが決定するのではなく、教師に提案する。**  
   座席エンジンは候補と理由を提示し、最終判断は教師が行います。

5. **ドメインロジックとUIを分離する。**  
   Firestore へのアクセスはサービス層に、座席エンジンは Vue から独立したロジックとして実装しています。

6. **多言語対応をアーキテクチャの一部として扱う。**  
   新しいユーザー向けテキストには Vue I18n を使用します。

## 主なワークフロー

```text
認証済みユーザー
└── アクティブな学校
    ├── 生徒
    ├── コース
    ├── 建物
    ├── 教室
    └── クラス
        └── Class Workspace
            ├── 概要
            ├── 生徒 / 登録
            └── 座席表
                ├── 手動配置
                ├── 座席推薦エンジン
                ├── 教室レイアウト表示
                └── Excel 出力
```

## 機能

### 認証とユーザープロフィール

- Firebase のメールアドレス・パスワード認証
- アプリ起動時の認証状態復元
- Firestore からのユーザープロフィール読み込み
- プロフィール編集
- ログアウト
- 学校が割り当てられていないユーザーへの専用画面

Firebase のパスワードを変更しても、すでに認証済みのクライアントセッションが即座に無効になるとは限りません。通常の Firebase Authentication のセッション動作に従います。

### 複数学校への対応

ユーザープロフィールには、複数の学校と現在選択中の学校を保持できます。

```js
{
  activeSchool: "school_japan",
  schools: ["school_japan"],
  role: "admin"
}
```

アプリケーションはユーザーが利用可能な学校を読み込み、School Selector からアクティブな学校を変更できます。

学校を変更すると、異なる学校のデータが混在しないようにクラス関連の状態もリセットされます。

現在、学校への所属情報はユーザープロフィールを基準にしています。より強力なサーバー側の所属・権限管理は今後実装する予定です。

### 生徒管理

- 生徒の作成・編集
- 生徒検索
- 生徒のアーカイブ
- Firestore のリアルタイム更新
- 安定した生徒ID
- 学校単位でのデータ管理

### コース管理

- コースの作成・編集
- コースのアーカイブ
- 安定したコースコード
- 学校単位でのデータ管理

### 建物・教室管理

建物では学校施設を管理します。

教室には以下の情報を設定できます。

- 教室コード・名称
- 建物
- 階
- 教室番号
- 机の数
- 1つの机あたりの座席数
- 自動計算される定員
- 有効 / アーカイブ状態
- 教師用机の位置

教師用机の位置は以下から選択できます。

```text
front-left
front-right
back-left
back-right
```

Room Management では、教室レイアウトのプレビューも確認できます。

### クラス管理

クラスは、コースや教室などの情報を関連付けます。

主な情報：

- コース
- 教室
- 年度
- 学期
- 有効 / アーカイブ状態

**Manage Class** から Class Workspace を開きます。

### Class Workspace

Class Workspace では、クラスに属する操作を1か所にまとめています。

```text
Class Workspace
├── Overview
├── Students
│   └── EnrollmentManager
└── Seating Plans
    └── SeatingPlanManager
```

`EnrollmentManager` と `SeatingPlanManager` は `classId` を受け取ることで、Class Workspace 内の埋め込みモードとして動作できます。

### 座席表

座席表では以下の機能を利用できます。

- 手動での座席割り当て
- 順番による自動割り当て
- 過去の座席表履歴
- 座席表の編集
- 座席表のアーカイブ
- 教室をイメージしたレイアウト表示
- `seatsPerDesk` に応じた机単位の座席グループ
- ホワイトボードと教室前方の表示
- 教室設定に基づく教師用机の位置
- 複数の座席推薦候補
- 保存済み座席表の Excel 出力

### 座席推薦エンジン

Vue や Firebase から独立した座席エンジンが、過去の座席履歴を評価します。

現在の優先順位は以下です。

1. 過去と同じ机のメンバーを避ける
2. 過去と同じ机を避ける
3. 過去とまったく同じ座席を避ける
4. 上記の条件が同じ場合はランダムで比較する

エンジンは、候補、条件ごとの件数、違反情報、品質情報、探索結果などを構造化データとして返します。

翻訳はエンジン内部ではなく、UI側で行います。

### Excel 座席表出力

`src/services/seatingPlanExportService.js` では `xlsx-js-style` を使用し、保存済みの座席表から印刷可能な `.xlsx` ファイルを生成します。

出力には以下が含まれます。

- 座席表タイトル
- クラス・教室情報
- 座席表の日付
- ホワイトボード
- 教師用机の位置
- 机ごとのグループ
- 生徒名
- 印刷向けに調整されたコンパクトな間隔
- 横向きのページ設定
- クラスと出力日時を使用したファイル名

単純なデータ一覧ではなく、実際の教室レイアウトに近い形で出力することを目的としています。

## 多言語対応

現在対応している言語：

- English (`en`)
- 日本語 (`ja`)

初期表示言語は以下の順番で決定します。

1. 以前に保存された言語設定があれば、それを使用
2. なければブラウザの言語を確認
3. ブラウザ言語が日本語の場合は日本語
4. 対応していない言語の場合は英語

アプリ内で言語を変更すると、その設定は保存されます。

詳細は [`docs/INTERNATIONALIZATION.md`](docs/INTERNATIONALIZATION.md) を参照してください。

## Firestore データモデル

主な構造：

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

詳細は [`docs/FIRESTORE_SCHEMA.md`](docs/FIRESTORE_SCHEMA.md) を参照してください。

## アーキテクチャ

```text
App.vue
├── Firebase 認証 / セッション
├── ユーザープロフィール
├── 利用可能な学校
├── アクティブな学校
├── メインナビゲーション
└── 選択中のクラス
        │
        ▼
Vue pages / components
        │
        ├── Class Workspace
        ├── Room preview
        └── Seating-plan UI
        │
        ▼
Service layer
        │
        ├── Firestore services
        └── Excel export service
        │
        ▼
Firebase / xlsx-js-style

SeatingPlanManager
        │
        ▼
Framework-independent Seating Engine
```

詳細は [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) を参照してください。

## 使用技術

### フロントエンド

- Vue 3.2
- Vue CLI 5
- JavaScript
- CSS
- Vue I18n 11

### バックエンド / サービス

- Firebase Authentication
- Cloud Firestore
- ローカル管理・移行スクリプト用 Firebase Admin SDK

### Excel 出力

- `xlsx-js-style`

### 開発・デプロイ

- ESLint
- Babel
- Git
- GitHub
- `gh-pages`

## プロジェクト構成

```text
src/
├── App.vue
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
├── i18n/
│   ├── index.js
│   └── locales/
├── pages/
│   ├── BuildingManager.vue
│   ├── ClassManager.vue
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
```

`ClassroomPage.vue`、`MyClassroom.vue`、`StudentDesk.vue`、`classroomService.js` は、新しいアーキテクチャへの移行期間中のため、現在も残している旧コードです。

## ローカル環境でのセットアップ

### 必要なもの

- Node.js と npm
- Firebase プロジェクト
- Firebase Web 設定
- ローカル管理スクリプトを使用する場合は Firebase Admin のサービスアカウント認証情報

依存パッケージをインストール：

```bash
npm install
```

開発サーバーを起動：

```bash
npm run serve
```

Lint：

```bash
npm run lint
```

本番ビルド：

```bash
npm run build
```

## Firebase 設定と機密情報

フロントエンドの Firebase 設定は `src/firebase-init.js` で初期化されます。

管理用スクリプトでは、ローカルの以下のファイルを使用します。

```text
serviceAccountKey.json
```

このファイルは絶対に Git にコミットしないでください。

リポジトリの `.gitignore` では、以下も除外しています。

```text
serviceAccountKey.json
school-structure.json
```

管理用スクリプトをコミットする前に、認証情報がソースコードへ直接書き込まれていないことを確認してください。

## 管理用スクリプト

### 生徒データの移行

```bash
npm run migrate:students
```

旧形式の生徒データを学校単位の構造へ移行します。

### 学校構造のエクスポート

```bash
node scripts/exportSchoolStructure.js
```

Firestore の学校・ユーザー構造をローカルで確認・記録するために使用します。

生成される `school-structure.json` は意図的に Git 管理対象外としています。

### テスト学校

```bash
node scripts/createTestSchool.js
```

複数学校機能をテストするための開発用ユーティリティです。

実行前に、対象となるIDや環境を確認してください。

## デプロイ

`package.json` には以下のデプロイスクリプトがあります。

```json
"deploy": "npm run build && gh-pages -d dist"
```

通常のデプロイ手順：

```bash
npm run lint
npm run build
npm run deploy
```

公開前に GitHub Pages の base/public path 設定を確認し、デプロイ後に Firebase Authentication を含む主要機能を実際の公開環境でテストします。

## 現在の技術的課題

- 旧 `ClassroomPage.vue` がまだ残っており、既知の lint warning があります。
- Dashboard への移行が完了するまで、一部の旧コンポーネント・サービスが残っています。
- 本番環境向けに console 出力・エラー処理をさらに整理する必要があります。
- Vue CLI の vendor bundle が推奨サイズを超えています。
- 自動テストはまだ十分に導入されていません。
- 学校への所属・ロールに基づく権限管理を強化する必要があります。
- ブラウザ標準およびサービス層のバリデーションメッセージは完全には多言語化されていません。
- Vue CLI は旧世代のツールチェーンであり、将来的に Vite への移行を検討します。

## 次のマイルストーン

次の大きな開発段階は以下です。

1. Excel 座席表出力の最終確認
2. 更新したドキュメントとアプリケーションの公開
3. 旧 Classroom ページの削除
4. ホームページを Dashboard に置き換える
5. 学校・クラスの活動概要やメッセージ機能を段階的に追加する

詳細は [`docs/ROADMAP.md`](docs/ROADMAP.md) および [`docs/TODO.md`](docs/TODO.md) を参照してください。

## ドキュメント

プロジェクト全体のドキュメント一覧は [`docs/DOCUMENTATION_INDEX.md`](docs/DOCUMENTATION_INDEX.md) を参照してください。

## 開発者

このプロジェクトは、実践的な Vue / Firebase アプリケーション設計、学校ドメインのデータモデリング、多言語対応、そして説明可能な座席計画ロジックを学習・実践するためのポートフォリオプロジェクトとして開発しています。