import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "【Miel】メールアドレスの確認",
      verificationEmailBody: (createCode) =>
        `Mielをご利用いただき、ありがとうございます。

アカウントの作成を完了するため、以下の確認コードをアプリ内でご入力ください。

確認コード: ${createCode()}

※このコードの有効期限は24時間です。
※このメールにお心当たりがない場合は、このメールを無視してください。

何かご不明な点がございましたら、サポートまでお気軽にお問い合わせください。

Mielチーム`,
    },
  },
});
