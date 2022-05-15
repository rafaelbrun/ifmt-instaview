import type { NextPage } from "next";
import { BsFillFileEarmarkCheckFill } from "react-icons/bs";
import { CONSTANTS } from "../../src/constants";
import styles from "../../styles/Main.module.css";
import clientPromise from "../../mongodb";

const Main: NextPage = ({ accessToken }: any) => {
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

export async function getServerSideProps(context: any) {
  const { code } = context.query;

  const axios = require("axios");

  async function getUserTokenByCode() {
    try {
      const params = new URLSearchParams({ foo: "bar" });
      params.append("extraparam", "value");
      params.append("client_id", `${CONSTANTS.ClientId}`);
      params.append("client_secret", CONSTANTS.ClientSecret);
      params.append("redirect_uri", CONSTANTS.RedirectUri);
      params.append("grant_type", "authorization_code");
      params.append("code", code);

      return await axios.post(
        "https://api.instagram.com/oauth/access_token",
        params
      );
    } catch (e) {
      console.log(e);
    }
  }

  const responseData = await getUserTokenByCode();

  const longDurationToken = await axios.get(
    "https://graph.instagram.com/access_token" +
      "?grant_type=ig_exchange_token" +
      `&client_secret=${CONSTANTS.ClientSecret}` +
      `&access_token=${responseData?.data.access_token}`
  );


  return {
    props: {
      accessToken: longDurationToken
        ? longDurationToken.data.access_token
        : "O código de autorização foi usado! Tente novamente.",
    },
  };
}
export default Main;
