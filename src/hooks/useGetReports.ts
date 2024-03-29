import { useEffect, useState } from "react";
import { IMovementsInform, IProduct } from "../interfaces";
import toast from "react-hot-toast";
import { generalService } from "../services";
import { INFORM_MOVEMENTS } from "../constants/inform-movements.constant";
import { CostReport, SalesReport } from "../interfaces/inform.interface";

export const useGetReports = () => {
  const [movementReport, setMovementReport] = useState<{
    data: IMovementsInform[];
    isLoading: boolean;
    error: string | null;
  }>({ data: [], isLoading: false, error: null });
  const [salesReport, setSalesReport] = useState<{
    data: SalesReport | null;
    isLoading: boolean;
    error: string | null;
  }>({ data: null, isLoading: false, error: null });
  const [salesCostReport, setSalesCostReport] = useState<{
    data: CostReport | null;
    isLoading: boolean;
    error: string | null;
  }>({ data: null, isLoading: false, error: null });

  const getMovementReport = async (startDate?: string, endDate?: string) => {
    setMovementReport((prevState) => ({ ...prevState, isLoading: true }));
    try {
      const response = await generalService.getMovementReport(
        startDate,
        endDate
      );
      setMovementReport({ data: response.data, isLoading: false, error: null });
    } catch (error: any) {
      setMovementReport({ data: [], isLoading: false, error: error.message });
    }
  };

  const getSalesReport = async (startDate?: string, endDate?: string) => {
    setSalesReport((prevState) => ({ ...prevState, isLoading: true }));
    try {
      const response = await generalService.getSalesReport(startDate, endDate);

      setSalesReport({ data: response.data, isLoading: false, error: null });
    } catch (error: any) {
      setSalesReport({ data: null, isLoading: false, error: error.message });
    }
  };

  const getSalesCostReport = async (productId: string | number) => {
    setSalesCostReport((prevState) => ({ ...prevState, isLoading: true }));
    try {
      const response = await generalService.getSalesCostReport(productId);
      setSalesCostReport({
        data: response.data,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      setSalesCostReport({
        data: null,
        isLoading: false,
        error: error.message,
      });
    }
  };

  return {
    movementReport,
    salesReport,
    salesCostReport,
    getMovementReport,
    getSalesCostReport,
    getSalesReport,
  };
};
