import client from "../client/client";


export type CreateEmployee = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthday: string;
    jobTitle: string;
    department: string;
    manager: string | null;
    hiringDate: string;
    startingDate: string;
    image?: string | null;
};

export type Employee = CreateEmployee & {
    id: number;
};

export type EmployeeDTO = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    department: string;
};

export interface ManagerDTO {
    id: number;
    fullName: string;
}

export type PagedResponse<T> = {
    items: T[];
    total: number;
};

export const employeeService = {
    getAll: async (page: number, size: number): Promise<PagedResponse<EmployeeDTO>> => {
        const response = await client.get("/employee/all", {
            params: { page, size }
        });
        return response.data;
    },

    add: async (data: FormData): Promise<void> => {
        await client.post("/employee/create", data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    },
    deleteEmployees: async (selectedIds: string[]): Promise<void> => {
        await client.delete("/employee/delete", {
            data: selectedIds
        });
    },
    getAllManagers: async (): Promise<ManagerDTO[]> => {
        const response = await client.get("/employee/managers/all");
        return response.data;
    },

};

