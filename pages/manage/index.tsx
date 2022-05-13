import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Crud from "../../src/components/crud/Crud";
import { useAuth } from "../../src/hooks/useAuth";
import styles from "../../styles/Manage.module.css";

const Manage: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!login) {
      router.push("/");
    }
    setLoading(false);
  }, [login, loading, router]);

  if (loading) {
    return <div></div>;
  } else {
    return (
      <div className={styles.container}>
        <Crud />
      </div>
    );
  }
};

export default Manage;
