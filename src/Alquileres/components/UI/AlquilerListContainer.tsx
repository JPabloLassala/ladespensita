import { Flex } from "@mantine/core";

export function AlquilerListContainer({ children }: { children: React.ReactNode }) {
  return (
    <Flex direction="column" w="23rem" gap="md">
      {children}
    </Flex>
    // <div className="overflow-y-auto flex flex-col xl:max-w-1/3 min-w-64">
    //   <div className="flex flex-row justify-between items-center">
    //     <p className="text-2xl font-semibold font-body">Alquileres</p>
    //     <Button
    //       label="Nuevo alquiler"
    //       className="bg-blue-600 hover:bg-blue-500 text-sm text-white"
    //       onClick={onStartCreateNewAlquiler}
    //     />
    //   </div>
    //   <div className="grow shrink overflow-y-auto flex flex-col gap-2 rounded-md shadow-md mt-4 mb-8">
    //     {children}
    //   </div>
    // </div>
  );
}
