import client from "../client/client";


export type EmployeeCreationDTO = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthday: string;
    jobTitle: string;
    department: string;
    managerId: string | null;
    hiringDate: string;
    startingDate: string;
    username: string,
    password: string;        
    roles: number[];
};

export type Employee = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthday: string;
    jobTitle: string;
    department: string;
    managerId: string | null;
    hiringDate: string;
    startingDate: string;
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

export type MyProfileDTO = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    jobTitle: string;
    department: string;
    managerName: string;
    hiringDate: string;
    startingDate: string;
    image?: string;
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

    getById: async (id: string): Promise<Employee> => {
        const response = await client.get(`/employee/${id}`);
        return response.data;
    },

    getProfile: async (id: string): Promise<MyProfileDTO> => {
        const response = await client.get(`/employee/profile/${id}`);
        return response.data;
    },

};

