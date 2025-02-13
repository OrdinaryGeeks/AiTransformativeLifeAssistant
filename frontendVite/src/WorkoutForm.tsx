import { useState } from "react"

export default function Workoutform({}){

const [firstName, setFirstName ] = useState("")
const [lastName, setLastName] = useState ("")
const handleSubmit = (e) =>{alert(firstName, lastName)}  
return (

<div>workout form 
<form> 
{
    firstName
} 
is here
<input
        type="text"
        name="firstname"
        id="firstname"
        value={firstName}
        onChange={(e) =>
            setFirstName(e.target.value)
                }
        placeholder="Enter First Name"
        required
        />
<input
        type="text"
        name="lastname"
        id="lastname"
        value={lastName}
        onChange={(e) =>
            setLastName(e.target.value)
                }
        placeholder="Enter Last Name"
        required
        />        
    <button
        type="submit"
        value="Submit"
        onClick={(e) => handleSubmit(e)}
    ></button> 
    </form>
</div>
)

}