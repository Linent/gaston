import { useEffect, useState } from "react";
import { IProduct } from "../interfaces";
import toast from "react-hot-toast";
import { productService } from "../services";

export const useGetMovements = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProducts = async () => {
    setIsLoading(true);
    setError(null)
    try {
      const response = await productService.getProducts();
      setProducts(response?.data)
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
    getProducts();
  }, [])
  

  return {
    products,
    isLoading,
    error,
    getProducts
  }
};
