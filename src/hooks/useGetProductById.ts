import { useEffect, useState } from "react";
import { IProduct } from "../interfaces";
import toast from "react-hot-toast";
import { generalService } from "../services";

export const useGetProductById = (id: string) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProductById = async () => {
    setIsLoading(true);
    setError(null)
    try {
      const response = await generalService.getProductById(id);
      setProduct(response?.data)
    } catch (error: any) {
      if(error?.status === 403) {
        setError("No estás autenticado")
        return toast.error("No estás autenticado")
      }
      setError(error?.message)
      toast.error(error?.message ?? "Ha ocurrido un error")
    } finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    getProductById();
  }, [])
  

  return {
    product,
    isLoading,
    error,
    getProductById
  }
};
