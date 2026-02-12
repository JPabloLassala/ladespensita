import { PDFViewer } from "@react-pdf/renderer";
import { ProductoEntity } from "@/Productos";
import { AlquilerSummaryPDF } from "./AlquilerSummaryPDF";
import { AlquilerFormType, AlquilerProductosFormType } from "../types";

export function AlquilerSummaryPdfViewer({
  form,
  alquilerForm,
  productos,
}: {
  form: AlquilerProductosFormType;
  alquilerForm: AlquilerFormType;
  productos: ProductoEntity[];
}) {
  return (
    <PDFViewer style={{ width: "100%", height: "80vh" }}>
      <AlquilerSummaryPDF
        alquilerForm={alquilerForm}
        productos={productos}
        alquilerProductos={form}
      />
    </PDFViewer>
  );
}
