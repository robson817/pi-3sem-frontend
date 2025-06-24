import { CardProps } from "./RecomendacaoCard";

export default function IngredientCard({ title }: CardProps) {
    return (
        <div className="w-full sm:w-auto">
            <div className={`bg-white border-[#22577A] flex flex-col items-center rounded-3xl border-2 gap-4 p-4`}>
                <p className="font-semibold text-[#22577A] text-lg sm:text-2xl text-center">{title}</p>
            </div>
        </div>
    );
}
