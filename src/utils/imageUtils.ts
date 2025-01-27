import imageCompression from "browser-image-compression";

/**
 * Compacta um arquivo de imagem e o converte para Base64.
 * @param file Arquivo a ser compactado e convertido
 * @returns String em Base64 representando a imagem
 */
export const fileToBase64 = async (file: File): Promise<string> => {
  // Configurações de compactação
  const options = {
    maxSizeMB: 1, // Tamanho máximo do arquivo em MB
    maxWidthOrHeight: 1024, // Largura ou altura máxima
    useWebWorker: true, // Usa Web Workers para melhorar o desempenho
  };

  try {
    // Compacta a imagem
    const compressedFile = await imageCompression(file, options);

    // Converte para Base64
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.readAsDataURL(compressedFile);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  } catch (error) {
    console.error("Erro ao compactar imagem:", error);
    throw error;
  }
};