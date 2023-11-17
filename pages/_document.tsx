import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" />
                <script src="https://cdn.tiny.cloud/1/asaevq5vbq6crpxwfcd0aqhu68acp7hiauz8m58or35mu253/tinymce/6/tinymce.min.js" referrerPolicy="origin"></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
