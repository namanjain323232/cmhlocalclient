import React, {useState,useEffect} from "react";
import { Form, Input, Button, Space} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {addTimeslot} from "../../../actions/timeslot";
import {useSelector} from "react-redux";

const TimeslotCreateold= () => {

   const {user} = useSelector( state => ({...state}));
   const [slot, setSlot] = useState([]);
   
    const handleFinish = values => {
        console.log('Received values of form:', values);
        addTimeslot({values},user.token);
      };

        
    return (        

        <div className= "row mt-5 d-flex justify-content-center">
        <h1 className= "font-weight-bold d-flex justify-content-center mb-4">Add New Timeslots</h1>
         <div className= "col col-md-12 d-flex justify-content-center mt-2">
         <Form name="timeslot-form" onFinish={handleFinish} autoComplete="off">
          <Form.List name="timeslots">
           {(fields, { add, remove }) => (
            <>
            {fields.map(field => (
             <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline"> 
             <Form.Item
                  {...field}
                  name={[field.name, 'startslot']}
                  fieldKey={[field.fieldKey, 'startslot']}
                  rules={[{ required: true, message: 'Missing Start Timeslot' }]}
                >
                  <Input placeholder="Start Timeslot" />
             </Form.Item>
             <Form.Item
                  {...field}
                  name={[field.name, 'endslot']}
                  fieldKey={[field.fieldKey, 'endslot']}
                  rules={[{ required: true, message: 'Missing End Timeslot' }]}
                >
                  <Input placeholder="End Timeslot" />
             </Form.Item>
             <MinusCircleOutlined onClick={() => remove(field.name)} />
            </Space>
            ))}
            <Form.Item>
              <Button type="dashed"
                       onClick={() => add()}
                       className= "font-weight-bold" block icon={<PlusOutlined />}>
                ADD NEW TIMESLOT
              </Button>
            </Form.Item>
            </>
            )}
          </Form.List>  
          <Form.Item>
            <Button type="primary"
                    htmlType="submit"
                    className="d-flex justify-content-center font-weight-bold">
               Submit
             </Button>
          </Form.Item>                 
         </Form>
        </div>
        </div>
    )

}

export default TimeslotCreateold;