async function fetchData() {
  try {
    const response = await fetch("../db/usersDb.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

async function getRandomNum() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const num = Math.ceil(Math.random() * 10);
      if (num <= 5) return resolve("heads");
      reject("tail");
    });
  });
}
