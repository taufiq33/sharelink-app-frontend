import { RouterProvider } from "react-router-dom";
import { AppProvider } from "./components/AppProvider";
import router from "./router";

function App() {
  return (
    <AppProvider defaultTheme={"system"} storageKey={"theme"}>
      <RouterProvider router={router}> </RouterProvider>
    </AppProvider>
  );
}

export default App;
