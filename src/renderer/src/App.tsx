
import UserRoutes from "@renderer/router/router";
import Header from "./components/header";
import Footer from "./components/footer";

function App(): JSX.Element {
  

  return (
    <div className="flex flex-col h-full justify-center items-center bg-white" >
        <Header></Header>
        <UserRoutes />
        <Footer></Footer>
    </div>
  )
}

export default App
