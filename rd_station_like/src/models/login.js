import api from "../service/api";

async function Login(email, password) {
  try {
    const { data } = await api.post("/api/users/login", {
      email,
      password,
    });

    return {
      status: data.token ? true : false,
      token: data.token,
      msg: data.msg,
    };
  } catch (error) {
    if (error.response) {
      // A resposta de erro possui dados
      return {
        status: false,
        msg: error.response.data.msg,
      };
    } else if (error.request) {
      // A requisição foi feita, mas não houve resposta
      return {
        status: false,
        msg: "Não foi possível conectar ao servidor.",
      };
    } else {
      // Ocorreu um erro ao configurar a requisição
      return {
        status: false,
        msg: "Ocorreu um erro ao processar a requisição.",
      };
    }
  }
}

export default {
  Login,
};
