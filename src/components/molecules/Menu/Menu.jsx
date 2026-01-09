import { TabContext, TabList } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer.jsx";
export default function DashboardTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Top tab route mapping
  const topRoutes = {
    "/dashboard/home": "1",
    "/dashboard/admin": "2",
    "/dashboard/productlistview": "10",
    "/dashboard/accounts": "3",
    "/dashboard/faqs": "4",
    "/dashboard/help": "5",
  };

  // ✅ Left tab route mapping
  const leftRoutes = {
    "/dashboard/books": "6",
    "/dashboard/gifts": "7",
    "/dashboard/clothing": "8",
    "/dashboard/sports": "9",
  };

  const [topValue, setTopValue] = useState("1");
  const [leftValue, setLeftValue] = useState("6");

  // ✅ Sync tab selection with URL
  useEffect(() => {
    const path = location.pathname;
    console.log("Current Path:", path);

    if (topRoutes[path]) {
      setTopValue(topRoutes[path]);
      console.log("Top Tab Value Set To:", topRoutes[path]);
        setLeftValue(false); // ✅ nothing selected on left
      return;
    }

    if (leftRoutes[path]) {
      setLeftValue(leftRoutes[path]);
      console.log("Left Tab Value Set To:", leftRoutes[path]);
      setTopValue(false); // ✅ nothing selected on top
      return;
    } 
  }, [location.pathname]);

  const handleTopChange = (e, newValue) => {
    setTopValue(newValue);
    console.log("Top Tab Changed To:", newValue);
    const tabToRoute = {
      "1": "home",
      "2": "admin",
      "10": "productlistview",
      "3": "accounts",
      "4": "faqs",
      "5": "help",
    };

    navigate(tabToRoute[newValue]);
  };

  const handleLeftChange = (e, newValue) => {
    setLeftValue(newValue);
    console.log("Left Tab Changed To:", newValue);
    const tabToRoute = {
      "6": "books",
      "7": "gifts",
      "8": "clothing",
      "9": "sports",
    };

   navigate(tabToRoute[newValue]);
  };

  return (
    
    <Box  sx={{
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    bgcolor: "background.paper"
   
  }}>
      {/* ✅ TOP TAB CONTEXT */}
      <TabContext value={topValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", ml: "200px" }}>
          <TabList
            orientation="horizontal"
            variant="scrollable"
            onChange={handleTopChange}
          >
            <Tab label="Home" value="1" />
            <Tab label="Admin" value="2" />
            <Tab label="Product List View" value="10" />
            <Tab label="Accounts" value="3" />
            <Tab label="FAQ's" value="4" />
            <Tab label="Help" value="5" />
          </TabList>
        </Box>
      </TabContext>

      {/* ✅ LEFT TAB CONTEXT */}
      <Box sx={{ display: "flex", height: "calc(100vh - 48px)" }}>
        <TabContext value={leftValue}>
          <Box sx={{ width: 200, borderRight: 1, borderColor: "divider" }}>
            <TabList
              orientation="vertical"
              variant="scrollable"
              onChange={handleLeftChange}
            >
              <Tab label="Books" value="6" />
              <Tab label="Gifts" value="7" />
              <Tab label="Clothing" value="8" />
              <Tab label="Sports" value="9" />
            </TabList>
          </Box>
        </TabContext>

        {/* ✅ ROUTE CONTENT */}
        <Box sx={{ flex: 1, p: 2, ml: "20px", overflowY: "auto" }}>
          <Outlet />
        </Box>
        
      </Box>
     
    </Box>
  );
}
