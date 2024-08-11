import { Table, TableCell, TableRow, TableBody } from "@/components/ui/table";

const Informations = ({ anime }) => {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className="font-sm">
            <strong>Genre </strong>
          </TableCell>
          <TableCell>{anime.Genre ? anime.Genre : "-"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-sm">
            <strong>Durasi </strong>
          </TableCell>
          <TableCell>{anime.Durasi ? anime.Durasi : "-"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-sm">
            <strong>Produser </strong>
          </TableCell>
          <TableCell>{anime.Produser ? anime.Produser : "-"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-sm">
            <strong>Status </strong>
          </TableCell>
          <TableCell>{anime.Status ? anime.Status : "-"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-sm">
            <strong>Studio </strong>
          </TableCell>
          <TableCell>{anime.Studio ? anime.Studio : "-"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-sm">
            <strong>Tanggal Rilis </strong>
          </TableCell>
          <TableCell>{anime["Tanggal Rilis"] ? anime["Tanggal Rilis"] : "-"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-sm">
            <strong>Total Episode </strong>
          </TableCell>
          <TableCell>{anime["Total Episode"] ? anime["Total Episode"] : "-"}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Informations;
