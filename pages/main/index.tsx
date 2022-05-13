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
  const axios = require('axios');

  
  const FormData = require('form-data');
  const form = new FormData();
  form.append('client_id', 1281631838991518)
  form.append('code', code );
  form.append('client_secret', '406c81da7ddf02a38b192ecec5a11a29');
  form.append('redirect_uri', 'https://ifmt-instaview.vercel.app/main/');
  form.append('grant_type', 'authorization_code' );
  // form.append('Content-Type', 'application/x-www-form-urlencoded')

  axios.post( 'http://api.instagram.com/oauth/access_token', {
    data: form,
    headers: form.getHeaders()

  }
  ).then(function (response: any) {
    console.log(response.data.form);
  }).catch(function (error: any) {
    console.log(error);
  });



//   console.log(form);
  

//   const http = require('http');

// const request = http.request({
//   method: 'post',
//   host: 'http://api.instagram.com',
//   path: '/oauth/access_token',
//   headers: form.getHeaders()
// });

// form.pipe(request);

// request.on('response', function(res: any) {
//   console.log(res.statusCode);
// });



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
