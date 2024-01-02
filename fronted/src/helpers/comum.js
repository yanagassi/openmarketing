import LP_LEADS_REQUEST_TYPE from "../constants/LPLeadsRequestType";
import FUNNEL_STAGES from "../constants/FunnelStageConstants";

function Redirect(url, openInNewTab = false) {
  if (!url) {
    return;
  }

  if (openInNewTab) {
    window.open(url, "_blank");
  } else {
    window.location.href = url;
  }
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
  const { KEY_VALUE, FORM_LP_INPUT_TYPES } = require("../constants/LpContants");
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

function isMobile() {
  const userAgent = navigator.userAgent;
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

  return mobileRegex.test(userAgent) || window.innerWidth < 768; // Adapte o valor conforme necessário
}

function ParseDate(dataString) {
  // Cria um objeto de data a partir da string fornecida
  const data = new Date(dataString);

  // Obtém o dia, mês e ano
  const dia = data.getDate();
  const mes = data.getMonth() + 1; // Os meses começam do zero, então somamos 1
  const ano = data.getFullYear();

  // Obtém as horas e minutos
  const horas = data.getHours();
  const minutos = data.getMinutes();

  // Formata a data e hora no formato desejado
  const dataFormatada = `${dia}/${mes}/${ano} ${
    "0" + horas.toString().slice(-1)
  }:${"0" + minutos.toString().slice(-1)}`;

  // Obtém o deslocamento de fuso horário em minutos
  const offsetMinutos = data.getTimezoneOffset();

  // Calcula o deslocamento em horas
  const offsetHoras = offsetMinutos / 60;

  // Formata o deslocamento no formato GMT
  const offsetFormatado =
    offsetHoras > 0 ? `GMT -${offsetHoras}` : `GMT +${Math.abs(offsetHoras)}`;

  // Adiciona o deslocamento de fuso horário à string final
  const resultadoFinal = `${dataFormatada} (${offsetFormatado})`;

  return resultadoFinal;
}

const CompareDateToSortDesc = (a, b) => {
  const dateA = new Date(a.event_date);
  const dateB = new Date(b.event_date);

  return dateB - dateA;
};

const FunilStageCalc = (lead) => {
  try {
    if (lead[LP_LEADS_REQUEST_TYPE.SALE]) {
      return FUNNEL_STAGES.SALES;
    } else if (lead[LP_LEADS_REQUEST_TYPE.OPPORTUNITY]) {
      return FUNNEL_STAGES.OPPORTUNYTIES;
    } else return FUNNEL_STAGES.LEADS;
  } catch {
    return FUNNEL_STAGES.VISITANTES;
  }
};

const applyRuleOfThree = (value, oldReference, newReference) => {
  if (!value) return;
  return (value * newReference) / oldReference;
};

const applyFunctionToXY = (data, oldReference, newReferenceWidth) => {
  const newReferenceHeight = 1000;

  return data.properties.map((section) => {
    const adjustedSection = {
      ...section,
      items: section.items.map((item) => {
        const width = applyRuleOfThree(
          item.content.width,
          oldReference,
          newReferenceWidth
        );
        const height = applyRuleOfThree(
          item.content.height,
          oldReference,
          newReferenceWidth
        );

        const posX = applyRuleOfThree(
          item.position.x,
          oldReference,
          newReferenceWidth
        );
        const posY = applyRuleOfThree(
          item.position.y,
          oldReference,
          newReferenceHeight
        );

        return {
          ...item,
          content: {
            ...item.content,
            width: width,
            height: height,
          },

          position: {
            x: posX,
            y: posY,
          },
        };
      }),
    };

    return adjustedSection;
  });
};

const VerifyTypeForm = (array, searchString) => {
  const valid = array.includes(searchString);
  if (valid) {
    return {
      type: "default",
      key: searchString,
    };
  }
  return {
    type: "modify",
    key: "select",
  };
};

function validDateRegex(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}$/;

  return regex.test(dateString);
}

export default {
  Redirect,
  GenerateId,
  AjustarPixels,
  GerarRGBA,
  HexToRGBA,
  FunilStageCalc,
  GetLabelData,
  CompareDateToSortDesc,
  isMobile,
  ParseDate,
  validDateRegex,
  applyFunctionToXY,
  VerifyTypeForm,
};
