import imageCompression from "browser-image-compression";

/**
 * Compacta e converte uma imagem para Base64.
 * @param file Arquivo de imagem original
 * @returns String em Base64 representando a imagem compactada
 */
export const fileToBase64 = async (file: File): Promise<string> => {
    // Define os limites
    const LIMITE_MAXIMO_MB = 1.5; // Máximo permitido para evitar erro 413
    const MAX_SIZE = 1500; // Tamanho máximo da imagem (px)
    const QUALITY = 0.7; // Qualidade da compressão (70%)

    if (file.size > LIMITE_MAXIMO_MB * 1024 * 1024) {
        throw new Error("O arquivo excede o tamanho máximo permitido de 1.5MB.");
    }

    try {
        // Compacta a imagem caso seja muito grande
        const compressedFile = await imageCompression(file, {
            maxSizeMB: 0.25, // Reduz para aproximadamente 250KB
            maxWidthOrHeight: MAX_SIZE, // Ajusta dimensões
            useWebWorker: true,
        });

        return await resizeAndCompress(compressedFile, MAX_SIZE, QUALITY);
    } catch (error) {
        console.error("Erro ao compactar imagem:", error);
        throw error;
    }
};

/**
 * Redimensiona a imagem e aplica compressão adicional.
 * @param file Arquivo de imagem a ser processado
 * @param maxSize Tamanho máximo permitido (px)
 * @param quality Qualidade da compressão (0 a 1)
 * @returns String em Base64 representando a imagem comprimida
 */
const resizeAndCompress = (file: File, maxSize: number, quality: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                let width = img.width;
                let height = img.height;

                // Ajusta tamanho proporcionalmente
                if (width > height && width > maxSize) {
                    height = Math.round((height * maxSize) / width);
                    width = maxSize;
                } else if (height > maxSize) {
                    width = Math.round((width * maxSize) / height);
                    height = maxSize;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    reject(new Error("Falha ao obter o contexto do canvas"));
                    return;
                }

                ctx.drawImage(img, 0, 0, width, height);

                // Comprime e retorna a imagem em Base64
                const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
                resolve(compressedDataUrl);
            };

            img.onerror = () => reject(new Error("Falha ao carregar a imagem"));
            img.src = event.target?.result as string;
        };

        reader.onerror = () => reject(new Error("Falha ao ler o arquivo"));
        reader.readAsDataURL(file);
    });
};
