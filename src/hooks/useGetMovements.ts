import { useEffect, useState } from "react";
import { IProduct } from "../interfaces";
import toast from "react-hot-toast";
import { generalService } from "../services";

export const useGetMovements = () => {
  const [movementReport, setMovementReport] = useState<any[]>([]);
  const [salesReport, setSalesReport] = useState<any>();
  const [salesCostReport, setSalesCostReport] = useState<any>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [movementReport, salesReport, salesCostReport] = await Promise.all([
        generalService.getMovementReport(),
        generalService.getSalesReport(),
        generalService.getSalesCostReport(),
      ]);
      setMovementReport(movementReport.data);
      setSalesReport(salesReport.data);
      setSalesCostReport(salesCostReport.data);
    } catch (error: any) {
      if (error?.status === 403) {
        setError("No estás autenticado");
        return toast.error("No estás autenticado");
      }
      setError(error?.message);
      toast.error(error?.message ?? "Ha ocurrido un error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    isLoading,
    error,
    getData,
    movementReport,
    salesReport,
    salesCostReport,
  };
};
