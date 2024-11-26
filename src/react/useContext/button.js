import { useContext } from "react";
import { ThemeContext } from "./context";

function Button(){
    const {theme, toggleTheme} = useContext(ThemeContext)
    return(
        <div>
            <p>{theme}</p>
            <button onClick={toggleTheme}>Change Theme</button>
        </div>
    )
}
export default Button
