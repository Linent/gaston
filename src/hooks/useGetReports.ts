import { useEffect, useState } from "react";
import { IProduct } from "../interfaces";
import toast from "react-hot-toast";
import { generalService } from "../services";

export const useGetReports = () => {
  const [movementReport, setMovementReport] = useState<{
    data: any;
    isLoading: boolean;
    error: string | null;
  }>({ data: null, isLoading: false, error: null });
  const [salesReport, setSalesReport] = useState<{
    data: any;
    isLoading: boolean;
    error: string | null;
  }>({ data: null, isLoading: false, error: null });
  const [salesCostReport, setSalesCostReport] = useState<{
    data: any;
    isLoading: boolean;
    error: string | null;
  }>({ data: null, isLoading: false, error: null });

  const getMovementReport = async (fechaInicio?: any, fechaFin?: any) => {
    setMovementReport((prevState) => ({ ...prevState, isLoading: true }));
    try {
      const response = await generalService.getMovementReport(
        new Date(fechaInicio).toDateString(),
        new Date(fechaFin).toDateString()
      );
      setMovementReport({ data: response.data, isLoading: false, error: null });
    } catch (error: any) {
      setMovementReport({ data: null, isLoading: false, error: error.message });
    }
  };

  const getSalesReport = async () => {
    setSalesReport((prevState) => ({ ...prevState, isLoading: true }));
    try {
      const response = await generalService.getSalesReportDate();
      setSalesReport({ data: response.data, isLoading: false, error: null });
    } catch (error: any) {
      setSalesReport({ data: null, isLoading: false, error: error.message });
    }
  };

  const getSalesCostReport = async () => {
    setSalesCostReport((prevState) => ({ ...prevState, isLoading: true }));
    try {
      const response = await generalService.getSalesCostReport();
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
