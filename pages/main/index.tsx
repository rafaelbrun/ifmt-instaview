import type { NextPage } from "next";
import { useRouter } from "next/router";
import { BsFillFileEarmarkCheckFill } from "react-icons/bs";
import styles from "../../styles/Main.module.css";

const Main: NextPage = () => {
  const router = useRouter();  
  const accessToken = router.query.code as string;
  console.log(accessToken);
  
  return (
    <div className={styles.container}>
      <h4>Aqui está seu token de acesso</h4>
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

export default Main;
