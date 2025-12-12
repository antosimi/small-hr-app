import { useState } from "react";
import EmployeePersonalInfo from "./MyInfoPage/PersonalPage/EmployeePersonalInfo";
import MyInfoPage from "./MyInfoPage/MyInfoPage";
export default function EmployeePage() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (_event: any, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <MyInfoPage 
        selectedTab={selectedTab}
        handleChange={handleChange}
        imageSrc="https://scontent.fotp3-3.fna.fbcdn.net/v/t39.30808-6/468534346_18048427001088313_7417213641216044675_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=GkkcYfxw2QIQ7kNvwG1bXIM&_nc_oc=Adlid3AY_nedz3WlCIQpDGC64FHRuKSTENpuvuH_J1jDfwtv5ZoZPFdVLB-5fu_-wPSMKYI3KAAUgtCpIUmd0ZTw&_nc_zt=23&_nc_ht=scontent.fotp3-3.fna&_nc_gid=sbMmViXlvX1B6TuLxamsmA&oh=00_AflOX7S__4gONK8MOkFw0DUpopkyUfK9Y8L1bNjYdnhH7A&oe=6941E15B"
      />

      {/* CONȚINUT TAB-URI */}
      {selectedTab === 0 && <EmployeePersonalInfo />}
      {/* {selectedTab === 1 && <EmployeeTimeOff />}
      {selectedTab === 2 && <EmployeePerformance />} */}
    </div>
  );
}
