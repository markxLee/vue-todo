import logo from './logo.svg';
import './App.css';
import { Tabs } from 'antd';
import { Form, Input, Button, Space, Select } from 'antd';
import { CloudServerOutlined, FireOutlined, HomeOutlined   } from '@ant-design/icons';
import "antd/dist/antd.css";
import "./index.css";

const { TabPane } = Tabs;

function App() {
  const lst_tabs = [{'id': 1, 'name': 'Local storage', 'icon': HomeOutlined}, {'id': 2, 'name': 'Firestore', 'icon': FireOutlined},{'id': 3, 'name': 'Java (Hibernate)', 'icon': CloudServerOutlined}]
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };
  let list_tab = lst_tabs.map(v => {
                  return(
                    <TabPane tab={<span> {<v.icon  /> } {v.name} </span>} key={v.id}>
                      <Form  {...layout}>
                        <Form.Item name={['user', 'name']} label="Task name" rules={[{ required: true }]}>
                          <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'introduction']} label="Task content">
                          <Input.TextArea />
                        </Form.Item>
                      </Form>
                      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                        <Button type="primary" htmlType="button" style={{ background: "#7dd076", borderColor: "#7dd076" }}>
                          Add
                        </Button>
                        &nbsp;
                        <Button type="primary" htmlType="button" style={{ background: "#f4cb81", borderColor: "#f4cb81" }}>
                          Reset
                        </Button>
                      </Form.Item>
                    </TabPane>
                  )});
  return (
    <div className="App">
      <Tabs defaultActiveKey="2" centered size="large">
        {
          list_tab
        }
      </Tabs>
    </div>
  );
}

export default App;
