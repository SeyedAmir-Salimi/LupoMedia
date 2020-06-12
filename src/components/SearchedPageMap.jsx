import React, { useContext } from 'react'
import { SocialMediaContext } from './Context';
import PM from '../Images/man.jpg'
import PW from '../Images/woman.jpg'
import { FcNeutralDecision, FcApprove, FcDecision, FcDisapprove } from "react-icons/fc";


const SearchedPageMap = ({item}) => {
    const {datiPersonali, User_Name , id} = useContext(SocialMediaContext)
    return (
        <div key={item._id} className="Searched_page">
            <span className="Searched_page_info">
                <div>
                    {item.picture === undefined && datiPersonali.sesso === "Man" ?
                        <img src={PM} alt={User_Name} />
                        : ""}
                    {item.picture === undefined && datiPersonali.sesso === "Woman" ?
                        <img src={PW} alt={User_Name} />
                        : ""}
                    {item.picture !== undefined ?
                        <img src={item.picture} alt={User_Name} />
                        : ""}
                </div>
                <div>
                    <h4 >{item.name}</h4>
                    <h4 >{item.Bio}</h4>
                    <h4 >{item.Sentimentale}</h4>
                    <h4 >{item.BirthDate}</h4>
                </div>
            </span>
            {item._id !== id ?
                <span className="Searched_page_button">
                    <FcNeutralDecision />
                    <FcDecision />
                    <FcDisapprove />
                    <FcApprove />
                </span> : ""}
        </div>
    );
}

export default SearchedPageMap;
