import { Badge, Card, Group, Image, Overlay, Text } from "@mantine/core";
import { ProductoEntity } from "../entities";

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
    <Card shadow="sm" padding="md" radius="md" withBorder mt={3}>
      <Card.Section>
        <Image src="http://localhost:3000/images/21.jpg" height={160} alt="Norway" />
        {disabled && <Overlay color="#000" backgroundOpacity={0.35} blur={5} />}
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{producto.nombre}</Text>
        <Badge color="pink">On Sale</Badge>
      </Group>
    </Card>
  );

  // <ProductoContainer disabled={disabled} dimmed={dimmed}>
  //   <a href="#">
  //     <ProductoImage src="http://localhost:3000/images/21.jpg" alt="Producto" />
  //     <div className="px-4 py-3">
  //       <ProductoTitle title={producto.nombre} />
  //       <ProductoParagraph text={`Unidades metro lineal:${producto.unidadesMetroLineal}`} />
  //       <ProductoParagraph text={`Altura: ${producto.medidas.altura}cm`} />
  //       {producto.medidas.diametro && (
  //         <ProductoParagraph text={`Diametro: ${producto.medidas.diametro}cm`} />
  //       )}
  //       {producto.medidas.ancho && (
  //         <ProductoParagraph text={`Ancho: ${producto.medidas.ancho}cm`} />
  //       )}
  //       {producto.medidas.profundidad && (
  //         <ProductoParagraph text={`Profundidad: {producto.medidas.profundidad}cm`} />
  //       )}
  //       <ProductoParagraph raw>
  //         Unidades disponibles: <span className="font-bold">0</span>
  //       </ProductoParagraph>
  //     </div>
  //   </a>
  // </ProductoContainer>
}
