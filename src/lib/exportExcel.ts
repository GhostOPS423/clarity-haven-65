import * as XLSX from "xlsx";
import { getProcessos, getLancamentos, getPrazos } from "./store";

const BRAND = "Angeline Sociedade de Advogados";

function autoFitColumns(rows: Record<string, any>[]): { wch: number }[] {
  if (!rows.length) return [];
  const keys = Object.keys(rows[0]);
  return keys.map((k) => {
    const headerLen = k.length;
    const maxCell = rows.reduce((max, r) => {
      const v = r[k];
      const len = v == null ? 0 : String(v).length;
      return len > max ? len : max;
    }, 0);
    return { wch: Math.min(Math.max(headerLen, maxCell) + 2, 50) };
  });
}

function buildSheet(rows: Record<string, any>[], emptyRow: Record<string, any>, title: string) {
  const data = rows.length ? rows : [emptyRow];
  const generatedAt = new Date().toLocaleString("pt-BR");

  const ws = XLSX.utils.aoa_to_sheet([
    [BRAND],
    [title],
    [`Gerado em: ${generatedAt}`],
    [],
  ]);
  XLSX.utils.sheet_add_json(ws, data, { origin: "A5" });

  const cols = autoFitColumns(data);
  ws["!cols"] = cols;

  // Style brand header
  const headerCells = ["A1", "A2", "A3"];
  headerCells.forEach((addr, i) => {
    const cell = ws[addr];
    if (cell) cell.s = { font: { bold: i === 0, sz: i === 0 ? 14 : 11 } };
  });

  // Bold the data header row (row 5)
  const range = XLSX.utils.decode_range(ws["!ref"] || "A1");
  for (let c = range.s.c; c <= range.e.c; c++) {
    const addr = XLSX.utils.encode_cell({ r: 4, c });
    const cell = ws[addr];
    if (cell) cell.s = { font: { bold: true } };
  }

  return ws;
}

export function exportToExcel() {
  const processos = getProcessos().map((p) => ({
    "Nome do Cliente": p.cliente,
    "Nº do Processo": p.numero,
    Tribunal: p.tribunal || "",
    Status: p.status,
    "Valor da Causa": p.valor,
  }));

  const lancamentos = getLancamentos()
    .slice()
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .map((l) => ({
      Data: new Date(l.data).toLocaleDateString("pt-BR"),
      Descrição: l.descricao,
      Categoria: l.tipo === "receita" ? "Receita" : "Despesa",
      Valor: l.valor,
    }));

  const prazos = getPrazos()
    .slice()
    .sort((a, b) => a.data.localeCompare(b.data))
    .map((p) => ({
      Data: new Date(p.data).toLocaleDateString("pt-BR"),
      Título: p.titulo,
      Detalhes: p.detalhe || "",
      Tipo: p.tipo === "fatal" ? "Prazo Fatal" : "Normal",
    }));

  const wb = XLSX.utils.book_new();
  wb.Props = {
    Title: `${BRAND} — Relatório`,
    Author: BRAND,
    CreatedDate: new Date(),
  };

  XLSX.utils.book_append_sheet(
    wb,
    buildSheet(
      processos,
      { "Nome do Cliente": "", "Nº do Processo": "", Tribunal: "", Status: "", "Valor da Causa": "" },
      "Relatório de Processos"
    ),
    "Processos"
  );

  XLSX.utils.book_append_sheet(
    wb,
    buildSheet(
      lancamentos,
      { Data: "", Descrição: "", Categoria: "", Valor: "" },
      "Relatório Financeiro"
    ),
    "Financeiro"
  );

  XLSX.utils.book_append_sheet(
    wb,
    buildSheet(
      prazos,
      { Data: "", Título: "", Detalhes: "", Tipo: "" },
      "Relatório de Prazos"
    ),
    "Prazos"
  );

  const date = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `angeline-relatorio-${date}.xlsx`);
}
