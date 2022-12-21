import "./App.css";
import { Route, Routes } from "react-router-dom";
import AllShelvies from "./pages/AllShelvies";
import AddNewBook from "./pages/AddNewBook";


function App() {

    return (
        <Routes>
            <Route exact path="/" element={<AllShelvies/>}/>
            <Route path="/search" element={<AddNewBook/>}/>
        </Routes>
        
    );
}

export default App;
