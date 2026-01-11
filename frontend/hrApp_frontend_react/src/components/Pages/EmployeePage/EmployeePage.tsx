import { useEffect, useState } from "react";
import EmployeePersonalInfo from "./MyInfoPage/PersonalPage/EmployeePersonalInfo";
import MyInfoPage from "./MyInfoPage/MyInfoPage";
import { authService } from "../../../services/authService";
import { employeeService, type MyProfileDTO } from "../../../services/employeeService";
import { Box, CircularProgress } from "@mui/material";
export default function EmployeePage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [employee, setEmployee] = useState<MyProfileDTO | null>(null);
  const [loading, setLoading] = useState(true);

  const handleChange = (_event: any, newValue: number) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const user = authService.getCurrentUser();
      if (user?.id) {
        try {
          const data = await employeeService.getProfile(user.id);
          setEmployee(data);
        } catch (error) {
          console.error("Failed to load profile:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;

  return (
    <div>
      <MyInfoPage 
        selectedTab={selectedTab}
        handleChange={handleChange}
        employee={employee}
      />

      {selectedTab === 0 && <EmployeePersonalInfo  employee={employee} />}
      {/* {selectedTab === 1 && <EmployeeTimeOff />}
      {selectedTab === 2 && <EmployeePerformance />} */}
    </div>
  );
}
function setEmployee(data: MyProfileDTO) {
  throw new Error("Function not implemented.");
}

function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

