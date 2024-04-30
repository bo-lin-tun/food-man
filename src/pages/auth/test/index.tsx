import { useSession, signOut } from "next-auth/react";
import React from "react";

const Test = () => {
  const { data: session } = useSession();

  // if (session?.user.role !== "ADMIN") {
  //   return <div>You are not admin!</div>;
  // }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div>{JSON.stringify(session)}</div>
      <div style={{ marginTop: "1rem" }}>
        <button onClick={async () => signOut()} style={{ padding: "4px 8px" }}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Test;
