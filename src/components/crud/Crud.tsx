import { useState } from "react";
import styles from "../../styles/Manage.module.css";

export default Crud;

interface IAccessToken {
  arroba: string;
  accessToken: string;
}

function Crud() {
  const [isEditing, setIsEditing] = useState(-1);
  const [accessTokens, setAccessTokens] = useState([
    {
      accessToken: "1243123412",
      arroba: "ifmt",
    },
    {
      accessToken: "124ad3123412",
      arroba: "ifmtcba",
    },
  ] as IAccessToken[]);

  const deleteToken = (index: number) => {
    if (confirm(`Deletar Token de @${accessTokens[index].arroba}?`) == true) {
      accessTokens.splice(index, 1);
      setAccessTokens([...accessTokens]);
    }
  };

  const handleEditing = (accessToken: IAccessToken, index: number) => {
    setIsEditing(index);
    const { arroba, token } = document.forms[0];
    arroba.value = accessToken.arroba;
    token.value = accessToken.accessToken;
  };

  const handleSubmit = (event: any) => {
    const tokenForm = document.forms[0];
    const newToken: IAccessToken = {
      arroba: event.target.arroba.value,
      accessToken: event.target.token.value,
    };
    if (isEditing == -1) {
      accessTokens.push(newToken);
    } else {
      accessTokens[isEditing] = newToken;
      setIsEditing(-1);
    }
    setAccessTokens([...accessTokens]);
    event.preventDefault();
    tokenForm.reset();
  };

  return (
    <div style={{ minWidth: "25rem" }}>
      <h1>Access Tokens</h1>
      <div>
        <form
          id="tokenForm"
          onSubmit={handleSubmit}
          className={styles.manageTokenContainer}
        >
          <div className={styles.inputContainer}>
            <label>@</label>
            <input
              className={styles.inputText}
              type="text"
              name="arroba"
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Access Token</label>
            <input
              className={styles.inputText}
              type="text"
              name="token"
              required
            />
          </div>
          <input
            className={styles.inputSubmit}
            type="submit"
            value={isEditing == -1 ? "Adicionar" : "Salvar"}
          />
        </form>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "25%" }}>@</th>
            <th style={{ width: "70%" }}>Access Token</th>
            <th style={{ width: "5%" }}></th>
          </tr>
        </thead>
        <tbody>
          {accessTokens &&
            accessTokens.map((accessToken: IAccessToken, index: number) => (
              <tr key={accessToken.accessToken}>
                <td>{accessToken.arroba}</td>
                <td>{accessToken.accessToken}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <div
                    onClick={() => handleEditing(accessToken, index)}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Edit
                  </div>
                  <button
                    className="btn btn-sm btn-danger btn-delete-token"
                    onClick={() => deleteToken(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          {!accessTokens && (
            <tr>
              <td colSpan={4} className="text-center">
                <div className="spinner-border spinner-border-lg align-center"></div>
              </td>
            </tr>
          )}
          {accessTokens && !accessTokens.length && (
            <tr>
              <td colSpan={4} className="text-center">
                <div className="p-2">Sem Tokens</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
