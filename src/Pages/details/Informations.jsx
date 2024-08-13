import { Table, TableCell, TableRow, TableBody } from "@/components/ui/table";

const Informations = ({ anime }) => {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <strong>Genre </strong>
          </TableCell>
          <TableCell className="text-wrap">{anime.Genre ? anime.Genre.split(",").join(" ") : "-"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Durasi </strong>
          </TableCell>
          <TableCell className="text-wrap">{anime.Durasi ? anime.Durasi : "-"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Produser </strong>
          </TableCell>
          <TableCell className="text-wrap">{anime.Produser ? anime.Produser : "-"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Status </strong>
          </TableCell>
          <TableCell className="text-wrap">{anime.Status ? anime.Status : "-"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Studio </strong>
          </TableCell>
          <TableCell className="text-wrap">{anime.Studio ? anime.Studio : "-"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Tanggal Rilis </strong>
          </TableCell>
          <TableCell className="text-wrap">{anime["Tanggal Rilis"] ? anime["Tanggal Rilis"] : "-"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong className="text-nowrap">Total Episode </strong>
          </TableCell>
          <TableCell className="text-wrap">{anime["Total Episode"] ? anime["Total Episode"] : "-"}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Informations;
