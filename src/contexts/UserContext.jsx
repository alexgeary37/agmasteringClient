// context.js
import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // useEffect(() => {
  //   console.log("user:", user);
  // }, [user]);

  const updateUser = (user) => {
    setUser(user);
    if (user === null) {
      localStorage.removeItem("user");
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
