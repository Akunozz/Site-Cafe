interface BotaoProps {
    text: string;
}

function Botao ({text}: BotaoProps) {
    return (
        <div className="flex justify-center">
        <button 
        type="submit"
        className="w-1/2 flex justify-center bg-azuljava text-white py-3 font-medium rounded-lg hover:bg-laranjajava transition duration-500">
        {text}
        </button>
        </div>
    );
}

export default Botao;