import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Home.module.css';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

type Props = {
  // Add custom props here
}

async function getMessages(locale?: string) {
  return await import(`../../public/locales/${locale}/common.json`);
}

export default function Home(
  // _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [currentLang, setLang] = useState("");
  const router = useRouter();
  const { t, i18n } = useTranslation('common');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale: newLocale })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const clientSideLanguageChange = (newLocale: string) => {
    // i18n.changeLanguage(newLocale);
  }

  const onClickLogLang = () => {
    console.log('current locale:', router.locale);
  }

  useEffect(() => {
    (async () => {
      const msg = await getMessages(router.locale);
      console.log('msg: ', msg);
      setLang(msg["current_language"])
    })();
  }, []);

  console.log('current lang: ', router.locale);
  return (
    <div className={styles.container}>
      <Head>
        <title>LIFF Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to LIFF App developed by <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          <Link href="/profile">
            Click To See My Profile
          </Link>
        </p>

        <div className={styles.grid}>
          <p className={styles.card}>{t('current_language', { language: router.locale })}</p>

          <p className={styles.card}>{currentLang}</p>

          <Link href="/" locale={router.locale == "en" ? "th" : "en"} className={styles.card}>
            Switch to {router.locale == "en" ? "Thai" : "English"}
          </Link>

          <button className={styles.card} onClick={onClickLogLang}>
            Log current Locale
          </button>

          <button className={styles.card} onClick={() => onToggleLanguageClick("th")}>
            server Toggle
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
// export const getStaticProps: GetStaticProps<Props> = async ({
//   locale,
// }) => ({
//   props: {
//     ...(await serverSideTranslations(locale ?? 'en', [
//       'common',
//     ])),
//   },
// })
