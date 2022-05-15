import type { NextPage } from "next";
import { createUser, getUsers } from "../../utils/users";


const TestDB: NextPage = ({users}: any) => {
  return (
    <div>
      <h1>Test DB</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            {user.username} {'->'} {user.token} 
          </li> 
        ))}
      </ul>
    </div>
  );
};

export default TestDB;

export async function getServerSideProps(context: any) {

 

  const createNewUser =  async () => {
    const user = await createUser({
      username: 'stevejobs',
      token: '666666666666',
      expiration_date: new Date(new Date().setDate(new Date().getDate() + 59)).toLocaleDateString()
    });
    return user;
  }

  const newUser = await createNewUser();
  console.log(newUser);
  const users = await getUsers(); 



  return {
    props: {
      users
    }
  };
  


}

