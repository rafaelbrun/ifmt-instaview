import type { NextPage } from "next";
import { useRouter } from "next/router";
import { BsFillFileEarmarkCheckFill } from "react-icons/bs";
import styles from "../../styles/Main.module.css";

const Main: NextPage = ({code}: any) => {
  const accessToken = code;

  return (
    <div className={styles.container}>
      <h4>Aqui está seu token de acesso adsfsda</h4>
      <div className={styles.iconContainer}>
        <input readOnly className={styles.inputText} value={accessToken} />
        <div
          className={styles.hovertext}
          data-hover="Copiar token"
          onClick={() => {
            navigator.clipboard.writeText(accessToken);
          }}
        >
          <BsFillFileEarmarkCheckFill className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { code } = context.query;
  // const { app, database } = require('../../firebaseConfig');
  // const{ collection, addDoc } = require('firebase/firestore');



  // const dbInstance = collection(database, 'tokens');

  //   addDoc(dbInstance, {
  //       username: 'teste',
  //       token: code
  //   })

  return {
    props: {
      code,
    },
  };
}
export default Main;
