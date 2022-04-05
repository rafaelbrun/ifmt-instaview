import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [isGerenciarClicked, setIsGerenciarClicked] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();

  const handleSubmit = (event: any) => {
    const loginForm = document.forms[0];
    const username = event.target.uname.value;
    const password = event.target.pass.value;

    if (signIn(username, password)) {
      router.push("/manage");
    } else {
      alert("Credenciais inválidas");
      loginForm.reset();
    }

    event.preventDefault();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>IFMT Insta View</title>
        <meta
          name="description"
          content="Aplicação de gerenciamento IFMT Insta View"
        />
        <link rel="icon" href="/assets/ifmt_logo.svg" />
      </Head>
      <div className={styles.headerContainer}>
        <h1 className={styles.headerTitle}>IFMT Insta View</h1>
        <h3 className={styles.headerDescription}>
          Desenvolvido na disciplina de Sistemas Embarcados 01/2022
        </h3>
      </div>
      <div className={styles.main}>
        <Link href="/insta-api" passHref>
          <h2 className={styles.button}>Gerar chave de acesso</h2>
        </Link>
        <div onClick={() => setIsGerenciarClicked(true)}>
          <h2 className={styles.button}>Gerenciar</h2>
        </div>
      </div>
      {isGerenciarClicked ? (
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <label>Username </label>
              <input
                className={styles.inputText}
                type="text"
                name="uname"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Password </label>
              <input
                className={styles.inputPassword}
                type="password"
                name="pass"
                required
              />
            </div>
            <div className={styles.buttonContainer}>
              <input
                className={styles.inputSubmit}
                type="submit"
                value="Autenticar"
              />
            </div>
          </form>
        </div>
      ) : (
        <div></div>
      )}
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
