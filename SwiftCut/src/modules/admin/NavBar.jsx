import { IoIosMenu } from "react-icons/io";
import { GiHandTruck } from "react-icons/gi";
import { HiTruck } from "react-icons/hi2";
import { RiBarChartGroupedLine } from "react-icons/ri";
import { GiRiceCooker } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import logoWhite from '../../assets/img/logo-white.png'
import { IconLabel } from "../../components/IconLabel";
import { useEffect, useState } from "react";
import { ProfileHead } from "./ProfileHead";
import { AxiosClientJSON } from "../../config/http-client/axios-client";




export const NavBar = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const info = await AxiosClientJSON({
                    url: '/api/employees/info',
                    method: 'POST',
                    data: {email : sessionStorage.getItem('email')}
                });
                // Aquí puedes hacer algo con la respuesta, como establecer el estado del componente
                setUser(info.data);
               
            } catch (error) {
                // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    
        // Llamar a fetchData cuando el componente se monta
    
    
    }, []);
    const [user, setUser] = useState([]);

    const [labelVision, setLabelVision] = useState({ vision: false, wigth: "w-44" });
    const changeSize = () => {
        if (labelVision.vision) setLabelVision({ vision: false, wigth: "w-44" });
        else setLabelVision({ vision: true, wigth: "w-14" });

    }
    const singout =()=>{
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('email');


    }
    return (
        <>
            <div className={`${labelVision.wigth}  ml-4 mr-4 h-[90vh] mt-8 flex justify-center items-center`} >
            <nav id="barNav" style={{ backgroundColor: "var(--red-3)" }} className={`text-white ${labelVision.wigth} h-[90vh] fixed  flex flex-col justify-between  rounded-xl   duration-75`}>
            
                <div className="flex flex-col mt-3" id="menu" onClick={changeSize}>
                    <IconLabel Icon={IoIosMenu} value={"Menu"} id={"users"} boolean={labelVision.vision} />
                    <ProfileHead user={user} boolean={labelVision.vision}/>

                </div>
                
                <div className="flex flex-col ">
                    <IconLabel Icon={FaUsers} value={"Usuarios"} id={"Usuarios"} boolean={labelVision.vision} urlRoute={"/Users"}/>
                    <IconLabel Icon={RiBarChartGroupedLine} value={"Graficas"} id={"users"} boolean={labelVision.vision} urlRoute={"/Graphics"}/>
                    <IconLabel Icon={HiTruck} value={"Pedidos"} id={"Pedidos"} boolean={labelVision.vision} urlRoute={"/Ordens"}/>
                    <IconLabel Icon={GiRiceCooker} value={"Extras"} id={"Extras"} boolean={labelVision.vision} urlRoute={"/Extras"}/>
                    <IconLabel Icon={GiHandTruck} value={"Inventario"} id={"users"} boolean={labelVision.vision} urlRoute={"/Inventory"}/>
                </div>
                <div className="flex flex-col mb-3" id="footer">

                    <IconLabel Icon={CiLogout} value={"Usuarios"} id={"Salir"} boolean={labelVision.vision} urlRoute={"/"} funtion={singout} />
                    <div className="flex justify-center mt-4">
                        <img src={logoWhite} alt="" style={{ width: 100, height: 16 }} hidden={labelVision.vision} />

                    </div>
                </div>
                
            </nav>
            </div>
        </>
    );
}