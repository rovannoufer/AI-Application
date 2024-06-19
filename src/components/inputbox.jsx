import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const InputBox = ({name, type, id, value, placeholder, icon, disable= false}) => {


    const [password, setpassword] = useState(false);
       return(
        <>
        
        <div className="relative mb-4">
           <input 
             name={name}
             type={type == "password" ? password ? "text" : "password" : type}
             placeholder={placeholder}
             defaultValue={value}
             disabled = {disable}
             id={id}
             className=" block mx-auto w-[100%] rounded-md p-4 bg-grey pl-12 border border-grey focus:bg-transparent placeholder:text-black "
           />
           <FontAwesomeIcon icon={ icon } className="absolute left-4 top-1/2 -translate-y-1/2" />
        {
            type == "password" ?
            <FontAwesomeIcon icon = { password ? faEye : faEyeSlash } 
            className="absolute  right-4 cursor-pointer left-1rem top-1/2 left-[auto] -translate-y-1/2 " 
            onClick={() => setpassword(value => !value)}
            />
            :""
        }
        </div>
        </>
       );
}

export default InputBox