import type {NextPage}
from "next";
import {BsFillFileEarmarkCheckFill} from "react-icons/bs";
import styles from "../../styles/Main.module.css";

const Main: NextPage = ({accessToken} : any) => {

  return (
    <div className={
      styles.container
    }>
      <h4>Aqui está seu token de acesso</h4>
      <div className={
        styles.iconContainer
      }>
        <input readOnly
          className={
            styles.inputText
          }
          value={accessToken}/>
        <div className={
            styles.hovertext
          }
          data-hover="Copiar token"
          onClick={
            () => {
              navigator.clipboard.writeText(accessToken);
            }
        }>
          <BsFillFileEarmarkCheckFill className={
            styles.icon
          }/>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context : any) {
  const {code} = context.query;

  const axios = require('axios');

  async function getUserTokenByCode() {
    try {
      const params = new URLSearchParams({foo: 'bar'});
      params.append('extraparam', 'value');
      params.append('client_id', '1281631838991518');
      params.append('client_secret', '406c81da7ddf02a38b192ecec5a11a29');
      params.append('redirect_uri', 'https://ifmt-instaview.vercel.app/main/');
      params.append('grant_type', 'authorization_code');
      params.append('code', code);

      const response = await axios.post('https://api.instagram.com/oauth/access_token', params);
      // console.log(response.data);
      return response;

    } catch (e) {
      console.log(e);
    }
  }

  const responseData = await getUserTokenByCode();

  const longDurationToken =  await axios.get(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=406c81da7ddf02a38b192ecec5a11a29&access_token=${responseData?.data.access_token}`)
 
  // console.log(longDurationToken.data);



  // const { app, database } = require('../../firebaseConfig');
  // const{ collection, addDoc } = require('firebase/firestore');

  // const dbInstance = collection(database, 'tokens');

  // addDoc(dbInstance, {
  //       username: 'teste',
  //       token: code
  // })

  return {
    props: {
      // accessToken: responseData? responseData.data.access_token : 'O código de autorização foi usado! Tente novamente.'
      accessToken: longDurationToken? longDurationToken.data.access_token : 'O código de autorização foi usado! Tente novamente.'
    }};
}
export default Main;
