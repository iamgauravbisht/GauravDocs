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

const deleteDoc = async (id: string) => {
  return await fetch("http://localhost:3000/deleteDoc", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ id }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    return res.json();
  });
};

const updateDocument = async (id: string, newData: string) => {
  return await fetch("http://localhost:3000/updateDoc", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id, delta: newData }),
  }).then((res) => {
    res.json();
  });
};

const getRecentDocs = async (userId: string) => {
  return await fetch(`http://localhost:3000/recentDocs?userId=${userId}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    return res.json();
  });
};

const getAllDocs = async (userId: string) => {
  return await fetch(`http://localhost:3000/allDocs?userId=${userId}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    return res.json();
  });
};
const saveName = async (id: string, newData: string) => {
  return await fetch("http://localhost:3000/saveName", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id, title: newData }),
  }).then((res) => {
    res.json();
  });
};
const getAllUsers = async (id: string) => {
  return await fetch("http://localhost:3000/allUsers", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ id }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    return res.json();
  });
};
const addUsers = async (id: string, addUserId: string, rights: string) => {
  return await fetch("http://localhost:3000/shareDoc", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ id, addUserId, rights }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    return res.json();
  });
};
export {
  createDoc,
  updateDocument,
  getRecentDocs,
  getAllDocs,
  saveName,
  deleteDoc,
  getAllUsers,
  addUsers,
};
