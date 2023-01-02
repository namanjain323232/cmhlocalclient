import react, {useState,useEffect} from "react";
import {useSelector} from "react-redux";
import {Card,Avatar,Badge} from "antd";
import moment from "moment";
import {SettingOutlined} from "@ant-design/icons";
import {toast} from "react-toastify";
import {getAccountBalance, 
        currencyFormatter,
        payoutSettings} from "../../actions/stripe";

const {Meta} = Card;
const {Ribbon}= Badge;

const ConnectNav= () => {

    const {user} = useSelector( (state) => ({...state}));
    const [balance, setBalance]= useState(0);
    const [loading,setLoading] = useState(false);

    useEffect( () => {
      loadAccountBalance();     
    },[]);

    const loadAccountBalance= () => {
        getAccountBalance(user.token).then ( res => setBalance(res.data));
    }
     

    const handlePayoutSettings= async () => {
         setLoading(true);
         try {
            const res= await payoutSettings(user.token);
            window.location.href= res.data.url;
            setLoading(false);
         } catch (err) {
             console.log(err);
             setLoading(false);
             toast.error("Unable to access settings. Please try again")
         }
    }

    return (
        
        <div className= "d-flex justify-content-around">         
         <Card>
              <Meta avatar= {<Avatar>{user.name[0]}</Avatar>}
                    title={user.name} 
                    description={`Joined on ${moment(user.createdAt).fromNow()}`}
              />              
          </Card>
         
          {user &&
           user.stripe_seller &&
           user.stripe_seller.charges_enabled && (
            <>
           <Ribbon text= "Account Balance" color="blue">
              <Card className="bg-light pt-1">
                {balance && balance.pending 
                         && balance.pending.map( (bal,i) => (
                            <span key={i} className="lead"
                            >{currencyFormatter(bal)}</span> 
                         ))
                }
              </Card>
           </Ribbon>
            <Ribbon text="Payout Settings" color="silver">
                <Card className= "bg-light pointer"
                      onClick= {handlePayoutSettings}>
                  <SettingOutlined className= "h5 pt-2"/>
                </Card>
            </Ribbon>
            </>
           ) }               
        </div>
        
    )
}

export default ConnectNav;