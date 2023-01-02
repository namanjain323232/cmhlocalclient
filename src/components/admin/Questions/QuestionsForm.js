import React from "react";
import { Form, Input, Button} from 'antd';
import { MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';


const QuestionsForm= ({handleSubmit,question,setQuestion,options,setOptions}) =>  {

 const [form] = Form.useForm();

 const onFinish = values => {
   console.log( "received values from form", values.question);
   console.log( "received values from form", values.options);  
   
 }

 const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

 const handleChange = () => {
   form.setFieldsValue({options: []});
 }

    
     return (             
      <div>        
       <section className= "vendor-center">       
        <div className= "card mt-2">
        <div className= "card-body admin-class">              
       <Form   name="question-form" autoComplete="off" 
               onFinish= {handleSubmit} 
               onFinishFailed= {onFinishFailed}
               
               layout= "vertical">
        <Form.Item 
               name="question" 
               size="large"
               label="Question"  
               onChange= {(e) => setQuestion(e.target.value)}
               setFieldsValue={question}                               
               rules={[{ required: true, Message: "Please enter the question"}]}  >
         <Input  />        
       </Form.Item>

      <Form.List name="options" >
       { (fields, {add,remove}) => (
        <>
         { fields.map( (field,index)  => (    
         <Form.Item           
           key= {index}          >      
          <Form.Item
                  {...field}
                  label="Option"
                  size="large"
                  name={[field.name, 'option']}                             
                  fieldKey={[field.fieldKey, 'option']}
                  onChange= {(e) => setOptions(e.target.value)}
                  setFieldsValue={options}
                  rules={[{ required: true, message: 'Please enter an option' }]}
            >
                <Input style={{ width: '100%' }}/>               
          </Form.Item>
           <MinusCircleOutlined onClick={() => remove(field.name)} />
           
         </Form.Item>
         ))}
         <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add options
              </Button>
         </Form.Item>
        </>
       )}
       </Form.List>      
       <Form.Item>
           <Button type="primary" htmlType="submit">
             Submit
          </Button>
       </Form.Item>
    </Form>
                 
     </div>
     </div>          
             
     </section>
    </div>
    )
   }

export default QuestionsForm;
