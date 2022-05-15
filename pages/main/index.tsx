import type { NextPage } from "next";
import { BsFillFileEarmarkCheckFill } from "react-icons/bs";
import { CONSTANTS } from "../../src/constants";
import styles from "../../styles/Main.module.css";
import { createUser, getUsers } from "../../utils/users";


const Main: NextPage = ({ accessToken, users }: any) => {
  return (
    <div className={styles.container}>
      <div>
        <h4>Usuários cadastrados no Banco de dados</h4>
        <ul>
          {users.map((user: any) => (
            <li key={user.id}>
              {user.username} {'->'} {user.token} {'->'} {user.expiration_date}
            </li>
          ))}
        </ul>
      </div>
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

export async function getStaticProps(context: any) {
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

  // const username = await axios.get(`https://graph.instagram.com/me?fields=id,username&access_token=longDurationToken?.data.access_token}`)

  // const FiftyNineDaysFromNow = new Date(new Date().setDate(new Date().getDate() + 59)).toLocaleDateString();
  
  // const createNewUser =  async () => {
  //   const user = await createUser({
  //     username: username?.data.username,
  //     token: longDurationToken?.data.access_token,
  //     expiration_date:  FiftyNineDaysFromNow
  //   });
  //   return user;
  // }

  // await createNewUser();
  // const users = await getUsers(); 

  return {
    props: {
      accessToken: longDurationToken
        ? longDurationToken.data.access_token
        : "O código de autorização foi usado! Tente novamente.",
      // users,
    },
  };
}
export default Main;
