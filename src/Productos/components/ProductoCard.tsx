import { ProductoEntity } from "../entities";
import { ProductoContainer, ProductoImage, ProductoParagraph, ProductoTitle } from "./UI";

export function ProductoCard({
  producto,
  disabled,
  dimmed,
}: {
  producto: ProductoEntity;
  disabled: boolean;
  dimmed: boolean;
}) {
  return (
    <ProductoContainer disabled={disabled} dimmed={dimmed}>
      <a href="#">
        <ProductoImage src="http://localhost:3000/images/21.jpg" alt="Producto" />
        <div className="px-4 py-3">
          <ProductoTitle title={producto.nombre} />
          <ProductoParagraph text={`Unidades metro lineal:${producto.unidadesMetroLineal}`} />
          <ProductoParagraph text={`Altura: ${producto.medidas.altura}cm`} />
          {producto.medidas.diametro && (
            <ProductoParagraph text={`Diametro: ${producto.medidas.diametro}cm`} />
          )}
          {producto.medidas.ancho && (
            <ProductoParagraph text={`Ancho: ${producto.medidas.ancho}cm`} />
          )}
          {producto.medidas.profundidad && (
            <ProductoParagraph text={`Profundidad: {producto.medidas.profundidad}cm`} />
          )}
          <ProductoParagraph raw>
            Unidades disponibles: <span className="font-bold">0</span>
          </ProductoParagraph>
        </div>
      </a>
    </ProductoContainer>
  );
}
