import { useEffect, useState } from "react";
import { IMovementType } from "../interfaces";
import toast from "react-hot-toast";
import { generalService } from "../services";

export const useGetMovementTypes = () => {
  const [movementTypes, setMovementTypes] = useState<IMovementType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMovementTypes = async () => {
    setIsLoading(true);
    setError(null)
    try {
      const response = await generalService.getMovementTypes();
      setMovementTypes(response?.data)
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
    getMovementTypes();
  }, [])
  

  return {
    movementTypes,
    isLoading,
    error,
    getMovementTypes
  }
};
