
export const getClientes = async () => {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  if (!username || !password) throw new Error("Usuario no autenticado");

  const basicAuth = btoa(`${username}:${password}`);

  const response = await axios.post("http://localhost:8080/api/clientes", {
    headers: {
      Authorization: `Basic ${basicAuth}`,
    },
  });

  return response.data;
};
