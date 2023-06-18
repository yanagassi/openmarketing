function Redirect(url) {
  if (!url) {
    return;
  }
  window.location.href = url;
}

function GenerateId(length = 10) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

function AjustarPixels(valorEmPixels) {
  // Obter a largura da janela do navegador
  var larguraDaJanela =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  // Calcular a proporção entre a largura da janela e uma largura de referência desejada
  // (por exemplo, 1920 pixels)
  var proporcao = larguraDaJanela / 1920;

  // Ajustar o valor em pixels de acordo com a proporção
  var valorAjustado = Math.round(valorEmPixels * proporcao);

  return valorAjustado;
}

function GerarRGBA() {
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  var alpha = Math.random().toFixed(2); // Gera um valor de transparência entre 0 e 1 com 2 casas decimais

  var rgba = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

  // Converter RGBA para Hexadecimal
  var hex =
    "#" + ((1 << 24) | (red << 16) | (green << 8) | blue).toString(16).slice(1);

  return { rgba: rgba, hex: hex };
}

function HexToRGBA(hex, opacity) {
  // Remove o símbolo # do início do valor hexadecimal
  hex = hex.replace("#", "");

  // Divide o valor hexadecimal em componentes de cor (R, G, B)
  const red = parseInt(hex.substring(0, 2), 16);
  const green = parseInt(hex.substring(2, 4), 16);
  const blue = parseInt(hex.substring(4, 6), 16);

  // Retorna a cor com opacidade no formato RGBA
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

function GetLabelData(key) {
  const { KEY_VALUE } = require("../constants/LpContants");
  const final = Object.keys(KEY_VALUE).filter((e) => {
    if (e === key) {
      return e;
    }
  });

  if (final.length > 0) {
    return KEY_VALUE[final];
  }
  return {
    label: key,
    type: "text",
  };
}

export default {
  Redirect,
  GenerateId,
  AjustarPixels,
  GerarRGBA,
  HexToRGBA,
  GetLabelData,
};
