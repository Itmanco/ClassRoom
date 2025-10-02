# 教室座席管理アプリ

このリポジトリには、教師が教室の座席配置を簡単に管理できるVue.jsアプリケーションが含まれています。生徒のリストを維持し、さまざまな座席表を保存・再編成し、以前の配置に基づいた制約を考慮して生徒をランダムに割り当てることができます。

---

## 🚀 機能

* **生徒リスト管理**: 全生徒のマスターリストを維持します。
* **タブベースのレイアウト**: 複数の座席配置をタブとして保存し、簡単に切り替えることができます。
* **座席の再編成**: 生徒が以前座った座席や隣り合った生徒の履歴を考慮して、現在の座席表をランダムに再編成します。
* **レイアウトの保存**: 生成されたランダムなレイアウト、または手動で調整されたレイアウトを新しいタブとして永続的に保存できます。
* **生徒情報の表示**: 座席の生徒をクリックすると、名前やひらがななどの詳細情報が表示されます。

---

## ⚠️ 開発状況と今後の予定

**本プロジェクトは現在開発中です。**

### 予定されている機能強化

* **生徒リストの編集**: 生徒リストの追加・削除・変更を可能にする機能。
* **コース管理の追加**: 複数の異なるコース（クラス）の座席リストを管理する機能。

### 重要な注意事項

* **座席配置を永続化（保存）するためのボタンは、ユーザーがログインするまで無効化**されています。データを永続的に保存するには、Firebase Authenticationによるログインが必要です。

---

## 📂 コンポーネント概要

アプリケーションは主に以下のVueコンポーネントで構成されています：

* **`ClassroomManager.vue`**:
    * このコンポーネントはアプリケーションの心臓部であり、座席管理ロジックのほとんどを処理します。
    * Firestoreとのデータのやり取り（生徒リストと座席配置のロード・保存）を担当します。
    * タブの管理、座席表の再編成、新しい座席レイアウトの保存といった主要な機能を提供します。
    * `MyClassroom`コンポーネントを子としてレンダリングします。
* **`MyClassroom.vue`**:
    * 座席の現在の配置を表示するためのプレゼンテーション用コンポーネントです。
    * `ClassroomManager`から座席データと教室のタイトルをプロパティとして受け取ります。
    * 座席を2つの列にグループ化して表示し、教室のホワイトボードをシミュレートします。
    * `StudentDesk`コンポーネントを子としてレンダリングします。
* **`StudentDesk.vue`**:
    * 教室内の個々の座席を表すコンポーネントです。
    * 座席に座っている生徒をレンダリングし、生徒の性別や空席かどうかによって異なるスタイルを適用します。
    * 生徒をクリックすると、その生徒の名前やひらがなを切り替えて表示します。
    * 1人の生徒が座っている座席の特別な視覚的調整を行います。

---

## 🛠️ 技術スタック

* **Vue.js**: フロントエンドフレームワーク。
* **Firebase Firestore**: リアルタイムデータベースで、生徒データと座席配置を永続化するために使用します。
* **Firebase Authentication**: ユーザー管理（匿名認証を含む）。

---

## ⚙️ セットアップ

プロジェクトをローカルで実行するには、以下の手順に従ってください：

1.  **リポジトリのクローン**:
    ```bash
    git clone [https://github.com/your-username/classroom-seating-app.git](https://github.com/your-username/classroom-seating-app.git)
    cd classroom-seating-app
    ```
2.  **依存関係のインストール**:
    ```bash
    npm install
    # または yarn install
    ```
3.  **Firebaseの設定**:
    * Firebaseプロジェクトを作成します。
    * Firestoreデータベースと認証を有効にします（匿名認証が設定されていることを確認してください）。
    * Firebaseプロジェクトの設定から、WebアプリのSDK設定を取得します。
    * `firebase-init.js`ファイルに必要なFirebase設定を追加し、`db`、`auth`、`authReadyPromise`、`appId`をエクスポートしていることを確認します。`__app_id`や`__firebase_config`のようなグローバル変数は環境によって自動的に提供される場合があります。
4.  **開発サーバーの起動**:
    ```bash
    npm run serve
    # または yarn serve
    ```
    これで、アプリケーションがブラウザで実行されます（通常は`http://localhost:8080/`）。

---

# Classroom Seating Management App

This repository contains a Vue.js application designed to help teachers easily manage classroom seating arrangements. It allows you to maintain a list of students, save and reorganize various seating charts, and randomly assign students while considering constraints based on previous placements.

---

## 🚀 Features

* **Student List Management**: Maintain a master list of all your students.
* **Tab-Based Layouts**: Save multiple seating arrangements as tabs for easy switching and recall.
* **Seating Randomization**: Randomly reorganize the current seating chart, taking into account historical data (e.g., preventing students from sitting in the same desk or with the same deskmate repeatedly).
* **Layout Saving**: Permanently save generated random layouts or manually adjusted layouts as new tabs.
* **Student Info Display**: Click on a student in a desk to toggle a detailed view of their name and hiragana.

---

## ⚠️ Development Status and Future Plans

**This project is currently under active development.**

### Planned Enhancements

* **Student List Modification**: Functionality to allow adding, removing, and editing the list of students.
* **Course Management**: Functionality to manage and organize seating lists for multiple, different courses (classes).

### Important Note

* The button to **persist (save) a new classroom reorganization is disabled until the user logs in**. Permanent data saving requires authentication via Firebase Authentication.

---

## 📂 Component Overview

The application is primarily structured around the following Vue components:

* **`ClassroomManager.vue`**:
    * This is the heart of the application, handling most of the seating management logic.
    * It's responsible for data interaction with Firestore (loading and saving student lists and seating arrangements).
    * It provides the main functionalities like managing tabs, randomizing seating charts, and saving new layouts.
    * It renders the `MyClassroom` component as its child.
* **`MyClassroom.vue`**:
    * A presentational component responsible for displaying the current arrangement of desks.
    * It receives desk data and the classroom title as props from `ClassroomManager`.
    * It arranges and displays the desks, typically in rows of two, and simulates a whiteboard at the front of the classroom.
    * It renders `StudentDesk` components as its children.
* **`StudentDesk.vue`**:
    * Represents a single desk within the classroom layout.
    * It's responsible for rendering the students occupying the desk, applying different styles based on student gender or if the slot is empty.
    * It handles click interactions on students to toggle the display of their detailed information (name and hiragana).
    * Includes specific visual adjustments for desks occupied by only one student.

---

## 🛠️ Technical Stack

* **Vue.js**: Frontend framework for building the user interface.
* **Firebase Firestore**: Used as a real-time database to persist student data and seating arrangements.
* **Firebase Authentication**: For user management, including anonymous authentication.

---

## ⚙️ Setup

To get this project running locally, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/your-username/classroom-seating-app.git](https://github.com/your-username/classroom-seating-app.git)
    cd classroom-seating-app
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    # or yarn install
    ```
3.  **Firebase Configuration**:
    * Create a Firebase project.
    * Enable Firestore Database and Authentication (ensure anonymous authentication is enabled).
    * From your Firebase project settings, get your Web app SDK configuration.
    * Add the necessary Firebase configuration to your `firebase-init.js` file, ensuring it exports `db`, `auth`, `authReadyPromise`, and `appId`. Note that global variables like `__app_id` and `__firebase_config` might be automatically provided by your environment.
4.  **Start the development server**:
    ```bash
    npm run serve
    # or yarn serve
    ```
    The application should now be running in your browser, typically at `http://localhost:8080/`.

---