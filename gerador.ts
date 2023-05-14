// Importar as bibliotecas necessárias
import { createCanvas, loadImage, registerFont } from "canvas";

// Definir o tamanho do canvas
const WIDTH = 500;
const HEIGHT = 500;

// Definir a fonte usada nos memes
registerFont("./fonts/impact.ttf", { family: "Impact" });

// Definir a função para criar o meme
export const createMeme = async (imageURL: string, topText: string, bottomText: string) => {
  // Carregar a imagem do URL fornecido
  const image = await loadImage(imageURL);

  // Criar um novo canvas e desenhar a imagem
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, WIDTH, HEIGHT);

  // Definir as propriedades do texto superior
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  ctx.textAlign = "center";
  ctx.font = "48px Impact";

  // Adicionar o texto superior ao canvas
  const topTextX = WIDTH / 2;
  const topTextY = 60;
  const topTextMaxWidth = WIDTH - 40;
  const topTextLines = breakTextIntoLines(ctx, topText, topTextMaxWidth);
  for (let i = 0; i < topTextLines.length; i++) {
    const line = topTextLines[i];
    ctx.strokeText(line, topTextX, topTextY + i * 60);
    ctx.fillText(line, topTextX, topTextY + i * 60);
  }

  // Definir as propriedades do texto inferior
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  ctx.textAlign = "center";
  ctx.font = "48px Impact";

  // Adicionar o texto inferior ao canvas
  const bottomTextX = WIDTH / 2;
  const bottomTextY = HEIGHT - 60;
  const bottomTextMaxWidth = WIDTH - 40;
  const bottomTextLines = breakTextIntoLines(ctx, bottomText, bottomTextMaxWidth);
  for (let i = 0; i < bottomTextLines.length; i++) {
    const line = bottomTextLines[i];
    ctx.strokeText(line, bottomTextX, bottomTextY - i * 60);
    ctx.fillText(line, bottomTextX, bottomTextY - i * 60);
  }

  // Retornar o canvas como uma imagem
  return canvas.toBuffer("image/png");
};

// Definir a função para quebra de linha automática
const breakTextIntoLines = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
  const words = text.split(" ");
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }

  lines.push(currentLine);
  return lines;
};
