import { Categorie } from "@/types/Categorie";
import CategorieRender from "./CategorieRender";

type Props = {
    categories: Categorie[];
}

export default function CategorieList({ categories }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((categorie) => (
                <CategorieRender key={categorie.idCategoria} categorie={categorie} />
            ))}
        </div>
    );
}
