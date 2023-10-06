const createDoc = async (id: string, userId: string) => {
  return await fetch("http://localhost:3000/createDoc", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ id, userId }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    return res.json();
  });
};

//now create a function inside useEffect to update the delta object after each change
const updateDocument = async (id: string, newData: string) => {
  return await fetch("http://localhost:3000/updateDoc", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id, delta: newData }),
  }).then((res) => {
    console.log(res.json);
    res.json();
  });
};

const recentDocs = async (id: string, userId: string) => {
  return await fetch("http://localhost:3000/recentDocs", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, userId }),
  }).then((res) => {
    return res.json();
  });
};
const allDocs = async (id: string, userId: string) => {
  return await fetch("http://localhost:3000/allDocs", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ id, userId }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    return res.json();
  });
};

export { createDoc, updateDocument, recentDocs, allDocs };
