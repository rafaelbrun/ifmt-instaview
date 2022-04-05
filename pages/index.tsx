import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>IFMT Insta View</title>
        <meta name="description" content="Aplicação de gerenciamento IFMT Insta View" />
        <link rel="icon" href="/assets/ifmt_logo.svg" />
      </Head>
      <div className={styles.main}>
        <Link href="/insta-api" passHref>
          <h2 className={styles.button}>Gerar chave de acesso</h2>
        </Link>
        <Link href="/" passHref>
          <h2 className={styles.button}>Gerenciar</h2>
        </Link>
      </div>
      <footer className={styles.footer}>
        <a
          href="https://ifmtcba.edupage.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>
            <Image
              src="/assets/ifmt_logo.svg"
              alt="Ufmt Logo"
              width={80}
              height={80}
            />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
