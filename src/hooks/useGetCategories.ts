import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { generalService } from "../services";
import { ICategory } from "../interfaces";

export const useGetCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await generalService.getCategories();
      setCategories(response?.data);
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
    getCategories();
  }, []);

  return {
    categories,
    isLoading,
    error,
    getCategories,
  };
};
