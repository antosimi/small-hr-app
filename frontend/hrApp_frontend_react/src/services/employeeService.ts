import client from "../client/client";

export interface Employee {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthday: string;
    jobTitle: string;
    department: string;
    manager: string| null;
    hiringDate: string;
    startingDate: string;
    image?: string | null;
}

export interface ManagerDTO {
    id: number;
    fullName: string;
}

export const employeeService = {
    getAll: async (): Promise<Employee[]> => {
        const response = await client.get("/employee/all");
        return response.data;
    },

    add: async (data: FormData): Promise<Employee> => {
        const response = await client.post("/employee/create", data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    },
    getAllManagers: async (): Promise<ManagerDTO[]> => {
        const response = await client.get("/employee/managers/all");
        return response.data;
    },

};

